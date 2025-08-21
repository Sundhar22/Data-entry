"use client";

import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Save,
  Plus,
  Search,
  Package,
  Users,
  IndianRupee,
  Camera,
  Upload,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

const farmersData = [
  { id: "F001", name: "Rajesh Kumar", location: "Pune, Maharashtra", phone: "+91 98765 43210", verified: true },
  { id: "F002", name: "Priya Sharma", location: "Nashik, Maharashtra", phone: "+91 98765 43211", verified: true },
  { id: "F003", name: "Suresh Patil", location: "Aurangabad, Maharashtra", phone: "+91 98765 43212", verified: true },
  { id: "F004", name: "Meera Devi", location: "Solapur, Maharashtra", phone: "+91 98765 43213", verified: false }
];

const categories = [
  { id: "grains", name: "Grains", units: ["kg", "quintal", "bag"] },
  { id: "vegetables", name: "Vegetables", units: ["kg", "crate", "box"] },
  { id: "cash_crops", name: "Cash Crops", units: ["kg", "bale", "ton"] },
  { id: "fruits", name: "Fruits", units: ["kg", "crate", "box"] },
  { id: "pulses", name: "Pulses", units: ["kg", "quintal", "bag"] }
];

const qualityGrades = [
  { value: "A+", label: "Grade A+ (Premium)", description: "Export quality, premium grade" },
  { value: "A", label: "Grade A (Excellent)", description: "High quality, domestic premium" },
  { value: "B+", label: "Grade B+ (Good)", description: "Good quality, standard market" },
  { value: "B", label: "Grade B (Average)", description: "Average quality, local market" },
  { value: "C", label: "Grade C (Below Average)", description: "Below average, processing grade" }
];

export default function AddItemPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/auctions/session">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Session
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Add Auction Item</h1>
            <p className="text-slate-600 mt-1">Add a new product to the auction session</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farmer Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Farmer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search farmer by name or phone..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {farmersData.slice(0, 4).map((farmer) => (
                    <div
                      key={farmer.id}
                      className="p-3 border border-slate-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">{farmer.name}</span>
                            {farmer.verified && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{farmer.location}</div>
                          <div className="text-xs text-slate-500">{farmer.phone}</div>
                        </div>
                        <input type="radio" name="farmer" value={farmer.id} className="text-blue-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Premium Basmati Rice"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Quantity *</label>
                    <input
                      type="number"
                      placeholder="500"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Unit *</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Unit</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="quintal">Quintal</option>
                      <option value="bag">Bags</option>
                      <option value="crate">Crates</option>
                      <option value="bale">Bales</option>
                      <option value="ton">Tons</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Weight per Unit (kg)</label>
                    <input
                      type="number"
                      placeholder="25"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Quality Grade *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {qualityGrades.map((grade) => (
                      <div
                        key={grade.value}
                        className="p-3 border border-slate-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-slate-900 text-sm">{grade.label}</span>
                          <input type="radio" name="quality" value={grade.value} className="text-blue-600" />
                        </div>
                        <p className="text-xs text-slate-500">{grade.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Product Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the product quality, origin, special characteristics, storage conditions, etc."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Base Price (₹/unit) *</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="45.00"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Bid Increment (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="2.00"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Reserve Price (₹/unit)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Optional minimum selling price"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Buy Now Price (₹/unit)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Optional instant purchase price"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Product Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">PNG, JPG up to 10MB (Max 5 images)</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Item Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Item Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-medium text-slate-600 mb-1">Estimated Total Value</div>
                  <div className="text-2xl font-bold text-slate-900">₹0</div>
                  <div className="text-xs text-slate-500">Based on quantity × base price</div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Weight:</span>
                    <span className="font-medium">0 kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Commission (3%):</span>
                    <span className="font-medium">₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Est. Net to Farmer:</span>
                    <span className="font-medium">₹0</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 text-sm">Required Fields</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-slate-600">Farmer selection</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-slate-600">Product name</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-slate-600">Category & quantity</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-slate-600">Quality grade</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-slate-600">Base price</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">💡 Tips for Better Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs text-slate-600">
                  <p>• Upload clear, well-lit product photos</p>
                  <p>• Set competitive base prices based on market rates</p>
                  <p>• Include detailed quality descriptions</p>
                  <p>• Verify farmer information before adding</p>
                  <p>• Consider seasonal price fluctuations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600">
            Fill all required fields to add this item to the auction
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add to Auction
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
