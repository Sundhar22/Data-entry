"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useIsMobileOrTablet } from "@/hooks/useDeviceType";
import {
  BarChart3,
  TrendingUp,
  IndianRupee,
  Users,
  Package,
  FileText,
  Loader2,
  Download,
  RefreshCw,
  AlertTriangle,
  Target,
  DollarSign,
  Clock,
} from "lucide-react";

interface BillAnalytics {
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
  trends: {
    bills_last_30_days: Array<{
      date: string;
      bills_count: number;
      total_amount: number;
    }>;
    payment_trends: Array<{
      date: string;
      paid_count: number;
      paid_amount: number;
    }>;
  };
  top_farmers: Array<{
    farmer_id: string;
    farmer_name: string;
    farmer_village: string;
    total_bills: number;
    total_amount: number;
    unpaid_amount: number;
    avg_bill_amount: number;
  }>;
  top_products: Array<{
    product_id: string;
    product_name: string;
    total_bills: number;
    total_quantity: number;
    total_amount: number;
    avg_rate: number;
  }>;
  payment_methods: Array<{
    method: string;
    count: number;
    amount: number;
    percentage: number;
  }>;
  aging_analysis: {
    current_week: { count: number; amount: number };
    week_1_to_2: { count: number; amount: number };
    week_2_to_4: { count: number; amount: number };
    over_month: { count: number; amount: number };
  };
}

export default function BillAnalyticsPage() {
  const [analytics, setAnalytics] = useState<BillAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("current_month");
  const [refreshing, setRefreshing] = useState(false);

  const isMobileOrTablet = useIsMobileOrTablet();

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/bills/overview?period=${selectedPeriod}`,
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnalytics({
            overview: data.data.overview,
            trends: {
              bills_last_30_days: data.data.trends?.bills || [],
              payment_trends: data.data.trends?.payments || [],
            },
            top_farmers: data.data.top_farmers || [],
            top_products: data.data.top_products || [],
            payment_methods: data.data.payment_methods || [],
            aging_analysis: data.data.aging_analysis || {
              current_week: { count: 0, amount: 0 },
              week_1_to_2: { count: 0, amount: 0 },
              week_2_to_4: { count: 0, amount: 0 },
              over_month: { count: 0, amount: 0 },
            },
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const exportData = () => {
    if (!analytics) {
      return;
    }

    const data = {
      overview: analytics.overview,
      top_farmers: analytics.top_farmers,
      top_products: analytics.top_products,
      payment_methods: analytics.payment_methods,
      aging_analysis: analytics.aging_analysis,
      generated_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bill-analytics-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading && !analytics) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-slate-600">Loading analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Bill Analytics
            </h1>
            <p className="text-slate-600 mt-1">
              Comprehensive billing insights and reports
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <div className="flex items-center gap-2">
              <Label htmlFor="period" className="text-sm">
                Period:
              </Label>
              <select
                id="period"
                value={selectedPeriod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedPeriod(e.target.value)
                }
                className="w-[140px] px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="current_week">This Week</option>
                <option value="current_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="last_3_months">Last 3 Months</option>
                <option value="current_year">This Year</option>
              </select>
            </div>

            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>

            {!isMobileOrTablet && (
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>

        {analytics ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {analytics.overview.total_bills}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Bills
                      </p>
                      <p className="text-xs text-green-600">
                        Avg:{" "}
                        {formatCurrency(analytics.overview.avg_bill_amount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(analytics.overview.total_billed_amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Billed
                      </p>
                      <p className="text-xs text-blue-600">
                        Commission:{" "}
                        {formatCurrency(
                          analytics.overview.total_commission_earned,
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatPercentage(analytics.overview.payment_rate)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Payment Rate
                      </p>
                      <p className="text-xs text-gray-600">
                        {analytics.overview.paid_bills}/
                        {analytics.overview.total_bills} paid
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-xl font-bold text-orange-600">
                        {formatCurrency(
                          analytics.overview.unpaid_billed_amount,
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Outstanding
                      </p>
                      <p className="text-xs text-red-600">
                        {analytics.overview.unpaid_bills} bills pending
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Unbilled Items Alert */}
            {analytics.overview.unbilled_items_count > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="h-6 w-6 text-orange-600" />
                      <div>
                        <h3 className="font-semibold text-orange-900">
                          Items Not Yet Billed
                        </h3>
                        <p className="text-sm text-orange-700">
                          {analytics.overview.unbilled_items_count} items worth
                          approximately{" "}
                          <span className="font-semibold">
                            {formatCurrency(
                              analytics.overview.unbilled_estimated_value,
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    {!isMobileOrTablet && (
                      <Button
                        variant="outline"
                        className="text-orange-700 border-orange-300"
                        onClick={() => window.open("/bills/preview", "_blank")}
                      >
                        Generate Bills
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Farmers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Top Farmers by Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.top_farmers.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.top_farmers
                        .slice(0, 5)
                        .map((farmer, index) => (
                          <div
                            key={farmer.farmer_id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : index === 1
                                      ? "bg-gray-100 text-gray-800"
                                      : index === 2
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {farmer.farmer_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {farmer.farmer_village} • {farmer.total_bills}{" "}
                                  bills
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">
                                {formatCurrency(farmer.total_amount)}
                              </p>
                              {farmer.unpaid_amount > 0 && (
                                <p className="text-xs text-red-600">
                                  -{formatCurrency(farmer.unpaid_amount)}{" "}
                                  pending
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No farmer data available
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Top Products by Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.top_products.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.top_products
                        .slice(0, 5)
                        .map((product, index) => (
                          <div
                            key={product.product_id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : index === 1
                                      ? "bg-gray-100 text-gray-800"
                                      : index === 2
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {product.product_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {product.total_bills} bills •{" "}
                                  {product.total_quantity} kg
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-blue-600">
                                {formatCurrency(product.total_amount)}
                              </p>
                              <p className="text-xs text-gray-600">
                                ₹{product.avg_rate}/kg avg
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No product data available
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.payment_methods.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.payment_methods.map((method) => (
                        <div
                          key={method.method}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.method}
                            </p>
                            <p className="text-xs text-gray-500">
                              {method.count} transactions
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">
                              {formatCurrency(method.amount)}
                            </p>
                            <p className="text-xs text-blue-600">
                              {formatPercentage(method.percentage)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No payment method data available
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Aging Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Unpaid Bills Aging
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Current Week",
                        data: analytics.aging_analysis.current_week,
                        color: "green",
                      },
                      {
                        label: "1-2 Weeks",
                        data: analytics.aging_analysis.week_1_to_2,
                        color: "yellow",
                      },
                      {
                        label: "2-4 Weeks",
                        data: analytics.aging_analysis.week_2_to_4,
                        color: "orange",
                      },
                      {
                        label: "Over a Month",
                        data: analytics.aging_analysis.over_month,
                        color: "red",
                      },
                    ].map(({ label, data, color }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full bg-${color}-500`}
                          />
                          <div>
                            <p className="font-medium text-gray-900">{label}</p>
                            <p className="text-xs text-gray-500">
                              {data.count} bills
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${color === "green"
                                ? "text-green-600"
                                : color === "yellow"
                                  ? "text-yellow-600"
                                  : color === "orange"
                                    ? "text-orange-600"
                                    : "text-red-600"
                              }`}
                          >
                            {formatCurrency(data.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-green-900">
                        Revenue Performance
                      </p>
                      <p className="text-sm text-green-700">
                        {formatPercentage(analytics.overview.payment_rate)}{" "}
                        collection rate
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-700">Collected:</span>
                      <span className="font-semibold text-green-900">
                        {formatCurrency(analytics.overview.paid_amount)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-blue-900">
                        Commission Earned
                      </p>
                      <p className="text-sm text-blue-700">
                        From {analytics.overview.total_bills} bills
                      </p>
                    </div>
                    <IndianRupee className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-700">Total:</span>
                      <span className="font-semibold text-blue-900">
                        {formatCurrency(
                          analytics.overview.total_commission_earned,
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-orange-900">
                        Outstanding Amount
                      </p>
                      <p className="text-sm text-orange-700">
                        {analytics.overview.unpaid_bills} unpaid bills
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-700">Pending:</span>
                      <span className="font-semibold text-orange-900">
                        {formatCurrency(
                          analytics.overview.unpaid_billed_amount,
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Analytics Data
            </h3>
            <p className="text-gray-500">
              No billing data available for analysis.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
