"use client";

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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to login page
        window.location.href = "/auth/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="w-64 bg-white h-full shadow-lg">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-4 py-4">
            <nav className="space-y-2">
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
      </div>
    </div>
  );
};

export default MobileSidebar;
