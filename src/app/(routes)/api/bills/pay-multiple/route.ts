import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import { withErrorHandling, NotFoundError, ConflictError } from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { BillPaymentRequestSchema } from "@/schemas/bill";

/**
 * POST /api/bills/pay-multiple
 * Process payment for multiple bills
 */
async function payMultipleBillsHandler(req: AuthenticatedRequest): Promise<NextResponse> {
    const userId = req.user.id;
    
    const validation = await validateRequest(BillPaymentRequestSchema)(req);
    if (!validation.success) {
        return validation.response;
    }

    const { bill_ids, payment_method, notes } = validation.data;

    // Verify all bills exist and belong to this commissioner
    const bills = await prisma.bill.findMany({
        where: {
            id: { in: bill_ids },
            commissioner_id: userId
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

    if (bills.length !== bill_ids.length) {
        const foundIds = bills.map(bill => bill.id);
        const missingIds = bill_ids.filter(id => !foundIds.includes(id));
        throw new NotFoundError(`Bills not found: ${missingIds.join(', ')}`);
    }

    // Check if any bills are already paid
    const alreadyPaidBills = bills.filter(bill => bill.payment_status === 'PAID');
    if (alreadyPaidBills.length > 0) {
        throw new ConflictError(`Some bills are already paid: ${alreadyPaidBills.map(b => b.bill_number).join(', ')}`);
    }

    const paymentDate = new Date();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedBills: any[] = [];

    // Use transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
        for (const bill of bills) {
            const updatedBill = await tx.bill.update({
                where: { id: bill.id },
                data: {
                    payment_status: 'PAID',
                    payment_method,
                    payment_date: paymentDate,
                    notes: notes ? `${bill.notes ? bill.notes + '\n' : ''}Payment: ${notes}` : bill.notes
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

            updatedBills.push(updatedBill);
        }
    });

    // Calculate summary
    const totalAmount = updatedBills.reduce((sum, bill) => sum + bill.net_payable, 0);
    const totalCommission = updatedBills.reduce((sum, bill) => sum + bill.commission_amount, 0);
    const totalGross = updatedBills.reduce((sum, bill) => sum + bill.gross_amount, 0);

    return createSuccessResponse({
        paid_bills: updatedBills,
        total_bills_paid: updatedBills.length,
        payment_summary: {
            total_gross_amount: totalGross,
            total_commission: totalCommission,
            total_net_paid: totalAmount,
            payment_method,
            payment_date: paymentDate
        },
        farmers: [...new Set(updatedBills.map(bill => ({
            id: bill.farmer.id,
            name: bill.farmer.name,
            phone: bill.farmer.phone,
            village: bill.farmer.village
        })))]
    });
}

const handler = withAuth(withErrorHandling(payMultipleBillsHandler));

export { handler as POST };
