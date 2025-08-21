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
  FileText,
  Download,
  Eye,
  Edit,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send
} from 'lucide-react';

const billsData = [
  {
    id: "INV-2025-0145",
    buyer: "Mumbai Grain Traders",
    farmer: "Rajesh Kumar",
    product: "Premium Basmati Rice",
    quantity: "500 bags",
    unitPrice: "₹52/kg",
    amount: "₹6,50,000",
    commission: "₹19,500",
    tax: "₹1,17,000",
    totalAmount: "₹7,86,500",
    status: "paid",
    paymentMethod: "Bank Transfer",
    issueDate: "18/01/2025",
    dueDate: "25/01/2025",
    paidDate: "22/01/2025",
    auctionId: "AUC001"
  },
  {
    id: "INV-2025-0144",
    buyer: "Fresh Vegetable Co.",
    farmer: "Priya Sharma",
    product: "Mixed Vegetables Lot",
    quantity: "200 crates",
    unitPrice: "₹27,500 (total)",
    amount: "₹27,500",
    commission: "₹550",
    tax: "₹4,950",
    totalAmount: "₹33,000",
    status: "pending",
    paymentMethod: "Cash",
    issueDate: "19/01/2025",
    dueDate: "26/01/2025",
    paidDate: null,
    auctionId: "AUC004"
  },
  {
    id: "INV-2025-0143",
    buyer: "Nashik Cotton Mills",
    farmer: "Ramesh Sharma",
    product: "Cotton Bales Premium",
    quantity: "100 bales",
    unitPrice: "₹6,200/bale",
    amount: "₹6,20,000",
    commission: "₹24,800",
    tax: "₹1,11,600",
    totalAmount: "₹7,56,400",
    status: "overdue",
    paymentMethod: "Cheque",
    issueDate: "15/01/2025",
    dueDate: "22/01/2025",
    paidDate: null,
    auctionId: "AUC003"
  },
  {
    id: "INV-2025-0142",
    buyer: "Local Market Suppliers",
    farmer: "Suresh Patil",
    product: "Organic Wheat",
    quantity: "300 bags",
    unitPrice: "₹38/kg",
    amount: "₹5,70,000",
    commission: "₹14,250",
    tax: "₹1,02,600",
    totalAmount: "₹6,86,850",
    status: "draft",
    paymentMethod: "Bank Transfer",
    issueDate: "20/01/2025",
    dueDate: "27/01/2025",
    paidDate: null,
    auctionId: "AUC002"
  }
];

const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
  switch (status) {
    case "paid": return "success";
    case "pending": return "warning";
    case "overdue": return "destructive";
    case "draft": return "secondary";
    case "cancelled": return "outline";
    default: return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "paid": return CheckCircle;
    case "pending": return Clock;
    case "overdue": return XCircle;
    case "draft": return Edit;
    default: return AlertCircle;
  }
};

const statusFilters = ["All", "Paid", "Pending", "Overdue", "Draft", "Cancelled"];

export default function BillsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Bills & Invoices</h1>
            <p className="text-slate-600 mt-1">Manage billing and payment tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">₹45.8L</div>
              <p className="text-xs text-green-600">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₹7.2L</div>
              <p className="text-xs text-orange-600">12 pending invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Commission Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">₹1.38L</div>
              <p className="text-xs text-green-600">+22% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">₹95K</div>
              <p className="text-xs text-red-600">5 overdue invoices</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by invoice ID, buyer, or farmer..."
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

        {/* Bills List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoice Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {billsData.map((bill, index) => {
                const StatusIcon = getStatusIcon(bill.status);
                return (
                  <div key={bill.id}>
                    <div className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <StatusIcon className={`h-6 w-6 ${
                              bill.status === 'paid' ? 'text-green-600' :
                              bill.status === 'pending' ? 'text-orange-600' :
                              bill.status === 'overdue' ? 'text-red-600' :
                              'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-semibold text-slate-900">{bill.id}</h3>
                              <Badge variant={getStatusColor(bill.status)} className="text-xs">
                                {bill.status.toUpperCase()}
                              </Badge>
                              {bill.status === 'overdue' && (
                                <Badge variant="destructive" className="text-xs">
                                  OVERDUE
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-slate-600 mb-2">
                              <div>
                                <span className="text-slate-500">Buyer:</span> {bill.buyer}
                              </div>
                              <div>
                                <span className="text-slate-500">Farmer:</span> {bill.farmer}
                              </div>
                              <div>
                                <span className="text-slate-500">Product:</span> {bill.product}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600">
                              <div>
                                <span className="text-slate-500">Quantity:</span> {bill.quantity}
                              </div>
                              <div>
                                <span className="text-slate-500">Rate:</span> {bill.unitPrice}
                              </div>
                              <div>
                                <span className="text-slate-500">Commission:</span> {bill.commission}
                              </div>
                              <div>
                                <span className="text-slate-500">Method:</span> {bill.paymentMethod}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Issued: {bill.issueDate}
                              </div>
                              <span>•</span>
                              <span>Due: {bill.dueDate}</span>
                              {bill.paidDate && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-600">Paid: {bill.paidDate}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            <div className="font-semibold text-slate-900">{bill.totalAmount}</div>
                            <div className="text-xs text-slate-500">Total Amount</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                            {bill.status === 'pending' && (
                              <Button variant="outline" size="sm" className="text-green-600 border-green-300 hover:bg-green-50">
                                <Send className="h-3 w-3" />
                              </Button>
                            )}
                            {bill.status === 'draft' && (
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < billsData.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
