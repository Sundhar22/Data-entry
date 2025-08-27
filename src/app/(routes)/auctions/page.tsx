"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  Calendar,
  Activity,
  Clock,
  IndianRupee,
  Play,
  BarChart3,
  Loader2,
  RefreshCw,
  Trash2,
  AlertCircle,
  Save,
  Package,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface AuctionSession {
  id: string;
  date: string;
  commissioner_id: string;
  status: "ACTIVE" | "COMPLETED";
  payment_status: "PENDING" | "COMPLETED";
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

interface SessionFormData {
  date: string;
  status: "ACTIVE" | "COMPLETED";
}

export default function AuctionsPage() {
  const [sessions, setSessions] = useState<AuctionSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "COMPLETED"
  >("ALL");

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<AuctionSession | null>(
    null,
  );

  // Form states
  const [formData, setFormData] = useState<SessionFormData>({
    date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    status: "ACTIVE",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch sessions data
  const fetchSessions = async (page = 1, status?: string) => {
    setLoading(page === 1);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        sortBy: "date",
        sortOrder: "desc",
        ...(status && status !== "ALL" && { status }),
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
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handlePageChange = (page: number) => {
    fetchSessions(page, statusFilter === "ALL" ? undefined : statusFilter);
  };

  const handleStatusFilter = (status: "ALL" | "ACTIVE" | "COMPLETED") => {
    setStatusFilter(status);
    fetchSessions(1, status === "ALL" ? undefined : status);
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      status: "ACTIVE",
    });
    setFormError("");
  };

  const handleAddSession = async () => {
    if (!formData.date) {
      setFormError("Date is required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(formData.date).toISOString(),
          status: formData.status,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAddDialogOpen(false);
        resetForm();
        fetchSessions(
          currentPage,
          statusFilter === "ALL" ? undefined : statusFilter,
        );
      } else {
        // Handle specific error cases
        if (response.status === 409 && data.data?.existingSessionId) {
          // Session already exists for today
          setFormError(
            `${data.message}. Next session can be created: ${data.data.nextAvailableAtFormatted}`,
          );
        } else {
          setFormError(
            data.message || data.error?.message || "Failed to create session",
          );
        }
      }
    } catch (error) {
      console.error("Failed to create session:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSession = async () => {
    if (!selectedSession || !formData.date) {
      setFormError("Date is required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const response = await fetch(`/api/sessions/${selectedSession.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(formData.date).toISOString(),
          status: formData.status,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsEditDialogOpen(false);
        setSelectedSession(null);
        resetForm();
        fetchSessions(
          currentPage,
          statusFilter === "ALL" ? undefined : statusFilter,
        );
      } else {
        setFormError(data.error?.message || "Failed to update session");
      }
    } catch (error) {
      console.error("Failed to update session:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteDialog = (session: AuctionSession) => {
    setSelectedSession(session);
    setIsDeleteDialogOpen(true);
  };

  const openCompleteDialog = (session: AuctionSession) => {
    setSelectedSession(session);
    setIsCompleteDialogOpen(true);
  };

  const handleCompleteSession = async () => {
    if (!selectedSession) return;

    setFormLoading(true);
    setFormError("");

    try {
      const response = await fetch(`/api/sessions/${selectedSession.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "COMPLETED",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message ||
            errorData.message ||
            "Failed to complete session",
        );
      }

      // Refresh the sessions list
      await fetchSessions(currentPage, statusFilter);
      setIsCompleteDialogOpen(false);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error completing session:", error);
      setFormError(
        error instanceof Error ? error.message : "Failed to complete session",
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSession = async () => {
    if (!selectedSession) return;

    setFormLoading(true);
    setFormError("");

    try {
      const response = await fetch(`/api/sessions/${selectedSession.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message ||
            errorData.message ||
            "Failed to delete session",
        );
      }

      // Refresh the sessions list
      await fetchSessions(currentPage, statusFilter);
      setIsDeleteDialogOpen(false);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error deleting session:", error);
      setFormError(
        error instanceof Error ? error.message : "Failed to delete session",
      );
    } finally {
      setFormLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "COMPLETED":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate">
              Auction Sessions
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage auction sessions and monitor live activities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {sessions.filter((s) => s.status === "ACTIVE").length > 0 && (
              <Link
                href={`/auctions/live?session=${sessions.filter((s) => s.status === "ACTIVE")[0].id}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 w-full sm:w-auto text-sm"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  <span className="truncate">Live Auction</span>
                </Button>
              </Link>
            )}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-slate-50 shadow hover:bg-blue-700 h-9 px-4 py-2 w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="truncate">New Session</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Auction Session</DialogTitle>
                  <DialogDescription>
                    Start a new auction session for today&apos;s agricultural
                    trading.
                  </DialogDescription>
                </DialogHeader>

                {formError && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {formError}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">Session Date * (Today Only)</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      max={new Date().toISOString().split("T")[0]}
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Sessions can only be created for today&apos;s date.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="status">Initial Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as "ACTIVE" | "COMPLETED",
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddSession} disabled={formLoading}>
                    {formLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Session
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                Total Sessions
              </CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold">
                {totalSessions}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                Active Sessions
              </CardTitle>
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {sessions.filter((s) => s.status === "ACTIVE").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                Total Value
              </CardTitle>
              <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">
                {formatCurrency(
                  sessions.reduce(
                    (sum, s) => sum + (s.summary?.total_value || 0),
                    0,
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">
                Total Items
              </CardTitle>
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                {sessions.reduce(
                  (sum, s) => sum + (s.summary?.total_items || 0),
                  0,
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant={statusFilter === "ALL" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("ALL")}
              className="whitespace-nowrap"
            >
              All Sessions
            </Button>
            <Button
              variant={statusFilter === "ACTIVE" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("ACTIVE")}
              className="whitespace-nowrap"
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "COMPLETED" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("COMPLETED")}
              className="whitespace-nowrap"
            >
              Completed
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              fetchSessions(
                currentPage,
                statusFilter === "ALL" ? undefined : statusFilter,
              )
            }
            className="self-start sm:self-auto"
          >
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
                No auction sessions found. Create your first session to get
                started.
              </div>
            ) : (
              <div className="space-y-0 max-h-[70vh] overflow-y-auto">
                {sessions.map((session, index) => (
                  <div key={session.id}>
                    <div className="p-3 sm:p-4 lg:p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        <div className="flex items-start space-x-3 min-w-0">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              session.status === "ACTIVE"
                                ? "bg-green-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {session.status === "ACTIVE" ? (
                              <Activity className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-600" />
                            )}
                          </div>
                          <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-slate-900 truncate">
                                Session #{session.id.slice(-8).toUpperCase()}
                              </h3>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {getStatusBadge(session.status)}
                                {getPaymentStatusBadge(session.payment_status)}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm text-slate-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {formatDate(session.date)}
                                </span>
                              </div>
                              {session.summary && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="truncate">
                                    {session.summary.total_items} items
                                  </span>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="font-medium truncate">
                                    {formatCurrency(
                                      session.summary.total_value,
                                    )}
                                  </span>
                                </>
                              )}
                            </div>
                            {session.summary && (
                              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-slate-500">
                                <span>Paid: {session.summary.paid_items}</span>
                                <span>
                                  Pending: {session.summary.pending_items}
                                </span>
                                <span>
                                  Progress:{" "}
                                  {session.summary.completion_percentage}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:space-x-2 sm:space-y-0">
                          {session.status === "ACTIVE" && (
                            <>
                              <Link
                                href={`/auctions/live?session=${session.id}`}
                                className="w-full sm:w-auto"
                              >
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 w-full sm:w-auto text-xs sm:text-sm"
                                >
                                  <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="truncate">Go Live</span>
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openCompleteDialog(session)}
                                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 w-full sm:w-auto text-xs sm:text-sm"
                              >
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                <span className="truncate">Complete</span>
                              </Button>
                            </>
                          )}
                          <Link
                            href={`/auctions/items?session=${session.id}`}
                            className="w-full sm:w-auto"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 w-full sm:w-auto text-xs sm:text-sm"
                            >
                              <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              <span className="truncate">Manage Items</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(session)}
                            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 w-full sm:w-auto text-xs sm:text-sm"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="truncate">Delete</span>
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
              Showing {(currentPage - 1) * 10 + 1} to{" "}
              {Math.min(currentPage * 10, totalSessions)} of {totalSessions}{" "}
              sessions
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8"
                  >
                    {page}
                  </Button>
                ),
              )}
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

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Auction Session</DialogTitle>
              <DialogDescription>
                Update session details and settings.
              </DialogDescription>
            </DialogHeader>

            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {formError}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-date">
                  Session Date * (Cannot be changed)
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Session date cannot be modified after creation.
                </p>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "ACTIVE" | "COMPLETED",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditSession} disabled={formLoading}>
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Session
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Auction Session</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this session? This action cannot
                be undone and will remove all associated auction items.
              </DialogDescription>
            </DialogHeader>

            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {formError}
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSession}
                disabled={formLoading}
              >
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Session
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Complete Session Dialog */}
        <Dialog
          open={isCompleteDialogOpen}
          onOpenChange={setIsCompleteDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Complete Auction Session</DialogTitle>
              <DialogDescription>
                Are you sure you want to mark this session as completed? This
                will finalize the auction and prevent further changes.
              </DialogDescription>
            </DialogHeader>

            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {formError}
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCompleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCompleteSession}
                disabled={formLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Session
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
