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
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Building,
  TrendingUp,
  Star,
  MoreHorizontal
} from 'lucide-react';

const buyersData = [
  {
    id: "B001",
    name: "Mumbai Grain Traders",
    type: "Wholesale",
    contact: "Amit Patel",
    phone: "+91 98765 12345",
    email: "amit@mumbaigrains.com",
    location: "Mumbai, Maharashtra",
    totalPurchases: "₹15,45,000",
    lastOrder: "₹2,50,000",
    paymentStatus: "excellent",
    rating: 4.9,
    categories: ["Grains", "Pulses"],
    status: "verified",
    lastActive: "1 hour ago",
    registrationDate: "10/12/2024"
  },
  {
    id: "B002",
    name: "Fresh Vegetable Co.",
    type: "Retail Chain",
    contact: "Sunita Joshi",
    phone: "+91 98765 12346",
    email: "sunita@freshveg.com",
    location: "Pune, Maharashtra",
    totalPurchases: "₹8,75,000",
    lastOrder: "₹1,25,000",
    paymentStatus: "good",
    rating: 4.7,
    categories: ["Vegetables", "Fruits"],
    status: "verified",
    lastActive: "3 hours ago",
    registrationDate: "15/11/2024"
  },
  {
    id: "B003",
    name: "Nashik Cotton Mills",
    type: "Industrial",
    contact: "Rahul Deshmukh",
    phone: "+91 98765 12347",
    email: "rahul@nashikcotton.com",
    location: "Nashik, Maharashtra",
    totalPurchases: "₹25,30,000",
    lastOrder: "₹5,50,000",
    paymentStatus: "excellent",
    rating: 4.8,
    categories: ["Cash Crops", "Cotton"],
    status: "verified",
    lastActive: "5 hours ago",
    registrationDate: "05/10/2024"
  },
  {
    id: "B004",
    name: "Local Market Suppliers",
    type: "Local Trader",
    contact: "Pradeep Singh",
    phone: "+91 98765 12348",
    email: "pradeep@localmarket.com",
    location: "Aurangabad, Maharashtra",
    totalPurchases: "₹3,25,000",
    lastOrder: "₹85,000",
    paymentStatus: "pending",
    rating: 4.2,
    categories: ["Vegetables", "Grains"],
    status: "active",
    lastActive: "2 days ago",
    registrationDate: "20/01/2025"
  }
];

const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
  switch (status) {
    case "verified": return "success";
    case "active": return "default";
    case "pending": return "warning";
    case "suspended": return "destructive";
    default: return "secondary";
  }
};

const getPaymentStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
  switch (status) {
    case "excellent": return "success";
    case "good": return "default";
    case "pending": return "warning";
    case "overdue": return "destructive";
    default: return "secondary";
  }
};

const buyerTypes = ["All", "Wholesale", "Retail Chain", "Industrial", "Local Trader", "Export"];

export default function BuyersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Buyers</h1>
            <p className="text-slate-600 mt-1">Manage buyer profiles and purchasing history</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Buyer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Buyers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">892</div>
              <p className="text-xs text-green-600">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">756</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">₹89.5L</div>
              <p className="text-xs text-green-600">+28% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">534</div>
              <p className="text-xs text-blue-600">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Categories */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search buyers by name, contact, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {buyerTypes.map((type) => (
                  <Button
                    key={type}
                    variant={type === "All" ? "default" : "outline"}
                    size="sm"
                    className={type === "All" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Buyers List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Registered Buyers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {buyersData.map((buyer, index) => (
                <div key={buyer.id}>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-slate-900">{buyer.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {buyer.type}
                            </Badge>
                            <Badge variant={getStatusColor(buyer.status)} className="text-xs">
                              {buyer.status}
                            </Badge>
                            <Badge variant={getPaymentStatusColor(buyer.paymentStatus)} className="text-xs">
                              {buyer.paymentStatus} payment
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-slate-600">{buyer.rating}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-slate-600 mb-2">
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              {buyer.contact}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {buyer.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {buyer.email}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {buyer.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Categories: {buyer.categories.join(", ")}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <span>Last Order: {buyer.lastOrder}</span>
                            <span>•</span>
                            <span>Last active: {buyer.lastActive}</span>
                            <span>•</span>
                            <span>Member since: {buyer.registrationDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">{buyer.totalPurchases}</div>
                          <div className="text-xs text-slate-500">Total Purchases</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < buyersData.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
