"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useIsMobileOrTablet } from "@/hooks/useDeviceType";
import {
  ArrowLeft,
  FileText,
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
      // Add timestamp to prevent caching
      const response = await fetch(`/api/bills/${billId}?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setBill(data.data.bill); // The actual bill is nested under data.bill
          console.log(
            "Bill refreshed, payment status:",
            data.data.bill.payment_status,
          );
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
      console.log(
        "Marking bill as paid:",
        bill.id,
        "Method:",
        paymentMethodToUse,
      );

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

      console.log("Payment response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Payment response data:", data);

        if (data.success) {
          console.log("Payment successful, refreshing bill data...");
          await fetchBillDetails(); // Refresh the bill data
          alert("Bill marked as paid successfully!");
        } else {
          console.error("Payment failed in API:", data);
          alert(
            `Failed to mark bill as paid: ${data.message || "Unknown error"}`,
          );
        }
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        console.error("Payment request failed:", response.status, errorData);
        alert(`Failed to mark bill as paid: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to mark bill as paid:", error);
      alert("Failed to mark bill as paid. Please try again.");
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
          // Open in new window for printing
          const printWindow = window.open("", "_blank");
          if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.focus();
            // Auto-print after a short delay
            setTimeout(() => printWindow.print(), 500);
          }
        } else {
          // For text format, create a download
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
        alert("Failed to generate print version");
      }
    } catch (error) {
      console.error("Failed to print bill:", error);
      alert("Failed to print bill. Please try again.");
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "UNPAID":
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Group items by rate for better display
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
      group.bags += 1; // Assuming each item is one bag
      group.amount += item.quantity * item.rate;
    });

    return Array.from(groups.entries()).map(([rate, data]) => ({
      rate,
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
      <div className="space-y-6">
        {/* Header */}
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
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Bill {bill.bill_number}
              </h1>
              <p className="text-slate-600 mt-1">Detailed view and actions</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile/tablet notice */}
            {isMobileOrTablet && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg mr-2">
                <Monitor className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-blue-600 font-medium">
                  Some actions require desktop
                </span>
              </div>
            )}

            {/* Desktop-only actions */}
            {!isMobileOrTablet && (
              <>
                {bill.payment_status === "UNPAID" && (
                  <div className="flex items-center gap-4">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1"
                    >
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="check">Check</option>
                      <option value="digital">Digital Payment</option>
                    </select>
                    <Button
                      onClick={handleMarkAsPaidClick}
                      disabled={markingPaid}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {markingPaid ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Mark as Paid
                        </>
                      )}
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
                  Download
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Bill Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    bill.payment_status === "PAID"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {bill.payment_status === "PAID" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-semibold">Bill Status</h2>
                    {getPaymentStatusBadge(bill.payment_status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {bill.payment_status === "PAID" && bill.payment_date
                      ? `Paid on ${formatDate(bill.payment_date)} via ${bill.payment_method}`
                      : "Payment pending"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(bill.net_payable)}
                </div>
                <div className="text-sm text-gray-500">Net Payable</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Farmer & Product Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Farmer & Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Farmer
                </Label>
                <p className="font-semibold">
                  {bill.farmer?.name || "Unknown Farmer"}
                </p>
                <p className="text-sm text-gray-500">
                  {bill.farmer?.village || "Unknown Village"} •{" "}
                  {bill.farmer?.phone || "No Phone"}
                </p>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Product
                </Label>
                <p className="font-semibold">{bill.product.name}</p>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Session Date
                </Label>
                <p className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(sessionDate)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bill Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Total Quantity
                  </Label>
                  <p className="font-semibold">{bill.total_quantity} kg</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Total Items
                  </Label>
                  <p className="font-semibold">
                    {bill._count?.auction_items ||
                      bill.auction_items?.length ||
                      0}{" "}
                    items
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Amount:</span>
                  <span className="font-medium">
                    {formatCurrency(bill.gross_amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Commission ({bill.commission_rate}%):
                  </span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(bill.commission_amount)}
                  </span>
                </div>
                {Object.entries(bill.other_charges || {}).map(
                  ([charge, amount]) => (
                    <div key={charge} className="flex justify-between">
                      <span className="text-gray-600">{charge}:</span>
                      <span
                        className={`font-medium ${amount >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {amount >= 0 ? "+" : ""}
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  ),
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Net Payable:</span>
                  <span className="text-green-600">
                    {formatCurrency(bill.net_payable)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Item Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Item Details ({bill.auction_items.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(rateGroups) &&
                rateGroups.map(
                  (
                    group: {
                      rate: number;
                      quantities: number[];
                      total_quantity: number;
                      bags: number;
                      amount: number;
                    },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-medium">
                            Rate: ₹{group.rate}/kg
                          </h4>
                          <p className="text-sm text-gray-500">
                            {group.bags} bags
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(group.amount)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {group.total_quantity} kg total
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">
                          <strong>Quantities:</strong>{" "}
                          {group.quantities.join(" kg, ")} kg
                        </p>
                      </div>
                    </div>
                  ),
                )}
            </div>
          </CardContent>
        </Card>

        {/* Notes & Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes */}
          {bill.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {bill.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timestamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Created
                </Label>
                <p className="font-medium">{formatDateTime(bill.created_at)}</p>
              </div>
              {bill.updated_at !== bill.created_at && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Last Updated
                  </Label>
                  <p className="font-medium">
                    {formatDateTime(bill.updated_at)}
                  </p>
                </div>
              )}
              {bill.payment_date && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Payment Date
                  </Label>
                  <p className="font-medium">
                    {formatDateTime(bill.payment_date)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
