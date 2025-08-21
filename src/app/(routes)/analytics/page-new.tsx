"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  BarChart3,
  Users,
  Package,
  IndianRupee,
  Calendar,
  Download,
  FileText,
  Activity,
  Loader2,
  RefreshCw
} from 'lucide-react';

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

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
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

  // Fetch analytics data from multiple endpoints
  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // In a real app, these would be actual API calls
      // For now, we'll simulate the data structure
      
      // Simulated data that matches backend API responses
      const mockData: AnalyticsData = {
        totalSessions: 45,
        activeSessions: 3,
        totalFarmers: 127,
        totalBuyers: 89,
        totalProducts: 24,
        totalBills: 156,
        totalRevenue: 2847650,
        totalCommission: 142383,
        paidBills: 98,
        unpaidBills: 58,
      };
      
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-slate-600 mt-1">Comprehensive insights into your agricultural marketplace</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={fetchAnalyticsData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
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
              {/* Auction Sessions Overview */}
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

              {/* Users Overview */}
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
                      <span className="text-sm text-slate-600">Active Buyers</span>
                      <span className="font-semibold text-blue-600">{analyticsData.totalBuyers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Available Products</span>
                      <span className="font-semibold text-purple-600">{analyticsData.totalProducts}</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-xs text-slate-500">
                        Farmer to Buyer ratio: {(analyticsData.totalFarmers / analyticsData.totalBuyers).toFixed(1)}:1
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

            {/* Financial Summary */}
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create New Session
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Bills
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Add Farmer
                  </Button>
                  <Button variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
