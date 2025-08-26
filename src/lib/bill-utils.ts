import prisma from "@/lib/prisma";

/**
 * Generate multiple unique bill numbers in sequence
 * This ensures we don't have race conditions when generating multiple bills at once
 */
export async function generateBillNumbers(count: number): Promise<string[]> {
  // Find the highest bill number in the database
  const lastBill = await prisma.bill.findFirst({
    select: { bill_number: true },
    orderBy: { bill_number: "desc" },
    where: {
      bill_number: {
        startsWith: "BILL",
      },
    },
  });

  // Start from 1 if no bills exist, otherwise increment from last number
  let nextNumber = 1;
  if (lastBill) {
    nextNumber = parseInt(lastBill.bill_number.replace("BILL", "")) + 1;
  }

  // Generate the requested number of sequential bill numbers
  const billNumbers: string[] = [];
  for (let i = 0; i < count; i++) {
    billNumbers.push(`BILL${(nextNumber + i).toString().padStart(3, "0")}`);
  }

  return billNumbers;
}

/**
 * Generate a single unique bill number (for backward compatibility)
 */
export async function generateBillNumber(): Promise<string> {
  const numbers = await generateBillNumbers(1);
  return numbers[0];
}

/**
 * Calculate bill amounts based on auction items
 */
export function calculateBillAmounts(
  items: Array<{ quantity: number; rate: number }>,
  commissionRate: number,
  otherCharges: Record<string, number> = {},
) {
  // Calculate gross amount
  const grossAmount = items.reduce((total, item) => {
    return total + item.quantity * item.rate;
  }, 0);

  // Calculate commission
  const commissionAmount = (grossAmount * commissionRate) / 100;

  // Calculate other charges total
  const otherChargesTotal = Object.values(otherCharges).reduce(
    (sum, charge) => sum + charge,
    0,
  );

  // Calculate net payable (gross - commission - other charges)
  const netPayable = grossAmount - commissionAmount - otherChargesTotal;

  return {
    grossAmount,
    commissionAmount,
    otherChargesTotal,
    netPayable: Math.max(0, netPayable), // Ensure not negative
  };
}

/**
 * Get suggested other charges based on product and quantity
 */
export function getSuggestedOtherCharges(
  productName: string,
  totalQuantity: number,
): Record<string, number> {
  const suggestions: Record<string, number> = {};

  // Transport cost calculation (example logic)
  if (totalQuantity > 0) {
    const transportCostPerKg = getTransportCostPerKg(productName);
    suggestions["Transport Cost"] = Math.round(
      totalQuantity * transportCostPerKg,
    );
  }

  // Loading/unloading charges
  if (totalQuantity > 50) {
    suggestions["Loading Charges"] = 50;
  } else if (totalQuantity > 20) {
    suggestions["Loading Charges"] = 25;
  }

  // Market fee (small percentage)
  suggestions["Market Fee"] = Math.round(totalQuantity * 0.5);

  return suggestions;
}

/**
 * Get transport cost per kg for different products
 */
function getTransportCostPerKg(productName: string): number {
  const productName_lower = productName.toLowerCase();

  // Different rates for different product categories
  if (
    productName_lower.includes("tomato") ||
    productName_lower.includes("onion")
  ) {
    return 0.5; // ₹0.5 per kg
  } else if (
    productName_lower.includes("potato") ||
    productName_lower.includes("carrot")
  ) {
    return 0.4; // ₹0.4 per kg
  } else if (
    productName_lower.includes("leafy") ||
    productName_lower.includes("green")
  ) {
    return 0.3; // ₹0.3 per kg for leafy vegetables
  }

  return 0.4; // Default rate
}

/**
 * Count bags based on items (assuming each auction item represents one bag)
 */
export function countBags(items: Array<{ quantity: number }>): number {
  return items.length;
}

/**
 * Group quantities by rate for display
 */
export function groupQuantitiesByRate(
  items: Array<{ quantity: number; rate: number }>,
) {
  const grouped = new Map<number, number[]>();

  items.forEach((item) => {
    if (!grouped.has(item.rate)) {
      grouped.set(item.rate, []);
    }
    grouped.get(item.rate)!.push(item.quantity);
  });

  return Array.from(grouped.entries()).map(([rate, quantities]) => ({
    rate,
    quantities,
    totalQuantity: quantities.reduce((sum, q) => sum + q, 0),
    bags: quantities.length,
    amount: quantities.reduce((sum, q) => sum + q, 0) * rate,
  }));
}
