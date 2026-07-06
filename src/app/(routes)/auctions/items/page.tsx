"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Box,
  Typography,
  Divider,
  Alert as MuiAlert,
} from "@mui/material";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Gavel,
  Loader2,
  RefreshCw,
  AlertCircle,
  Save,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface AuctionItem {
  id: string;
  session_id: string;
  farmer_id: string;
  product_id: string;
  buyer_id?: string | null;
  unit: string;
  quantity: number;
  rate?: number | null;
  bill_id?: string | null;
  created_at: string;
  updated_at: string;
  farmer?: {
    id: string;
    name: string;
    phone: string;
    village: string;
  };
  product?: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
  buyer?: {
    id: string;
    name: string;
    phone: string;
  } | null;
}

interface ItemResponse {
  success: boolean;
  data: AuctionItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ItemFormData {
  farmer_id: string;
  product_id: string;
  buyer_id: string;
}

interface LineItem {
  rowId: string;
  unit: string;
  quantity: number;
  rate: number;
}

interface EditFormData {
  farmer_id: string;
  product_id: string;
  buyer_id: string;
  unit: string;
  quantity: number;
  rate: number;
}
interface Farmer {
  id: string;
  name: string;
  village: string;
}

interface Product {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
}

interface Buyer {
  id: string;
  name: string;
}

const UNITS = [
  "KG",
  "GRAM",
  "QUINTAL",
  "TON",
  "BUNDLE",
  "PIECE",
  "LITRE",
  "MILLILITRE",
  "GALLON",
  "DOZEN",
  "BOX",
  "BAG",
  "OTHER",
];

export default function AuctionItemsPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const statusChipColor: Record<string, "warning" | "info" | "success"> = {
    pending: "warning",
    sold: "info",
    paid: "success",
  };
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "SOLD" | "PAID"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);

  // Form states
  const [formData, setFormData] = useState<ItemFormData>({
    farmer_id: "",
    product_id: "",
    buyer_id: "",
  });
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { rowId: crypto.randomUUID(), unit: "KG", quantity: 0, rate: 0 },
  ]);

  const [editFormData, setEditFormData] = useState<EditFormData>({
    farmer_id: "",
    product_id: "",
    buyer_id: "",
    unit: "KG",
    quantity: 0,
    rate: 0,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Search states for dropdowns
  const [farmerSearch, setFarmerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [buyerSearch, setBuyerSearch] = useState("");

  // Dropdown visibility states
  const [showFarmerDropdown, setShowFarmerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showBuyerDropdown, setShowBuyerDropdown] = useState(false);

  // Product preselection states
  const [preselectedProductId, setPreselectedProductId] = useState("");
  const [isPreselectionMode, setIsPreselectionMode] = useState(false);

  // Fetch auction items
  const fetchItems = useCallback(
    async (page = 1, limit = rowsPerPage) => {
      if (!sessionId) return;

      setLoading(page === 1);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        const response = await fetch(
          `/api/sessions/${sessionId}/items?${params}`,
        );
        if (response.ok) {
          const data: ItemResponse = await response.json();
          setItems(data.data);
          setCurrentPage(data.meta.page);
          //setTotalPages(data.meta.totalPages);
          setTotalItems(data.meta.total);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    },
    [sessionId, rowsPerPage],
  );

  // Fetch farmers, products, and buyers for dropdowns
  const fetchFormData = useCallback(async () => {
    try {
      const [farmersRes, productsRes, buyersRes] = await Promise.all([
        fetch("/api/farmers?limit=100&active=true"),
        fetch("/api/products?limit=100"),
        fetch("/api/buyers?limit=100&active=true"),
      ]);

      if (farmersRes.ok) {
        const farmersData = await farmersRes.json();
        setFarmers(farmersData.data || []);
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }

      if (buyersRes.ok) {
        const buyersData = await buyersRes.json();
        setBuyers(buyersData.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch form data:", error);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchItems();
      fetchFormData();
    }
  }, [sessionId, fetchItems, fetchFormData]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Client-side filtering will be handled in the render
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    fetchItems(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    fetchItems(1, newLimit);
  };

  // Export to CSV function
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Farmer",
      "Product",
      "Quantity",
      "Unit",
      "Rate",
      "Total",
      "Buyer",
      "Status",
      "Created",
    ];
    const csvData = items.map((item) => [
      item.id,
      item.farmer?.name || "Unknown",
      item.product?.name || "Unknown",
      item.quantity,
      item.unit,
      item.rate || 0,
      item.rate && item.quantity ? item.rate * item.quantity : 0,
      item.buyer?.name || "No Buyer",
      getItemStatus(item).label,
      new Date(item.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `auction_items_${sessionId}_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preselection helper functions
  const enablePreselectionMode = (productId: string) => {
    const selectedProduct = products.find((p) => p.id === productId);
    if (selectedProduct) {
      setPreselectedProductId(productId);
      setIsPreselectionMode(true);
      setFormData((prev) => ({ ...prev, product_id: productId }));
    }
  };

  const disablePreselectionMode = () => {
    setPreselectedProductId("");
    setIsPreselectionMode(false);
    setFormData((prev) => ({ ...prev, product_id: "" }));
  };

  const resetForm = () => {
    setFormData({
      farmer_id: "",
      product_id: isPreselectionMode ? preselectedProductId : "",
      buyer_id: "",
    });
    setLineItems([
      { rowId: crypto.randomUUID(), unit: "KG", quantity: 0, rate: 0 },
    ]);
    setFormError("");
  };

  const addLineItemRow = () => {
    setLineItems((prev) => [
      ...prev,
      {
        rowId: crypto.randomUUID(),
        unit: prev[prev.length - 1]?.unit || "KG",
        quantity: 0,
        rate: 0,
      },
    ]);
  };

  const removeLineItemRow = (rowId: string) => {
    setLineItems((prev) => prev.filter((row) => row.rowId !== rowId));
  };

  const updateLineItemRow = (
    rowId: string,
    updates: Partial<Omit<LineItem, "rowId">>,
  ) => {
    setLineItems((prev) =>
      prev.map((row) => (row.rowId === rowId ? { ...row, ...updates } : row)),
    );
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    if (isPreselectionMode) {
      const keepPreselection = window.confirm(
        "Keep Quick Add Mode active for more items?",
      );
      if (!keepPreselection) {
        disablePreselectionMode();
      }
    }
  };

  const handleAddItem = async () => {
    if (!formData.farmer_id || !formData.product_id) {
      setFormError("Farmer and product are required");
      return;
    }

    const validRows = lineItems.filter((row) => row.quantity > 0);
    if (validRows.length === 0) {
      setFormError("At least one row with a positive quantity is required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    let successCount = 0;
    const failedRows: string[] = [];

    for (const row of validRows) {
      try {
        const response = await fetch(`/api/sessions/${sessionId}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            farmer_id: formData.farmer_id,
            product_id: formData.product_id,
            unit: row.unit,
            quantity: row.quantity,
            ...(formData.buyer_id && { buyer_id: formData.buyer_id }),
            ...(row.rate > 0 && { rate: row.rate }),
          }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          successCount++;
        } else {
          failedRows.push(
            `${row.quantity} ${row.unit} (${data.error?.message || "failed"})`,
          );
        }
      } catch (error) {
        console.error("Failed to create item:", error);
        failedRows.push(`${row.quantity} ${row.unit} (network error)`);
      }
    }

    setFormLoading(false);

    if (failedRows.length > 0) {
      setFormError(
        `Added ${successCount} of ${validRows.length} item(s). Failed: ${failedRows.join(", ")}`,
      );
    } else if (isPreselectionMode) {
      setFormData((prev) => ({ ...prev, farmer_id: "", buyer_id: "" }));
      setLineItems([
        {
          rowId: crypto.randomUUID(),
          unit: lineItems[0]?.unit || "KG",
          quantity: 0,
          rate: 0,
        },
      ]);
    } else {
      setIsAddDialogOpen(false);
      resetForm();
    }

    fetchItems(currentPage);
  };

  const handleEditItem = async () => {
    if (
      !selectedItem ||
      !editFormData.farmer_id ||
      !editFormData.product_id ||
      editFormData.quantity <= 0
    ) {
      setFormError("Farmer, product, and positive quantity are required");
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const response = await fetch(
        `/api/sessions/${sessionId}/items/${selectedItem.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            farmer_id: editFormData.farmer_id,
            product_id: editFormData.product_id,
            unit: editFormData.unit,
            quantity: editFormData.quantity,
            ...(editFormData.buyer_id && { buyer_id: editFormData.buyer_id }),
            ...(editFormData.rate > 0 && { rate: editFormData.rate }),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setIsEditDialogOpen(false);
        setSelectedItem(null);
        fetchItems(currentPage);
      } else {
        setFormError(data.error?.message || "Failed to update item");
      }
    } catch (error) {
      console.error("Failed to update item:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const openEditDialog = (item: AuctionItem) => {
    setSelectedItem(item);
    setEditFormData({
      farmer_id: item.farmer_id,
      product_id: item.product_id,
      buyer_id: item.buyer_id || "",
      unit: item.unit,
      quantity: item.quantity,
      rate: item.rate || 0,
    });
    setFormError("");
    setIsEditDialogOpen(true);
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    setFormLoading(true);

    try {
      const response = await fetch(
        `/api/sessions/${sessionId}/items/${selectedItem.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedItem(null);
        fetchItems(currentPage);
      } else {
        const data = await response.json();
        setFormError(data.error?.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      setFormError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const openDeleteDialog = (item: AuctionItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getItemStatus = (item: AuctionItem) => {
    if (item.bill_id) {
      return {
        status: "paid",
        label: "Paid",
        color: "bg-green-100 text-green-800",
      };
    }
    if (item.buyer_id && item.rate) {
      return {
        status: "sold",
        label: "Sold",
        color: "bg-blue-100 text-blue-800",
      };
    }
    return {
      status: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    };
  };

  if (!sessionId) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Session Required</h2>
          <p className="text-slate-600">
            Please select a session to manage auction items.
          </p>
          <Link href="/auctions">
            <Button className="mt-4">Back to Sessions</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  const selectedFarmer =
    farmers.find((f) => f.id === formData.farmer_id) || null;
  const selectedProduct =
    products.find((p) => p.id === formData.product_id) || null;
  const selectedBuyer = buyers.find((b) => b.id === formData.buyer_id) || null;

  const editSelectedFarmer =
    farmers.find((f) => f.id === editFormData.farmer_id) || null;
  const editSelectedProduct =
    products.find((p) => p.id === editFormData.product_id) || null;
  const editSelectedBuyer =
    buyers.find((b) => b.id === editFormData.buyer_id) || null;
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/auctions">
              <Button variant="outline" size="sm" className="w-fit">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Sessions</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                Auction Items
              </h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                Manage items in this auction session
              </p>
            </div>
          </div>
          <Button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-slate-50 shadow hover:bg-blue-700 h-9 px-4 py-2 w-full sm:w-auto"
            onClick={() => {
              resetForm();
              setIsAddDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          <MuiDialog
            open={isAddDialogOpen}
            onClose={handleCloseAddDialog}
            fullWidth
            maxWidth="sm"
          >
            <MuiDialogTitle>
              {isPreselectionMode
                ? "Quick Add Mode — Add Item"
                : "Add Auction Item"}
            </MuiDialogTitle>
            <MuiDialogContent dividers>
              <Stack spacing={2.5} sx={{ mt: 0.5 }}>
                {isPreselectionMode && (
                  <MuiAlert severity="info">
                    Product is preselected — add rows below for each quantity,
                    unit, and rate you need to record for this farmer.
                  </MuiAlert>
                )}
                {formError && <MuiAlert severity="error">{formError}</MuiAlert>}

                <Autocomplete
                  options={farmers}
                  getOptionLabel={(f) => `${f.name} - ${f.village}`}
                  isOptionEqualToValue={(o, v) => o.id === v.id}
                  value={selectedFarmer}
                  onChange={(_e, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      farmer_id: value?.id || "",
                    }))
                  }
                  noOptionsText="No farmers found"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Farmer *"
                      placeholder="Search farmers..."
                    />
                  )}
                />

                <Autocomplete
                  options={products}
                  getOptionLabel={(p) => `${p.name} (${p.category.name})`}
                  isOptionEqualToValue={(o, v) => o.id === v.id}
                  value={selectedProduct}
                  disabled={isPreselectionMode}
                  onChange={(_e, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      product_id: value?.id || "",
                    }))
                  }
                  noOptionsText="No products found"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product *"
                      placeholder={
                        isPreselectionMode
                          ? "Product preselected"
                          : "Search products..."
                      }
                    />
                  )}
                />

                <Autocomplete
                  options={buyers}
                  getOptionLabel={(b) => b.name}
                  isOptionEqualToValue={(o, v) => o.id === v.id}
                  value={selectedBuyer}
                  onChange={(_e, value) =>
                    setFormData((prev) => ({
                      ...prev,
                      buyer_id: value?.id || "",
                    }))
                  }
                  noOptionsText="No buyers found"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buyer (Optional)"
                      placeholder="Search buyers..."
                    />
                  )}
                />

                <Divider />

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                    Quantity, Unit & Rate
                  </Typography>
                  <Stack spacing={1.5}>
                    {lineItems.map((row) => (
                      <Stack
                        key={row.rowId}
                        direction="row"
                        spacing={1}
                      //alignItems="flex-start"
                      >
                        <TextField
                          label="Quantity *"
                          type="number"
                          size="small"
                          value={row.quantity === 0 ? "" : row.quantity}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              updateLineItemRow(row.rowId, { quantity: 0 });
                            } else {
                              const numValue = parseFloat(value);
                              if (!isNaN(numValue) && numValue >= 0) {
                                updateLineItemRow(row.rowId, {
                                  quantity: numValue,
                                });
                              }
                            }
                          }}
                          //inputProps={{ min: 0, step: 0.01 }}
                          sx={{ flex: 1 }}
                        />
                        <FormControl size="small" sx={{ minWidth: 110 }}>
                          <InputLabel>Unit</InputLabel>
                          <Select
                            label="Unit"
                            value={row.unit}
                            onChange={(e) =>
                              updateLineItemRow(row.rowId, {
                                unit: e.target.value,
                              })
                            }
                          >
                            {UNITS.map((unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          label="Rate (Optional)"
                          type="number"
                          size="small"
                          value={row.rate === 0 ? "" : row.rate}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              updateLineItemRow(row.rowId, { rate: 0 });
                            } else {
                              const numValue = parseFloat(value);
                              if (!isNaN(numValue) && numValue >= 0) {
                                updateLineItemRow(row.rowId, {
                                  rate: numValue,
                                });
                              }
                            }
                          }}
                          //inputProps={{ min: 0, step: 0.01 }}
                          sx={{ flex: 1 }}
                        />
                        <Tooltip
                          title={
                            lineItems.length === 1
                              ? "At least one row required"
                              : "Remove row"
                          }
                        >
                          <span>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeLineItemRow(row.rowId)}
                              disabled={lineItems.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Stack>
                    ))}
                  </Stack>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addLineItemRow}
                    className="mt-3"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Row
                  </Button>

                  {lineItems.some((r) => r.rate > 0 && r.quantity > 0) && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 1.5,
                        bgcolor: "grey.50",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Estimated total:{" "}
                        <strong>
                          {formatCurrency(
                            lineItems.reduce(
                              (sum, r) =>
                                sum + (r.rate > 0 ? r.rate * r.quantity : 0),
                              0,
                            ),
                          )}
                        </strong>{" "}
                        across {lineItems.filter((r) => r.quantity > 0).length}{" "}
                        item(s)
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Stack>
            </MuiDialogContent>
            <MuiDialogActions sx={{ px: 3, py: 2 }}>
              <Button variant="outline" onClick={handleCloseAddDialog}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} disabled={formLoading}>
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isPreselectionMode
                      ? "Add & Continue"
                      : lineItems.filter((r) => r.quantity > 0).length > 1
                        ? `Add ${lineItems.filter((r) => r.quantity > 0).length} Items`
                        : "Add Item"}
                  </>
                )}
              </Button>
            </MuiDialogActions>
          </MuiDialog>
        </div>

        {/* Product Preselection Controls */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900">Quick Add Mode</h3>
                <p className="text-sm text-slate-600">
                  {isPreselectionMode
                    ? `Preselected: ${products.find((p) => p.id === preselectedProductId)?.name || "Unknown Product"}`
                    : "Select a product to add multiple items quickly without reselecting the product each time"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!isPreselectionMode ? (
                  <div className="flex items-center gap-2">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => {
                        if (e.target.value) {
                          enablePreselectionMode(e.target.value);
                        }
                      }}
                      value=""
                    >
                      <option value="">Select Product to Preselect</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.category.name})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                      Quick Add Mode Active
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={disablePreselectionMode}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Disable Quick Add
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"> */}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Total Items */}
        {/*     </CardTitle> */}
        {/*     <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold">{totalItems}</div> */}
        {/*     <p className="text-xs text-muted-foreground truncate"> */}
        {/*       {statusFilter !== "ALL" */}
        {/*         ? `${items.filter((i) => { */}
        {/*           const status = getItemStatus(i).status; */}
        {/*           return statusFilter === "PENDING" */}
        {/*             ? status === "pending" */}
        {/*             : statusFilter === "SOLD" */}
        {/*               ? status === "sold" */}
        {/*               : statusFilter === "PAID" */}
        {/*                 ? status === "paid" */}
        {/*                 : true; */}
        {/*         }).length */}
        {/*         } ${statusFilter.toLowerCase()}` */}
        {/*         : "in this session"} */}
        {/*     </p> */}
        {/*   </CardContent> */}
        {/* </Card> */}

        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Sold Items */}
        {/*     </CardTitle> */}
        {/*     <Gavel className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold text-blue-600"> */}
        {/*       {items.filter((i) => i.buyer_id && i.rate).length} */}
        {/*     </div> */}
        {/*     <p className="text-xs text-muted-foreground truncate"> */}
        {/*       {totalItems > 0 */}
        {/*         ? `${Math.round((items.filter((i) => i.buyer_id && i.rate).length / totalItems) * 100)}% completion` */}
        {/*         : "0% completion"} */}
        {/*     </p> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/**/}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Paid Items */}
        {/*     </CardTitle> */}
        {/*     <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold text-green-600"> */}
        {/*       {items.filter((i) => i.bill_id).length} */}
        {/*     </div> */}
        {/*     <p className="text-xs text-muted-foreground truncate"> */}
        {/*       {totalItems > 0 */}
        {/*         ? `${Math.round((items.filter((i) => i.bill_id).length / totalItems) * 100)}% paid` */}
        {/*         : "0% paid"} */}
        {/*     </p> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/**/}
        {/* <Card> */}
        {/*   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
        {/*     <CardTitle className="text-xs sm:text-sm font-medium truncate"> */}
        {/*       Total Value */}
        {/*     </CardTitle> */}
        {/*     <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" /> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className="pt-2"> */}
        {/*     <div className="text-lg sm:text-2xl font-bold text-purple-600"> */}
        {/*       {formatCurrency( */}
        {/*         items.reduce((sum, i) => sum + (i.rate || 0) * i.quantity, 0), */}
        {/*       )} */}
        {/*     </div> */}
        {/*     <p className="text-xs text-muted-foreground truncate"> */}
        {/*       Avg:{" "} */}
        {/*       {items.length > 0 */}
        {/*         ? formatCurrency( */}
        {/*           items.reduce( */}
        {/*             (sum, i) => sum + (i.rate || 0) * i.quantity, */}
        {/*             0, */}
        {/*           ) / items.length, */}
        {/*         ) */}
        {/*         : "₹0"} */}
        {/*     </p> */}
        {/*   </CardContent> */}
        {/* </Card> */}
        {/* </div> */}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button
            variant={statusFilter === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("ALL")}
            className="text-xs px-3 py-2"
          >
            All Items
          </Button>
          <Button
            variant={statusFilter === "PENDING" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("PENDING")}
            className="text-xs px-3 py-2"
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "SOLD" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("SOLD")}
            className="text-xs px-3 py-2"
          >
            Sold
          </Button>
          <Button
            variant={statusFilter === "PAID" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("PAID")}
            className="text-xs px-3 py-2"
          >
            Paid
          </Button>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchItems(currentPage)}
              className="flex-1 sm:flex-none"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="flex-1 sm:flex-none"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="sm:inline">Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Auction Items
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading items...</span>
              </div>
            ) : (
              (() => {
                const filteredItems = items.filter((item) => {
                  if (searchTerm) {
                    const searchLower = searchTerm.toLowerCase();
                    const matchesSearch =
                      item.farmer?.name?.toLowerCase().includes(searchLower) ||
                      item.product?.name?.toLowerCase().includes(searchLower) ||
                      item.buyer?.name?.toLowerCase().includes(searchLower) ||
                      item.unit.toLowerCase().includes(searchLower);
                    if (!matchesSearch) return false;
                  }

                  if (statusFilter !== "ALL") {
                    const status = getItemStatus(item).status;
                    if (
                      (statusFilter === "PENDING" && status !== "pending") ||
                      (statusFilter === "SOLD" && status !== "sold") ||
                      (statusFilter === "PAID" && status !== "paid")
                    ) {
                      return false;
                    }
                  }

                  return true;
                });

                if (filteredItems.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-600">
                      {searchTerm
                        ? "No items match your search criteria."
                        : "No auction items found. Add your first item to get started."}
                    </div>
                  );
                }

                return (
                  <>
                    {/* Mobile: table unsupported */}
                    <div className="md:hidden text-center py-12 px-4 text-slate-600">
                      <AlertCircle className="h-8 w-8 mx-auto mb-3 text-slate-400" />
                      <p className="font-medium">
                        Table view isn&apos;t supported on small screens.
                      </p>
                      <p className="text-sm mt-1">
                        Please use a tablet or larger device to view auction
                        items.
                      </p>
                    </div>

                    {/* Tablet & up: MUI table */}
                    <div className="hidden md:block">
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell>Farmer</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Rate</TableCell>
                              <TableCell>Buyer</TableCell>
                              <TableCell align="right">Total</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell align="center">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredItems.map((item) => {
                              const status = getItemStatus(item);
                              const total =
                                item.rate && item.quantity
                                  ? item.rate * item.quantity
                                  : 0;
                              return (
                                <TableRow key={item.id} hover>
                                  <TableCell>
                                    <div className="font-medium text-slate-900">
                                      {item.product?.name || "Unknown Product"}
                                    </div>
                                    {item.product?.category?.name && (
                                      <div className="text-xs text-slate-500">
                                        {item.product.category.name}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      {item.farmer?.name || "Unknown Farmer"}
                                    </div>
                                    {item.farmer?.village && (
                                      <div className="text-xs text-slate-500">
                                        {item.farmer.village}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    {item.quantity} {item.unit}
                                  </TableCell>
                                  <TableCell align="right">
                                    {item.rate
                                      ? formatCurrency(item.rate)
                                      : "—"}
                                  </TableCell>
                                  <TableCell>
                                    {item.buyer?.name || "No Buyer"}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    className="font-medium"
                                  >
                                    {total > 0 ? formatCurrency(total) : "—"}
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={status.label}
                                      size="small"
                                      color={statusChipColor[status.status]}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <div className="flex items-center justify-center gap-1">
                                      {!item.buyer_id && !item.rate && (
                                        <Tooltip title="Complete Sale">
                                          <IconButton
                                            size="small"
                                            color="success"
                                            onClick={() => openEditDialog(item)}
                                          >
                                            <Gavel className="h-4 w-4" />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                      <Tooltip title="Edit">
                                        <IconButton
                                          size="small"
                                          onClick={() => openEditDialog(item)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton
                                          size="small"
                                          color="error"
                                          onClick={() => openDeleteDialog(item)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </>
                );
              })()
            )}
          </CardContent>

          {/* Pagination - tablet & up only */}
          <div className="hidden md:block border-t">
            <TablePagination
              component="div"
              count={totalItems}
              page={currentPage - 1}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </div>
        </Card>

        {/* Pagination */}

        {/* Edit Dialog */}
        <MuiDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <MuiDialogTitle>Edit Auction Item</MuiDialogTitle>
          <MuiDialogContent dividers>
            <Stack spacing={2.5} sx={{ mt: 0.5 }}>
              {formError && <MuiAlert severity="error">{formError}</MuiAlert>}

              <Autocomplete
                options={farmers}
                getOptionLabel={(f) => `${f.name} - ${f.village}`}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                value={editSelectedFarmer}
                onChange={(_e, value) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    farmer_id: value?.id || "",
                  }))
                }
                noOptionsText="No farmers found"
                renderInput={(params) => (
                  <TextField {...params} label="Farmer *" />
                )}
              />

              <Autocomplete
                options={products}
                getOptionLabel={(p) => `${p.name} (${p.category.name})`}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                value={editSelectedProduct}
                onChange={(_e, value) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    product_id: value?.id || "",
                  }))
                }
                noOptionsText="No products found"
                renderInput={(params) => (
                  <TextField {...params} label="Product *" />
                )}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Quantity *"
                  type="number"
                  fullWidth
                  value={
                    editFormData.quantity === 0 ? "" : editFormData.quantity
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setEditFormData((prev) => ({ ...prev, quantity: 0 }));
                    } else {
                      const numValue = parseFloat(value);
                      if (!isNaN(numValue) && numValue >= 0) {
                        setEditFormData((prev) => ({
                          ...prev,
                          quantity: numValue,
                        }));
                      }
                    }
                  }}
                //inputProps={{ min: 0, step: 0.01 }}
                />
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    label="Unit"
                    value={editFormData.unit}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        unit: e.target.value,
                      }))
                    }
                  >
                    {UNITS.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Autocomplete
                options={buyers}
                getOptionLabel={(b) => b.name}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                value={editSelectedBuyer}
                onChange={(_e, value) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    buyer_id: value?.id || "",
                  }))
                }
                noOptionsText="No buyers found"
                renderInput={(params) => (
                  <TextField {...params} label="Buyer (Optional)" />
                )}
              />

              <TextField
                label={`Rate per ${editFormData.unit} (Optional)`}
                type="number"
                fullWidth
                value={editFormData.rate === 0 ? "" : editFormData.rate}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setEditFormData((prev) => ({ ...prev, rate: 0 }));
                  } else {
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue) && numValue >= 0) {
                      setEditFormData((prev) => ({ ...prev, rate: numValue }));
                    }
                  }
                }}
                //inputProps={{ min: 0, step: 0.01 }}
                helperText={
                  editFormData.rate > 0 && editFormData.quantity > 0
                    ? `Total: ${formatCurrency(editFormData.rate * editFormData.quantity)}`
                    : " "
                }
              />
            </Stack>
          </MuiDialogContent>
          <MuiDialogActions sx={{ px: 3, py: 2 }}>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditItem} disabled={formLoading}>
              {formLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Item
                </>
              )}
            </Button>
          </MuiDialogActions>
        </MuiDialog>

        {/* Delete Confirmation Dialog */}
        <MuiDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <MuiDialogTitle>Delete Auction Item</MuiDialogTitle>
          <MuiDialogContent>
            <Typography variant="body2" color="text.secondary">
              Are you sure you want to delete this auction item? This action
              cannot be undone.
            </Typography>
            {formError && (
              <MuiAlert severity="error" sx={{ mt: 2 }}>
                {formError}
              </MuiAlert>
            )}
          </MuiDialogContent>
          <MuiDialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteItem}
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
                  Delete Item
                </>
              )}
            </Button>
          </MuiDialogActions>
        </MuiDialog>
      </div>
    </DashboardLayout>
  );
}
