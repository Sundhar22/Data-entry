"use client";

import * as React from "react";
import Sidebar from "./sidebar";
import Footer from "./footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
