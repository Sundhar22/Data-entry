import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ConflictError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { BillGenerateRequestSchema } from "@/schemas/bill";
import { calculateBillAmounts, generateBillNumber } from "@/lib/bill-utils";

type GeneratedBill = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bill: any; // Prisma bill with includes
    auction_items_count: number;
};

type GenerationError = {
    product_id: string;
    session_id: string;
    error: string;
};

/**
 * POST /api/bills/generate
 * Generate actual bill records from previews
 */
async function generateBillsHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    
    const validation = await validateRequest(BillGenerateRequestSchema)(req);
    if (!validation.success) {
        return validation.response;
    }

    const { farmer_id, previews } = validation.data;

    // Verify farmer belongs to this commissioner
    const farmer = await prisma.farmer.findFirst({
        where: {
            id: farmer_id,
            commissioner_id: userId
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

    const createdBills: GeneratedBill[] = [];
    const errors: GenerationError[] = [];

    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
        for (const preview of previews) {
            try {
                // Check if bill already exists for this combination
                const existingBill = await tx.bill.findUnique({
                    where: {
                        farmer_id_product_id_session_id: {
                            farmer_id,
                            product_id: preview.product_id,
                            session_id: preview.session_id
                        }
                    }
                });

                if (existingBill) {
                    errors.push({
                        product_id: preview.product_id,
                        session_id: preview.session_id,
                        error: 'Bill already exists for this product and session'
                    });
                    continue;
                }

                // Get unpaid auction items for this specific combination
                const auctionItems = await tx.auctionItem.findMany({
                    where: {
                        farmer_id,
                        product_id: preview.product_id,
                        session_id: preview.session_id,
                        bill_id: null,
                        rate: { not: null },
                        buyer_id: { not: null },
                        // Ensure session belongs to this commissioner
                        session: {
                            commissioner_id: userId
                        }
                    }
                });

                if (auctionItems.length === 0) {
                    errors.push({
                        product_id: preview.product_id,
                        session_id: preview.session_id,
                        error: 'No unbilled auction items found'
                    });
                    continue;
                }

                // Calculate amounts
                const itemsForCalculation = auctionItems.map(item => ({
                    quantity: item.quantity,
                    rate: item.rate!
                }));

                const { grossAmount, commissionAmount, netPayable } = calculateBillAmounts(
                    itemsForCalculation,
                    commissioner.commission_rate,
                    preview.other_charges || {}
                );

                // Generate unique bill number
                const billNumber = await generateBillNumber();

                // Create bill
                const bill = await tx.bill.create({
                    data: {
                        bill_number: billNumber,
                        farmer_id,
                        commissioner_id: userId,
                        product_id: preview.product_id,
                        session_id: preview.session_id,
                        total_quantity: auctionItems.reduce((sum, item) => sum + item.quantity, 0),
                        gross_amount: grossAmount,
                        commission_rate: commissioner.commission_rate,
                        commission_amount: commissionAmount,
                        other_charges: preview.other_charges || {},
                        net_payable: netPayable,
                        notes: preview.notes
                    },
                    include: {
                        farmer: {
                            select: {
                                id: true,
                                name: true,
                                phone: true,
                                village: true
                            }
                        },
                        product: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                });

                // Update auction items to link to this bill
                await tx.auctionItem.updateMany({
                    where: {
                        id: { in: auctionItems.map(item => item.id) }
                    },
                    data: {
                        bill_id: bill.id
                    }
                });

                createdBills.push({
                    bill,
                    auction_items_count: auctionItems.length
                });

            } catch (error) {
                errors.push({
                    product_id: preview.product_id,
                    session_id: preview.session_id,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        }
    });

    if (createdBills.length === 0 && errors.length > 0) {
        throw new ConflictError('Failed to generate any bills');
    }

    return createSuccessResponse({
        generated_bills: createdBills,
        total_generated: createdBills.length,
        errors: errors.length > 0 ? errors : undefined,
        total_errors: errors.length
    });
}

const handler = withAuth(withErrorHandling(generateBillsHandler));

export { handler as POST };
