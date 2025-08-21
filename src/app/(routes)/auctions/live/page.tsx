"use client";

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Users,
  Gavel,
  Clock,
  TrendingUp,
  Pause,
  Square,
  Volume2,
  Maximize,
  RefreshCw,
  IndianRupee,
  Trophy,
  Activity,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const liveAuctionData = {
  id: "AUC001",
  title: "Premium Basmati Rice Auction",
  product: "Premium Basmati Rice - Grade A+",
  farmer: "Rajesh Kumar",
  quantity: "500 bags (25kg each)",
  basePrice: 45,
  currentBid: 52,
  previousBid: 50,
  increment: 2,
  timeRemaining: "1h 25m 30s",
  totalParticipants: 12,
  activeBidders: 6,
  totalBids: 28,
  status: "active",
  commission: 3
};

const recentBids = [
  { id: 1, bidder: "Mumbai Grain Traders", amount: 52, time: "2s ago", status: "leading" },
  { id: 2, bidder: "Fresh Market Co.", amount: 50, time: "15s ago", status: "outbid" },
  { id: 3, bidder: "Nashik Distributors", amount: 49, time: "1m ago", status: "outbid" },
  { id: 4, bidder: "Local Traders Union", amount: 48, time: "2m ago", status: "outbid" },
  { id: 5, bidder: "Premium Rice Corp", amount: 47, time: "3m ago", status: "outbid" },
  { id: 6, bidder: "Mumbai Grain Traders", amount: 46, time: "4m ago", status: "outbid" },
];

const participants = [
  { id: 1, name: "Mumbai Grain Traders", status: "active", bids: 8, highestBid: 52, rating: 4.9 },
  { id: 2, name: "Fresh Market Co.", status: "active", bids: 6, highestBid: 50, rating: 4.7 },
  { id: 3, name: "Nashik Distributors", status: "watching", bids: 4, highestBid: 49, rating: 4.8 },
  { id: 4, name: "Local Traders Union", status: "active", bids: 3, highestBid: 48, rating: 4.5 },
  { id: 5, name: "Premium Rice Corp", status: "watching", bids: 2, highestBid: 47, rating: 4.6 },
  { id: 6, name: "Export Partners Ltd", status: "inactive", bids: 1, highestBid: 46, rating: 4.8 },
];

export default function LiveAuctionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/auctions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Auctions
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">{liveAuctionData.title}</h1>
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              </div>
              <p className="text-slate-600 mt-1">Real-time auction monitoring and control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Live Auction Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Current Bid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">₹{liveAuctionData.currentBid}/kg</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">
                  +₹{liveAuctionData.currentBid - liveAuctionData.previousBid} from last bid
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time Remaining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{liveAuctionData.timeRemaining}</div>
              <div className="text-xs text-blue-600 mt-1">Auto-extends on late bids</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Bidders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{liveAuctionData.activeBidders}</div>
              <div className="text-xs text-purple-600 mt-1">
                {liveAuctionData.totalParticipants} total participants
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Total Bids
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">{liveAuctionData.totalBids}</div>
              <div className="text-xs text-orange-600 mt-1">High bidding activity</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Live Auction Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Auction Details & Controls */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  {liveAuctionData.product}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                    <Square className="h-4 w-4 mr-1" />
                    End
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auction Item Info */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-600">Farmer</div>
                    <div className="font-semibold text-slate-900">{liveAuctionData.farmer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Quantity</div>
                    <div className="font-semibold text-slate-900">{liveAuctionData.quantity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Base Price</div>
                    <div className="font-semibold text-slate-900">₹{liveAuctionData.basePrice}/kg</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Commission</div>
                    <div className="font-semibold text-slate-900">{liveAuctionData.commission}%</div>
                  </div>
                </div>
              </div>

              {/* Current Leader */}
              <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <div>
                      <div className="font-semibold text-green-900">Leading Bidder</div>
                      <div className="text-green-700">{recentBids[0].bidder}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-900">₹{recentBids[0].amount}/kg</div>
                    <div className="text-sm text-green-600">Current highest bid</div>
                  </div>
                </div>
              </div>

              {/* Expected Revenue */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700">Total Value</div>
                  <div className="text-xl font-bold text-blue-900">
                    ₹{(liveAuctionData.currentBid * 12500).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700">Commission</div>
                  <div className="text-xl font-bold text-green-900">
                    ₹{((liveAuctionData.currentBid * 12500 * liveAuctionData.commission) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-700">Net to Farmer</div>
                  <div className="text-xl font-bold text-purple-900">
                    ₹{((liveAuctionData.currentBid * 12500 * (100 - liveAuctionData.commission)) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bids */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Bids
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {recentBids.map((bid, index) => (
                  <div key={bid.id}>
                    <div className={`p-3 ${bid.status === 'leading' ? 'bg-green-50' : 'hover:bg-slate-50'} transition-colors`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${bid.status === 'leading' ? 'text-green-900' : 'text-slate-900'}`}>
                              ₹{bid.amount}/kg
                            </span>
                            {bid.status === 'leading' && (
                              <Badge variant="success" className="text-xs">
                                LEADING
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">{bid.bidder}</div>
                          <div className="text-xs text-slate-500">{bid.time}</div>
                        </div>
                        {bid.status === 'leading' && (
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    {index < recentBids.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Auction Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {participants.map((participant, index) => (
                <div key={participant.id}>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          participant.status === 'active' ? 'bg-green-100' :
                          participant.status === 'watching' ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          <span className={`text-sm font-semibold ${
                            participant.status === 'active' ? 'text-green-600' :
                            participant.status === 'watching' ? 'text-blue-600' : 'text-slate-600'
                          }`}>
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{participant.name}</div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{participant.bids} bids</span>
                            <span>•</span>
                            <span>Highest: ₹{participant.highestBid}</span>
                            <span>•</span>
                            <span>Rating: ⭐ {participant.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={
                            participant.status === 'active' ? 'success' :
                            participant.status === 'watching' ? 'default' : 'secondary'
                          } 
                          className="text-xs"
                        >
                          {participant.status.toUpperCase()}
                        </Badge>
                        {participant.status === 'inactive' && (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  {index < participants.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Bar */}
        <div className="flex items-center justify-between gap-4 bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-green-600 animate-pulse" />
            <div>
              <div className="font-semibold text-green-900">Auction is Live</div>
              <div className="text-sm text-green-700">
                High activity • {liveAuctionData.activeBidders} active bidders • {liveAuctionData.timeRemaining} remaining
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-700">Next bid minimum</div>
            <div className="text-xl font-bold text-green-900">₹{liveAuctionData.currentBid + liveAuctionData.increment}/kg</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
