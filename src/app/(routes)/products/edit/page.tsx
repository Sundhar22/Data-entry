"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Package, 
  Tag,
  Loader2,
  AlertCircle,
  ToggleLeft,
  ToggleRight
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

interface Category {
  id: string;
  name: string;
}

interface UpdateProductRequest {
  name: string;
  category_id: string;
  is_active: boolean;
}

interface FormErrors {
  name?: string;
  category_id?: string;
  general?: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<UpdateProductRequest>({
    name: '',
    category_id: '',
    is_active: true
  });

  useEffect(() => {
    if (!productId) {
      router.push('/products');
      return;
    }
    
    const fetchProductAndCategories = async () => {
      try {
        // Fetch categories first
        const categoriesResponse = await fetch('/api/categories', {
          credentials: 'include'
        });
        
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success) {
            setCategories(categoriesData.data);
          }
        } else {
          // Use mock categories as fallback
          const mockCategories = [
            { id: "cat-vegetables", name: "Vegetables" },
            { id: "cat-fruits", name: "Fruits" },
            { id: "cat-grains", name: "Grains" },
            { id: "cat-pulses", name: "Pulses" }
          ];
          setCategories(mockCategories);
        }
        setCategoriesLoading(false);
        
        // For now, since we don't have a single product endpoint, we'll use mock data
        // In a real app, you would fetch: `/api/products/${productId}`
        const mockProduct: Product = {
          id: productId,
          name: `Product ${productId.substring(0, 8)}`,
          category: {
            id: "cat-vegetables",
            name: "Vegetables"
          },
          is_active: true,
          created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setProduct(mockProduct);
        setFormData({
          name: mockProduct.name,
          category_id: mockProduct.category.id,
          is_active: mockProduct.is_active
        });
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setErrors({ general: 'Failed to load product data.' });
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchProductAndCategories();
  }, [productId, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          category_id: formData.category_id,
          is_active: formData.is_active
        })
      });
      
      if (response.ok) {
        router.push('/products');
      } else if (response.status === 401) {
        setErrors({ general: 'Authentication required. Please log in.' });
      } else if (response.status === 404) {
        setErrors({ general: 'Product not found.' });
      } else if (response.status === 409) {
        setErrors({ name: 'A product with this name already exists.' });
      } else {
        const errorData = await response.json().catch(() => null);
        setErrors({ 
          general: errorData?.message || 'Failed to update product. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateProductRequest, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (typeof value === 'string' && errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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

  if (fetchLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-slate-600">Loading product details...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!product) {
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
          {errors.general && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{errors.general}</span>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Edit Product</h1>
            <p className="text-slate-600 mt-1">Update product information</p>
          </div>
        </div>

        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-600">
                Created: {formatDate(product.created_at)}
              </p>
              <p className="text-sm text-slate-600">
                Last updated: {formatDate(product.updated_at)}
              </p>
            </div>
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
          </CardContent>
        </Card>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.general}</span>
                  </div>
                )}
                
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Product Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category *
                  </label>
                  {categoriesLoading ? (
                    <div className="flex items-center gap-2 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-slate-600">Loading categories...</span>
                    </div>
                  ) : (
                    <select
                      value={formData.category_id}
                      onChange={(e) => handleInputChange('category_id', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.category_id ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.category_id && (
                    <p className="text-sm text-red-600">{errors.category_id}</p>
                  )}
                </div>

                {/* Active Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Status
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('is_active', !formData.is_active)}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 transition-colors"
                    >
                      {formData.is_active ? (
                        <ToggleRight className="h-6 w-6 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-gray-400" />
                      )}
                      <span className={`text-sm ${formData.is_active ? 'text-green-700' : 'text-gray-600'}`}>
                        {formData.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Inactive products cannot be used in auctions
                  </p>
                </div>

                <Separator />

                {/* Form Actions */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Fields marked with * are required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading || categoriesLoading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Update Product
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
