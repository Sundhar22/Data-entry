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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Chip,
  LinearProgress,
} from "@mui/material";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Form states
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

  const localDate = today.toISOString().slice(0, 10);
  const [formData, setFormData] = useState<SessionFormData>({
    date: localDate,
    status: "ACTIVE",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const statusChipColor: Record<string, "success" | "default"> = {
    ACTIVE: "success",
    COMPLETED: "default",
  };

  const paymentChipColor: Record<string, "warning" | "success"> = {
    PENDING: "warning",
    COMPLETED: "success",
  };
  // Fetch sessions data
  const fetchSessions = async (
    page = 1,
    status?: string,
    limit = rowsPerPage,
  ) => {
    setLoading(page === 1);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy: "date",
        sortOrder: "desc",
        ...(status && status !== "ALL" && { status }),
      });

      const response = await fetch(`/api/sessions?${params}`);
      if (response.ok) {
        const data: SessionResponse = await response.json();
        setSessions(data.data);
        setCurrentPage(data.meta.page);
        //setTotalPages(data.meta.totalPages);
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

  const handleChangePage = (_event: unknown, newPage: number) => {
    fetchSessions(
      newPage + 1,
      statusFilter === "ALL" ? undefined : statusFilter,
      rowsPerPage,
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    fetchSessions(
      1,
      statusFilter === "ALL" ? undefined : statusFilter,
      newLimit,
    );
  };

  const handleStatusFilter = (status: "ALL" | "ACTIVE" | "COMPLETED") => {
    setStatusFilter(status);
    fetchSessions(1, status === "ALL" ? undefined : status, rowsPerPage);
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
                      min={localDate}
                      max={localDate}
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
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"> */}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Total Sessions */}
        {/*     </CardTitle> */}
        {/*     <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold"> */}
        {/*       {totalSessions} */}
        {/*     </div> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/**/}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Active Sessions */}
        {/*     </CardTitle> */}
        {/*     <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold text-green-600"> */}
        {/*       {sessions.filter((s) => s.status === "ACTIVE").length} */}
        {/*     </div> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/**/}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Total Value */}
        {/*     </CardTitle> */}
        {/*     <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold text-blue-600"> */}
        {/*       {formatCurrency( */}
        {/*         sessions.reduce( */}
        {/*           (sum, s) => sum + (s.summary?.total_value || 0), */}
        {/*           0, */}
        {/*         ), */}
        {/*       )} */}
        {/*     </div> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/**/}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Total Items */}
        {/*     </CardTitle> */}
        {/*     <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold text-purple-600"> */}
        {/*       {sessions.reduce( */}
        {/*         (sum, s) => sum + (s.summary?.total_items || 0), */}
        {/*         0, */}
        {/*       )} */}
        {/*     </div> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/* </div> */}

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
              <>
                {/* Mobile: table unsupported */}
                <div className="md:hidden text-center py-12 px-4 text-slate-600">
                  <AlertCircle className="h-8 w-8 mx-auto mb-3 text-slate-400" />
                  <p className="font-medium">
                    Table view isn&apos;t supported on small screens.
                  </p>
                  <p className="text-sm mt-1">
                    Please use a tablet or larger device to view auction
                    sessions.
                  </p>
                </div>

                {/* Tablet & up: MUI table */}
                <div className="hidden md:block">
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Session</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Payment</TableCell>
                          <TableCell align="right">Items</TableCell>
                          <TableCell align="right">Value</TableCell>
                          <TableCell>Progress</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sessions.map((session) => (
                          <TableRow key={session.id} hover>
                            <TableCell>
                              <div className="font-medium text-slate-900">
                                #{session.id.slice(-8).toUpperCase()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {formatDate(session.date)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  session.status === "ACTIVE"
                                    ? "Active"
                                    : "Completed"
                                }
                                size="small"
                                color={statusChipColor[session.status]}
                                variant={
                                  session.status === "ACTIVE"
                                    ? "filled"
                                    : "outlined"
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  session.payment_status === "PENDING"
                                    ? "Pending"
                                    : "Completed"
                                }
                                size="small"
                                color={paymentChipColor[session.payment_status]}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              {session.summary ? (
                                <div>
                                  <div>{session.summary.total_items}</div>
                                  <div className="text-xs text-slate-500">
                                    {session.summary.paid_items} paid ·{" "}
                                    {session.summary.pending_items} pending
                                  </div>
                                </div>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell align="right" className="font-medium">
                              {session.summary
                                ? formatCurrency(session.summary.total_value)
                                : "—"}
                            </TableCell>
                            <TableCell>
                              {session.summary ? (
                                <div className="flex items-center gap-2 min-w-[100px]">
                                  <LinearProgress
                                    variant="determinate"
                                    value={
                                      session.summary.completion_percentage
                                    }
                                    sx={{
                                      width: 60,
                                      height: 6,
                                      borderRadius: 3,
                                    }}
                                  />
                                  <span className="text-xs text-slate-600 whitespace-nowrap">
                                    {session.summary.completion_percentage}%
                                  </span>
                                </div>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <div className="flex items-center justify-center gap-1">
                                {session.status === "ACTIVE" && (
                                  <>
                                    <Tooltip title="Go Live">
                                      <Link
                                        href={`/auctions/live?session=${session.id}`}
                                      >
                                        <IconButton size="small" color="error">
                                          <Play className="h-4 w-4" />
                                        </IconButton>
                                      </Link>
                                    </Tooltip>
                                    <Tooltip title="Complete Session">
                                      <IconButton
                                        size="small"
                                        color="success"
                                        onClick={() =>
                                          openCompleteDialog(session)
                                        }
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                )}
                                <Tooltip title="Manage Items">
                                  <Link
                                    href={`/auctions/items?session=${session.id}`}
                                  >
                                    <IconButton size="small" color="primary">
                                      <Package className="h-4 w-4" />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => openDeleteDialog(session)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </>
            )}
          </CardContent>

          {/* Pagination - tablet & up only */}
          <div className="hidden md:block border-t">
            <TablePagination
              component="div"
              count={totalSessions}
              page={currentPage - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </div>
        </Card>

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
