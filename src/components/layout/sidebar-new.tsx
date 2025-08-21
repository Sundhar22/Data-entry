"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
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

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    badge: null,
  },
  {
    name: "Farmers",
    href: "/farmers",
    icon: Users,
    badge: "124",
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
    badge: "89",
  },
  {
    name: "Buyers",
    href: "/buyers",
    icon: UserCheck,
    badge: "56",
  },
  {
    name: "Auctions",
    href: "/auctions",
    icon: Gavel,
    badge: "12",
  },
  {
    name: "Bills",
    href: "/bills",
    icon: FileText,
    badge: null,
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

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-slate-200 h-full">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Logo Section */}
        <div className="flex items-center h-16 px-6 border-b border-slate-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900">AgriTrade</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left",
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "secondary"}
                      className={cn(
                        "ml-auto",
                        isActive ? "bg-blue-100 text-blue-800" : ""
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

        <Separator className="mx-4" />

        {/* Quick Actions */}
        <div className="px-4 py-4 space-y-3">
          <h3 className="text-sm font-medium text-slate-900">Quick Actions</h3>
          <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
            <Gavel className="mr-3 h-4 w-4" />
            New Auction
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Package className="mr-3 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Separator className="mx-4" />

        {/* Bottom Actions */}
        <div className="px-4 py-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-600">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600">
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}
