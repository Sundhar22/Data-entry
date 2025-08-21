"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Plus,
  FileText,
  IndianRupee,
  Calendar,
  Eye,
  Download,
  CreditCard,
  Users,
  Package,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface Bill {
  id: string;
  bill_number: string;
  farmer_id: string;
  product_id: string;
  session_id: string;
  total_quantity: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  net_payable: number;
  payment_status: 'UNPAID' | 'PAID';
  payment_method?: string;
  payment_date?: string;
  created_at: string;
  farmer: {
    name: string;
    village: string;
  };
  product: {
    name: string;
  };
  _count: {
    auction_items: number;
  };
}

interface BillResponse {
  success: boolean;
  data: Bill[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBills, setTotalBills] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch bills data
  const fetchBills = async (page = 1, search = "", status?: string) => {
    setLoading(page === 1);
    setSearchLoading(search !== "");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sortBy: "created_at",
        ...(search && { farmer_name: search }),
        ...(status && status !== 'ALL' && { payment_status: status })
      });

      const response = await fetch(`/api/bills?${params}`);
      if (response.ok) {
        const data: BillResponse = await response.json();
        setBills(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalBills(data.meta.total);
      }
    } catch (error) {
      console.error('Failed to fetch bills:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchBills(1, value, statusFilter === 'ALL' ? undefined : statusFilter);
  };

  const handlePageChange = (page: number) => {
    fetchBills(page, searchTerm, statusFilter === 'ALL' ? undefined : statusFilter);
  };

  const handleStatusFilter = (status: 'ALL' | 'PAID' | 'UNPAID') => {
    setStatusFilter(status);
    fetchBills(1, searchTerm, status === 'ALL' ? undefined : status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'UNPAID':
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalPaidAmount = bills.filter(b => b.payment_status === 'PAID').reduce((sum, b) => sum + b.net_payable, 0);
  const totalUnpaidAmount = bills.filter(b => b.payment_status === 'UNPAID').reduce((sum, b) => sum + b.net_payable, 0);
  const totalCommission = bills.reduce((sum, b) => sum + b.commission_amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Bills & Payments</h1>
            <p className="text-slate-600 mt-1">Manage farmer bills and payment tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Preview Bills
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate Bill
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBills}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalPaidAmount)}
              </div>
              <p className="text-xs text-muted-foreground">
                {bills.filter(b => b.payment_status === 'PAID').length} bills paid
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalUnpaidAmount)}
              </div>
              <p className="text-xs text-muted-foreground">
                {bills.filter(b => b.payment_status === 'UNPAID').length} bills pending
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalCommission)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={statusFilter === 'ALL' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilter('ALL')}
            >
              All Bills
            </Button>
            <Button 
              variant={statusFilter === 'PAID' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilter('PAID')}
            >
              Paid
            </Button>
            <Button 
              variant={statusFilter === 'UNPAID' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilter('UNPAID')}
            >
              Unpaid
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by farmer name..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                className="pl-10 w-64"
              />
              {searchLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
            <Button variant="outline" onClick={() => fetchBills(currentPage, searchTerm, statusFilter === 'ALL' ? undefined : statusFilter)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Bills List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Bills List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading bills...</span>
              </div>
            ) : bills.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                {searchTerm || statusFilter !== 'ALL' 
                  ? "No bills found matching your criteria." 
                  : "No bills found. Generate your first bill to get started."}
              </div>
            ) : (
              <div className="space-y-0">
                {bills.map((bill, index) => (
                  <div key={bill.id}>
                    <div className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            bill.payment_status === 'PAID' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {bill.payment_status === 'PAID' ? (
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg text-slate-900">
                                {bill.bill_number}
                              </h3>
                              {getPaymentStatusBadge(bill.payment_status)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{bill.farmer.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Package className="h-4 w-4" />
                                <span>{bill.product.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(bill.created_at)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <div>
                                <span className="text-slate-500">Gross: </span>
                                <span className="font-medium">{formatCurrency(bill.gross_amount)}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Commission: </span>
                                <span className="font-medium text-blue-600">{formatCurrency(bill.commission_amount)}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Net: </span>
                                <span className="font-semibold text-green-600">{formatCurrency(bill.net_payable)}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Items: </span>
                                <span className="font-medium">{bill._count.auction_items}</span>
                              </div>
                            </div>
                            {bill.payment_date && (
                              <div className="text-xs text-green-600">
                                Paid on {formatDate(bill.payment_date)} via {bill.payment_method}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {bill.payment_status === 'UNPAID' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Mark Paid
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Print
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < bills.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalBills)} of {totalBills} bills
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
