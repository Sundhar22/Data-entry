import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { groupQuantitiesByRate } from "@/lib/bill-utils";

/**
 * GET /api/bills/[id]
 * Get detailed information about a specific bill
 */
async function getBillHandler(
    req: AuthenticatedRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const userId = req.user.id;
    const { id: billId } = await params;

    // Get bill with only essential related data
    const bill = await prisma.bill.findFirst({
        where: {
            id: billId,
            commissioner_id: userId
        },
        select: {
            id: true,
            bill_number: true,
            farmer_id: true,
            product_id: true,
            session_id: true,
            total_quantity: true,
            gross_amount: true,
            commission_rate: true,
            commission_amount: true,
            other_charges: true,
            net_payable: true,
            payment_status: true,
            payment_method: true,
            payment_date: true,
            notes: true,
            created_at: true,
            // Only essential farmer data
            farmer: {
                select: {
                    name: true,
                    village: true
                }
            },
            // Only essential product data
            product: {
                select: {
                    name: true
                }
            },
            // Only auction items needed for rate grouping
            auction_items: {
                select: {
                    quantity: true,
                    rate: true,
                    unit: true
                },
                orderBy: {
                    rate: 'asc'
                }
            }
        }
    });

    if (!bill) {
        throw new NotFoundError('Bill not found');
    }

    // Group quantities by rate for display
    const rateGroups = groupQuantitiesByRate(
        bill.auction_items.map(item => ({
            quantity: item.quantity,
            rate: item.rate!
        }))
    );

    return createSuccessResponse({
        bill,
        rate_groups: rateGroups,
        summary: {
            total_bags: bill.auction_items.length,
            other_charges_total: Object.values(bill.other_charges as Record<string, number> || {})
                .reduce((sum, charge) => sum + charge, 0),
            payment_info: {
                status: bill.payment_status,
                method: bill.payment_method,
                date: bill.payment_date
            }
        }
    });
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    return withAuth(withErrorHandling(
        (req: AuthenticatedRequest) => getBillHandler(req, { params })
    ))(req);
}
