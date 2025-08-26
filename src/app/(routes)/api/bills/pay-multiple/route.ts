import { withAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createSuccessResponse } from "@/lib/api-response";
import {
  withErrorHandling,
  NotFoundError,
  ConflictError,
  ValidationError,
} from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/validation";
import { BillPaymentRequestSchema } from "@/schemas/bill";
import { isMobileOrTabletRequest } from "@/lib/device-detection";

/**
 * POST /api/bills/pay-multiple
 * Process payment for multiple bills
 * DESKTOP ONLY - Restricted for mobile and tablet devices
 */
async function payMultipleBillsHandler(
  req: AuthenticatedRequest,
): Promise<NextResponse> {
  // Check if request is from mobile or tablet - restrict access
  if (isMobileOrTabletRequest(req)) {
    throw new ValidationError(
      "Bill payment processing is restricted to desktop devices only for security and accuracy.",
      "DESKTOP_REQUIRED",
    );
  }

  const userId = req.user.id;

  const validation = await validateRequest(BillPaymentRequestSchema)(req);
  if (!validation.success) {
    return validation.response;
  }

  const { bill_ids, payment_method, notes } = validation.data;

  console.log("Payment request received:", {
    bill_ids,
    payment_method,
    notes,
    userId,
  });

  // Verify all bills exist and belong to this commissioner
  const bills = await prisma.bill.findMany({
    where: {
      id: { in: bill_ids },
      commissioner_id: userId,
    },
    include: {
      farmer: {
        select: {
          id: true,
          name: true,
          phone: true,
          village: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  console.log(
    `Found ${bills.length} bills to process:`,
    bills.map((b) => ({
      id: b.id,
      bill_number: b.bill_number,
      payment_status: b.payment_status,
    })),
  );

  if (bills.length !== bill_ids.length) {
    const foundIds = bills.map((bill) => bill.id);
    const missingIds = bill_ids.filter((id) => !foundIds.includes(id));
    throw new NotFoundError(`Bills not found: ${missingIds.join(", ")}`);
  }

  // Check if any bills are already paid
  const alreadyPaidBills = bills.filter(
    (bill) => bill.payment_status === "PAID",
  );
  if (alreadyPaidBills.length > 0) {
    throw new ConflictError(
      `Some bills are already paid: ${alreadyPaidBills.map((b) => b.bill_number).join(", ")}`,
    );
  }

  const paymentDate = new Date();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedBills: any[] = [];

  // Use transaction to ensure atomicity
  await prisma.$transaction(async (tx) => {
    for (const bill of bills) {
      // First, get all auction items that should be linked to this bill
      // We need to find items that match this bill's criteria and are still unlinked
      const auctionItems = await tx.auctionItem.findMany({
        where: {
          farmer_id: bill.farmer_id,
          product_id: bill.product_id,
          session_id: bill.session_id,
          bill_id: null, // Only items that haven't been assigned to a bill yet
          rate: { not: null },
          buyer_id: { not: null },
          // Ensure session belongs to this commissioner
          session: {
            commissioner_id: userId,
          },
        },
        select: {
          id: true,
        },
      });

      console.log(
        `Processing bill ${bill.bill_number}: found ${auctionItems.length} auction items to link`,
      );

      // Update the bill status to PAID
      const updatedBill = await tx.bill.update({
        where: { id: bill.id },
        data: {
          payment_status: "PAID",
          payment_method,
          payment_date: paymentDate,
          notes: notes
            ? `${bill.notes ? bill.notes + "\n" : ""}Payment: ${notes}`
            : bill.notes,
        },
        include: {
          farmer: {
            select: {
              id: true,
              name: true,
              phone: true,
              village: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      // ONLY NOW update auction items to link to this bill (after successful payment)
      if (auctionItems.length > 0) {
        const updateResult = await tx.auctionItem.updateMany({
          where: {
            id: { in: auctionItems.map((item) => item.id) },
          },
          data: {
            bill_id: bill.id,
          },
        });
        console.log(
          `Linked ${updateResult.count} auction items to bill ${bill.bill_number}`,
        );
      } else {
        console.log(
          `Warning: No auction items found to link for bill ${bill.bill_number}`,
        );
      }

      updatedBills.push(updatedBill);
    }
  });

  console.log(
    `Payment transaction completed successfully. Updated ${updatedBills.length} bills:`,
    updatedBills.map((b) => ({
      bill_number: b.bill_number,
      payment_status: b.payment_status,
    })),
  );

  // Calculate summary
  const totalAmount = updatedBills.reduce(
    (sum, bill) => sum + bill.net_payable,
    0,
  );
  const totalCommission = updatedBills.reduce(
    (sum, bill) => sum + bill.commission_amount,
    0,
  );
  const totalGross = updatedBills.reduce(
    (sum, bill) => sum + bill.gross_amount,
    0,
  );

  return createSuccessResponse({
    paid_bills: updatedBills,
    total_bills_paid: updatedBills.length,
    payment_summary: {
      total_gross_amount: totalGross,
      total_commission: totalCommission,
      total_net_paid: totalAmount,
      payment_method,
      payment_date: paymentDate,
    },
    farmers: [
      ...new Set(
        updatedBills.map((bill) => ({
          id: bill.farmer.id,
          name: bill.farmer.name,
          phone: bill.farmer.phone,
          village: bill.farmer.village,
        })),
      ),
    ],
  });
}

const handler = withAuth(withErrorHandling(payMultipleBillsHandler));

export { handler as POST };
