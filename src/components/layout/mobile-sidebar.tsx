"use client";

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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

export function MobileSidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 py-4">
        {/* Navigation Items */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        <Separator className="my-4" />

        {/* Quick Actions for Commissioners */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-900 px-3">Quick Actions</h3>
          <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
            <Gavel className="mr-3 h-4 w-4" />
            New Auction
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Package className="mr-3 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Bottom Actions */}
      <div className="space-y-2 py-4">
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
  );
}
