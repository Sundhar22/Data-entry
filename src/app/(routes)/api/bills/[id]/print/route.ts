import { withAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  withErrorHandling,
  NotFoundError,
  ValidationError,
} from "@/lib/error-handler";
import { AuthenticatedRequest } from "@/types/auth";
import prisma from "@/lib/prisma";
import { groupQuantitiesByRate } from "@/lib/bill-utils";
import { generateBillHTML, generateBillText } from "@/lib/bill-print";
import { isMobileOrTabletRequest } from "@/lib/device-detection";

/**
 * GET /api/bills/[id]/print?format=html|text
 * Get printable format of a bill
 * DESKTOP ONLY - Restricted for mobile and tablet devices
 */
async function printBillHandler(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  // Check if request is from mobile or tablet - restrict access
  if (isMobileOrTabletRequest(req)) {
    throw new ValidationError(
      "Bill printing is restricted to desktop devices only for proper formatting and printing capabilities.",
      "DESKTOP_REQUIRED",
    );
  }

  const userId = req.user.id;
  const { id: billId } = await params;
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") || "html"; // html or text

  // Get bill with all related data
  const bill = await prisma.bill.findFirst({
    where: {
      id: billId,
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
      auction_items: {
        select: {
          id: true,
          quantity: true,
          rate: true,
          unit: true,
          session: {
            select: {
              date: true,
            },
          },
        },
        orderBy: {
          rate: "asc",
        },
      },
    },
  });

  if (!bill) {
    throw new NotFoundError("Bill not found");
  }

  // Get session date from first auction item
  const sessionDate = bill.auction_items[0]?.session.date || new Date();

  // Group quantities by rate for display
  const rateGroups = groupQuantitiesByRate(
    bill.auction_items.map((item) => ({
      quantity: item.quantity,
      rate: item.rate!,
    })),
  );

  const printData = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bill: bill as any, // Type assertion for compatibility
    rate_groups: rateGroups,
    session_date: sessionDate,
  };

  if (format === "text") {
    const textContent = generateBillText(printData);
    return new NextResponse(textContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `inline; filename="bill-${bill.bill_number}.txt"`,
      },
    });
  } else {
    // Default to HTML
    const htmlContent = generateBillHTML(printData);
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return withAuth(
    withErrorHandling((req: AuthenticatedRequest) =>
      printBillHandler(req, { params }),
    ),
  )(req);
}
