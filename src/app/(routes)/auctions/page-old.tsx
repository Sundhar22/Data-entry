"use client";

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Search, 
  Filter, 
  Gavel,
  Clock,
  Users,
  TrendingUp,
  Play,
  Pause,
  Eye,
  Calendar,
  Package
} from 'lucide-react';

const auctionsData = [
  {
    id: "AUC001",
    title: "Premium Basmati Rice Auction",
    product: "Basmati Rice - Grade A+",
    farmer: "Rajesh Kumar",
    quantity: "500 bags (25kg each)",
    basePrice: "₹45/kg",
    currentBid: "₹52/kg",
    highestBidder: "Mumbai Grain Traders",
    totalBids: 15,
    participants: 8,
    status: "live",
    startTime: "10:00 AM",
    endTime: "2:00 PM",
    timeRemaining: "1h 25m",
    date: "Today",
    commission: "3%"
  },
  {
    id: "AUC002",
    title: "Organic Wheat Bulk Sale",
    product: "Organic Wheat - Grade A",
    farmer: "Suresh Patil",
    quantity: "750 bags (50kg each)",
    basePrice: "₹32/kg",
    currentBid: "₹38/kg",
    highestBidder: "Fresh Vegetable Co.",
    totalBids: 12,
    participants: 6,
    status: "live",
    startTime: "11:30 AM",
    endTime: "3:30 PM",
    timeRemaining: "2h 55m",
    date: "Today",
    commission: "2.5%"
  },
  {
    id: "AUC003",
    title: "Cotton Bales Premium Lot",
    product: "Cotton Bales - Export Quality",
    farmer: "Ramesh Sharma",
    quantity: "100 bales (170kg each)",
    basePrice: "₹5,500/bale",
    currentBid: "₹6,200/bale",
    highestBidder: "Nashik Cotton Mills",
    totalBids: 8,
    participants: 4,
    status: "scheduled",
    startTime: "2:00 PM",
    endTime: "6:00 PM",
    timeRemaining: "Starts in 45m",
    date: "Today",
    commission: "4%"
  },
  {
    id: "AUC004",
    title: "Fresh Vegetables Mixed Lot",
    product: "Onions, Tomatoes, Potatoes",
    farmer: "Priya Devi",
    quantity: "Mixed - 300 crates total",
    basePrice: "₹20/kg avg",
    currentBid: "₹27,500 (total)",
    highestBidder: "Local Market Suppliers",
    totalBids: 18,
    participants: 12,
    status: "completed",
    startTime: "9:00 AM",
    endTime: "12:00 PM",
    timeRemaining: "Completed",
    date: "Yesterday",
    commission: "2%"
  },
  {
    id: "AUC005",
    title: "Sugarcane Bulk Purchase",
    product: "Fresh Sugarcane",
    farmer: "Krishna Patil",
    quantity: "200 tons",
    basePrice: "₹3,200/ton",
    currentBid: "Not started",
    highestBidder: "-",
    totalBids: 0,
    participants: 0,
    status: "scheduled",
    startTime: "10:00 AM",
    endTime: "2:00 PM",
    timeRemaining: "Starts tomorrow",
    date: "Tomorrow",
    commission: "3.5%"
  }
];

const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
  switch (status) {
    case "live": return "destructive";
    case "scheduled": return "default";
    case "completed": return "success";
    case "cancelled": return "secondary";
    default: return "secondary";
  }
};

const statusFilters = ["All", "Live", "Scheduled", "Completed", "Cancelled"];

export default function AuctionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Auctions</h1>
            <p className="text-slate-600 mt-1">Manage auction sessions and bidding activities</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Auction
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Live Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">7</div>
              <p className="text-xs text-green-600">+2 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Scheduled Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-xs text-blue-600">3 starting soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">₹12.8L</div>
              <p className="text-xs text-green-600">+18% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Commission Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">₹38,400</div>
              <p className="text-xs text-green-600">+22% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Status Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search auctions by product, farmer, or lot ID..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {statusFilters.map((status) => (
                  <Button
                    key={status}
                    variant={status === "All" ? "default" : "outline"}
                    size="sm"
                    className={status === "All" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Auctions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Auction Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {auctionsData.map((auction, index) => (
                <div key={auction.id}>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 ${
                          auction.status === 'live' ? 'bg-red-100' : 
                          auction.status === 'scheduled' ? 'bg-blue-100' : 'bg-green-100'
                        } rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Gavel className={`h-6 w-6 ${
                            auction.status === 'live' ? 'text-red-600' : 
                            auction.status === 'scheduled' ? 'text-blue-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-slate-900">{auction.title}</h3>
                            <Badge variant={getStatusColor(auction.status)} className="text-xs">
                              {auction.status.toUpperCase()}
                            </Badge>
                            {auction.status === 'live' && (
                              <Badge variant="destructive" className="text-xs animate-pulse">
                                LIVE
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-slate-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              {auction.product}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Farmer: {auction.farmer}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Quantity: {auction.quantity}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600">
                            <div>
                              <span className="text-slate-500">Base:</span> {auction.basePrice}
                            </div>
                            <div>
                              <span className="text-slate-500">Current:</span> {auction.currentBid}
                            </div>
                            <div>
                              <span className="text-slate-500">Bids:</span> {auction.totalBids}
                            </div>
                            <div>
                              <span className="text-slate-500">Participants:</span> {auction.participants}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {auction.timeRemaining}
                            </div>
                            <span>•</span>
                            <span>{auction.date}</span>
                            <span>•</span>
                            <span>{auction.startTime} - {auction.endTime}</span>
                            <span>•</span>
                            <span>Commission: {auction.commission}</span>
                          </div>
                          {auction.highestBidder !== '-' && (
                            <div className="mt-1 text-xs text-green-600">
                              Leading: {auction.highestBidder}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {auction.status === 'live' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              Watch
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </Button>
                          </>
                        )}
                        {auction.status === 'scheduled' && (
                          <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                            <Play className="h-3 w-3 mr-1" />
                            Start
                          </Button>
                        )}
                        {auction.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < auctionsData.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
