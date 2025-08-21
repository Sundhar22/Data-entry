"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileSidebar } from "./mobile-sidebar";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <MobileSidebar />
            </SheetContent>
          </Sheet>
          
          <h1 className="text-xl font-bold text-slate-900 lg:text-2xl">
            AgriTrade Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search Bar - Hidden on small screens */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
            />
          </div>
          
          {/* Search Button for mobile */}
          <Button variant="outline" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>
          
          {/* Notifications */}
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          
          {/* User Profile */}
          <Button variant="outline" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
