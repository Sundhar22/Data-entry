"use client";

import { useState, useEffect } from "react";
import { Clock, User, Package, IndianRupee, Gavel, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Activity {
  id: string;
  type: 'session' | 'farmer' | 'bill' | 'product';
  title: string;
  description: string;
  time: string;
  status: string;
  amount?: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent activities from APIs
  const fetchRecentActivity = async () => {
    try {
      // In a real app, this would aggregate data from multiple API endpoints
      // Simulating activities based on backend API structure
      
      const mockActivities: Activity[] = [
        {
          id: "1",
          type: "session",
          title: "Auction Session Started",
          description: "Session #AUC-001 with 12 items",
          time: "2 hours ago",
          status: "active",
          amount: "₹2,45,000"
        },
        {
          id: "2", 
          type: "farmer",
          title: "New Farmer Added",
          description: "Rajesh Kumar from Kharadi Village",
          time: "4 hours ago",
          status: "registered",
        },
        {
          id: "3",
          type: "bill",
          title: "Bill Generated",
          description: "Bill #BILL-001 for Priya Sharma",
          time: "6 hours ago", 
          status: "unpaid",
          amount: "₹1,25,000"
        },
        {
          id: "4",
          type: "bill",
          title: "Payment Received",
          description: "Bill #BILL-002 marked as paid",
          time: "8 hours ago",
          status: "paid", 
          amount: "₹89,500"
        },
        {
          id: "5",
          type: "product",
          title: "Product Added",
          description: "Premium Basmati Rice added to catalog",
          time: "1 day ago",
          status: "active",
        }
      ];

      setActivities(mockActivities);
    } catch (error) {
      console.error('Failed to fetch recent activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'session':
        return Gavel;
      case 'farmer':
        return User;
      case 'bill':
        return IndianRupee;
      case 'product':
        return Package;
      default:
        return Clock;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'unpaid':
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
      case 'registered':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-slate-800">
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={fetchRecentActivity}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-600">Loading activities...</span>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-slate-600">
            No recent activities found.
          </div>
        ) : (
          <div className="space-y-0">
            {activities.map((activity, index) => {
              const IconComponent = getIcon(activity.type);
              return (
                <div key={activity.id}>
                  <div className="flex items-start space-x-4 p-4 hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium text-slate-900 truncate">
                          {activity.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusBadge(activity.status)}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-slate-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </div>
                        {activity.amount && (
                          <div className="text-sm font-medium text-slate-700">
                            {activity.amount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < activities.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        )}
        
        {!loading && activities.length > 0 && (
          <div className="p-4 border-t">
            <Button variant="ghost" size="sm" className="w-full">
              View All Activities
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
