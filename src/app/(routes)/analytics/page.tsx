"use client";

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import DesktopOnly from '@/components/ui/desktop-only';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  BarChart3,
  Users,
  IndianRupee,
  Calendar,
  FileText,
  Activity,
  Loader2,
  RefreshCw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface AnalyticsData {
  totalSessions: number;
  activeSessions: number;
  totalFarmers: number;
  totalBuyers: number;
  totalProducts: number;
  totalBills: number;
  totalRevenue: number;
  totalCommission: number;
  paidBills: number;
  unpaidBills: number;
}

interface BillStats {
  overview: {
    total_bills: number;
    paid_bills: number;
    unpaid_bills: number;
    total_amount: number;
    paid_amount: number;
    unpaid_amount: number;
    commission_amount: number;
    gross_amount: number;
    avg_bill_amount: number;
    payment_rate: number;
  };
  top_farmers: Array<{
    name: string;
    village: string;
    bills_count: number;
    total_amount: number;
  }>;
  top_products: Array<{
    name: string;
    bills_count: number;
    total_amount: number;
    total_quantity: number;
  }>;
  payment_methods: Array<{
    method: string;
    bills_count: number;
    total_amount: number;
  }>;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalSessions: 0,
    activeSessions: 0,
    totalFarmers: 0,
    totalBuyers: 0,
    totalProducts: 0,
    totalBills: 0,
    totalRevenue: 0,
    totalCommission: 0,
    paidBills: 0,
    unpaidBills: 0,
  });
  const [billStats, setBillStats] = useState<BillStats | null>(null);

  // Fetch analytics data from multiple endpoints
  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    try {
      // Get date range based on selection
      const endDate = new Date().toISOString();
      const startDate = new Date();

      if (dateRange === '7days') {
        startDate.setDate(startDate.getDate() - 7);
      } else if (dateRange === '30days') {
        startDate.setDate(startDate.getDate() - 30);
      } else if (dateRange === '90days') {
        startDate.setDate(startDate.getDate() - 90);
      } else if (dateRange === 'year') {
        startDate.setFullYear(startDate.getFullYear() - 1);
      }

      const startDateStr = startDate.toISOString();

      // Make parallel API requests to get all necessary data
      const [billStatsResponse, farmersResponse, sessionsResponse, productsResponse, buyersResponse] = await Promise.all([
        fetch(`/api/bills/statistics?start_date=${startDateStr}&end_date=${endDate}`),
        fetch('/api/farmers'),
        fetch('/api/sessions'),
        fetch('/api/products?limit=10000'), // Get all products to count them properly
        fetch('/api/buyers')
      ]);

      // Check if all responses are OK
      if (!billStatsResponse.ok || !farmersResponse.ok || !sessionsResponse.ok || !productsResponse.ok || !buyersResponse.ok) {
        throw new Error('Failed to fetch analytics data');
      }

      // Parse JSON responses
      const billStatsData = await billStatsResponse.json();
      const farmers = await farmersResponse.json();
      const sessions = await sessionsResponse.json();
      const products = await productsResponse.json();
      const buyers = await buyersResponse.json();

      // Debug logging
      console.log('Sessions API response:', sessions);
      console.log('Farmers API response:', farmers);
      console.log('Products API response:', products);
      console.log('Buyers API response:', buyers);

      if (!billStatsData.success || !farmers.success || !sessions.success || !products.success || !buyers.success) {
        console.error('API errors:', {
          billStats: billStatsData.success,
          farmers: farmers.success,
          sessions: sessions.success,
          products: products.success,
          buyers: buyers.success
        });
        throw new Error('API returned unsuccessful response');
      }

      // Store bill stats for charts
      setBillStats(billStatsData.data);

      // Prepare aggregated data from API responses based on actual API structure
      const analyticsDataResult: AnalyticsData = {
        // Sessions API returns paginated response with meta.total
        totalSessions: sessions.meta?.total || 0,
        activeSessions: sessions.data?.filter((s: { status: string }) => s.status === 'ACTIVE').length || 0,

        // Farmers API returns paginated response with meta.total  
        totalFarmers: farmers.meta?.total || 0,

        // Buyers API returns paginated response with meta.total
        totalBuyers: buyers.meta?.total || 0,

        // Products API returns simple success response with data array - get all products to count
        totalProducts: products.data?.length || 0,

        // Bill stats API returns nested data structure
        totalBills: billStatsData.data?.overview?.total_bills || 0,
        totalRevenue: billStatsData.data?.overview?.total_amount || 0,
        totalCommission: billStatsData.data?.overview?.commission_amount || 0,
        paidBills: billStatsData.data?.overview?.paid_bills || 0,
        unpaidBills: billStatsData.data?.overview?.unpaid_bills || 0,
      };

      console.log('Processed analytics data:', analyticsDataResult);

      setAnalyticsData(analyticsDataResult);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculatePercentage = (part: number, total: number) => {
    if (total === 0) return 0;
    return ((part / total) * 100).toFixed(1);
  };

  return (
    <DashboardLayout>
      <DesktopOnly>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Analytics & Insights</h1>
              <p className="text-slate-600 mt-1">Comprehensive business overview and performance metrics</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Date Range Selector */}
              <div className="flex space-x-2">
                <Button
                  variant={dateRange === '7days' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('7days')}
                >
                  7D
                </Button>
                <Button
                  variant={dateRange === '30days' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('30days')}
                >
                  30D
                </Button>
                <Button
                  variant={dateRange === '90days' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('90days')}
                >
                  90D
                </Button>
                <Button
                  variant={dateRange === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange('year')}
                >
                  1Y
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAnalyticsData}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-slate-600">Loading analytics data...</span>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(analyticsData.totalRevenue)}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span>All-time earnings</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(analyticsData.totalCommission)}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <span>~{calculatePercentage(analyticsData.totalCommission, analyticsData.totalRevenue)}% of revenue</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {analyticsData.activeSessions}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <span>of {analyticsData.totalSessions} total sessions</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {calculatePercentage(analyticsData.paidBills, analyticsData.totalBills)}%
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <span>{analyticsData.paidBills} of {analyticsData.totalBills} bills paid</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Auction Sessions Overview - Connected to Backend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Auction Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Sessions</span>
                        <span className="font-semibold">{analyticsData.totalSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Active Now</span>
                        <Badge className="bg-green-100 text-green-800">
                          {analyticsData.activeSessions} Live
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Completed</span>
                        <span className="font-semibold">
                          {analyticsData.totalSessions - analyticsData.activeSessions}
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${calculatePercentage(analyticsData.totalSessions - analyticsData.activeSessions, analyticsData.totalSessions)}%`
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {calculatePercentage(analyticsData.totalSessions - analyticsData.activeSessions, analyticsData.totalSessions)}% completion rate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Users Overview - Connected to Backend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Platform Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Registered Farmers</span>
                        <span className="font-semibold text-green-600">{analyticsData.totalFarmers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Available Products</span>
                        <span className="font-semibold text-purple-600">{analyticsData.totalProducts}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Active Buyers</span>
                        <span className="font-semibold text-blue-600">
                          {analyticsData.totalBuyers}
                        </span>
                      </div>
                      <div className="pt-2">
                        <div className="text-xs text-slate-500">
                          Products per farmer: {analyticsData.totalFarmers > 0 ? (analyticsData.totalProducts / analyticsData.totalFarmers).toFixed(1) : 0}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bills & Payments Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Bills & Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Bills</span>
                        <span className="font-semibold">{analyticsData.totalBills}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Paid Bills</span>
                        <Badge className="bg-green-100 text-green-800">
                          {analyticsData.paidBills} Paid
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Pending Bills</span>
                        <Badge className="bg-red-100 text-red-800">
                          {analyticsData.unpaidBills} Pending
                        </Badge>
                      </div>
                      <div className="pt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${calculatePercentage(analyticsData.paidBills, analyticsData.totalBills)}%`
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {calculatePercentage(analyticsData.paidBills, analyticsData.totalBills)}% payment completion
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Summary - Single Section Only */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(analyticsData.totalRevenue)}
                      </div>
                      <p className="text-sm text-green-700">Total Revenue</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(analyticsData.totalCommission)}
                      </div>
                      <p className="text-sm text-blue-700">Commission Earned</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(analyticsData.totalRevenue - analyticsData.totalCommission)}
                      </div>
                      <p className="text-sm text-purple-700">Farmer Payments</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatCurrency((analyticsData.totalRevenue / analyticsData.totalSessions) || 0)}
                      </div>
                      <p className="text-sm text-orange-700">Avg. per Session</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Charts Section */}
              {billStats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bill Payment Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Bill Payment Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Paid', value: billStats.overview.paid_bills },
                              { name: 'Unpaid', value: billStats.overview.unpaid_bills }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent ? (percent * 100).toFixed(0) : 0)}%`}
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#ef4444" />
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Top Farmers */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Farmers by Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                      {billStats.top_farmers.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={billStats.top_farmers.map(f => ({
                              name: f.name,
                              amount: f.total_amount
                            }))}
                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                            <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Bar dataKey="amount" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex justify-center items-center h-64 text-gray-500">
                          No farmer data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </DesktopOnly>
    </DashboardLayout>
  );
}
