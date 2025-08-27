"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { showToast } from "@/components/ui/alert";
import DesktopOnly from "@/components/ui/desktop-only";
import { useDeviceType } from "@/hooks/useDeviceType";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  FileText,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Search,
  Eye,
  CreditCard,
  Package,
  Loader2,
  RefreshCw,
  Users,
  Calendar,
  Download,
} from "lucide-react";

interface Bill {
  id: string;
  bill_number: string;
  farmer_id: string;
  product_id: string;
  session_id: string;
  total_quantity: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  net_payable: number;
  payment_status: "UNPAID" | "PAID";
  payment_method?: string;
  payment_date?: string;
  created_at: string;
  farmer: {
    name: string;
    village: string;
  };
  product: {
    name: string;
  };
  _count: {
    auction_items: number;
  };
}

interface BillResponse {
  success: boolean;
  data: Bill[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface BillOverview {
  overview: {
    total_bills: number;
    paid_bills: number;
    unpaid_bills: number;
    total_billed_amount: number;
    paid_amount: number;
    unpaid_billed_amount: number;
    total_commission_earned: number;
    payment_rate: number;
    avg_bill_amount: number;
    unbilled_items_count: number;
    unbilled_estimated_value: number;
  };
}

export default function BillsPage() {
  const router = useRouter();
  const deviceType = useDeviceType();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBills, setTotalBills] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PAID" | "UNPAID">(
    "ALL",
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [markingPaid, setMarkingPaid] = useState<string | null>(null); // Track which bill is being marked as paid
  const [overview, setOverview] = useState<BillOverview | null>(null); // Bills overview including unbilled items

  // Multiple selection state
  const [selectedBills, setSelectedBills] = useState<Set<string>>(new Set());
  const [markingMultiplePaid, setMarkingMultiplePaid] = useState(false);

  // Fetch bills data
  const fetchBills = async (page = 1, search = "", status?: string) => {
    setLoading(page === 1);
    setSearchLoading(search !== "");

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sortBy: "created_at",
        ...(search && { farmer_name: search }),
        ...(status && status !== "ALL" && { payment_status: status }),
      });

      const response = await fetch(`/api/bills?${params}`);
      if (response.ok) {
        const data: BillResponse = await response.json();
        setBills(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalBills(data.meta.total);
      }
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch("/api/bills/overview");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOverview(data.data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch overview:", error);
    }
  };

  useEffect(() => {
    fetchBills();
    fetchOverview();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchBills(1, value, statusFilter === "ALL" ? undefined : statusFilter);
  };

  const handlePageChange = (page: number) => {
    fetchBills(
      page,
      searchTerm,
      statusFilter === "ALL" ? undefined : statusFilter,
    );
  };

  const handleStatusFilter = (status: "ALL" | "PAID" | "UNPAID") => {
    setStatusFilter(status);
    fetchBills(1, searchTerm, status === "ALL" ? undefined : status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
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

  const handleMarkAsPaid = async (billId: string) => {
    setMarkingPaid(billId);

    try {
      console.log("Marking bill as paid from bills list:", billId);

      const response = await fetch("/api/bills/pay-multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bill_ids: [billId],
          payment_method: "cash", // Default to cash, could be made configurable
          notes: "Marked as paid from bills list",
        }),
      });

      console.log("Payment response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Payment response data:", data);

        if (data.success) {
          console.log("Payment successful, refreshing bills list...");
          // Refresh the bills list to show updated status
          await fetchBills(
            currentPage,
            searchTerm,
            statusFilter === "ALL" ? undefined : statusFilter,
          );
          showToast("Bill marked as paid successfully!");
        } else {
          console.error("Payment failed in API:", data);
          showToast(`Failed to mark bill as paid: ${data.message || "Unknown error"}`);
        }
      } else {
        const errorData = await response.json().catch(() => null);
        const message =
          (errorData && (errorData.error?.message || errorData.message)) ||
          `HTTP ${response.status}`;
        console.error("Payment request failed:", response.status, errorData || {});
        showToast(`Failed to mark bill as paid: ${message}`);
      }
    } catch (error) {
      console.error("Failed to mark bill as paid:", error);
      showToast("Failed to mark bill as paid. Please try again.");
    } finally {
      setMarkingPaid(null);
    }
  };

  // Multiple bill selection handlers
  const handleBillSelection = (billId: string, checked: boolean) => {
    const newSelected = new Set(selectedBills);
    if (checked) {
      newSelected.add(billId);
    } else {
      newSelected.delete(billId);
    }
    setSelectedBills(newSelected);
  };

  const handleSelectAll = () => {
    const unpaidBills = bills.filter(
      (bill) => bill.payment_status === "UNPAID",
    );
    if (selectedBills.size === unpaidBills.length) {
      // Unselect all
      setSelectedBills(new Set());
    } else {
      // Select all unpaid bills
      setSelectedBills(new Set(unpaidBills.map((bill) => bill.id)));
    }
  };

  const handleMarkMultiplePaid = async () => {
    if (selectedBills.size === 0) {
      showToast("Please select bills to mark as paid");
      return;
    }

    setMarkingMultiplePaid(true);

    try {
      console.log("Marking multiple bills as paid:", Array.from(selectedBills));

      const response = await fetch("/api/bills/pay-multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bill_ids: Array.from(selectedBills),
          payment_method: "cash",
          notes: "Multiple bills marked as paid from bills list",
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          console.log("Multiple payment successful, refreshing bills list...");
          // Clear selection and refresh
          setSelectedBills(new Set());
          await fetchBills(
            currentPage,
            searchTerm,
            statusFilter === "ALL" ? undefined : statusFilter,
          );
          showToast(`${selectedBills.size} bills marked as paid successfully!`);
        } else {
          console.error("Multiple payment failed in API:", data);
          showToast(`Failed to mark bills as paid: ${data.message || "Unknown error"}`);
        }
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        console.error(
          "Multiple payment request failed:",
          response.status,
          errorData,
        );
        showToast(`Failed to mark bills as paid: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to mark multiple bills as paid:", error);
      showToast("Failed to mark bills as paid. Please try again.");
    } finally {
      setMarkingMultiplePaid(false);
    }
  };

  const totalPaidAmount = bills
    .filter((b) => b.payment_status === "PAID")
    .reduce((sum, b) => sum + b.net_payable, 0);
  const totalUnpaidAmount = bills
    .filter((b) => b.payment_status === "UNPAID")
    .reduce((sum, b) => sum + b.net_payable, 0);
  const totalCommission = bills.reduce(
    (sum, b) => sum + b.commission_amount,
    0,
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 min-w-0 overflow-x-hidden">
        {/* Header - Mobile responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
              Bills & Payments
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage farmer bills and payment tracking
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <DesktopOnly message="Bill generation requires desktop access for accurate data entry and management.">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-2"
                onClick={() => router.push("/bills/preview")}
              >
                <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Generate Bills</span>
                <span className="sm:hidden">Generate</span>
              </Button>
            </DesktopOnly>
            <Button
              variant="outline"
              className="text-sm px-3 py-2"
              onClick={() => router.push("/bills/payments")}
            >
              <CreditCard className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Payments</span>
              <span className="sm:hidden">Pay</span>
            </Button>
          </div>
        </div>

        {/* Mobile Info Banner */}
        {(deviceType === "mobile" || deviceType === "tablet") && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">
                    Mobile/Tablet Access
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    You can view bills and select them on mobile, but bill
                    generation and payment processing require desktop access for
                    security and accuracy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {overview?.overview?.total_bills || totalBills}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  overview?.overview?.paid_amount || totalPaidAmount,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {overview?.overview?.paid_bills ||
                  bills.filter((b) => b.payment_status === "PAID").length}{" "}
                bills paid
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Amount
              </CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(
                  overview?.overview?.unpaid_billed_amount || totalUnpaidAmount,
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {overview?.overview?.unpaid_bills ||
                  bills.filter((b) => b.payment_status === "UNPAID")
                    .length}{" "}
                bills pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commission Earned
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(
                  overview?.overview?.total_commission_earned ||
                  totalCommission,
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-300 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">
                Items Not Billed
              </CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {overview?.overview?.unbilled_items_count || 0}
              </div>
              <p className="text-xs text-orange-700">
                Worth{" "}
                {formatCurrency(
                  overview?.overview?.unbilled_estimated_value || 0,
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters - Mobile responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Button
              variant={statusFilter === "ALL" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleStatusFilter("ALL")}
            >
              All Bills
            </Button>
            <Button
              variant={statusFilter === "PAID" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleStatusFilter("PAID")}
            >
              Paid
            </Button>
            <Button
              variant={statusFilter === "UNPAID" ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => handleStatusFilter("UNPAID")}
            >
              Unpaid
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search farmer..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                className="pl-10 w-full sm:w-64"
              />
              {searchLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={() =>
                fetchBills(
                  currentPage,
                  searchTerm,
                  statusFilter === "ALL" ? undefined : statusFilter,
                )
              }
            >
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Bulk Actions - Show only when there are unpaid bills */}
        {bills.some((bill) => bill.payment_status === "UNPAID") && (
          <Card className="bg-slate-50">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="select-all"
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={
                        selectedBills.size > 0 &&
                        selectedBills.size ===
                        bills.filter((b) => b.payment_status === "UNPAID")
                          .length
                      }
                      onChange={handleSelectAll}
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm font-medium text-slate-700"
                    >
                      <span className="hidden sm:inline">
                        Select All Unpaid (
                        {
                          bills.filter((b) => b.payment_status === "UNPAID")
                            .length
                        }
                        )
                      </span>
                      <span className="sm:hidden">
                        All (
                        {
                          bills.filter((b) => b.payment_status === "UNPAID")
                            .length
                        }
                        )
                      </span>
                    </label>
                  </div>
                  {selectedBills.size > 0 && (
                    <div className="text-sm text-slate-600">
                      {selectedBills.size} bill
                      {selectedBills.size > 1 ? "s" : ""} selected
                    </div>
                  )}
                </div>

                {selectedBills.size > 0 && (
                  <DesktopOnly message="Payment processing requires desktop access for secure transactions.">
                    <Button
                      onClick={handleMarkMultiplePaid}
                      disabled={markingMultiplePaid}
                      className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-sm"
                    >
                      {markingMultiplePaid ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">
                            Mark {selectedBills.size} Bill
                            {selectedBills.size > 1 ? "s" : ""} as Paid
                          </span>
                          <span className="sm:hidden">
                            Pay {selectedBills.size} Bill
                            {selectedBills.size > 1 ? "s" : ""}
                          </span>
                        </>
                      )}
                    </Button>
                  </DesktopOnly>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bills List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Bills List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading bills...</span>
              </div>
            ) : bills.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                {searchTerm || statusFilter !== "ALL"
                  ? "No bills found matching your criteria."
                  : "No bills found. Generate your first bill to get started."}
              </div>
            ) : (
              <div className="space-y-0">
                {bills.map((bill, index) => (
                  <div key={bill.id}>
                    <div className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          {/* Checkbox for unpaid bills only */}
                          {bill.payment_status === "UNPAID" && (
                            <div className="pt-2 flex-shrink-0">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                checked={selectedBills.has(bill.id)}
                                onChange={(e) =>
                                  handleBillSelection(bill.id, e.target.checked)
                                }
                              />
                            </div>
                          )}
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${bill.payment_status === "PAID"
                              ? "bg-green-100"
                              : "bg-red-100"
                              }`}
                          >
                            {bill.payment_status === "PAID" ? (
                              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            )}
                          </div>
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h3 className="font-semibold text-base sm:text-lg text-slate-900 truncate">
                                {bill.bill_number}
                              </h3>
                              {getPaymentStatusBadge(bill.payment_status)}
                            </div>

                            {/* Mobile: Stack vertically, Desktop: Horizontal */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {bill.farmer.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Package className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {bill.product.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span>{formatDate(bill.created_at)}</span>
                              </div>
                            </div>

                            {/* Amount details - Stack on mobile */}
                            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-6 text-sm">
                              <div>
                                <span className="text-slate-500">Gross: </span>
                                <span className="font-medium">
                                  {formatCurrency(bill.gross_amount)}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">
                                  Commission:{" "}
                                </span>
                                <span className="font-medium text-blue-600">
                                  {formatCurrency(bill.commission_amount)}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">Net: </span>
                                <span className="font-semibold text-green-600">
                                  {formatCurrency(bill.net_payable)}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">Items: </span>
                                <span className="font-medium">
                                  {bill._count.auction_items}
                                </span>
                              </div>
                            </div>
                            {bill.payment_date && (
                              <div className="text-xs text-green-600">
                                Paid on {formatDate(bill.payment_date)} via{" "}
                                {bill.payment_method}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons - Stack on mobile */}
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                          {bill.payment_status === "UNPAID" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-xs sm:text-sm"
                              onClick={() => handleMarkAsPaid(bill.id)}
                              disabled={markingPaid === bill.id}
                            >
                              {markingPaid === bill.id ? (
                                <>
                                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                                  <span className="hidden sm:inline">
                                    Processing...
                                  </span>
                                  <span className="sm:hidden">...</span>
                                </>
                              ) : (
                                <>
                                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="hidden sm:inline">
                                    Mark Paid
                                  </span>
                                  <span className="sm:hidden">Pay</span>
                                </>
                              )}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto text-xs sm:text-sm"
                            onClick={() => router.push(`/bills/${bill.id}`)}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto text-xs sm:text-sm"
                          >
                            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Print</span>
                            <span className="sm:hidden">PDF</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < bills.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination - Mobile responsive */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600">
              Showing {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(currentPage * 10, totalBills)} of {totalBills} bills
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:space-x-2 overflow-x-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-xs px-2 py-1 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              {/* Show limited page numbers on mobile */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return pageNum;
              }).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-6 h-6 sm:w-8 sm:h-8 text-xs p-0"
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-xs px-2 py-1 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
