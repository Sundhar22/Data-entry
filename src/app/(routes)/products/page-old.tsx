"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Plus,
  Package,
  Tag,
  Loader2,
  RefreshCw,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductResponse {
  success: boolean;
  data: Product[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch products data
  const fetchProducts = async (query = "") => {
    setLoading(!query);
    setSearchLoading(!!query);
    
    try {
      const params = new URLSearchParams({
        limit: "50",
        ...(query && { q: query })
      });

      const response = await fetch(`/api/products?${params}`);
      if (response.ok) {
        const data: ProductResponse = await response.json();
        // API returns simplified products for search
        setProducts(data.data as SimpleProduct[]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchProducts(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-600 mt-1">Manage agricultural products and categories</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <p className="text-xs text-muted-foreground">Active categories</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Auction</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">24</div>
              <p className="text-xs text-muted-foreground">Currently available</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {searchLoading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" onClick={() => fetchProducts(searchTerm)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading products...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                {searchTerm ? "No products found matching your search." : "No products found. Add your first product to get started."}
              </div>
            ) : (
              <div className="space-y-0">
                {products.map((product, index) => (
                  <div key={product.id}>
                    <div className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <Package className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-slate-900">{product.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <Badge variant="outline" className="text-xs">
                                ID: {product.id}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant="success"
                            className="bg-green-100 text-green-800"
                          >
                            Active
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < products.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Product Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Grains', 'Vegetables', 'Fruits', 'Pulses', 'Spices', 'Oil Seeds', 'Cash Crops', 'Others'].map((category) => (
                <div key={category} className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto mb-3 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-slate-900">{category}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {Math.floor(Math.random() * 15) + 5} products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
