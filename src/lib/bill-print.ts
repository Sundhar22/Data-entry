import { BillWithDetails } from "@/types/bill";
import { groupQuantitiesByRate } from "./bill-utils";

export interface BillPrintData {
  bill: BillWithDetails;
  rate_groups: ReturnType<typeof groupQuantitiesByRate>;
  session_date: Date;
}

/**
 * Generate HTML for bill printing
 */
export function generateBillHTML(data: BillPrintData): string {
  const { bill, rate_groups } = data;
  const sessionDate = new Date(data.session_date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const rateRows = rate_groups
    .map(
      (group) => `
    <tr>
      <td>₹${group.rate}/kg</td>
      <td>(${group.quantities.join("kg, ")}kg)</td>
      <td>${group.bags}</td>
      <td>₹${group.amount.toLocaleString("en-IN")}</td>
    </tr>
  `,
    )
    .join("");

  const otherCharges = Object.entries(bill.other_charges || {});
  const otherChargesRows = otherCharges
    .map(
      ([key, value]) => `
    <tr>
      <td colspan="3" style="text-align: right; padding-right: 20px;">${key}:</td>
      <td>₹${typeof value === "number" ? value.toLocaleString("en-IN") : value}</td>
    </tr>
  `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bill ${bill.bill_number}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.4;
          padding: 20px;
          background: white;
        }
        
        .bill-container {
          max-width: 400px;
          margin: 0 auto;
          border: 1px solid #000;
          padding: 15px;
        }
        
        .bill-header {
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 15px;
          border-bottom: 1px solid #000;
          padding-bottom: 10px;
        }
        
        .bill-info {
          margin-bottom: 15px;
          font-size: 11px;
        }
        
        .bill-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          font-size: 10px;
        }
        
        .bill-table th,
        .bill-table td {
          border: 1px solid #000;
          padding: 5px;
          text-align: center;
        }
        
        .bill-table th {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        
        .total-row {
          font-weight: bold;
          border-top: 2px solid #000;
        }
        
        .summary-table {
          width: 100%;
          margin-top: 15px;
          font-size: 11px;
        }
        
        .summary-table td {
          padding: 3px 10px;
          border: none;
        }
        
        .summary-table .amount {
          text-align: right;
          font-weight: bold;
        }
        
        .net-payable {
          border-top: 2px solid #000;
          border-bottom: 2px solid #000;
          background-color: #f9f9f9;
          font-weight: bold;
          font-size: 12px;
        }
        
        @media print {
          body {
            padding: 0;
          }
          .bill-container {
            border: 1px solid #000;
            max-width: none;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="bill-container">
        <div class="bill-header">
          FARMER BILL - ${bill.bill_number}
        </div>
        
        <div class="bill-info">
          <div><strong>Farmer:</strong> ${bill.farmer.name} | <strong>Product:</strong> ${bill.product.name} | <strong>Date:</strong> ${sessionDate}</div>
        </div>
        
        <table class="bill-table">
          <thead>
            <tr>
              <th>Rate</th>
              <th>Quantities</th>
              <th>Bags</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rateRows}
            <tr class="total-row">
              <td></td>
              <td>Total: ${bill.total_quantity}kg</td>
              <td>${rate_groups.reduce((sum, group) => sum + group.bags, 0)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <table class="summary-table">
          <tr>
            <td style="text-align: right; padding-right: 20px;">Gross Amount:</td>
            <td class="amount">₹${bill.gross_amount.toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td style="text-align: right; padding-right: 20px;">Commission ${bill.commission_rate}%:</td>
            <td class="amount">₹${bill.commission_amount.toLocaleString("en-IN")}</td>
          </tr>
          ${otherChargesRows}
          <tr class="net-payable">
            <td style="text-align: right; padding-right: 20px;">Net Payable:</td>
            <td class="amount">₹${bill.net_payable.toLocaleString("en-IN")}</td>
          </tr>
        </table>
        
        ${
          bill.payment_status === "PAID"
            ? `
          <div style="margin-top: 15px; text-align: center; font-weight: bold; color: green;">
            PAID - ${bill.payment_method} - ${bill.payment_date ? new Date(bill.payment_date).toLocaleDateString("en-IN") : ""}
          </div>
        `
            : ""
        }
        
        ${
          bill.notes
            ? `
          <div style="margin-top: 10px; font-size: 10px; border-top: 1px dashed #000; padding-top: 5px;">
            <strong>Notes:</strong> ${bill.notes}
          </div>
        `
            : ""
        }
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate text format for simple printing (thermal printer friendly)
 */
export function generateBillText(data: BillPrintData): string {
  const { bill, rate_groups } = data;
  const sessionDate = new Date(data.session_date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const centerText = (text: string, width: number = 48): string => {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return " ".repeat(padding) + text;
  };

  const rightAlign = (text: string, width: number = 48): string => {
    const padding = Math.max(0, width - text.length);
    return " ".repeat(padding) + text;
  };

  let text = "";

  // Header
  text += "================================================\n";
  text += centerText(`FARMER BILL - ${bill.bill_number}`) + "\n";
  text += "================================================\n";
  text += `Farmer: ${bill.farmer.name}\n`;
  text += `Product: ${bill.product.name} | Date: ${sessionDate}\n`;
  text += "------------------------------------------------\n";

  // Table header
  text += "Rate    | Quantities           | Bags | Amount\n";
  text += "--------|----------------------|------|--------\n";

  // Rate rows
  rate_groups.forEach((group) => {
    const quantities = `(${group.quantities.join("kg, ")}kg)`;
    const rate = `₹${group.rate}/kg`;
    const bags = group.bags.toString();
    const amount = `₹${group.amount.toLocaleString("en-IN")}`;

    text += `${rate.padEnd(7)} | ${quantities.padEnd(20)} | ${bags.padStart(4)} | ${amount.padStart(7)}\n`;
  });

  // Total row
  const totalQty = `Total: ${bill.total_quantity}kg`;
  const totalBags = rate_groups.reduce((sum, group) => sum + group.bags, 0);
  text += `        | ${totalQty.padEnd(20)} | ${totalBags.toString().padStart(4)} |\n`;
  text += "--------|----------------------|------|--------\n";

  // Summary
  text +=
    rightAlign(`Gross Amount: ₹${bill.gross_amount.toLocaleString("en-IN")}`) +
    "\n";
  text +=
    rightAlign(
      `Commission ${bill.commission_rate}%: ₹${bill.commission_amount.toLocaleString("en-IN")}`,
    ) + "\n";

  // Other charges
  Object.entries(bill.other_charges || {}).forEach(([key, value]) => {
    const amount =
      typeof value === "number" ? value.toLocaleString("en-IN") : String(value);
    text += rightAlign(`${key}: ₹${amount}`) + "\n";
  });

  text += "================================================\n";
  text +=
    rightAlign(`Net Payable: ₹${bill.net_payable.toLocaleString("en-IN")}`) +
    "\n";
  text += "================================================\n";

  // Payment status
  if (bill.payment_status === "PAID") {
    text += centerText("*** PAID ***") + "\n";
    text +=
      centerText(
        `${bill.payment_method} - ${bill.payment_date ? new Date(bill.payment_date).toLocaleDateString("en-IN") : ""}`,
      ) + "\n";
  }

  // Notes
  if (bill.notes) {
    text += "------------------------------------------------\n";
    text += `Notes: ${bill.notes}\n`;
  }

  text += "\n\n";

  return text;
}
