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
  User, 
  Phone, 
  MapPin,
  Loader2,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UpdateFarmerRequest {
  name: string;
  phone: string;
  village: string;
  is_active: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  village?: string;
  general?: string;
}

export default function EditFarmerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const farmerId = searchParams.get('id');
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [formData, setFormData] = useState<UpdateFarmerRequest>({
    name: '',
    phone: '',
    village: '',
    is_active: true
  });

  // Fetch farmer data
  useEffect(() => {
    if (!farmerId) {
      router.push('/farmers');
      return;
    }
    
    const fetchFarmer = async () => {
      try {
        const response = await fetch(`/api/farmers/${farmerId}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          const farmerData = data.data;
          setFarmer(farmerData);
          setFormData({
            name: farmerData.name,
            phone: farmerData.phone,
            village: farmerData.village,
            is_active: farmerData.is_active
          });
        } else if (response.status === 404) {
          setErrors({ general: 'Farmer not found.' });
        } else if (response.status === 401) {
          setErrors({ general: 'Authentication required.' });
        } else {
          setErrors({ general: 'Failed to load farmer data.' });
        }
      } catch (error) {
        console.error('Error fetching farmer:', error);
        setErrors({ general: 'Network error. Please try again.' });
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchFarmer();
  }, [farmerId, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Farmer name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.village.trim()) {
      newErrors.village = 'Village name is required';
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
      const response = await fetch(`/api/farmers/${farmerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          village: formData.village.trim(),
          is_active: formData.is_active
        })
      });
      
      if (response.ok) {
        router.push('/farmers');
      } else if (response.status === 401) {
        setErrors({ general: 'Authentication required. Please log in.' });
      } else if (response.status === 404) {
        setErrors({ general: 'Farmer not found.' });
      } else if (response.status === 409) {
        setErrors({ phone: 'A farmer with this phone number already exists.' });
      } else {
        const errorData = await response.json().catch(() => null);
        setErrors({ 
          general: errorData?.message || 'Failed to update farmer. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error updating farmer:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateFarmerRequest, value: string | boolean) => {
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
          <span className="ml-3 text-slate-600">Loading farmer details...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!farmer) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/farmers')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Farmers
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Farmer Not Found</h1>
              <p className="text-slate-600 mt-1">The requested farmer could not be found</p>
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
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Edit Farmer</h1>
            <p className="text-slate-600 mt-1">Update farmer information</p>
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
                Created: {formatDate(farmer.created_at)}
              </p>
              <p className="text-sm text-slate-600">
                Last updated: {formatDate(farmer.updated_at)}
              </p>
            </div>
            <Badge 
              variant={farmer.is_active ? "success" : "secondary"}
              className={farmer.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
            >
              {farmer.is_active ? "Active" : "Inactive"}
            </Badge>
          </CardContent>
        </Card>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Farmer Information
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
                
                {/* Farmer Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Farmer Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter farmer's full name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter 10-digit phone number"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Village */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Village *
                  </label>
                  <Input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange('village', e.target.value)}
                    placeholder="Enter village name"
                    className={errors.village ? "border-red-500" : ""}
                  />
                  {errors.village && (
                    <p className="text-sm text-red-600">{errors.village}</p>
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
                    Inactive farmers cannot participate in auctions
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
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Update Farmer
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
