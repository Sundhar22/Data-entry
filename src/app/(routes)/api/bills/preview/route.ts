import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ValidationError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateSchema } from "@/lib/validation";
import { BillPreviewQuerySchema } from "@/schemas/bill";
import { calculateBillAmounts, getSuggestedOtherCharges, countBags } from "@/lib/bill-utils";
import { BillPreview } from "@/types/bill";
import { isMobileOrTabletRequest } from "@/lib/device-detection";

/**
 * GET /api/bills/preview
 * Get bill preview for unpaid auction items grouped by farmer, product, and session
 * DESKTOP ONLY - Restricted for mobile and tablet devices
 */
async function getBillPreviewHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    // Check if request is from mobile or tablet - restrict access
    if (isMobileOrTabletRequest(req)) {
        throw new ValidationError(
            'Bill preview generation is restricted to desktop devices only for better accuracy and usability.',
            'DESKTOP_REQUIRED'
        );
    }

    const userId = req.user.id;
    const { searchParams } = new URL(req.url);

    const queryParams = {
        farmer_id: searchParams.get('farmer_id') || "",
        product_id: searchParams.get('product_id') || undefined,
        session_id: searchParams.get('session_id') || undefined,
    };

    const validation = validateSchema(BillPreviewQuerySchema, queryParams);
    if (!validation.success) {
        throw new ValidationError("Invalid query parameters", validation.errors);
    }

    const { farmer_id, product_id, session_id } = validation.data!;

    // Verify farmer belongs to this commissioner
    const farmer = await prisma.farmer.findFirst({
        where: {
            id: farmer_id,
            commissioner_id: userId
        },
        select: {
            name: true,
            village: true
        }
    });

    if (!farmer) {
        throw new NotFoundError('Farmer not found');
    }

    // Get commissioner's commission rate
    const commissioner = await prisma.commissioner.findUnique({
        where: { id: userId },
        select: { commission_rate: true }
    });

    if (!commissioner) {
        throw new NotFoundError('Commissioner not found');
    }

    // Build where clause for auction items
    const whereClause = {
        farmer_id,
        bill_id: null, // Only unpaid items
        rate: { not: null }, // Only items with rates
        buyer_id: { not: null }, // Only sold items
        ...(product_id && { product_id }),
        ...(session_id && { session_id }),
        // Ensure sessions belong to this commissioner
        session: {
            commissioner_id: userId
        }
    };

    // Get all unpaid auction items for this farmer
    const auctionItems = await prisma.auctionItem.findMany({
        where: whereClause,
        include: {
            product: {
                select: {
                    id: true,
                    name: true
                }
            },
            session: {
                select: {
                    id: true,
                    date: true
                }
            }
        },
        orderBy: [
            { session: { date: 'desc' } },
            { product: { name: 'asc' } }
        ]
    });

    if (auctionItems.length === 0) {
        return createSuccessResponse({
            farmer: { name: farmer.name, village: farmer.village },
            previews: [],
            summary: {
                total_previews: 0,
                total_gross_amount: 0,
                total_net_payable: 0
            }
        });
    }

    // Group items by [product_id, session_id]
    const groupedItems = new Map<string, typeof auctionItems>();
    
    auctionItems.forEach(item => {
        const key = `${item.product_id}_${item.session_id}`;
        if (!groupedItems.has(key)) {
            groupedItems.set(key, []);
        }
        groupedItems.get(key)!.push(item);
    });

    // Create bill previews for each group
    const billPreviews: BillPreview[] = [];

    for (const [, items] of groupedItems.entries()) {
        const firstItem = items[0];
        const product = firstItem.product;
        const session = firstItem.session;

        // Calculate totals
        const total_quantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const total_bags = countBags(items);

        // Prepare items for calculation
        const itemsForCalculation = items.map(item => ({
            quantity: item.quantity,
            rate: item.rate!
        }));

        // Get suggested other charges
        const suggested_other_charges = getSuggestedOtherCharges(product.name, total_quantity);

        // Calculate amounts
        const { grossAmount, commissionAmount, netPayable } = calculateBillAmounts(
            itemsForCalculation,
            commissioner.commission_rate,
            suggested_other_charges
        );

        // Create preview
        const preview: BillPreview = {
            farmer_id,
            product_id: product.id,
            session_id: session.id,
            farmer_name: farmer.name,
            product_name: product.name,
            session_date: session.date,
            items: items.map(item => ({
                id: item.id,
                quantity: item.quantity,
                rate: item.rate!,
                unit: item.unit,
                amount: item.quantity * item.rate!
            })),
            total_quantity,
            total_bags,
            gross_amount: grossAmount,
            commission_rate: commissioner.commission_rate,
            commission_amount: commissionAmount,
            suggested_other_charges,
            net_payable: netPayable
        };

        billPreviews.push(preview);
    }

    return createSuccessResponse({
        farmer: { name: farmer.name, village: farmer.village },
        previews: billPreviews,
        summary: {
            total_previews: billPreviews.length,
            total_gross_amount: billPreviews.reduce((sum, preview) => sum + preview.gross_amount, 0),
            total_net_payable: billPreviews.reduce((sum, preview) => sum + preview.net_payable, 0)
        }
    });
}

const handler = withAuth(withErrorHandling(getBillPreviewHandler));

export { handler as GET };
