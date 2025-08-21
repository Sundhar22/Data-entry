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
  Plus,
  Tag,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  AlertCircle,
  Package
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  created_at?: string;
  product_count?: number;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string>('');
  const [editName, setEditName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

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
      } else {
        // Use mock categories as fallback
        const mockCategories: Category[] = [
          { 
            id: "cat-vegetables", 
            name: "Vegetables", 
            created_at: new Date().toISOString(),
            product_count: Math.floor(Math.random() * 20) + 5
          },
          { 
            id: "cat-fruits", 
            name: "Fruits", 
            created_at: new Date().toISOString(),
            product_count: Math.floor(Math.random() * 15) + 3
          },
          { 
            id: "cat-grains", 
            name: "Grains", 
            created_at: new Date().toISOString(),
            product_count: Math.floor(Math.random() * 10) + 2
          },
          { 
            id: "cat-pulses", 
            name: "Pulses", 
            created_at: new Date().toISOString(),
            product_count: Math.floor(Math.random() * 12) + 4
          }
        ];
        setCategories(mockCategories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    setError('');
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: newCategoryName.trim()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCategories(prev => [data.data, ...prev]);
          setNewCategoryName('');
          setAddingNew(false);
        }
      } else if (response.status === 409) {
        setError('Category with this name already exists');
      } else {
        // Mock success for demo
        const mockCategory: Category = {
          id: `cat-${Date.now()}`,
          name: newCategoryName.trim(),
          created_at: new Date().toISOString(),
          product_count: 0
        };
        setCategories(prev => [mockCategory, ...prev]);
        setNewCategoryName('');
        setAddingNew(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    }
  };

  const handleEditCategory = async (id: string) => {
    if (!editName.trim()) {
      setError('Category name is required');
      return;
    }

    setError('');
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: editName.trim()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCategories(prev => prev.map(cat => 
            cat.id === id ? { ...cat, name: editName.trim() } : cat
          ));
          setEditingId('');
          setEditName('');
        }
      } else if (response.status === 409) {
        setError('Category with this name already exists');
      } else {
        // Mock success for demo
        setCategories(prev => prev.map(cat => 
          cat.id === id ? { ...cat, name: editName.trim() } : cat
        ));
        setEditingId('');
        setEditName('');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok || response.status === 404) {
        setCategories(prev => prev.filter(cat => cat.id !== id));
      } else {
        setError('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      // Mock success for demo
      setCategories(prev => prev.filter(cat => cat.id !== id));
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId('');
    setEditName('');
    setError('');
  };

  const startAddNew = () => {
    setAddingNew(true);
    setNewCategoryName('');
    setError('');
  };

  const cancelAddNew = () => {
    setAddingNew(false);
    setNewCategoryName('');
    setError('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
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
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Categories</h1>
              <p className="text-slate-600 mt-1">Manage product categories</p>
            </div>
          </div>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={startAddNew}
            disabled={addingNew}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Categories List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Add New Category Form */}
            {addingNew && (
              <div className="p-6 border-b border-slate-200 bg-blue-50">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      className="bg-white"
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={handleAddCategory}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelAddNew}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600 mb-4">Add your first category to organize your products.</p>
                <Button onClick={startAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Category
                </Button>
              </div>
            ) : (
              <div className="space-y-0">
                {categories.map((category, index) => (
                  <div key={category.id}>
                    <div className="p-6 hover:bg-slate-50 transition-colors">
                      {editingId === category.id ? (
                        // Edit Mode
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Tag className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <Input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              placeholder="Enter category name"
                              autoFocus
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleEditCategory(category.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelEdit}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                              <Tag className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-lg text-slate-900">{category.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-slate-600">
                                <div className="flex items-center space-x-1">
                                  <Package className="h-4 w-4" />
                                  <span>{category.product_count || 0} products</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant="outline" 
                              className="bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {category.product_count || 0} products
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => startEdit(category)}
                                disabled={editingId !== ''}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteCategory(category.id)}
                                disabled={editingId !== '' || (category.product_count || 0) > 0}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {index < categories.length - 1 && <div className="border-b border-slate-200" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Add
              </Badge>
              <p className="text-sm text-slate-600">
                Categories help organize your products. All products must belong to a category.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Edit
              </Badge>
              <p className="text-sm text-slate-600">
                You can edit category names at any time. Changes will apply to all products in that category.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Delete
              </Badge>
              <p className="text-sm text-slate-600">
                Categories with products cannot be deleted. Move or delete all products from a category before deleting it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
