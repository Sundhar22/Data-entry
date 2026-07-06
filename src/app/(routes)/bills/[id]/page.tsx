"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { showToast } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobileOrTablet } from "@/hooks/useDeviceType";
import {
  ArrowLeft,
  User,
  Package,
  Calendar,
  Printer,
  Download,
  CreditCard,
  CheckCircle2,
  XCircle,
  Loader2,
  Monitor,
  Receipt,
  FileText,
} from "lucide-react";

interface BillDetails {
  id: string;
  bill_number: string;
  farmer_id: string;
  product_id: string;
  session_id: string;
  total_quantity: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  other_charges: Record<string, number>;
  net_payable: number;
  payment_status: "UNPAID" | "PAID";
  payment_method?: string;
  payment_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  farmer: {
    id: string;
    name: string;
    phone: string;
    village: string;
  };
  product: {
    id: string;
    name: string;
  };
  auction_items: Array<{
    id: string;
    quantity: number;
    rate: number;
    unit: string;
    session: {
      date: string;
    };
  }>;
  _count: {
    auction_items: number;
  };
}

export default function BillDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [bill, setBill] = useState<BillDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [markingPaid, setMarkingPaid] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const billId = params.id as string;
  const isMobileOrTablet = useIsMobileOrTablet();

  const fetchBillDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bills/${billId}?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setBill(data.data.bill);
        } else {
          console.error("Invalid response structure:", data);
          router.push("/bills");
        }
      } else {
        console.error("Failed to fetch bill details");
        router.push("/bills");
      }
    } catch (error) {
      console.error("Failed to fetch bill details:", error);
      router.push("/bills");
    } finally {
      setLoading(false);
    }
  }, [billId, router]);

  useEffect(() => {
    if (billId) {
      fetchBillDetails();
    }
  }, [billId, fetchBillDetails]);

  const handleMarkAsPaidClick = async () => {
    await handleMarkAsPaid(paymentMethod);
  };

  const handleMarkAsPaid = async (paymentMethodToUse: string) => {
    if (!bill) return;

    setMarkingPaid(true);
    try {
      const response = await fetch("/api/bills/pay-multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bill_ids: [bill.id],
          payment_method: paymentMethodToUse.trim(),
          notes: `Marked as paid via bill details page`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchBillDetails();
          showToast("Bill marked as paid successfully!");
        } else {
          console.error("Payment failed in API:", data);
          showToast(
            `Failed to mark bill as paid: ${data.message || "Unknown error"}`,
          );
        }
      } else {
        const errorData = await response.json().catch(() => null);
        const message =
          (errorData && (errorData.error?.message || errorData.message)) ||
          `HTTP ${response.status}`;
        console.error(
          "Payment request failed:",
          response.status,
          errorData || {},
        );
        showToast(`Failed to mark bill as paid: ${message}`);
      }
    } catch (error) {
      console.error("Failed to mark bill as paid:", error);
      showToast("Failed to mark bill as paid. Please try again.");
    } finally {
      setMarkingPaid(false);
    }
  };

  const handlePrint = async (format: "html" | "text" = "html") => {
    if (!bill) return;

    setPrinting(true);
    try {
      const response = await fetch(
        `/api/bills/${bill.id}/print?format=${format}`,
      );
      if (response.ok) {
        const content = await response.text();

        if (format === "html") {
          const printWindow = window.open("", "_blank");
          if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => printWindow.print(), 500);
          }
        } else {
          const blob = new Blob([content], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `bill-${bill.bill_number}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } else {
        showToast("Failed to generate print version");
      }
    } catch (error) {
      console.error("Failed to print bill:", error);
      showToast("Failed to print bill. Please try again.");
    } finally {
      setPrinting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const groupItemsByRate = (items: BillDetails["auction_items"]) => {
    const groups = new Map<
      number,
      { quantities: number[]; bags: number; amount: number }
    >();

    if (!items || !Array.isArray(items)) {
      return groups;
    }

    items.forEach((item) => {
      if (!groups.has(item.rate)) {
        groups.set(item.rate, { quantities: [], bags: 0, amount: 0 });
      }
      const group = groups.get(item.rate)!;
      group.quantities.push(item.quantity);
      group.bags += 1;
      group.amount += item.quantity * item.rate;
    });

    return Array.from(groups.entries()).map(([rate, data]) => ({
      rate: Number(rate),
      quantities: data.quantities,
      total_quantity: data.quantities.reduce((sum, q) => sum + q, 0),
      bags: data.bags,
      amount: data.amount,
    }));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-slate-600">Loading bill details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!bill) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Bill Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The bill you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <Button onClick={() => router.push("/bills")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bills
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const rateGroups = bill.auction_items
    ? groupItemsByRate(bill.auction_items)
    : [];
  const sessionDate =
    bill.auction_items && bill.auction_items.length > 0
      ? bill.auction_items[0].session?.date
      : bill.created_at;

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Top Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/bills")}
              className="flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Invoice{" "}
                <span className="text-slate-500">#{bill.bill_number}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isMobileOrTablet && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg mr-2">
                <Monitor className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">
                  Use desktop for payments
                </span>
              </div>
            )}

            {!isMobileOrTablet && (
              <>
                {bill.payment_status === "UNPAID" && (
                  <div className="flex items-center gap-2 mr-2">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="check">Check</option>
                      <option value="digital">Digital</option>
                    </select>
                    <Button
                      onClick={handleMarkAsPaidClick}
                      disabled={markingPaid}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {markingPaid ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CreditCard className="h-4 w-4 mr-2" />
                      )}
                      Mark as Paid
                    </Button>
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={() => handlePrint("html")}
                  disabled={printing}
                >
                  {printing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Printer className="h-4 w-4 mr-2" />
                  )}
                  Print
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handlePrint("text")}
                  disabled={printing}
                >
                  <Download className="h-4 w-4 mr-2" />
                  TXT
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Master Spanning Document/Card */}
        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
          <CardContent className="p-0">
            {/* INVOICE HEADER */}
            <div className="p-6 md:p-10 border-b border-slate-100 bg-slate-50/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-light text-slate-800 tracking-tight flex items-center gap-3">
                    <Receipt className="h-8 w-8 text-blue-600" />
                    Bill Overview
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                    Generated on {formatDate(bill.created_at)}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <div className="mb-2">
                    {bill.payment_status === "PAID" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1 text-sm border-0 flex items-center gap-1.5 w-fit md:ml-auto">
                        <CheckCircle2 className="h-4 w-4" /> Paid
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 px-3 py-1 text-sm border-0 flex items-center gap-1.5 w-fit md:ml-auto">
                        <XCircle className="h-4 w-4" /> Unpaid
                      </Badge>
                    )}
                  </div>
                  {bill.payment_status === "PAID" && bill.payment_date && (
                    <p className="text-sm text-slate-500">
                      Paid on {formatDate(bill.payment_date)} via{" "}
                      <span className="capitalize">{bill.payment_method}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ENTITY INFO DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 border-b border-slate-100">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-semibold border-b border-slate-100 pb-2">
                  <User className="h-4 w-4 text-slate-400" />
                  Billed To (Farmer)
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">
                    {bill.farmer?.name || "Unknown Farmer"}
                  </p>
                  <p className="text-slate-600 mt-1">
                    {bill.farmer?.village || "Unknown Village"}
                  </p>
                  <p className="text-slate-600">
                    {bill.farmer?.phone || "No Phone"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-semibold border-b border-slate-100 pb-2">
                  <Package className="h-4 w-4 text-slate-400" />
                  Produce Details
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">
                    {bill.product.name}
                  </p>
                  <p className="text-slate-600 mt-1 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Session: {formatDate(sessionDate)}
                  </p>
                  <p className="text-slate-600 mt-1">
                    Total Volume:{" "}
                    <span className="font-medium text-slate-900">
                      {bill.total_quantity} kg
                    </span>{" "}
                    (
                    {bill._count?.auction_items ||
                      bill.auction_items?.length ||
                      0}{" "}
                    items)
                  </p>
                </div>
              </div>
            </div>

            {/* SPANNING TABLE */}
            <div className="p-6 md:p-10">
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Rate (₹/kg)</th>
                      <th className="px-4 py-3 text-center">Bags</th>
                      <th className="px-4 py-3 min-w-[200px]">
                        Quantities (kg)
                      </th>
                      <th className="px-4 py-3 text-right">Total Qty (kg)</th>
                      <th className="px-4 py-3 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Array.isArray(rateGroups) &&
                      rateGroups.map((group, index) => (
                        <tr
                          key={index}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-4 py-4 font-medium text-slate-900">
                            ₹{group.rate}
                          </td>
                          <td className="px-4 py-4 text-center text-slate-600">
                            {group.bags}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            <div
                              className="max-w-[250px] truncate"
                              title={group.quantities.join(", ")}
                            >
                              {group.quantities.join(", ")}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right text-slate-700">
                            {group.total_quantity} kg
                          </td>
                          <td className="px-4 py-4 text-right font-medium text-slate-900">
                            {formatCurrency(group.amount)}
                          </td>
                        </tr>
                      ))}

                    {/* --- SPANNING SUMMARY ROWS --- */}
                    <tr className="border-t-2 border-slate-200">
                      <td
                        colSpan={3}
                        className="bg-transparent border-0 px-4 py-3 align-top text-xs text-slate-400"
                      >
                        * All monetary values are displayed in Indian Rupees
                        (INR)
                      </td>
                      <td className="px-4 py-3 text-right font-normal text-slate-600">
                        Gross Amount
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900">
                        {formatCurrency(bill.gross_amount)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        colSpan={3}
                        className="bg-transparent border-0 px-0 py-0"
                      ></td>
                      <td className="px-4 py-3 text-right font-normal text-slate-600 border-b border-slate-100">
                        Commission ({bill.commission_rate}%)
                      </td>
                      <td className="px-4 py-3 text-right text-red-600 font-medium border-b border-slate-100">
                        -{formatCurrency(bill.commission_amount)}
                      </td>
                    </tr>

                    {Object.entries(bill.other_charges || {}).map(
                      ([charge, amount]) => (
                        <tr key={charge}>
                          <td
                            colSpan={3}
                            className="bg-transparent border-0 px-0 py-0"
                          ></td>
                          <td className="px-4 py-3 text-right font-normal text-slate-600 border-b border-slate-100 capitalize">
                            {charge.replace(/_/g, " ")}
                          </td>
                          <td
                            className={`px-4 py-3 text-right font-medium border-b border-slate-100 ${amount > 0 ? "text-red-600" : "text-green-600"}`}
                          >
                            {amount > 0 ? "-" : "+"}
                            {formatCurrency(Math.abs(amount))}
                          </td>
                        </tr>
                      ),
                    )}

                    <tr className="bg-slate-50/50">
                      <td
                        colSpan={3}
                        className="bg-transparent border-0 px-0 py-0"
                      ></td>
                      <td className="px-4 py-4 text-right font-bold text-slate-900 text-base">
                        Net Payable
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-green-600 text-lg">
                        {formatCurrency(bill.net_payable)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FOOTER METADATA */}
            <div className="bg-slate-50 border-t border-slate-100 p-6 md:p-10 text-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              {bill.notes && (
                <div>
                  <h4 className="flex items-center gap-1.5 font-semibold text-slate-700 mb-2">
                    <FileText className="h-4 w-4" /> Notes & Remarks
                  </h4>
                  <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                    {bill.notes}
                  </p>
                </div>
              )}
              <div
                className={
                  bill.notes ? "md:text-right" : "md:col-span-2 md:text-right"
                }
              >
                <p className="text-slate-500 mb-1">
                  <span className="font-medium text-slate-700">Created:</span>{" "}
                  {formatDateTime(bill.created_at)}
                </p>
                {bill.updated_at !== bill.created_at && (
                  <p className="text-slate-500">
                    <span className="font-medium text-slate-700">
                      Last Modified:
                    </span>{" "}
                    {formatDateTime(bill.updated_at)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
