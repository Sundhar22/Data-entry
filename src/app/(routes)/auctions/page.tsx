"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus,
  Calendar,
  Activity,
  Clock,
  IndianRupee,
  Eye,
  Play,
  BarChart3,
  Loader2,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface AuctionSession {
  id: string;
  date: string;
  commissioner_id: string;
  status: 'ACTIVE' | 'COMPLETED';
  payment_status: 'PENDING' | 'COMPLETED';
  created_at: string;
  updated_at: string;
  commissioner?: {
    name: string;
  };
  summary?: {
    total_items: number;
    total_value: number;
    paid_items: number;
    pending_items: number;
    completion_percentage: number;
  };
}

interface SessionResponse {
  success: boolean;
  data: AuctionSession[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AuctionsPage() {
  const [sessions, setSessions] = useState<AuctionSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  // Fetch sessions data
  const fetchSessions = async (page = 1, status?: string) => {
    setLoading(page === 1);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sortBy: "date",
        sortOrder: "desc",
        ...(status && status !== 'ALL' && { status })
      });

      const response = await fetch(`/api/sessions?${params}`);
      if (response.ok) {
        const data: SessionResponse = await response.json();
        setSessions(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalSessions(data.meta.total);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handlePageChange = (page: number) => {
    fetchSessions(page, statusFilter === 'ALL' ? undefined : statusFilter);
  };

  const handleStatusFilter = (status: 'ALL' | 'ACTIVE' | 'COMPLETED') => {
    setStatusFilter(status);
    fetchSessions(1, status === 'ALL' ? undefined : status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'COMPLETED':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Auction Sessions</h1>
            <p className="text-slate-600 mt-1">Manage auction sessions and monitor live activities</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auctions/live">
              <Button variant="outline" className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100">
                <Activity className="h-4 w-4 mr-2" />
                Live Auction
              </Button>
            </Link>
            <Link href="/auctions/session">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {sessions.filter(s => s.status === 'ACTIVE').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <IndianRupee className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(sessions.reduce((sum, s) => sum + (s.summary?.total_value || 0), 0))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {sessions.reduce((sum, s) => sum + (s.summary?.total_items || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={statusFilter === 'ALL' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilter('ALL')}
            >
              All Sessions
            </Button>
            <Button 
              variant={statusFilter === 'ACTIVE' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilter('ACTIVE')}
            >
              Active
            </Button>
            <Button 
              variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilter('COMPLETED')}
            >
              Completed
            </Button>
          </div>
          <Button variant="outline" onClick={() => fetchSessions(currentPage, statusFilter === 'ALL' ? undefined : statusFilter)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Sessions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Auction Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading sessions...</span>
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                No auction sessions found. Create your first session to get started.
              </div>
            ) : (
              <div className="space-y-0">
                {sessions.map((session, index) => (
                  <div key={session.id}>
                    <div className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            session.status === 'ACTIVE' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {session.status === 'ACTIVE' ? (
                              <Activity className="h-6 w-6 text-green-600" />
                            ) : (
                              <Clock className="h-6 w-6 text-gray-600" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg text-slate-900">
                                Session #{session.id.slice(-8).toUpperCase()}
                              </h3>
                              {getStatusBadge(session.status)}
                              {getPaymentStatusBadge(session.payment_status)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(session.date)}</span>
                              </div>
                              {session.summary && (
                                <>
                                  <span>•</span>
                                  <span>{session.summary.total_items} items</span>
                                  <span>•</span>
                                  <span>{formatCurrency(session.summary.total_value)}</span>
                                </>
                              )}
                            </div>
                            {session.summary && (
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span>Paid: {session.summary.paid_items}</span>
                                <span>Pending: {session.summary.pending_items}</span>
                                <span>Progress: {session.summary.completion_percentage}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {session.status === 'ACTIVE' && (
                            <Link href="/auctions/live">
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                <Play className="h-4 w-4 mr-2" />
                                Go Live
                              </Button>
                            </Link>
                          )}
                          <Link href={`/auctions/session/${session.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < sessions.length - 1 && <Separator />}
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
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalSessions)} of {totalSessions} sessions
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
