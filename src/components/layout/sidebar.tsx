"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Package,
  UserCheck,
  Gavel,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

interface NavigationCounts {
  farmers: number;
  products: number;
  buyers: number;
  auctions: number;
  bills: number;
}

const getNavigationItems = (counts: NavigationCounts) => [
  {
    name: "Farmers",
    href: "/farmers",
    icon: Users,
    badge: counts.farmers > 0 ? counts.farmers.toString() : null,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    badge: counts.products > 0 ? counts.products.toString() : null,
  },
  {
    name: "Buyers",
    href: "/buyers",
    icon: UserCheck,
    badge: counts.buyers > 0 ? counts.buyers.toString() : null,
  },
  {
    name: "Auctions",
    href: "/auctions",
    icon: Gavel,
    badge: counts.auctions > 0 ? counts.auctions.toString() : null,
  },
  {
    name: "Bills",
    href: "/bills",
    icon: FileText,
    badge: counts.bills > 0 ? counts.bills.toString() : null,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
    badge: null,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [counts, setCounts] = useState<NavigationCounts>({
    farmers: 0,
    products: 0,
    buyers: 0,
    auctions: 0,
    bills: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch counts from APIs
        const [farmersRes, productsRes, buyersRes, auctionsRes, billsRes] =
          await Promise.all([
            fetch("/api/farmers?limit=1", { credentials: "include" }).catch(
              () => null,
            ),
            fetch("/api/products?limit=1", { credentials: "include" }).catch(
              () => null,
            ),
            fetch("/api/buyers?limit=1", { credentials: "include" }).catch(
              () => null,
            ), // Note: API is /api/buyer not /api/buyers
            fetch("/api/sessions?limit=1", { credentials: "include" }).catch(
              () => null,
            ),
            fetch("/api/bills?limit=1", { credentials: "include" }).catch(
              () => null,
            ),
          ]);

        const newCounts = {
          farmers: 0,
          products: 0,
          buyers: 0,
          auctions: 0,
          bills: 0,
        };

        if (farmersRes?.ok) {
          const farmersData = await farmersRes.json();
          newCounts.farmers = farmersData.meta?.total || 0;
        }

        if (productsRes?.ok) {
          const productsData = await productsRes.json();
          newCounts.products = productsData.meta?.total ?? productsData.data?.length ?? 0;
        }

        if (buyersRes?.ok) {
          const buyersData = await buyersRes.json();
          newCounts.buyers = buyersData.meta?.total || 0;
        }

        if (auctionsRes?.ok) {
          const auctionsData = await auctionsRes.json();
          newCounts.auctions = auctionsData.meta?.total || 0;
        }

        if (billsRes?.ok) {
          const billsData = await billsRes.json();
          newCounts.bills = billsData.meta?.total || 0;
        }

        setCounts(newCounts);
      } catch (error) {
        console.error("Failed to fetch navigation counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const navigationItems = getNavigationItems(counts);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Force redirect even if logout fails
      router.push("/auth/login");
    }
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-slate-200 h-full">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Logo Section */}
        <div className="flex items-center h-16 px-4 lg:px-6 border-b border-slate-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="ml-2 lg:ml-3 text-lg lg:text-xl font-bold text-slate-900">
              AgriTrade
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 lg:h-12 text-left text-sm lg:text-base",
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50",
                  )}
                >
                  <item.icon className="mr-2 lg:mr-3 h-4 lg:h-5 w-4 lg:w-5" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "secondary"}
                      className={cn(
                        "ml-auto",
                        isActive ? "bg-blue-100 text-blue-800" : "",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-3 lg:mx-4" />

        {/* Bottom Actions */}
        <div className="px-3 lg:px-4 py-3 lg:py-4 space-y-1 lg:space-y-2">
          <Link href="/profile">
            <Button
              variant="ghost"
              className="w-full justify-start h-9 lg:h-10 text-slate-600 text-sm lg:text-base"
            >
              <Settings className="mr-2 lg:mr-3 h-3 lg:h-4 w-3 lg:w-4" />
              Profile
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start h-9 lg:h-10 text-slate-600 hover:text-red-600 hover:bg-red-50 text-sm lg:text-base"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 lg:mr-3 h-3 lg:h-4 w-3 lg:w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
