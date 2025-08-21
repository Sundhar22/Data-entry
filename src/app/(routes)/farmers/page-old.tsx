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
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin,
  Users,
  Truck,
  Star
} from 'lucide-react';

const farmersData = [
  {
    id: "F001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    location: "Pune, Maharashtra",
    crops: ["Wheat", "Rice", "Cotton"],
    totalSales: "₹2,45,000",
    rating: 4.8,
    status: "verified",
    lastActive: "2 hours ago",
    registrationDate: "15/01/2025"
  },
  {
    id: "F002",
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    email: "priya.sharma@email.com",
    location: "Nashik, Maharashtra",
    crops: ["Onion", "Tomato", "Potato"],
    totalSales: "₹1,87,500",
    rating: 4.6,
    status: "active",
    lastActive: "5 hours ago",
    registrationDate: "12/01/2025"
  },
  {
    id: "F003",
    name: "Suresh Patil",
    phone: "+91 98765 43212",
    email: "suresh.patil@email.com",
    location: "Aurangabad, Maharashtra",
    crops: ["Sugarcane", "Soybean"],
    totalSales: "₹3,12,000",
    rating: 4.9,
    status: "verified",
    lastActive: "1 day ago",
    registrationDate: "08/01/2025"
  },
  {
    id: "F004",
    name: "Meera Devi",
    phone: "+91 98765 43213",
    email: "meera.devi@email.com",
    location: "Solapur, Maharashtra",
    crops: ["Groundnut", "Jowar"],
    totalSales: "₹95,000",
    rating: 4.3,
    status: "pending",
    lastActive: "3 days ago",
    registrationDate: "20/01/2025"
  }
];

const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
  switch (status) {
    case "verified": return "success";
    case "active": return "default";
    case "pending": return "warning";
    default: return "secondary";
  }
};

export default function FarmersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Farmers</h1>
            <p className="text-slate-600 mt-1">Manage farmer registrations and profiles</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Farmer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1,247</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">983</div>
              <p className="text-xs text-green-600">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">756</div>
              <p className="text-xs text-blue-600">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">23</div>
              <p className="text-xs text-orange-600">-2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search farmers by name, phone, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Farmers List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Registered Farmers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {farmersData.map((farmer, index) => (
                <div key={farmer.id}>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900">{farmer.name}</h3>
                            <Badge variant={getStatusColor(farmer.status)} className="text-xs">
                              {farmer.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-slate-600">{farmer.rating}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {farmer.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {farmer.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {farmer.location}
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Truck className="h-3 w-3" />
                              Crops: {farmer.crops.join(", ")}
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                              <span>Registered: {farmer.registrationDate}</span>
                              <span>•</span>
                              <span>Last active: {farmer.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">{farmer.totalSales}</div>
                          <div className="text-xs text-slate-500">Total Sales</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < farmersData.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
