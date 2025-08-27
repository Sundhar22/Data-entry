"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  User,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Package,
  IndianRupee,
  Loader2,
  AlertCircle,
  Eye,
  History,
} from "lucide-react";

interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FarmerStats {
  totalSales: number;
  totalRevenue: number;
  activeSessions: number;
  lastSaleDate?: string;
}

export default function FarmerDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const farmerId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [stats, setStats] = useState<FarmerStats>({
    totalSales: 0,
    totalRevenue: 0,
    activeSessions: 0,
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!farmerId) {
      router.push("/farmers");
      return;
    }

    const fetchFarmerDetails = async () => {
      try {
        const response = await fetch(`/api/farmers/${farmerId}`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setFarmer(data.data);

          // In a real app, you might fetch additional stats here
          // For now, we'll use mock data
          setStats({
            totalSales: Math.floor(Math.random() * 50) + 10,
            totalRevenue: Math.floor(Math.random() * 500000) + 50000,
            activeSessions: Math.floor(Math.random() * 5),
            lastSaleDate: new Date(
              Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          });
        } else if (response.status === 404) {
          setError("Farmer not found.");
        } else if (response.status === 401) {
          setError("Authentication required.");
        } else {
          setError("Failed to load farmer data.");
        }
      } catch (error) {
        console.error("Error fetching farmer:", error);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerDetails();
  }, [farmerId, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-slate-600">Loading farmer details...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !farmer) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/farmers")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Farmers
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Farmer Not Found
              </h1>
              <p className="text-slate-600 mt-1">
                The requested farmer could not be found
              </p>
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
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                {farmer.name}
              </h1>
              <p className="text-slate-600 mt-1">Farmer Details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/farmers/edit?id=${farmer.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {/* Farmer Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <Badge
                variant={farmer.is_active ? "success" : "secondary"}
                className={
                  farmer.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {farmer.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Full Name</p>
                    <p className="font-semibold text-slate-900">
                      {farmer.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Phone Number</p>
                    <p className="font-semibold text-slate-900">
                      {farmer.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Village</p>
                    <p className="font-semibold text-slate-900">
                      {farmer.village}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Registered</p>
                    <p className="font-semibold text-slate-900">
                      {formatDate(farmer.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-sm text-slate-600">
              <p>Last updated: {formatDate(farmer.updated_at)}</p>
              <p>Farmer ID: {farmer.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales}</div>
              <p className="text-xs text-muted-foreground">Items sold</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sessions
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.activeSessions}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently participating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Sale</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {stats.lastSaleDate
                  ? formatDate(stats.lastSaleDate)
                  : "No sales"}
              </div>
              <p className="text-xs text-muted-foreground">
                Most recent activity
              </p>
            </CardContent>
          </Card>
        </div>

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
                  // Navigate to farmer's sales history
                  router.push(`/farmers/${farmer.id}/sales`);
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
                  // Navigate to farmer's auction items
                  router.push(`/farmers/${farmer.id}/auctions`);
                }}
              >
                <Eye className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Auction Items</p>
                  <p className="text-xs text-slate-600">Current & past items</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 p-6 h-auto"
                onClick={() => {
                  router.push(`/farmers/edit?id=${farmer.id}`);
                }}
              >
                <Edit className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Edit Details</p>
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
