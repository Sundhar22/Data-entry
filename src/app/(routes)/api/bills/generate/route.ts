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
import { BillGenerateRequestSchema } from "@/schemas/bill";
import { calculateBillAmounts, generateBillNumbers } from "@/lib/bill-utils";
import { isMobileOrTabletRequest } from "@/lib/device-detection";

type GeneratedBill = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bill: any; // Prisma bill with includes
  auction_items_count: number;
  auction_item_ids: string[]; // IDs of auction items for this bill
};

type GenerationError = {
  product_id: string;
  session_id: string;
  error: string;
};

/**
 * POST /api/bills/generate
 * Generate actual bill records from previews
 * DESKTOP ONLY - Restricted for mobile and tablet devices
 */
async function generateBillsHandler(
  req: AuthenticatedRequest,
): Promise<NextResponse> {
  // Check if request is from mobile or tablet - restrict access
  if (isMobileOrTabletRequest(req)) {
    throw new ValidationError(
      "Bill generation is restricted to desktop devices only for better accuracy and usability.",
      "DESKTOP_REQUIRED",
    );
  }

  const userId = req.user.id;

  const validation = await validateRequest(BillGenerateRequestSchema)(req);
  if (!validation.success) {
    return validation.response;
  }

  const { farmer_id, previews, mark_as_paid, payment_method } = validation.data;

  console.log("Bill generation started:", {
    farmer_id,
    previews_count: previews.length,
    mark_as_paid,
    payment_method,
  });

  // Verify farmer belongs to this commissioner
  const farmer = await prisma.farmer.findFirst({
    where: {
      id: farmer_id,
      commissioner_id: userId,
    },
  });

  if (!farmer) {
    throw new NotFoundError("Farmer not found");
  }

  // Get commissioner's commission rate
  const commissioner = await prisma.commissioner.findUnique({
    where: { id: userId },
    select: { commission_rate: true },
  });

  if (!commissioner) {
    throw new NotFoundError("Commissioner not found");
  }

  const createdBills: GeneratedBill[] = [];
  const errors: GenerationError[] = [];

  // Generate all bill numbers at once to ensure they're sequential and unique
  console.log("Generating bill numbers for", previews.length, "bills");
  const billNumbers = await generateBillNumbers(previews.length);
  console.log("Generated bill numbers:", billNumbers);

  // Use transaction to ensure atomicity
  await prisma.$transaction(async (tx) => {
    console.log(
      "Starting transaction, processing",
      previews.length,
      "previews",
    );
    for (let i = 0; i < previews.length; i++) {
      const preview = previews[i];
      const billNumber = billNumbers[i];
      console.log(
        "Processing preview:",
        preview,
        "with bill number:",
        billNumber,
      );
      try {
        // Check if bill already exists for this combination
        const existingBill = await tx.bill.findUnique({
          where: {
            farmer_id_product_id_session_id: {
              farmer_id,
              product_id: preview.product_id,
              session_id: preview.session_id,
            },
          },
          select: {
            id: true,
            total_quantity: true,
            gross_amount: true,
            commission_amount: true,
            other_charges: true,
            payment_status: true,
            payment_method: true,
            payment_date: true,
            notes: true,
            bill_number: true,
          },
        });

        if (existingBill) {
          console.log(
            "Bill already exists for:",
            preview.product_id,
            preview.session_id,
            "— attempting to append unbilled items to existing bill",
          );

          // Find any new unbilled auction items for this combo
          const newItems = await tx.auctionItem.findMany({
            where: {
              farmer_id,
              product_id: preview.product_id,
              session_id: preview.session_id,
              bill_id: null,
              rate: { not: null },
              buyer_id: { not: null },
              session: { commissioner_id: userId },
            },
          });

          if (newItems.length === 0) {
            errors.push({
              product_id: preview.product_id,
              session_id: preview.session_id,
              error: "No unbilled auction items found",
            });
            continue;
          }

          // Calculate amounts for just the new items
          const itemsForCalculationAppend = newItems.map((item) => ({
            quantity: item.quantity,
            rate: item.rate!,
          }));

          const { grossAmount: appendGross, commissionAmount: appendCommission } =
            calculateBillAmounts(
              itemsForCalculationAppend,
              commissioner.commission_rate,
              {},
            );

          // Merge other_charges (sum same keys)
          const currentCharges = (existingBill.other_charges as Record<string, number>) || {};
          const appendCharges = (preview.other_charges as Record<string, number>) || {};
          const mergedCharges: Record<string, number> = { ...currentCharges };
          for (const key of Object.keys(appendCharges)) {
            mergedCharges[key] = (mergedCharges[key] || 0) + (appendCharges[key] || 0);
          }
          const mergedChargesTotal = Object.values(mergedCharges).reduce(
            (sum, val) => sum + (typeof val === "number" ? val : 0),
            0,
          );

          // Compute new totals
          const newTotalQuantity = existingBill.total_quantity + newItems.reduce((s, it) => s + it.quantity, 0);
          const newGrossAmount = existingBill.gross_amount + appendGross;
          const newCommissionAmount = existingBill.commission_amount + appendCommission;
          const newNetPayable = newGrossAmount - newCommissionAmount + mergedChargesTotal;

          // Payment status rules:
          // - If existing bill is PAID and caller doesn't mark_as_paid now, do not auto-unpay; return an error instead
          if (existingBill.payment_status === "PAID" && !mark_as_paid) {
            errors.push({
              product_id: preview.product_id,
              session_id: preview.session_id,
              error:
                "Existing bill is already PAID. To append new items, please mark as paid now or create under a different session.",
            });
            continue;
          }

          let nextPaymentStatus = existingBill.payment_status as "PAID" | "UNPAID";
          let nextPaymentMethod: string | null = existingBill.payment_method;
          let nextPaymentDate: Date | null = existingBill.payment_date as Date | null;
          let nextNotes = existingBill.notes || null;

          if (mark_as_paid) {
            nextPaymentStatus = "PAID";
            nextPaymentMethod = payment_method || "cash";
            nextPaymentDate = new Date();
          }

          // Update bill
          const updatedBill = await tx.bill.update({
            where: { id: existingBill.id },
            data: {
              total_quantity: newTotalQuantity,
              gross_amount: newGrossAmount,
              commission_amount: newCommissionAmount,
              other_charges: mergedCharges,
              net_payable: newNetPayable,
              payment_status: nextPaymentStatus,
              payment_method: nextPaymentMethod,
              payment_date: nextPaymentDate,
              notes: nextNotes,
            },
            include: {
              farmer: { select: { id: true, name: true, phone: true, village: true } },
              product: { select: { id: true, name: true } },
            },
          });

          // Attach new items to existing bill
          await tx.auctionItem.updateMany({
            where: { id: { in: newItems.map((i) => i.id) } },
            data: { bill_id: existingBill.id },
          });

          createdBills.push({
            bill: updatedBill,
            auction_items_count: newItems.length,
            auction_item_ids: newItems.map((i) => i.id),
          });

          console.log(
            "Appended",
            newItems.length,
            "auction items to existing bill",
            existingBill.bill_number,
          );
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
              commissioner_id: userId,
              status: "COMPLETED",
            },
          },
        });

        console.log(
          "Found auction items:",
          auctionItems.length,
          "for preview:",
          preview.product_id,
        );

        if (auctionItems.length === 0) {
          console.log(
            "No auction items found for:",
            preview.product_id,
            preview.session_id,
          );
          errors.push({
            product_id: preview.product_id,
            session_id: preview.session_id,
            error: "No unbilled auction items found",
          });
          continue;
        }

        // Calculate amounts
        const itemsForCalculation = auctionItems.map((item) => ({
          quantity: item.quantity,
          rate: item.rate!,
        }));

        const { grossAmount, commissionAmount, netPayable } =
          calculateBillAmounts(
            itemsForCalculation,
            commissioner.commission_rate,
            preview.other_charges || {},
          );

        console.log("Creating bill with number:", billNumber);

        // Create bill
        const bill = await tx.bill.create({
          data: {
            bill_number: billNumber,
            farmer_id,
            commissioner_id: userId,
            product_id: preview.product_id,
            session_id: preview.session_id,
            total_quantity: auctionItems.reduce(
              (sum, item) => sum + item.quantity,
              0,
            ),
            gross_amount: grossAmount,
            commission_rate: commissioner.commission_rate,
            commission_amount: commissionAmount,
            other_charges: preview.other_charges || {},
            net_payable: netPayable,
            notes: mark_as_paid
              ? `${preview.notes ? preview.notes + ". " : ""}Marked as paid during generation`
              : preview.notes,
            // Set payment status if marking as paid
            payment_status: mark_as_paid ? "PAID" : "UNPAID",
            payment_method: mark_as_paid ? payment_method || "cash" : null,
            payment_date: mark_as_paid ? new Date() : null,
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
          "Bill created successfully:",
          bill.id,
          "with number:",
          bill.bill_number,
        );

        // ALWAYS update auction items with bill_id, regardless of payment status
        // This ensures auction items are not available for billing again
        await tx.auctionItem.updateMany({
          where: {
            id: { in: auctionItems.map((item) => item.id) },
          },
          data: {
            bill_id: bill.id,
          },
        });
        console.log(
          "Updated",
          auctionItems.length,
          "auction items with bill_id:",
          bill.id,
        );

        createdBills.push({
          bill,
          auction_items_count: auctionItems.length,
          auction_item_ids: auctionItems.map((item) => item.id), // Store for payment processing
        });

        console.log(
          "Added bill to createdBills array, total now:",
          createdBills.length,
        );
      } catch (error) {
        console.error("Error creating bill:", error);
        console.log(
          "Error details:",
          error instanceof Error ? error.message : "Unknown error",
          error instanceof Error && "code" in error
            ? (error as { code: string }).code
            : "No error code",
        );

        errors.push({
          product_id: preview.product_id,
          session_id: preview.session_id,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }
  });

  console.log(
    "Transaction completed. Created bills:",
    createdBills.length,
    "Errors:",
    errors.length,
  );

  // Detailed error logging
  if (errors.length > 0) {
    console.log(
      "Errors during bill generation:",
      JSON.stringify(errors, null, 2),
    );
  }

  if (createdBills.length === 0 && errors.length > 0) {
    console.log("No bills were created, returning success with errors");
    return createSuccessResponse({
      generated_bills: [],
      total_generated: 0,
      errors,
      total_errors: errors.length,
      message: "No new bills were generated. Some selections already have bills or no unbilled items.",
    }, 200);
  }

  console.log("Returning success response");
  return createSuccessResponse({
    generated_bills: createdBills,
    total_generated: createdBills.length,
    errors: errors.length > 0 ? errors : undefined,
    total_errors: errors.length,
  });
}

const handler = withAuth(withErrorHandling(generateBillsHandler));

export { handler as POST };
