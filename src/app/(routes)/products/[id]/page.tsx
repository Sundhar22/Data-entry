"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Edit,
  Package, 
  Tag,
  Calendar,
  Activity,
  IndianRupee,
  Loader2,
  AlertCircle,
  Eye,
  History,
  TrendingUp
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

interface ProductStats {
  totalSales: number;
  totalRevenue: number;
  averagePrice: number;
  lastSaleDate?: string;
  activeAuctions: number;
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [stats, setStats] = useState<ProductStats>({
    totalSales: 0,
    totalRevenue: 0,
    averagePrice: 0,
    activeAuctions: 0
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!productId) {
      router.push('/products');
      return;
    }
    
    const fetchProductDetails = async () => {
      try {
        // For now, using mock data since we don't have a single product endpoint
        // In a real app, you would fetch: `/api/products/${productId}`
        
        const mockProduct: Product = {
          id: productId,
          name: `Product ${productId.substring(0, 8)}`,
          category: {
            id: "cat-vegetables",
            name: ["Vegetables", "Fruits", "Grains", "Pulses"][Math.floor(Math.random() * 4)]
          },
          is_active: Math.random() > 0.2,
          created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        setProduct(mockProduct);
        
        // Mock stats data
        setStats({
          totalSales: Math.floor(Math.random() * 200) + 50,
          totalRevenue: Math.floor(Math.random() * 1000000) + 100000,
          averagePrice: Math.floor(Math.random() * 500) + 100,
          activeAuctions: Math.floor(Math.random() * 5),
          lastSaleDate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString() : undefined
        });
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [productId, router]);

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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-slate-600">Loading product details...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/products')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Product Not Found</h1>
              <p className="text-slate-600 mt-1">The requested product could not be found</p>
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">{product.name}</h1>
              <p className="text-slate-600 mt-1">Product Details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/products/edit?id=${product.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {/* Product Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Information
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {product.category.name}
                </Badge>
                <Badge 
                  variant={product.is_active ? "default" : "secondary"}
                  className={product.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {product.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Product Name</p>
                    <p className="font-semibold text-slate-900">{product.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Tag className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Category</p>
                    <p className="font-semibold text-slate-900">{product.category.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Added</p>
                    <p className="font-semibold text-slate-900">{formatDate(product.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Last Updated</p>
                    <p className="font-semibold text-slate-900">{formatDate(product.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-sm text-slate-600">
              <p>Product ID: {product.id}</p>
              <p className={`mt-1 ${product.is_active ? 'text-green-600' : 'text-red-600'}`}>
                Status: {product.is_active ? 'Available for auctions' : 'Not available for auctions'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales}</div>
              <p className="text-xs text-muted-foreground">
                Items sold
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime earnings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(stats.averagePrice)}
              </div>
              <p className="text-xs text-muted-foreground">
                Per unit sold
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activeAuctions}</div>
              <p className="text-xs text-muted-foreground">
                Currently in auction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Last Sale Info */}
        {stats.lastSaleDate && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium text-green-900">Last Sale</p>
                  <p className="text-sm text-green-700">{formatDate(stats.lastSaleDate)}</p>
                </div>
                <div className="text-green-600">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2 p-6 h-auto"
                onClick={() => {
                  // Navigate to product's sales history
                  router.push(`/products/${product.id}/sales`);
                }}
              >
                <History className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Sales History</p>
                  <p className="text-xs text-slate-600">View all sales</p>
                </div>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2 p-6 h-auto"
                onClick={() => {
                  // Navigate to product's auction history
                  router.push(`/products/${product.id}/auctions`);
                }}
              >
                <Eye className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Auction History</p>
                  <p className="text-xs text-slate-600">Past & current auctions</p>
                </div>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center justify-center gap-2 p-6 h-auto"
                onClick={() => {
                  router.push(`/products/edit?id=${product.id}`);
                }}
              >
                <Edit className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Edit Product</p>
                  <p className="text-xs text-slate-600">Update information</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
