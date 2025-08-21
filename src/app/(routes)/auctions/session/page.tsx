"use client";

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Search, 
  Save,
  Trash2,
  Edit,
  Clock,
  Package,
  IndianRupee,
  Gavel,
  AlertCircle,
  CheckCircle,
  Play,
  Settings,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Mock data for auction items
const auctionItems = [
  {
    id: "ITEM001",
    farmer: "Rajesh Kumar",
    product: "Premium Basmati Rice",
    category: "Grains",
    quantity: "500 bags",
    unit: "kg",
    totalWeight: "12,500 kg",
    quality: "Grade A+",
    basePrice: "45",
    minBidIncrement: "2",
    estimatedValue: "5,62,500",
    status: "ready",
    description: "Premium quality Basmati rice, aged 2 years, export grade"
  },
  {
    id: "ITEM002",
    farmer: "Priya Sharma",
    product: "Organic Onions",
    category: "Vegetables",
    quantity: "200 crates",
    unit: "kg",
    totalWeight: "4,000 kg",
    quality: "Grade A",
    basePrice: "28",
    minBidIncrement: "1",
    estimatedValue: "1,12,000",
    status: "pending_approval",
    description: "Fresh organic onions, red variety, premium quality"
  },
  {
    id: "ITEM003",
    farmer: "Suresh Patil",
    product: "Cotton Bales",
    category: "Cash Crops",
    quantity: "50 bales",
    unit: "bale",
    totalWeight: "8,500 kg",
    quality: "Grade A",
    basePrice: "5500",
    minBidIncrement: "100",
    estimatedValue: "2,75,000",
    status: "ready",
    description: "High quality cotton bales, export ready, moisture content 8%"
  }
];

const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
  switch (status) {
    case "ready": return "success";
    case "pending_approval": return "warning";
    case "rejected": return "destructive";
    case "draft": return "secondary";
    default: return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "ready": return CheckCircle;
    case "pending_approval": return Clock;
    case "rejected": return AlertCircle;
    default: return Edit;
  }
};

export default function AuctionSessionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/auctions">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Auctions
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Create Auction Session</h1>
            <p className="text-slate-600 mt-1">Set up a new auction session and manage auction items</p>
          </div>
        </div>

        {/* Auction Session Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Session Configuration */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Session Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Session Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Daily Agricultural Auction - Jan 20, 2025"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Session Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="open">Open Auction</option>
                    <option value="sealed">Sealed Bid</option>
                    <option value="reverse">Reverse Auction</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Duration (hours)</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">8 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="e.g., 3.5"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Session Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the auction session, special terms, or important notes for bidders..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>

          {/* Session Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Session Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-slate-600">Total Items</div>
                <div className="text-2xl font-bold text-slate-900">{auctionItems.length}</div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-700">Estimated Value</div>
                <div className="text-2xl font-bold text-blue-900">₹9,49,500</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-700">Expected Commission</div>
                <div className="text-2xl font-bold text-green-900">₹28,485</div>
                <div className="text-xs text-green-600">@ 3% average rate</div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">Status Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-sm text-slate-600">Ready</span>
                    </div>
                    <Badge variant="success" className="text-xs">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-orange-600" />
                      <span className="text-sm text-slate-600">Pending</span>
                    </div>
                    <Badge variant="warning" className="text-xs">1</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auction Items Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Auction Items ({auctionItems.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Find Items
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {auctionItems.map((item, index) => {
                const StatusIcon = getStatusIcon(item.status);
                return (
                  <div key={item.id}>
                    <div className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <StatusIcon className={`h-6 w-6 ${
                              item.status === 'ready' ? 'text-green-600' :
                              item.status === 'pending_approval' ? 'text-orange-600' :
                              'text-red-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="font-semibold text-slate-900">{item.product}</h3>
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                              <Badge variant={getStatusColor(item.status)} className="text-xs">
                                {item.status.replace('_', ' ')}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.quality}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600 mb-2">
                              <div>
                                <span className="text-slate-500">Farmer:</span> {item.farmer}
                              </div>
                              <div>
                                <span className="text-slate-500">Quantity:</span> {item.quantity}
                              </div>
                              <div>
                                <span className="text-slate-500">Weight:</span> {item.totalWeight}
                              </div>
                              <div>
                                <span className="text-slate-500">Base Price:</span> ₹{item.basePrice}/{item.unit}
                              </div>
                            </div>

                            <div className="text-xs text-slate-500 mb-2">
                              {item.description}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <div className="flex items-center gap-1">
                                <IndianRupee className="h-3 w-3" />
                                Min Increment: ₹{item.minBidIncrement}
                              </div>
                              <span>•</span>
                              <div>
                                Item ID: {item.id}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            <div className="font-semibold text-slate-900">₹{item.estimatedValue}</div>
                            <div className="text-xs text-slate-500">Est. Value</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < auctionItems.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600">
            Session ready to launch with {auctionItems.filter(item => item.status === 'ready').length} approved items
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="outline">
              Preview Session
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="h-4 w-4 mr-2" />
              Launch Auction
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
