import { describe, it, expect } from "vitest";
import {
  calculateBillAmounts,
  groupQuantitiesByRate,
  countBags,
} from "@/lib/bill-utils";

describe("bill-utils", () => {
  it("calculateBillAmounts computes amounts correctly", () => {
    const items = [
      { quantity: 10, rate: 50 }, // 500
      { quantity: 5, rate: 100 }, // 500
    ];
    const commissionRate = 5; // 5%
    const otherCharges = { Transport: 50, Market: 25 }; // 75

    const result = calculateBillAmounts(items, commissionRate, otherCharges);
    expect(result.grossAmount).toBe(1000);
    expect(Math.round(result.commissionAmount)).toBe(50);
    expect(result.otherChargesTotal).toBe(75);
    expect(Math.round(result.netPayable)).toBe(875);
  });

  it("groupQuantitiesByRate groups and totals correctly", () => {
    const items = [
      { quantity: 10, rate: 50 },
      { quantity: 5, rate: 50 },
      { quantity: 2, rate: 100 },
    ];
    const grouped = groupQuantitiesByRate(items);
    const byRate = new Map(grouped.map((g) => [g.rate, g]));
    expect(byRate.get(50)?.totalQuantity).toBe(15);
    expect(byRate.get(50)?.bags).toBe(2);
    expect(byRate.get(50)?.amount).toBe(15 * 50);
    expect(byRate.get(100)?.totalQuantity).toBe(2);
  });

  it("countBags returns number of items", () => {
    expect(countBags([{ quantity: 1 }, { quantity: 2 }])).toBe(2);
  });
});
