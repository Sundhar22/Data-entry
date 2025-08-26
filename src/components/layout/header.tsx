"use client";

import * as React from "react";
import {
  Menu,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

const MobileSidebarContent: React.FC = () => {
  const router = useRouter();

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
      router.push("/auth/login");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 py-4">
        <nav className="space-y-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </Button>
          </Link>
          <Link href="/farmers">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Users className="mr-3 h-5 w-5" />
              Farmers
            </Button>
          </Link>
          <Link href="/products">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Package className="mr-3 h-5 w-5" />
              Products
            </Button>
          </Link>
          <Link href="/buyers">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <UserCheck className="mr-3 h-5 w-5" />
              Buyers
            </Button>
          </Link>
          <Link href="/auctions">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <Gavel className="mr-3 h-5 w-5" />
              Auctions
            </Button>
          </Link>
          <Link href="/bills">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <FileText className="mr-3 h-5 w-5" />
              Bills
            </Button>
          </Link>
          <Link href="/analytics">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Analytics
            </Button>
          </Link>
        </nav>
      </div>

      <Separator className="my-2" />

      <div className="space-y-2 py-4">
        <Link href="/profile">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-600"
          >
            <Settings className="mr-3 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps = {}) {
  return (
    <header
      className={`bg-white border-b border-slate-200 sticky top-0 z-30 ${className || ""}`}
    >
      <div className="px-3 sm:px-5 py-2.5 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <MobileSidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo/Title - Hidden on mobile */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-bold text-slate-900">AgriTrade</h1>
        </div>

        {/* Mobile Title - Shown only on mobile */}
        <div className="lg:hidden flex-1 text-center">
          <h1 className="text-lg font-bold text-slate-900">AgriTrade</h1>
        </div>
      </div>
    </header>
  );
}
