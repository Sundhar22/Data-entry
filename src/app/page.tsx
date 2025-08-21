import DashboardLayout from '@/components/layout/dashboard-layout'
import Stats from '@/components/dashboard/stats'
import RecentActivity from '@/components/dashboard/recent-activity'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, FileText } from 'lucide-react'
import React from 'react'

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-lg text-slate-600 font-medium">
              Welcome back! Here&apos;s what&apos;s happening in your agricultural market today.
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="lg" className="rounded-xl border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50">
              <Calendar className="h-4 w-4" />
              Schedule Session
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50">
              <FileText className="h-4 w-4" />
              Generate Bill
            </Button>
            <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg">
              <Plus className="h-4 w-4" />
              Add Farmer
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <Stats />

        {/* Recent Activity */}
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          {/* Quick Info Panel */}
          <div className="space-y-8">
            {/* Today's Sessions */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-professional">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Today&apos;s Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Morning Vegetables</p>
                    <p className="text-xs text-slate-500 font-semibold">9:00 AM - 12:00 PM</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Evening Fruits</p>
                    <p className="text-xs text-slate-500 font-semibold">4:00 PM - 7:00 PM</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>

            {/* Pending Bills */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-professional">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Pending Bills</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-semibold">Total Pending</span>
                  <span className="font-bold text-xl text-slate-800">12 bills</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-semibold">Amount Due</span>
                  <span className="font-bold text-xl text-red-600">₹3,45,670</span>
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-xl border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50">
                  View All Bills
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}