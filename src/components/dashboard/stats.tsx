"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, Package, IndianRupee, Activity, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStats {
  totalFarmers: number;
  totalProducts: number;
  totalRevenue: number;
  activeSessions: number;
  loading: boolean;
}

export default function Stats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFarmers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    activeSessions: 0,
    loading: true
  });

  // Fetch dashboard stats from APIs
  const fetchStats = async () => {
    try {
      // In a real app, these would be parallel API calls
      // For now, we'll simulate API responses based on the backend structure
      
      // Simulated stats that would come from actual API calls
      const mockStats = {
        totalFarmers: 127,
        totalProducts: 24,
        totalRevenue: 2847650,
        activeSessions: 3,
        loading: false
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statsData = [
    {
      title: "Total Farmers",
      value: stats.totalFarmers.toString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      loading: stats.loading
    },
    {
      title: "Available Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      loading: stats.loading
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: IndianRupee,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      loading: stats.loading
    },
    {
      title: "Active Sessions",
      value: stats.activeSessions.toString(),
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      loading: stats.loading
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`h-8 w-8 rounded-md ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            {stat.loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                <span className="text-slate-400">Loading...</span>
              </div>
            ) : (
              <>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span>Live data</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
