"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Users,
  IndianRupee,
  Gavel,
  Loader2,
  RefreshCw,
  AlertCircle,
  Save,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

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

const UNITS = ['KG', 'GRAM', 'QUINTAL', 'TON', 'BUNDLE', 'PIECE', 'LITRE', 'MILLILITRE', 'GALLON', 'DOZEN', 'BOX', 'BAG', 'OTHER'];

export default function AuctionItemsPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session') || '';

  const [items, setItems] = useState<AuctionItem[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'SOLD' | 'PAID'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  
  // Form states
  const [formData, setFormData] = useState<ItemFormData>({
    farmer_id: '',
    product_id: '',
    buyer_id: '',
    unit: 'KG',
    quantity: 0,
    rate: 0
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Search states for dropdowns
  const [farmerSearch, setFarmerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [buyerSearch, setBuyerSearch] = useState('');

  // Dropdown visibility states
  const [showFarmerDropdown, setShowFarmerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showBuyerDropdown, setShowBuyerDropdown] = useState(false);

  // Product preselection states
  const [preselectedProductId, setPreselectedProductId] = useState('');
  const [isPreselectionMode, setIsPreselectionMode] = useState(false);

  // Fetch auction items
  const fetchItems = useCallback(async (page = 1) => {
    if (!sessionId) return;
    
    setLoading(page === 1);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10"
        // Note: API doesn't support text search yet, only filtering by specific IDs
      });

      const response = await fetch(`/api/sessions/${sessionId}/items?${params}`);
      if (response.ok) {
        const data: ItemResponse = await response.json();
        setItems(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalItems(data.meta.total);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // Fetch farmers, products, and buyers for dropdowns
  const fetchFormData = useCallback(async () => {
    try {
      const [farmersRes, productsRes, buyersRes] = await Promise.all([
        fetch('/api/farmers?limit=100&active=true'),
        fetch('/api/products?limit=100'),
        fetch('/api/buyer?limit=100&active=true')
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
      console.error('Failed to fetch form data:', error);
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

  const handlePageChange = (page: number) => {
    fetchItems(page);
  };

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ['ID', 'Farmer', 'Product', 'Quantity', 'Unit', 'Rate', 'Total', 'Buyer', 'Status', 'Created'];
    const csvData = items.map(item => [
      item.id,
      item.farmer?.name || 'Unknown',
      item.product?.name || 'Unknown',
      item.quantity,
      item.unit,
      item.rate || 0,
      (item.rate && item.quantity) ? item.rate * item.quantity : 0,
      item.buyer?.name || 'No Buyer',
      getItemStatus(item).label,
      new Date(item.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `auction_items_${sessionId}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preselection helper functions
  const enablePreselectionMode = (productId: string) => {
    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
      setPreselectedProductId(productId);
      setIsPreselectionMode(true);
      setProductSearch(selectedProduct.name);
      setFormData(prev => ({ ...prev, product_id: productId }));
    }
  };

  const disablePreselectionMode = () => {
    setPreselectedProductId('');
    setIsPreselectionMode(false);
    setProductSearch('');
    setFormData(prev => ({ ...prev, product_id: '' }));
  };

  const resetForm = () => {
    setFormData({
      farmer_id: '',
      product_id: isPreselectionMode ? preselectedProductId : '',
      buyer_id: '',
      unit: 'KG',
      quantity: 0,
      rate: 0
    });
    setFormError('');
    setFarmerSearch('');
    // Keep product search if in preselection mode
    if (!isPreselectionMode) {
      setProductSearch('');
    }
    setBuyerSearch('');
  };

  const handleAddItem = async () => {
    if (!formData.farmer_id || !formData.product_id || formData.quantity <= 0) {
      setFormError('Farmer, product, and positive quantity are required');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch(`/api/sessions/${sessionId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmer_id: formData.farmer_id,
          product_id: formData.product_id,
          unit: formData.unit,
          quantity: formData.quantity,
          ...(formData.buyer_id && { buyer_id: formData.buyer_id }),
          ...(formData.rate > 0 && { rate: formData.rate })
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // In preselection mode, don't close dialog and only reset farmer-specific fields
        if (isPreselectionMode) {
          // Reset only farmer-specific fields, keep product preselected
          setFormData(prev => ({
            ...prev,
            farmer_id: '',
            buyer_id: '',
            quantity: 0,
            rate: 0
          }));
          setFarmerSearch('');
          setBuyerSearch('');
        } else {
          setIsAddDialogOpen(false);
          resetForm();
        }
        fetchItems(currentPage);
      } else {
        setFormError(data.error?.message || 'Failed to create item');
      }
    } catch (error) {
      console.error('Failed to create item:', error);
      setFormError('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditItem = async () => {
    if (!selectedItem || !formData.farmer_id || !formData.product_id || formData.quantity <= 0) {
      setFormError('Farmer, product, and positive quantity are required');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch(`/api/sessions/${sessionId}/items/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmer_id: formData.farmer_id,
          product_id: formData.product_id,
          unit: formData.unit,
          quantity: formData.quantity,
          ...(formData.buyer_id && { buyer_id: formData.buyer_id }),
          ...(formData.rate > 0 && { rate: formData.rate })
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsEditDialogOpen(false);
        setSelectedItem(null);
        resetForm();
        fetchItems(currentPage);
      } else {
        setFormError(data.error?.message || 'Failed to update item');
      }
    } catch (error) {
      console.error('Failed to update item:', error);
      setFormError('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    setFormLoading(true);

    try {
      const response = await fetch(`/api/sessions/${sessionId}/items/${selectedItem.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedItem(null);
        fetchItems(currentPage);
      } else {
        const data = await response.json();
        setFormError(data.error?.message || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      setFormError('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const openEditDialog = (item: AuctionItem) => {
    setSelectedItem(item);
    setFormData({
      farmer_id: item.farmer_id,
      product_id: item.product_id,
      buyer_id: item.buyer_id || '',
      unit: item.unit,
      quantity: item.quantity,
      rate: item.rate || 0
    });
    // Set search fields with current values
    setFarmerSearch(item.farmer?.name || '');
    setProductSearch(item.product?.name || '');
    setBuyerSearch(item.buyer?.name || '');
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: AuctionItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getItemStatus = (item: AuctionItem) => {
    if (item.bill_id) {
      return { status: 'paid', label: 'Paid', color: 'bg-green-100 text-green-800' };
    }
    if (item.buyer_id && item.rate) {
      return { status: 'sold', label: 'Sold', color: 'bg-blue-100 text-blue-800' };
    }
    return { status: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
  };

  if (!sessionId) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Session Required</h2>
          <p className="text-slate-600">Please select a session to manage auction items.</p>
          <Link href="/auctions">
            <Button className="mt-4">Back to Sessions</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Auction Items</h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage items in this auction session</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open && isPreselectionMode) {
              // When closing dialog in preselection mode, ask user if they want to keep it active
              const keepPreselection = window.confirm('Keep Quick Add Mode active for more items?');
              if (!keepPreselection) {
                disablePreselectionMode();
              }
            }
          }}>
            <DialogTrigger 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-slate-50 shadow hover:bg-blue-700 h-9 px-4 py-2 w-full sm:w-auto"
              onClick={() => {
                resetForm();
                setIsAddDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>
                  {isPreselectionMode ? 'Quick Add Mode - Add Item' : 'Add Auction Item'}
                </DialogTitle>
                <DialogDescription>
                  {isPreselectionMode ? 
                    `Adding items for: ${products.find(p => p.id === preselectedProductId)?.name || 'Selected Product'} - Only farmer and quantity details needed.` :
                    'Add a new item to this auction session.'
                  }
                </DialogDescription>
              </DialogHeader>
              
              {isPreselectionMode && (
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Quick Add Mode is active. The product is preselected. Focus on adding farmer details and quantities quickly.
                  </AlertDescription>
                </Alert>
              )}
              
              {formError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{formError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 sm:space-y-6 max-h-[50vh] sm:max-h-96 overflow-y-auto px-1">
                <div className="space-y-2">
                  <Label htmlFor="farmer" className="text-sm font-medium">Farmer *</Label>
                  <div className="relative">
                    <Input
                      id="farmer-search"
                      type="text"
                      placeholder="Type to search farmers..."
                      value={farmerSearch}
                      onChange={(e) => {
                        setFarmerSearch(e.target.value);
                        setShowFarmerDropdown(true);
                      }}
                      onFocus={() => setShowFarmerDropdown(true)}
                      onBlur={() => setTimeout(() => setShowFarmerDropdown(false), 200)}
                      className="w-full"
                    />
                    {farmerSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setFarmerSearch('');
                          setFormData(prev => ({ ...prev, farmer_id: '' }));
                          setShowFarmerDropdown(false);
                        }}
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                    
                    {/* Autocomplete dropdown */}
                    {showFarmerDropdown && farmerSearch && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {farmers
                          .filter(farmer => 
                            farmer.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
                            farmer.village.toLowerCase().includes(farmerSearch.toLowerCase())
                          )
                          .map(farmer => (
                            <button
                              key={farmer.id}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, farmer_id: farmer.id }));
                                setFarmerSearch(`${farmer.name} - ${farmer.village}`);
                                setShowFarmerDropdown(false);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">{farmer.name}</div>
                              <div className="text-sm text-gray-600">{farmer.village}</div>
                            </button>
                          ))
                        }
                        {farmers.filter(farmer => 
                          farmer.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
                          farmer.village.toLowerCase().includes(farmerSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="px-3 py-2 text-gray-500">No farmers found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product" className="text-sm font-medium">
                    Product * 
                    {isPreselectionMode && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">Preselected</Badge>
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="product-search"
                      type="text"
                      placeholder={isPreselectionMode ? "Product preselected" : "Type to search products..."}
                      value={productSearch}
                      onChange={(e) => {
                        if (!isPreselectionMode) {
                          setProductSearch(e.target.value);
                          setShowProductDropdown(true);
                        }
                      }}
                      onFocus={() => !isPreselectionMode && setShowProductDropdown(true)}
                      onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                      className="w-full"
                      disabled={isPreselectionMode}
                    />
                    {productSearch && !isPreselectionMode && (
                      <button
                        type="button"
                        onClick={() => {
                          setProductSearch('');
                          setFormData(prev => ({ ...prev, product_id: '' }));
                          setShowProductDropdown(false);
                        }}
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                    
                    {/* Autocomplete dropdown */}
                    {showProductDropdown && productSearch && !isPreselectionMode && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {products
                          .filter(product => 
                            product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                            product.category.name.toLowerCase().includes(productSearch.toLowerCase())
                          )
                          .map(product => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, product_id: product.id }));
                                setProductSearch(`${product.name} (${product.category.name})`);
                                setShowProductDropdown(false);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-600">{product.category.name}</div>
                            </button>
                          ))
                        }
                        {products.filter(product => 
                          product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          product.category.name.toLowerCase().includes(productSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="px-3 py-2 text-gray-500">No products found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-medium">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity === 0 ? '' : formData.quantity}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          setFormData(prev => ({ ...prev, quantity: 0 }));
                        } else {
                          const numValue = parseFloat(value);
                          if (!isNaN(numValue) && numValue >= 0) {
                            setFormData(prev => ({ ...prev, quantity: numValue }));
                          }
                        }
                      }}
                      placeholder="Enter quantity"
                      min="0"
                      step="0.01"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
                    <select
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {UNITS.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer" className="text-sm font-medium">Buyer (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="buyer-search"
                      type="text"
                      placeholder="Type to search buyers..."
                      value={buyerSearch}
                      onChange={(e) => {
                        setBuyerSearch(e.target.value);
                        setShowBuyerDropdown(true);
                      }}
                      onFocus={() => setShowBuyerDropdown(true)}
                      onBlur={() => setTimeout(() => setShowBuyerDropdown(false), 200)}
                      className="w-full"
                    />
                    {buyerSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuyerSearch('');
                          setFormData(prev => ({ ...prev, buyer_id: '' }));
                          setShowBuyerDropdown(false);
                        }}
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                    
                    {/* Autocomplete dropdown */}
                    {showBuyerDropdown && buyerSearch && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {buyers
                          .filter(buyer => 
                            buyer.name.toLowerCase().includes(buyerSearch.toLowerCase())
                          )
                          .map(buyer => (
                            <button
                              key={buyer.id}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, buyer_id: buyer.id }));
                                setBuyerSearch(buyer.name);
                                setShowBuyerDropdown(false);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-medium">{buyer.name}</div>
                            </button>
                          ))
                        }
                        {buyers.filter(buyer => 
                          buyer.name.toLowerCase().includes(buyerSearch.toLowerCase())
                        ).length === 0 && (
                          <div className="px-3 py-2 text-gray-500">No buyers found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-sm font-medium">Rate per {formData.unit} (Optional)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={formData.rate === 0 ? '' : formData.rate}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setFormData(prev => ({ ...prev, rate: 0 }));
                      } else {
                        const numValue = parseFloat(value);
                        if (!isNaN(numValue) && numValue >= 0) {
                          setFormData(prev => ({ ...prev, rate: numValue }));
                        }
                      }
                    }}
                    placeholder="Enter rate"
                    min="0"
                    step="0.01"
                    className="w-full"
                  />
                  {formData.rate > 0 && formData.quantity > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      Total: {formatCurrency(formData.rate * formData.quantity)}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
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
                      {isPreselectionMode ? 'Add & Continue' : 'Add Item'}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Preselection Controls */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900">Quick Add Mode</h3>
                <p className="text-sm text-slate-600">
                  {isPreselectionMode ? 
                    `Preselected: ${products.find(p => p.id === preselectedProductId)?.name || 'Unknown Product'}` :
                    'Select a product to add multiple items quickly without reselecting the product each time'
                  }
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
                      {products.map(product => (
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Total Items</CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground truncate">
                {statusFilter !== 'ALL' ? `${items.filter(i => {
                  const status = getItemStatus(i).status;
                  return statusFilter === 'PENDING' ? status === 'pending' :
                         statusFilter === 'SOLD' ? status === 'sold' :
                         statusFilter === 'PAID' ? status === 'paid' : true;
                }).length} ${statusFilter.toLowerCase()}` : 'in this session'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Sold Items</CardTitle>
              <Gavel className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">
                {items.filter(i => i.buyer_id && i.rate).length}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {totalItems > 0 ? `${Math.round((items.filter(i => i.buyer_id && i.rate).length / totalItems) * 100)}% completion` : '0% completion'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Paid Items</CardTitle>
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {items.filter(i => i.bill_id).length}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {totalItems > 0 ? `${Math.round((items.filter(i => i.bill_id).length / totalItems) * 100)}% paid` : '0% paid'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Total Value</CardTitle>
              <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                {formatCurrency(items.reduce((sum, i) => sum + ((i.rate || 0) * i.quantity), 0))}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                Avg: {items.length > 0 ? formatCurrency(items.reduce((sum, i) => sum + ((i.rate || 0) * i.quantity), 0) / items.length) : '₹0'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button 
            variant={statusFilter === 'ALL' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('ALL')}
            className="text-xs px-3 py-2"
          >
            All Items
          </Button>
          <Button 
            variant={statusFilter === 'PENDING' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('PENDING')}
            className="text-xs px-3 py-2"
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'SOLD' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('SOLD')}
            className="text-xs px-3 py-2"
          >
            Sold
          </Button>
          <Button 
            variant={statusFilter === 'PAID' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter('PAID')}
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
            <Button variant="outline" size="sm" onClick={() => fetchItems(currentPage)} className="flex-1 sm:flex-none">
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="sm:inline">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" onClick={exportToCSV} className="flex-1 sm:flex-none">
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
            ) : (() => {
              // Client-side filtering
              const filteredItems = items.filter(item => {
                // Text search filter
                if (searchTerm) {
                  const searchLower = searchTerm.toLowerCase();
                  const matchesSearch = (
                    item.farmer?.name?.toLowerCase().includes(searchLower) ||
                    item.product?.name?.toLowerCase().includes(searchLower) ||
                    item.buyer?.name?.toLowerCase().includes(searchLower) ||
                    item.unit.toLowerCase().includes(searchLower)
                  );
                  if (!matchesSearch) return false;
                }

                // Status filter
                if (statusFilter !== 'ALL') {
                  const status = getItemStatus(item).status;
                  if (
                    (statusFilter === 'PENDING' && status !== 'pending') ||
                    (statusFilter === 'SOLD' && status !== 'sold') ||
                    (statusFilter === 'PAID' && status !== 'paid')
                  ) {
                    return false;
                  }
                }

                return true;
              });
              
              if (filteredItems.length === 0) {
                return (
                  <div className="text-center py-12 text-slate-600">
                    {searchTerm ? 'No items match your search criteria.' : 'No auction items found. Add your first item to get started.'}
                  </div>
                );
              }

              return (
                <div className="space-y-0 max-h-[70vh] overflow-y-auto">
                  {filteredItems.map((item, index) => {
                    const status = getItemStatus(item);
                    return (
                      <div key={item.id}>
                        <div className="p-3 sm:p-4 lg:p-6 hover:bg-slate-50 transition-colors">
                          <div className="flex flex-col space-y-3 sm:space-y-4">
                            <div className="flex items-start space-x-3 min-w-0">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                <Package className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-600" />
                              </div>
                              <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-slate-900 truncate">
                                    {item.product?.name || 'Unknown Product'}
                                  </h3>
                                  <Badge className={`${status.color} flex-shrink-0 self-start sm:self-center text-xs`}>
                                    {status.label}
                                  </Badge>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm text-slate-600">
                                  <div className="flex items-center space-x-1 min-w-0">
                                    <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                    <span className="truncate">{item.farmer?.name || 'Unknown Farmer'}</span>
                                  </div>
                                  <span className="hidden sm:inline">•</span>
                                  <span className="flex-shrink-0">{item.quantity} {item.unit}</span>
                                  {item.rate && (
                                    <>
                                      <span className="hidden sm:inline">•</span>
                                      <span className="flex-shrink-0">{formatCurrency(item.rate)} per {item.unit}</span>
                                    </>
                                  )}
                                </div>
                                <div className="text-xs text-slate-500 space-y-1">
                                  {item.buyer?.name && (
                                    <div className="truncate">Buyer: {item.buyer.name}</div>
                                  )}
                                  {item.rate && item.quantity && (
                                    <div className="font-medium text-slate-700">
                                      Total: {formatCurrency(item.rate * item.quantity)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                              {!item.buyer_id && !item.rate && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs sm:text-sm w-full sm:w-auto"
                                  onClick={() => openEditDialog(item)}
                                >
                                  <Gavel className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="truncate">Complete Sale</span>
                                </Button>
                              )}
                              <div className="flex gap-1 sm:gap-2">
                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm" onClick={() => openEditDialog(item)}>
                                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="hidden sm:inline">Edit</span>
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm" onClick={() => openDeleteDialog(item)}>
                                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="hidden sm:inline">Delete</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < filteredItems.length - 1 && <Separator />}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-white p-4 rounded-lg border">
            <div className="text-xs sm:text-sm text-slate-600 order-2 sm:order-1">
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalItems)} of {totalItems} items
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-xs px-2 py-1 sm:px-3 sm:py-2"
              >
                <span className="sm:hidden">‹</span>
                <span className="hidden sm:inline">Previous</span>
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-7 h-7 sm:w-8 sm:h-8 text-xs p-0"
                  >
                    {page}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-xs px-2 py-1 sm:px-3 sm:py-2"
              >
                <span className="sm:hidden">›</span>
                <span className="hidden sm:inline">Next</span>
              </Button>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Edit Auction Item</DialogTitle>
              <DialogDescription>
                Update item details and settings.
              </DialogDescription>
            </DialogHeader>
            
            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 sm:space-y-6 max-h-[50vh] sm:max-h-96 overflow-y-auto px-1">
              <div className="space-y-2">
                <Label htmlFor="edit-farmer" className="text-sm font-medium">Farmer *</Label>
                <div className="relative">
                  <Input
                    id="edit-farmer-search"
                    type="text"
                    placeholder="Type to search farmers..."
                    value={farmerSearch}
                    onChange={(e) => {
                      setFarmerSearch(e.target.value);
                      setShowFarmerDropdown(true);
                    }}
                    onFocus={() => setShowFarmerDropdown(true)}
                    onBlur={() => setTimeout(() => setShowFarmerDropdown(false), 200)}
                    className="w-full"
                  />
                  {farmerSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setFarmerSearch('');
                        setFormData(prev => ({ ...prev, farmer_id: '' }));
                        setShowFarmerDropdown(false);
                      }}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                  
                  {/* Autocomplete dropdown */}
                  {showFarmerDropdown && farmerSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {farmers
                        .filter(farmer => 
                          farmer.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
                          farmer.village.toLowerCase().includes(farmerSearch.toLowerCase())
                        )
                        .map(farmer => (
                          <button
                            key={farmer.id}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, farmer_id: farmer.id }));
                              setFarmerSearch(`${farmer.name} - ${farmer.village}`);
                              setShowFarmerDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{farmer.name}</div>
                            <div className="text-sm text-gray-600">{farmer.village}</div>
                          </button>
                        ))
                      }
                      {farmers.filter(farmer => 
                        farmer.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
                        farmer.village.toLowerCase().includes(farmerSearch.toLowerCase())
                      ).length === 0 && (
                        <div className="px-3 py-2 text-gray-500">No farmers found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-product" className="text-sm font-medium">Product *</Label>
                <div className="relative">
                  <Input
                    id="edit-product-search"
                    type="text"
                    placeholder="Type to search products..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setShowProductDropdown(true);
                    }}
                    onFocus={() => setShowProductDropdown(true)}
                    onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                    className="w-full"
                  />
                  {productSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setProductSearch('');
                        setFormData(prev => ({ ...prev, product_id: '' }));
                        setShowProductDropdown(false);
                      }}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                  
                  {/* Autocomplete dropdown */}
                  {showProductDropdown && productSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {products
                        .filter(product => 
                          product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          product.category.name.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map(product => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, product_id: product.id }));
                              setProductSearch(`${product.name} (${product.category.name})`);
                              setShowProductDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.category.name}</div>
                          </button>
                        ))
                      }
                      {products.filter(product => 
                        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        product.category.name.toLowerCase().includes(productSearch.toLowerCase())
                      ).length === 0 && (
                        <div className="px-3 py-2 text-gray-500">No products found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-quantity" className="text-sm font-medium">Quantity *</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={formData.quantity === 0 ? '' : formData.quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        setFormData(prev => ({ ...prev, quantity: 0 }));
                      } else {
                        const numValue = parseFloat(value);
                        if (!isNaN(numValue) && numValue >= 0) {
                          setFormData(prev => ({ ...prev, quantity: numValue }));
                        }
                      }
                    }}
                    placeholder="Enter quantity"
                    min="0"
                    step="0.01"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-unit" className="text-sm font-medium">Unit</Label>
                  <select
                    id="edit-unit"
                    value={formData.unit}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {UNITS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-buyer" className="text-sm font-medium">Buyer (Optional)</Label>
                <div className="relative">
                  <Input
                    id="edit-buyer-search"
                    type="text"
                    placeholder="Type to search buyers..."
                    value={buyerSearch}
                    onChange={(e) => {
                      setBuyerSearch(e.target.value);
                      setShowBuyerDropdown(true);
                    }}
                    onFocus={() => setShowBuyerDropdown(true)}
                    onBlur={() => setTimeout(() => setShowBuyerDropdown(false), 200)}
                    className="w-full"
                  />
                  {buyerSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setBuyerSearch('');
                        setFormData(prev => ({ ...prev, buyer_id: '' }));
                        setShowBuyerDropdown(false);
                      }}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                  
                  {/* Autocomplete dropdown */}
                  {showBuyerDropdown && buyerSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {buyers
                        .filter(buyer => 
                          buyer.name.toLowerCase().includes(buyerSearch.toLowerCase())
                        )
                        .map(buyer => (
                          <button
                            key={buyer.id}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, buyer_id: buyer.id }));
                              setBuyerSearch(buyer.name);
                              setShowBuyerDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium">{buyer.name}</div>
                          </button>
                        ))
                      }
                      {buyers.filter(buyer => 
                        buyer.name.toLowerCase().includes(buyerSearch.toLowerCase())
                      ).length === 0 && (
                        <div className="px-3 py-2 text-gray-500">No buyers found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-rate" className="text-sm font-medium">Rate per {formData.unit} (Optional)</Label>
                <Input
                  id="edit-rate"
                  type="number"
                  value={formData.rate === 0 ? '' : formData.rate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setFormData(prev => ({ ...prev, rate: 0 }));
                    } else {
                      const numValue = parseFloat(value);
                      if (!isNaN(numValue) && numValue >= 0) {
                        setFormData(prev => ({ ...prev, rate: numValue }));
                      }
                    }
                  }}
                  placeholder="Enter rate"
                  min="0"
                  step="0.01"
                  className="w-full"
                />
                {formData.rate > 0 && formData.quantity > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Total: {formatCurrency(formData.rate * formData.quantity)}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
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
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Auction Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this auction item? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{formError}</AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteItem} disabled={formLoading}>
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
