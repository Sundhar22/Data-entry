"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Calendar,
  AlertCircle,
  Save,
} from "lucide-react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation, useApiQuery } from "@/client/hooks/useApi";

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

interface BuyerFormData {
  name: string;
  phone: string;
  is_active: boolean;
}

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const queryClient = useQueryClient();

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

  // Form states
  const [formData, setFormData] = useState<BuyerFormData>({
    name: "",
    phone: "",
    is_active: true,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const buyersQuery = useApiQuery<BuyerResponse>(
    ["buyers", { page: currentPage, limit: 10, search: searchTerm }],
    `/api/buyers?page=${currentPage}&limit=10${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""}`,
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setBuyers(data.data);
        setCurrentPage(data.meta?.page || 1);
        setTotalPages(data.meta?.totalPages || 1);
        setTotalBuyers(data.meta?.total || 0);
        setLoading(false);
        setSearchLoading(false);
      },
      onError: () => {
        setLoading(false);
        setSearchLoading(false);
      },
    },
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchLoading(true);
    queryClient.invalidateQueries({ queryKey: ["buyers"] });
  };

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      is_active: true,
    });
    setFormError("");
  };

  const createBuyer = useApiMutation<BuyerFormData, { success: boolean }>(
    "/api/buyers",
    "POST",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["buyers"] });
      },
    },
  );

  const handleAddBuyer = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError("Name and phone are required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const data = await createBuyer.mutateAsync(formData);
      if (
        data &&
        (data as unknown as { success?: boolean }).success !== false
      ) {
        setIsAddDialogOpen(false);
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["buyers"] });
      } else {
        setFormError("Failed to create buyer");
      }
    } catch (error) {
      console.error("Failed to create buyer:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const updateBuyer = useApiMutation<BuyerFormData, { success: boolean }>(
    selectedBuyer ? `/api/buyers/${selectedBuyer.id}` : "/api/buyers",
    "PUT",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["buyers"] });
      },
    },
  );

  const handleEditBuyer = async () => {
    if (!selectedBuyer || !formData.name.trim() || !formData.phone.trim()) {
      setFormError("Name and phone are required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const data = await updateBuyer.mutateAsync(formData);
      if (
        data &&
        (data as unknown as { success?: boolean }).success !== false
      ) {
        setIsEditDialogOpen(false);
        setSelectedBuyer(null);
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["buyers"] });
      } else {
        setFormError("Failed to update buyer");
      }
    } catch (error) {
      console.error("Failed to update buyer:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const deleteBuyer = useApiMutation<undefined, { success: boolean }>(
    selectedBuyer ? `/api/buyers/${selectedBuyer.id}` : "/api/buyers",
    "DELETE",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["buyers"] });
      },
    },
  );

  const handleDeleteBuyer = async () => {
    if (!selectedBuyer) return;

    setFormLoading(true);

    try {
      const data = await deleteBuyer.mutateAsync(
        undefined as unknown as undefined,
      );
      if (
        data &&
        (data as unknown as { success?: boolean }).success !== false
      ) {
        setIsDeleteDialogOpen(false);
        setSelectedBuyer(null);
        queryClient.invalidateQueries({ queryKey: ["buyers"] });
      } else {
        setFormError("Failed to delete buyer");
      }
    } catch (error) {
      console.error("Failed to delete buyer:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const openEditDialog = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setFormData({
      name: buyer.name,
      phone: buyer.phone,
      is_active: buyer.is_active,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setIsDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const buyersList = buyers.length > 0 ? buyers : (buyersQuery.data?.data ?? []);
  const totalBuyersDisplay = buyersQuery.data?.meta?.total ?? totalBuyers;
  return (
    <DashboardLayout>
      <ErrorBoundary>
        <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-900">
                Buyers
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Manage buyers and their purchase activities
              </p>
            </div>
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={(open) => {
                if (open) resetForm();
                setIsAddDialogOpen(open);
              }}
            >
              <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-slate-50 shadow hover:bg-blue-700 h-9 px-4 py-2">
                <Plus className="h-4 w-4 mr-2" />
                Add New Buyer
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Buyer</DialogTitle>
                  <DialogDescription>
                    Create a new buyer profile for your agricultural business.
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
                    <Label htmlFor="name">Buyer Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter buyer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked: boolean) =>
                        setFormData((prev) => ({ ...prev, is_active: checked }))
                      }
                    />
                    <Label htmlFor="is_active">Active Status</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddBuyer} disabled={formLoading}>
                    {formLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Buyer
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium truncate">
                  Total Buyers
                </CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-lg sm:text-2xl font-bold">
                  {totalBuyersDisplay}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium truncate">
                  Active Buyers
                </CardTitle>
                <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-lg sm:text-2xl font-bold text-green-600">
                  {buyersList.filter((b) => b.is_active).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium truncate">
                  Inactive Buyers
                </CardTitle>
                <UserX className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-lg sm:text-2xl font-bold text-red-600">
                  {buyersList.filter((b) => !b.is_active).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search buyers by name or phone..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                className="pl-10"
              />
              {searchLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["buyers"] })
              }
              className="w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Buyers List */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Buyers List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
              {buyersQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-3 text-slate-600">Loading buyers...</span>
                </div>
              ) : buyersList.length === 0 ? (
                <div className="text-center py-12 text-slate-600">
                  {searchTerm
                    ? "No buyers found matching your search."
                    : "No buyers found. Add your first buyer to get started."}
                </div>
              ) : (
                <div className="space-y-0 relative max-h-[70vh] overflow-y-auto">
                  {buyersList.map((buyer, index) => (
                    <div key={buyer.id}>
                      <div className="p-3 sm:p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-purple-600 font-semibold text-sm sm:text-base">
                                {buyer.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                              <h3 className="font-semibold text-sm sm:text-base text-slate-900 truncate">
                                {buyer.name}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-3 text-xs text-slate-600">
                                <div className="flex items-center space-x-1 min-w-0">
                                  <Phone className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {buyer.phone}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1 min-w-0">
                                  <Calendar className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">
                                    Registered {formatDate(buyer.created_at)}
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-slate-500 truncate">
                                Last updated: {formatDate(buyer.updated_at)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end sm:justify-start space-x-2">
                            <Badge
                              variant={
                                buyer.is_active ? "success" : "secondary"
                              }
                              className={`${buyer.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} text-xs px-2 py-0.5`}
                            >
                              {buyer.is_active ? "Active" : "Inactive"}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <div
                                className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                onClick={() => openEditDialog(buyer)}
                              >
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </div>
                              <div
                                className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                onClick={() => openDeleteDialog(buyer)}
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="sr-only">Delete</span>
                              </div>
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
                Showing {(currentPage - 1) * 10 + 1} to{" "}
                {Math.min(currentPage * 10, totalBuyers)} of {totalBuyers}{" "}
                buyers
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
                <DialogTitle>Edit Buyer</DialogTitle>
                <DialogDescription>
                  Update buyer information and settings.
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
                  <Label htmlFor="edit-name">Buyer Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter buyer name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone Number *</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked: boolean) =>
                      setFormData((prev) => ({ ...prev, is_active: checked }))
                    }
                  />
                  <Label htmlFor="edit-is_active">Active Status</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditBuyer} disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Buyer
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Buyer</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {selectedBuyer?.name}? This
                  action cannot be undone.
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
                  onClick={handleDeleteBuyer}
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
                      Delete Buyer
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ErrorBoundary>
    </DashboardLayout>
  );
}
