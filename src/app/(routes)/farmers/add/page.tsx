"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  AlertCircle
} from 'lucide-react';

interface CreateFarmerRequest {
  name: string;
  phone: string;
  village: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  village?: string;
  general?: string;
}

export default function AddFarmerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<CreateFarmerRequest>({
    name: '',
    phone: '',
    village: ''
  });

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
      const response = await fetch('/api/farmers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          village: formData.village.trim()
        })
      });
      
      if (response.ok) {
        await response.json();
        router.push('/farmers');
      } else if (response.status === 401) {
        setErrors({ general: 'Authentication required. Please log in.' });
      } else if (response.status === 409) {
        setErrors({ phone: 'A farmer with this phone number already exists.' });
      } else {
        const errorData = await response.json().catch(() => null);
        setErrors({ 
          general: errorData?.message || 'Failed to create farmer. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error creating farmer:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateFarmerRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Add New Farmer</h1>
            <p className="text-slate-600 mt-1">Register a new farmer in the system</p>
          </div>
        </div>

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
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Farmer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Phone
                </Badge>
                <p className="text-sm text-slate-600">
                  Phone numbers must be unique. Each farmer can only be registered once.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Status
                </Badge>
                <p className="text-sm text-slate-600">
                  New farmers are automatically set to active status and can participate in auctions immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
