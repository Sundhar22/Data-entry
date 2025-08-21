"use client";

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Users,
  Package,
  IndianRupee,
  Calendar,
  Download,
  Filter,
  Eye
} from 'lucide-react';

const analyticsData = {
  revenue: {
    current: "₹45,78,900",
    previous: "₹38,45,200",
    growth: "+19.1%",
    trend: "up"
  },
  auctions: {
    current: 156,
    previous: 134,
    growth: "+16.4%",
    trend: "up"
  },
  farmers: {
    current: 1247,
    previous: 1156,
    growth: "+7.9%",
    trend: "up"
  },
  buyers: {
    current: 892,
    previous: 823,
    growth: "+8.4%",
    trend: "up"
  }
};

const topProducts = [
  { name: "Basmati Rice", sales: "₹12,45,000", percentage: "27.2%", trend: "up" },
  { name: "Wheat", sales: "₹9,78,000", percentage: "21.4%", trend: "up" },
  { name: "Cotton", sales: "₹8,32,000", percentage: "18.2%", trend: "down" },
  { name: "Onions", sales: "₹6,45,000", percentage: "14.1%", trend: "up" },
  { name: "Sugarcane", sales: "₹4,56,000", percentage: "10.0%", trend: "up" }
];

const topFarmers = [
  { name: "Rajesh Kumar", sales: "₹8,75,000", auctions: 34, rating: 4.9 },
  { name: "Suresh Patil", sales: "₹7,45,000", auctions: 28, rating: 4.8 },
  { name: "Priya Sharma", sales: "₹6,89,000", auctions: 31, rating: 4.7 },
  { name: "Ramesh Singh", sales: "₹5,67,000", auctions: 22, rating: 4.6 }
];

const monthlyRevenue = [
  { month: "Jan", revenue: 3250000, auctions: 45 },
  { month: "Feb", revenue: 3890000, auctions: 52 },
  { month: "Mar", revenue: 4120000, auctions: 48 },
  { month: "Apr", revenue: 4578000, auctions: 56 },
  { month: "May", revenue: 4890000, auctions: 61 },
  { month: "Jun", revenue: 5234000, auctions: 58 }
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Analytics & Reports</h1>
            <p className="text-slate-600 mt-1">Business insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analyticsData.revenue.current}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">{analyticsData.revenue.growth} from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Auctions Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analyticsData.auctions.current}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">{analyticsData.auctions.growth} from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Farmers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analyticsData.farmers.current}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">{analyticsData.farmers.growth} from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Active Buyers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{analyticsData.buyers.current}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">{analyticsData.buyers.growth} from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Revenue Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((data) => (
                  <div key={data.month} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-slate-600">{data.month}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(data.revenue / 5500000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">₹{(data.revenue / 100000).toFixed(1)}L</div>
                      <div className="text-xs text-slate-500">{data.auctions} auctions</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Top Products by Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="text-xs text-slate-500">{product.percentage} of total</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div className="font-semibold text-slate-900">{product.sales}</div>
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Farmers */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Performing Farmers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFarmers.map((farmer, index) => (
                  <div key={farmer.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-green-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{farmer.name}</div>
                        <div className="text-xs text-slate-500">{farmer.auctions} successful auctions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">{farmer.sales}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">Rating:</span>
                        <Badge variant="secondary" className="text-xs">
                          ⭐ {farmer.rating}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">Average Auction Value</div>
                  <div className="text-2xl font-bold text-green-900">₹2,93,500</div>
                  <div className="text-xs text-green-600">+12% from last month</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">Commission Rate</div>
                  <div className="text-2xl font-bold text-blue-900">3.2%</div>
                  <div className="text-xs text-blue-600">Average across all auctions</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-purple-800">Payment Success</div>
                  <div className="text-2xl font-bold text-purple-900">94.5%</div>
                  <div className="text-xs text-purple-600">On-time payment rate</div>
                </div>
                
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm font-medium text-orange-800">Active Sessions</div>
                  <div className="text-2xl font-bold text-orange-900">7</div>
                  <div className="text-xs text-orange-600">Live auctions running</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
