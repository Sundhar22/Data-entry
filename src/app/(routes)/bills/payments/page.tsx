"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { useDeviceType } from "@/hooks/useDeviceType";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  CreditCard,
  XCircle,
  Clock,
  Filter,
  DollarSign,
  Users,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface Bill {
  id: string;
  bill_number: string;
  farmer_id: string;
  farmer_name: string;
  farmer_village: string;
  product_name: string;
  session_date: string;
  bill_date: string;
  total_amount: number;
  net_payable: number;
  payment_status: "PAID" | "UNPAID" | "PARTIAL";
  payment_date?: string;
  payment_method?: string;
  days_since_bill: number;
}

interface PaymentSummary {
  total_unpaid_bills: number;
  total_unpaid_amount: number;
  oldest_unpaid_days: number;
  farmers_with_unpaid: number;
}

export default function BillPaymentsPage() {
  const deviceType = useDeviceType();
  const [bills, setBills] = useState<Bill[]>([]);
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedBills, setSelectedBills] = useState<Set<string>>(new Set());
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(
    null,
  );

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "UNPAID" | "PAID" | "PARTIAL"
  >("UNPAID");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [notes, setNotes] = useState<string>("");

  // Fetch bills data
  const fetchBills = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bills?limit=100");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setBills(data.data);

          // Calculate payment summary
          const unpaidBills = data.data.filter(
            (bill: Bill) => bill.payment_status === "UNPAID",
          );
          const summary: PaymentSummary = {
            total_unpaid_bills: unpaidBills.length,
            total_unpaid_amount: unpaidBills.reduce(
              (sum: number, bill: Bill) => sum + bill.net_payable,
              0,
            ),
            oldest_unpaid_days: Math.max(
              ...unpaidBills.map((bill: Bill) => bill.days_since_bill),
              0,
            ),
            farmers_with_unpaid: new Set(
              unpaidBills.map((bill: Bill) => bill.farmer_id),
            ).size,
          };
          setPaymentSummary(summary);
        }
      }
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  // Apply filters
  useEffect(() => {
    const filtered = bills.filter((bill) => {
      // Status filter
      if (statusFilter !== "all" && bill.payment_status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (
          !bill.farmer_name.toLowerCase().includes(searchLower) &&
          !bill.farmer_village.toLowerCase().includes(searchLower) &&
          !bill.bill_number.toLowerCase().includes(searchLower) &&
          !bill.product_name.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Age filter
      if (ageFilter !== "all") {
        const days = bill.days_since_bill;
        switch (ageFilter) {
          case "0-7":
            return days <= 7;
          case "8-30":
            return days > 7 && days <= 30;
          case "31-60":
            return days > 30 && days <= 60;
          case "60+":
            return days > 60;
          default:
            return true;
        }
      }

      return true;
    });

    setFilteredBills(filtered);
  }, [bills, searchTerm, statusFilter, ageFilter]);

  const handleBillSelection = (billId: string, checked: boolean) => {
    const newSelected = new Set(selectedBills);
    if (checked) {
      newSelected.add(billId);
    } else {
      newSelected.delete(billId);
    }
    setSelectedBills(newSelected);
  };

  const selectAllVisible = () => {
    const visibleUnpaidBills = filteredBills.filter(
      (bill) => bill.payment_status === "UNPAID",
    );
    setSelectedBills(new Set(visibleUnpaidBills.map((bill) => bill.id)));
  };

  const clearSelection = () => {
    setSelectedBills(new Set());
  };

  const processPayments = async () => {
    if (selectedBills.size === 0) return;

    setProcessing(true);
    try {
      const billIds = Array.from(selectedBills);
      const response = await fetch("/api/bills/pay-multiple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bill_ids: billIds,
          payment_method: paymentMethod,
          notes: notes || undefined,
          payment_date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert(
            `Successfully processed payment for ${data.data.updated_bills.length} bills!`,
          );
          // Refresh bills data
          fetchBills();
          // Clear selection
          setSelectedBills(new Set());
          setNotes("");
        } else {
          alert(
            "Some payments could not be processed. Please check for errors.",
          );
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to process payments: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to process payments:", error);
      alert("Failed to process payments. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
      case "unpaid":
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAgeBadge = (days: number) => {
    if (days <= 7) {
      return <Badge className="bg-green-100 text-green-800">{days}d</Badge>;
    } else if (days <= 30) {
      return <Badge className="bg-yellow-100 text-yellow-800">{days}d</Badge>;
    } else if (days <= 60) {
      return <Badge className="bg-orange-100 text-orange-800">{days}d</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">{days}d</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 min-w-0 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Payment Management
            </h1>
            <p className="text-slate-600 mt-1">
              Manage bill payments and track outstanding amounts
            </p>
          </div>
        </div>

        {/* Mobile Info Banner */}
        {(deviceType === "mobile" || deviceType === "tablet") && (
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 rounded-full p-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-orange-900">
                    Payment Processing Restricted
                  </h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Payment operations require desktop access for security. You
                    can view payment information on mobile, but actual payment
                    processing is desktop-only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards */}
        {paymentSummary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <XCircle className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Unpaid Bills
                    </p>
                    <p className="text-2xl font-bold">
                      {paymentSummary.total_unpaid_bills}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Outstanding Amount
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(paymentSummary.total_unpaid_amount)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Oldest Unpaid
                    </p>
                    <p className="text-2xl font-bold">
                      {paymentSummary.oldest_unpaid_days}d
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Farmers with Dues
                    </p>
                    <p className="text-2xl font-bold">
                      {paymentSummary.farmers_with_unpaid}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search farmers, bills..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Status</Label>
                <select
                  value={statusFilter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatusFilter(
                      e.target.value as "all" | "UNPAID" | "PAID" | "PARTIAL",
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="UNPAID">Unpaid</option>
                  <option value="PAID">Paid</option>
                  <option value="PARTIAL">Partial</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Bill Age</Label>
                <select
                  value={ageFilter}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setAgeFilter(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="all">All Ages</option>
                  <option value="0-7">0-7 days</option>
                  <option value="8-30">8-30 days</option>
                  <option value="31-60">31-60 days</option>
                  <option value="60+">60+ days</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Show</Label>
                <div className="text-sm text-gray-600 pt-2">
                  {filteredBills.length} of {bills.length} bills
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Payment Actions */}
        {selectedBills.size > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">
                    {selectedBills.size} bills selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllVisible}
                  >
                    Select All Visible
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Payment Method</Label>
                    <select
                      value={paymentMethod}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setPaymentMethod(e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    >
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="cheque">Cheque</option>
                      <option value="digital">Digital Payment</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Notes</Label>
                    <Input
                      placeholder="Payment notes..."
                      value={notes}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNotes(e.target.value)
                      }
                      className="w-40 text-sm"
                    />
                  </div>

                  <Button
                    onClick={processPayments}
                    disabled={processing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {processing ? (
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
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bills List */}
        <Card>
          <CardHeader>
            <CardTitle>Bills ({filteredBills.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBills.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Bills Found
                </h3>
                <p className="text-gray-500">
                  No bills match the current filters.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">
                        <input
                          type="checkbox"
                          checked={
                            filteredBills.filter(
                              (bill) => bill.payment_status === "UNPAID",
                            ).length > 0 &&
                            filteredBills
                              .filter(
                                (bill) => bill.payment_status === "UNPAID",
                              )
                              .every((bill) => selectedBills.has(bill.id))
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            if (e.target.checked) {
                              selectAllVisible();
                            } else {
                              clearSelection();
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        />
                      </th>
                      <th className="text-left p-3 font-medium">Bill</th>
                      <th className="text-left p-3 font-medium">Farmer</th>
                      <th className="text-left p-3 font-medium">Product</th>
                      <th className="text-left p-3 font-medium">Amount</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Age</th>
                      <th className="text-left p-3 font-medium">
                        Payment Info
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.map((bill) => (
                      <tr key={bill.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          {bill.payment_status === "UNPAID" && (
                            <input
                              type="checkbox"
                              checked={selectedBills.has(bill.id)}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) =>
                                handleBillSelection(bill.id, e.target.checked)
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                            />
                          )}
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium">
                              {bill.bill_number}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(bill.bill_date)}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium">
                              {bill.farmer_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {bill.farmer_village}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{bill.product_name}</td>
                        <td className="p-3">
                          <div>
                            <div className="font-medium">
                              {formatCurrency(bill.net_payable)}
                            </div>
                            {bill.net_payable !== bill.total_amount && (
                              <div className="text-sm text-gray-500">
                                Gross: {formatCurrency(bill.total_amount)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          {getStatusBadge(bill.payment_status)}
                        </td>
                        <td className="p-3">
                          {getAgeBadge(bill.days_since_bill)}
                        </td>
                        <td className="p-3">
                          {bill.payment_status === "PAID" &&
                          bill.payment_date ? (
                            <div>
                              <div className="text-sm font-medium">
                                {bill.payment_method}
                              </div>
                              <div className="text-sm text-gray-500">
                                {formatDate(bill.payment_date)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
