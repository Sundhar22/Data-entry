"use client";

import * as React from "react";
import Sidebar from "./sidebar";
import MobileSidebar from "./mobile-sidebar";
import Footer from "./footer";
import { ToastContainer } from "@/components/ui/alert";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="lg:hidden p-3 border-b bg-white flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="px-3 py-2 border rounded text-slate-700"
          >
            Menu
          </button>
          <div className="font-semibold">AgriTrade</div>
        </div>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <ToastContainer />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
