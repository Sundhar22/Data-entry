"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Clock,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface AuctionSession {
  id: string;
  date: string;
  status: "ACTIVE" | "COMPLETED";
  commissioner: {
    id: string;
    name: string;
    phone: string;
  };
}

interface AuctionItem {
  id: string;
  sessionId: string;
  farmer: {
    id: string;
    name: string;
    phone: string;
  };
  product: {
    id: string;
    name: string;
    category: {
      name: string;
    };
  };
  quantity: number;
  unit: string;
  rate?: number; // This is the final price per unit
  buyer?: {
    id: string;
    name: string;
  };
}

interface LiveAnalytics {
  totalItems: number;
  soldItems: number;
  pendingItems: number;
  totalRevenue: number;
  averagePrice: number;
  uniqueFarmers: number;
  uniqueCategories: number;
  successRate: number;
}

export default function LiveAuctionAnalytics() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  // State management
  const [currentSession, setCurrentSession] = useState<AuctionSession | null>(
    null,
  );
  const [analytics, setAnalytics] = useState<LiveAnalytics>({
    totalItems: 0,
    soldItems: 0,
    pendingItems: 0,
    totalRevenue: 0,
    averagePrice: 0,
    uniqueFarmers: 0,
    uniqueCategories: 0,
    successRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Calculate analytics from auction items
  const calculateAnalytics = useCallback(
    (items: AuctionItem[]): LiveAnalytics => {
      const totalItems = items.length;
      const soldItems = items.filter((item) => item.rate && item.buyer).length;
      const pendingItems = totalItems - soldItems;

      // Calculate total revenue: rate * quantity for each sold item
      const totalRevenue = items
        .filter((item) => item.rate && item.buyer)
        .reduce((sum, item) => sum + (item.rate || 0) * item.quantity, 0);

      const averagePrice = soldItems > 0 ? totalRevenue / soldItems : 0;
      const uniqueFarmers = new Set(items.map((item) => item.farmer?.id)).size;
      const uniqueCategories = new Set(
        items.map((item) => item.product?.category?.name),
      ).size;
      const successRate = totalItems > 0 ? (soldItems / totalItems) * 100 : 0;

      return {
        totalItems,
        soldItems,
        pendingItems,
        totalRevenue,
        averagePrice,
        uniqueFarmers,
        uniqueCategories,
        successRate,
      };
    },
    [],
  );

  // Fetch live auction data
  const fetchLiveData = useCallback(async () => {
    if (!sessionId) {
      setError("No session ID provided");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Fetch session details
      const sessionResponse = await fetch(`/api/sessions/${sessionId}`, {
        credentials: "include", // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          `HTTP ${sessionResponse.status}: ${sessionResponse.statusText}`;
        throw new Error(`Failed to fetch session: ${errorMessage}`);
      }
      const sessionData = await sessionResponse.json();
      setCurrentSession(sessionData.data.session);

      // Fetch session items for live analytics (with pagination to get all items)
      let allItems: AuctionItem[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const itemsResponse = await fetch(
          `/api/sessions/${sessionId}/items?limit=100&page=${page}`,
          {
            credentials: "include", // Include cookies for authentication
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!itemsResponse.ok) {
          const errorData = await itemsResponse.json().catch(() => null);
          const errorMessage =
            errorData?.message ||
            `HTTP ${itemsResponse.status}: ${itemsResponse.statusText}`;
          throw new Error(`Failed to fetch session items: ${errorMessage}`);
        }

        const itemsData = await itemsResponse.json();
        const items = itemsData.data || [];
        const meta = itemsData.meta || {};

        allItems = [...allItems, ...items];

        // Debug: Log first item to see structure
        if (items.length > 0 && page === 1) {
          console.log("First auction item structure:", items[0]);
        }

        // Check if there are more pages
        hasMore = meta.hasNext || items.length === 100;
        page++;

        // Safety check to prevent infinite loops
        if (page > 50) break; // Max 5000 items
      }

      setAnalytics(calculateAnalytics(allItems));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, calculateAnalytics]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchLiveData();

    const interval = setInterval(() => {
      fetchLiveData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchLiveData]);

  if (!sessionId) {
    return (
      <DashboardLayout>
        <div className="p-4 lg:p-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              No session ID provided. Please select a session to view analytics.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 lg:space-y-8 p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 lg:gap-3">
              <Link href="/auctions" className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-slate-900">
                  Live Auction Analytics
                </h1>
                {currentSession && (
                  <p className="text-sm lg:text-base text-slate-600 mt-1">
                    Session #{currentSession.id?.slice(-8).toUpperCase()} •{" "}
                    {currentSession.date
                      ? new Date(currentSession.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLiveData}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="ml-2">Refresh</span>
            </Button>
            <div className="text-xs text-slate-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && analytics.totalItems === 0 && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-slate-600">
              Loading auction analytics...
            </span>
          </div>
        )}

        {/* Main Analytics Grid */}
        {!isLoading || analytics.totalItems > 0 ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="border-blue-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600" />
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-blue-900">
                        {analytics.totalItems}
                      </div>
                      <p className="text-sm text-blue-700">Total Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 lg:h-10 lg:w-10 text-green-600" />
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-green-900">
                        {analytics.soldItems}
                      </div>
                      <p className="text-sm text-green-700">Sold Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 lg:h-10 lg:w-10 text-purple-600" />
                    <div>
                      <div className="text-xl lg:text-3xl font-bold text-purple-900">
                        ₹
                        {new Intl.NumberFormat("en-IN").format(
                          analytics.totalRevenue,
                        )}
                      </div>
                      <p className="text-sm text-purple-700">Revenue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 lg:h-10 lg:w-10 text-orange-600" />
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-orange-900">
                        {Math.round(analytics.successRate)}%
                      </div>
                      <p className="text-sm text-orange-700">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Performance Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Performance Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-green-900">
                          Sold Items
                        </div>
                        <div className="text-sm text-green-700">
                          {Math.round(analytics.successRate)}% of total
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        {analytics.soldItems}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-yellow-900">
                          Pending Items
                        </div>
                        <div className="text-sm text-yellow-700">
                          {Math.round(100 - analytics.successRate)}% remaining
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-yellow-900">
                        {analytics.pendingItems}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-blue-900">
                          Average Revenue
                        </div>
                        <div className="text-sm text-blue-700">
                          Total revenue ÷ sold items
                        </div>
                      </div>
                      <div className="text-xl font-bold text-blue-900">
                        ₹
                        {new Intl.NumberFormat("en-IN").format(
                          Math.round(analytics.averagePrice),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Auction Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-indigo-600" />
                    Auction Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-indigo-900">
                          Participating Farmers
                        </div>
                        <div className="text-sm text-indigo-700">
                          Unique sellers
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-indigo-900">
                        {analytics.uniqueFarmers}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-purple-900">
                          Product Categories
                        </div>
                        <div className="text-sm text-purple-700">
                          Types of products
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">
                        {analytics.uniqueCategories}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-slate-900">
                          Session Status
                        </div>
                        <div className="text-sm text-slate-700">
                          Current state
                        </div>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {currentSession?.status || "UNKNOWN"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Information */}
            {currentSession && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Session Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">
                        Commissioner
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {currentSession.commissioner?.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {currentSession.commissioner?.phone}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">
                        Session Date
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {currentSession.date
                          ? new Date(currentSession.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-900">
                        Session ID
                      </div>
                      <div className="text-sm text-gray-600 mt-1 font-mono">
                        {currentSession.id?.slice(-12).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : null}

        {/* No Data State */}
        {!isLoading && analytics.totalItems === 0 && !error && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No auction data available
            </h3>
            <p className="text-gray-600 mb-4">
              This session doesn&apos;t have any auction items yet.
            </p>
            <Link href={`/auctions/items?session=${sessionId}`}>
              <Button variant="outline">Add Auction Items</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
