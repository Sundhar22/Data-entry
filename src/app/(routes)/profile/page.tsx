"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Percent,
  Calendar,
  Edit,
  Save,
  X,
  Loader2,
  AlertCircle,
  Building,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

interface Commissioner {
  id: string;
  name: string;
  email: string;
  phone: string;
  commission_rate: number;
  location: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const [commissioner, setCommissioner] = useState<Commissioner | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Commissioner>>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/commissioner/me");
      
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setCommissioner(data.data);
      setFormData(data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setFormError("Failed to load profile information");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async () => {
    if (!commissioner) return;

    // Validation
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      setFormError("Name, email, and phone are required");
      return;
    }

    try {
      setIsSaving(true);
      setFormError("");
      setSuccessMessage("");
      
      const response = await fetch("/api/commissioner/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to update profile");
      }

      setCommissioner(data.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setFormError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(commissioner || {});
    setIsEditing(false);
    setFormError("");
  };

  const handleInputChange = (field: keyof Commissioner, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setFormError(""); // Clear error when user starts typing
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-2 text-slate-600">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!commissioner) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No profile found</h3>
            <p className="mt-1 text-sm text-gray-500">Unable to load profile information.</p>
            <Button onClick={fetchProfile} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Profile</h1>
            <p className="text-slate-600 mt-1">Manage your account information and business settings</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {formError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{formError}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Profile Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name {isEditing && "*"}</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{commissioner.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address {isEditing && "*"}</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{commissioner.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number {isEditing && "*"}</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{commissioner.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Business Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Business Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter your business location"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{commissioner.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                {isEditing ? (
                  <Input
                    id="commission_rate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.commission_rate || ""}
                    onChange={(e) => handleInputChange("commission_rate", parseFloat(e.target.value) || 0)}
                    placeholder="Enter commission rate"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                    <Percent className="h-4 w-4 text-slate-400" />
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {commissioner.commission_rate}%
                    </Badge>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Account Created: {formatDate(commissioner.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last Updated: {formatDate(commissioner.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <User className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-blue-600">Active</p>
                <p className="text-sm text-slate-600">Account Status</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Percent className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-green-600">{commissioner.commission_rate}%</p>
                <p className="text-sm text-slate-600">Commission Rate</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Building className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-purple-600">Business</p>
                <p className="text-sm text-slate-600">Account Type</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
