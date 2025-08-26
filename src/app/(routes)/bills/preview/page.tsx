"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import DesktopOnly from "@/components/ui/desktop-only";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  FileText,
  User,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";

interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
}

interface Product {
  id: string;
  name: string;
  category: { id: string; name: string } | string;
  current_price?: number;
}

interface Session {
  id: string;
  date: string;
  status: string;
}

interface BillPreview {
  farmer_id: string;
  product_id: string;
  session_id: string;
  farmer_name: string;
  product_name: string;
  session_date: Date;
  items: Array<{
    id: string;
    quantity: number;
    rate: number;
    unit: string;
    amount: number;
  }>;
  total_quantity: number;
  total_bags: number;
  gross_amount: number;
  commission_rate: number;
  commission_amount: number;
  suggested_other_charges: Record<string, number>;
  net_payable: number;
}

interface PreviewResponse {
  success: boolean;
  data: {
    farmer: {
      name: string;
      village: string;
    };
    previews: BillPreview[];
    summary: {
      total_previews: number;
      total_gross_amount: number;
      total_net_payable: number;
    };
  };
}

export default function BillPreviewPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [sessionSearchTerm, setSessionSearchTerm] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [showFarmerDropdown, setShowFarmerDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatingBills, setGeneratingBills] = useState(false);
  const [billPreviews, setBillPreviews] = useState<BillPreview[]>([]);
  const [previewData, setPreviewData] = useState<
    PreviewResponse["data"] | null
  >(null);
  const [selectedPreviews, setSelectedPreviews] = useState<Set<string>>(
    new Set(),
  );
  const [customCharges, setCustomCharges] = useState<
    Record<string, Record<string, number>>
  >({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [markAsPaid, setMarkAsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Refs for dropdown click outside handling
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const sessionDropdownRef = useRef<HTMLDivElement>(null);
  const farmerDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch farmers
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch("/api/farmers?limit=50");
        if (response.ok) {
          const data = await response.json();
          setFarmers(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch farmers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=100");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await fetch(
          "/api/sessions?limit=50&sortBy=date&sortOrder=desc",
        );
        if (response.ok) {
          const data = await response.json();
          setSessions(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    fetchFarmers();
    fetchProducts();
    fetchSessions();
  }, []);

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredProducts = products.filter((product) => {
    const categoryName =
      typeof product.category === "string"
        ? product.category
        : product.category?.name || "";
    return (
      product.name
        .toLowerCase()
        .includes(productSearchTerm.toLowerCase()) ||
      categoryName.toLowerCase().includes(productSearchTerm.toLowerCase())
    );
  });

  const filteredSessions = sessions.filter(
    (session) =>
      new Date(session.date).toLocaleDateString().includes(sessionSearchTerm) ||
      session.status.toLowerCase().includes(sessionSearchTerm.toLowerCase()),
  );

  const fetchBillPreviews = useCallback(async () => {
    if (!selectedFarmerId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({ farmer_id: selectedFarmerId });
      if (selectedProductId) params.append("product_id", selectedProductId);
      if (selectedSessionId) params.append("session_id", selectedSessionId);

      const response = await fetch(`/api/bills/preview?${params.toString()}`);
      if (response.ok) {
        const data: PreviewResponse = await response.json();
        if (data.success && data.data && data.data.previews) {
          setPreviewData(data.data);
          setBillPreviews(data.data.previews);
          // Auto-select all previews initially
          setSelectedPreviews(
            new Set(
              data.data.previews.map((p) => `${p.product_id}_${p.session_id}`),
            ),
          );

          // Initialize custom charges with suggested charges
          const initialCharges: Record<string, Record<string, number>> = {};
          data.data.previews.forEach((preview) => {
            const key = `${preview.product_id}_${preview.session_id}`;
            initialCharges[key] = {
              ...(preview.suggested_other_charges || {}),
            };
          });
          setCustomCharges(initialCharges);
        } else {
          // Handle case where previews is empty or undefined
          setBillPreviews([]);
          setPreviewData(null);
          setSelectedPreviews(new Set());
          setCustomCharges({});
        }
      } else {
        // Handle failed response
        console.error(
          "Failed to fetch bill previews:",
          response.status,
          response.statusText,
        );
        setBillPreviews([]);
        setPreviewData(null);
        setSelectedPreviews(new Set());
        setCustomCharges({});
      }
    } catch (error) {
      console.error("Failed to fetch bill previews:", error);
      // Reset state on error
      setBillPreviews([]);
      setPreviewData(null);
      setSelectedPreviews(new Set());
      setCustomCharges({});
      alert("Failed to fetch bill previews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedFarmerId, selectedProductId, selectedSessionId]);

  // Update previews when product or session selection changes
  useEffect(() => {
    if (selectedProductId || selectedSessionId) {
      fetchBillPreviews();
    }
  }, [selectedProductId, selectedSessionId, fetchBillPreviews]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProductDropdown(false);
      }
      if (
        sessionDropdownRef.current &&
        !sessionDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSessionDropdown(false);
      }
      if (
        farmerDropdownRef.current &&
        !farmerDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFarmerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePreviewSelection = (previewId: string, checked: boolean) => {
    const newSelected = new Set(selectedPreviews);
    if (checked) {
      newSelected.add(previewId);
    } else {
      newSelected.delete(previewId);
    }
    setSelectedPreviews(newSelected);
  };

  const updateCustomCharges = (
    previewId: string,
    chargeName: string,
    amount: number,
  ) => {
    setCustomCharges((prev) => ({
      ...prev,
      [previewId]: {
        ...prev[previewId],
        [chargeName]: amount,
      },
    }));
  };

  const removeCustomCharge = (previewId: string, chargeName: string) => {
    setCustomCharges((prev) => {
      const updated = { ...prev };
      if (updated[previewId]) {
        const charges = { ...updated[previewId] };
        delete charges[chargeName];
        updated[previewId] = charges;
      }
      return updated;
    });
  };

  const addCustomCharge = (previewId: string) => {
    const chargeName = prompt("Enter charge name:");
    if (chargeName && chargeName.trim()) {
      const amount = parseFloat(
        prompt("Enter amount (use negative for deductions):") || "0",
      );
      if (!isNaN(amount)) {
        updateCustomCharges(previewId, chargeName.trim(), amount);
      }
    }
  };

  const calculateNetPayable = (preview: BillPreview, previewId: string) => {
    const charges = customCharges[previewId] || {};
    const totalCharges = Object.values(charges).reduce(
      (sum, charge) => sum + charge,
      0,
    );
    return preview.gross_amount - preview.commission_amount + totalCharges;
  };

  const generateBills = async () => {
    if (selectedPreviews.size === 0 || !selectedFarmerId) return;

    setGeneratingBills(true);
    try {
      const selectedPreviewsArray = Array.from(selectedPreviews);
      const requestPreviews = selectedPreviewsArray
        .map((previewId) => {
          const preview = billPreviews.find(
            (p) => `${p.product_id}_${p.session_id}` === previewId,
          );
          if (!preview) return null;

          return {
            product_id: preview.product_id,
            session_id: preview.session_id,
            other_charges: customCharges[previewId] || {},
            notes: notes[previewId] || undefined,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      if (requestPreviews.length === 0) {
        alert("No valid previews selected for bill generation.");
        setGeneratingBills(false);
        return;
      }

      console.log("Sending request to generate bills:", {
        farmer_id: selectedFarmerId,
        previews: requestPreviews,
        mark_as_paid: markAsPaid,
        payment_method: markAsPaid ? paymentMethod : undefined,
        selectedPreviewsCount: selectedPreviews.size,
        requestPreviewsCount: requestPreviews.length,
      });

      const response = await fetch("/api/bills/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmer_id: selectedFarmerId,
          previews: requestPreviews,
          mark_as_paid: markAsPaid,
          payment_method: markAsPaid ? paymentMethod : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Bill generation response:", data);

        if (data.success) {
          const generatedBills = data.data?.generated_bills || [];
          const errors = data.data?.errors || [];

          console.log(
            "Generated bills:",
            generatedBills.length,
            "Errors:",
            errors.length,
          );

          if (generatedBills.length > 0) {
            let successMessage = markAsPaid
              ? `Successfully generated and marked as paid ${generatedBills.length} bills!`
              : `Successfully generated ${generatedBills.length} bills!`;

            if (errors.length > 0) {
              successMessage += `\n\nWarning: ${errors.length} bills could not be generated.`;
              console.error("Bill generation errors:", errors);
            }

            try { (await import('@/components/ui/alert')).showToast(successMessage); } catch { }

            // Reset the form
            setSelectedFarmerId("");
            setBillPreviews([]);
            setPreviewData(null);
            setSelectedPreviews(new Set());
            setCustomCharges({});
            setNotes({});
            setMarkAsPaid(false);
            setPaymentMethod("cash");

            // Use window.location instead of router for more reliable navigation after state changes
            window.location.href = "/bills";
          } else {
            if (errors.length > 0) {
              let errorMessage =
                "Failed to generate bills. The following errors occurred:\n\n";
              errors.forEach((err: { error: string }, index: number) => {
                errorMessage += `${index + 1}. ${err.error}\n`;
              });
              try { (await import('@/components/ui/alert')).showToast(errorMessage); } catch { }
            } else {
              try { (await import('@/components/ui/alert')).showToast("No bills were generated. Please try again."); } catch { }
            }
          }
        } else {
          try { (await import('@/components/ui/alert')).showToast(`Failed to generate bills: ${data.message || "Unknown error"}`); } catch { }
        }
      } else {
        let errorMessage = "Failed to generate bills";
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorMessage = `Failed to generate bills: ${errorData.message}`;
          }
        } catch {
          // If we can't parse the error response, use the default message
          errorMessage = `Failed to generate bills: ${response.status} ${response.statusText}`;
        }
        try { (await import('@/components/ui/alert')).showToast(errorMessage); } catch { }
      }
    } catch (error) {
      console.error("Failed to generate bills:", error);
      try { (await import('@/components/ui/alert')).showToast("Failed to generate bills. Please try again."); } catch { }
    } finally {
      setGeneratingBills(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <DesktopOnly>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Generate Bills
              </h1>
              <p className="text-slate-600 mt-1">
                Preview and generate bills for farmers
              </p>
            </div>
          </div>

          {/* Farmer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Select Farmer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Farmer Selection with Searchable Dropdown */}
              <div className="space-y-2" ref={farmerDropdownRef}>
                <Label>Search and Select Farmer</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search farmers by name or village..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                    onFocus={() => setShowFarmerDropdown(true)}
                    className="pl-10"
                  />
                  {showFarmerDropdown && filteredFarmers.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {selectedFarmerId && (
                        <div
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-600 border-b"
                          onClick={() => {
                            setSelectedFarmerId("");
                            setSearchTerm("");
                            setShowFarmerDropdown(false);
                          }}
                        >
                          Clear Selection
                        </div>
                      )}
                      {filteredFarmers.map((farmer) => (
                        <div
                          key={farmer.id}
                          className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${selectedFarmerId === farmer.id
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : ""
                            }`}
                          onClick={() => {
                            setSelectedFarmerId(farmer.id);
                            setSearchTerm(`${farmer.name} - ${farmer.village}`);
                            setShowFarmerDropdown(false);
                          }}
                        >
                          <div className="font-medium">{farmer.name}</div>
                          <div className="text-sm text-gray-500">
                            {farmer.village}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {selectedFarmerId && (
                  <div className="text-sm text-green-600 mt-1">
                    ✓ Selected:{" "}
                    {farmers.find((f) => f.id === selectedFarmerId)?.name} -{" "}
                    {farmers.find((f) => f.id === selectedFarmerId)?.village}
                  </div>
                )}
              </div>

              {/* Product Filter */}
              <div className="space-y-2" ref={productDropdownRef}>
                <Label>Filter by Product (Optional)</Label>
                <div className="relative">
                  <Input
                    placeholder="Search products..."
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                    onFocus={() => setShowProductDropdown(true)}
                    className="w-full"
                  />
                  {showProductDropdown && filteredProducts.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      <div
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-600"
                        onClick={() => {
                          setSelectedProductId("");
                          setProductSearchTerm("");
                          setShowProductDropdown(false);
                        }}
                      >
                        All Products
                      </div>
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedProductId(product.id);
                            setProductSearchTerm(product.name);
                            setShowProductDropdown(false);
                          }}
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {typeof product.category === "string"
                              ? product.category
                              : product.category?.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Session Filter */}
              <div className="space-y-2" ref={sessionDropdownRef}>
                <Label>Filter by Session (Optional)</Label>
                <div className="relative">
                  <Input
                    placeholder="Search sessions..."
                    value={sessionSearchTerm}
                    onChange={(e) => setSessionSearchTerm(e.target.value)}
                    onFocus={() => setShowSessionDropdown(true)}
                    className="w-full"
                  />
                  {showSessionDropdown && filteredSessions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      <div
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-600"
                        onClick={() => {
                          setSelectedSessionId("");
                          setSessionSearchTerm("");
                          setShowSessionDropdown(false);
                        }}
                      >
                        All Sessions
                      </div>
                      {filteredSessions.map((session) => (
                        <div
                          key={session.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedSessionId(session.id);
                            setSessionSearchTerm(
                              new Date(session.date).toLocaleDateString(),
                            );
                            setShowSessionDropdown(false);
                          }}
                        >
                          <div className="font-medium">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {session.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={fetchBillPreviews}
                disabled={!selectedFarmerId || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading Previews...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Load Bill Previews
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Bill Previews */}
          {previewData && (
            <>
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Preview Summary - {previewData.farmer.name} (
                    {previewData.farmer.village})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {previewData.summary.total_previews}
                      </div>
                      <div className="text-sm text-gray-500">Bill Previews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(previewData.summary.total_gross_amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Gross Amount
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(previewData.summary.total_net_payable)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Net Payable
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preview List */}
              <div className="space-y-4">
                {billPreviews.map((preview) => {
                  const previewId = `${preview.product_id}_${preview.session_id}`;
                  const isSelected = selectedPreviews.has(previewId);

                  return (
                    <Card
                      key={previewId}
                      className={isSelected ? "ring-2 ring-blue-500" : ""}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) =>
                                handlePreviewSelection(
                                  previewId,
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                            />
                            <div>
                              <CardTitle className="text-lg">
                                {preview.product_name}
                              </CardTitle>
                              <p className="text-sm text-gray-500">
                                Session: {formatDate(preview.session_date)}
                              </p>
                            </div>
                          </div>
                          <Badge variant={isSelected ? "default" : "outline"}>
                            {isSelected ? "Selected" : "Not Selected"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Item Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">
                            Items ({preview.items.length})
                          </h4>
                          <div className="space-y-2">
                            {preview.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between text-sm"
                              >
                                <span>
                                  {item.quantity} {item.unit} @ ₹{item.rate}/
                                  {item.unit}
                                </span>
                                <span className="font-medium">
                                  ₹{item.amount}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span>
                                Total: {preview.total_quantity}{" "}
                                {preview.items[0]?.unit} ({preview.total_bags}{" "}
                                bags)
                              </span>
                              <span>₹{preview.gross_amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Charges and Calculations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                Additional Charges
                              </h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addCustomCharge(previewId)}
                                className="text-xs"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Charge
                              </Button>
                            </div>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {Object.entries(
                                customCharges[previewId] || {},
                              ).map(([chargeName, amount]) => (
                                <div
                                  key={chargeName}
                                  className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                                >
                                  <Input
                                    value={chargeName}
                                    disabled
                                    className="flex-1 text-xs bg-white"
                                    placeholder="Charge name"
                                  />
                                  <Input
                                    type="number"
                                    value={amount}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                      updateCustomCharges(
                                        previewId,
                                        chargeName,
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    className="w-20 text-xs"
                                    placeholder="Amount"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      removeCustomCharge(previewId, chargeName)
                                    }
                                    className="px-2"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              {Object.keys(customCharges[previewId] || {})
                                .length === 0 && (
                                  <div className="text-xs text-gray-500 text-center py-2">
                                    No additional charges. Click &quot;Add
                                    Charge&quot; to add custom charges or
                                    deductions.
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Bill Summary</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Gross Amount:</span>
                                <span>₹{preview.gross_amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>
                                  Commission ({preview.commission_rate}%):
                                </span>
                                <span className="text-red-600">
                                  -₹{preview.commission_amount}
                                </span>
                              </div>
                              {Object.entries(
                                customCharges[previewId] || {},
                              ).map(([name, amount]) => (
                                <div
                                  key={name}
                                  className="flex justify-between"
                                >
                                  <span>{name}:</span>
                                  <span
                                    className={
                                      amount >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {amount >= 0 ? "+" : ""}₹{amount}
                                  </span>
                                </div>
                              ))}
                              <div className="border-t pt-2 flex justify-between font-semibold">
                                <span>Net Payable:</span>
                                <span className="text-green-600">
                                  ₹{calculateNetPayable(preview, previewId)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${previewId}`}>
                            Notes (Optional)
                          </Label>
                          <textarea
                            id={`notes-${previewId}`}
                            placeholder="Add any notes for this bill..."
                            value={notes[previewId] || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) =>
                              setNotes((prev) => ({
                                ...prev,
                                [previewId]: e.target.value,
                              }))
                            }
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Payment Options */}
              {billPreviews.length > 0 && selectedPreviews.size > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="markAsPaid"
                          checked={markAsPaid}
                          onChange={(e) => setMarkAsPaid(e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor="markAsPaid"
                          className="text-sm font-medium text-gray-700"
                        >
                          Mark as paid during generation
                        </label>
                      </div>

                      {markAsPaid && (
                        <div className="flex items-center space-x-2">
                          <Label
                            htmlFor="paymentMethod"
                            className="text-sm font-medium"
                          >
                            Payment Method:
                          </Label>
                          <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="cash">Cash</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="cheque">Cheque</option>
                            <option value="upi">UPI</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Generate Bills */}
              {billPreviews.length > 0 && (
                <div className="flex justify-center">
                  <Button
                    onClick={generateBills}
                    disabled={selectedPreviews.size === 0 || generatingBills}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {generatingBills ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Generating Bills...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Generate {selectedPreviews.size} Selected Bills
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!previewData && !loading && selectedFarmerId && (
            <Card>
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Unbilled Items Found
                </h3>
                <p className="text-gray-500">
                  The selected farmer has no auction items that can be billed at
                  this time.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DesktopOnly>
    </DashboardLayout>
  );
}
