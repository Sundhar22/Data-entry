"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search,
  Package,
  Tag,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (query?: string) => {
    try {
      if (query !== undefined) {
        setSearchLoading(true);
      }
      
      const searchParams = new URLSearchParams();
      if (query) {
        searchParams.set('q', query);
      }
      searchParams.set('limit', '50');

      const response = await fetch(`/api/products?${searchParams}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchProducts('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Products</h1>
              <p className="text-slate-600 mt-1">Browse available products and categories</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Active products only</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">Product categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products by name..."
                  className="w-full"
                />
              </div>
              <Button type="submit" disabled={searchLoading}>
                {searchLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Search
              </Button>
              {searchTerm && (
                <Button type="button" variant="outline" onClick={clearSearch}>
                  Clear
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products ({products.length})
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
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No products found' : 'No products available'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `No products match "${searchTerm}". Try a different search term.`
                    : 'No products have been added to the system yet.'
                  }
                </p>
                {searchTerm && (
                  <Button onClick={clearSearch} className="mt-4">
                    View All Products
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-blue-600" />
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900 mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Tag className="h-4 w-4" />
                            <span>{product.category.name}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Categories ({categories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <div className="text-center py-8 text-slate-600">
                <Tag className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p>No categories available</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge 
                    key={category.id} 
                    variant="outline" 
                    className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Info */}
        {!loading && products.length === 0 && categories.length === 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-800">
                  <strong>No data available.</strong> This could be because you&apos;re not authenticated 
                  or there&apos;s no data in the system yet.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
