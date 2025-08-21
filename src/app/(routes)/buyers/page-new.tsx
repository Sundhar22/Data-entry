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
  Edit,
  Trash2,
  Phone,
  ShoppingCart,
  Users,
  UserCheck,
  UserX,
  Loader2,
  RefreshCw,
  Calendar
} from 'lucide-react';

interface Buyer {
  id: string;
  name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BuyerResponse {
  success: boolean;
  data: Buyer[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch buyers data
  const fetchBuyers = async (page = 1, search = "") => {
    setLoading(page === 1);
    setSearchLoading(search !== "");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search })
      });

      const response = await fetch(`/api/buyer?${params}`);
      if (response.ok) {
        const data: BuyerResponse = await response.json();
        setBuyers(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalBuyers(data.meta.total);
      }
    } catch (error) {
      console.error('Failed to fetch buyers:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchBuyers(1, value);
  };

  const handlePageChange = (page: number) => {
    fetchBuyers(page, searchTerm);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Buyers</h1>
            <p className="text-slate-600 mt-1">Manage buyers and their purchase activities</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Buyer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Buyers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBuyers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {buyers.filter(b => b.is_active).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Buyers</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {buyers.filter(b => !b.is_active).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search buyers by name or phone..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {searchLoading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          <Button variant="outline" onClick={() => fetchBuyers(currentPage, searchTerm)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Buyers List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Buyers List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading buyers...</span>
              </div>
            ) : buyers.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                {searchTerm ? "No buyers found matching your search." : "No buyers found. Add your first buyer to get started."}
              </div>
            ) : (
              <div className="space-y-0">
                {buyers.map((buyer, index) => (
                  <div key={buyer.id}>
                    <div className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-lg">
                              {buyer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg text-slate-900">{buyer.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4" />
                                <span>{buyer.phone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Registered {formatDate(buyer.created_at)}</span>
                              </div>
                            </div>
                            <div className="text-xs text-slate-500">
                              Last updated: {formatDate(buyer.updated_at)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={buyer.is_active ? "success" : "secondary"}
                            className={buyer.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {buyer.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < buyers.length - 1 && <Separator />}
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
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalBuyers)} of {totalBuyers} buyers
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
