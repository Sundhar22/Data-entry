"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Loader2,
  RefreshCw,
  AlertCircle,
  Save
} from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FarmerResponse {
  success: boolean;
  data: Farmer[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface FarmerFormData {
  name: string;
  phone: string;
  village: string;
  is_active: boolean;
}

export default function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  
  // Form states
  const [formData, setFormData] = useState<FarmerFormData>({
    name: '',
    phone: '',
    village: '',
    is_active: true
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch farmers data with proper error handling
  const fetchFarmers = async (page = 1, search = "") => {
    setLoading(page === 1);
    setSearchLoading(search !== "");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search })
      });

      const response = await fetch(`/api/farmers?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const data: FarmerResponse = await response.json();
        setFarmers(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
        setTotalFarmers(data.meta.total);
      } else if (response.status === 401) {
        console.error('Authentication required');
        // Handle redirect to login if needed
      } else {
        console.error('Failed to fetch farmers:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch farmers:', error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchFarmers(1, value);
  };

  const handlePageChange = (page: number) => {
    fetchFarmers(page, searchTerm);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      village: '',
      is_active: true
    });
    setFormError('');
  };

  const handleAddFarmer = async () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.village.trim()) {
      setFormError('Name, phone, and village are required');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/farmers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAddDialogOpen(false);
        resetForm();
        fetchFarmers(currentPage, searchTerm);
      } else {
        setFormError(data.error?.message || 'Failed to create farmer');
      }
    } catch (error) {
      console.error('Failed to create farmer:', error);
      setFormError('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditFarmer = async () => {
    if (!selectedFarmer || !formData.name.trim() || !formData.phone.trim() || !formData.village.trim()) {
      setFormError('Name, phone, and village are required');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch(`/api/farmers/${selectedFarmer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsEditDialogOpen(false);
        setSelectedFarmer(null);
        resetForm();
        fetchFarmers(currentPage, searchTerm);
      } else {
        setFormError(data.error?.message || 'Failed to update farmer');
      }
    } catch (error) {
      console.error('Failed to update farmer:', error);
      setFormError('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteFarmer = async () => {
    if (!selectedFarmer) return;

    setFormLoading(true);

    try {
      const response = await fetch(`/api/farmers/${selectedFarmer.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsDeleteDialogOpen(false);
        setSelectedFarmer(null);
        fetchFarmers(currentPage, searchTerm);
      } else {
        const data = await response.json();
        setFormError(data.error?.message || 'Failed to delete farmer');
      }
    } catch (error) {
      console.error('Failed to delete farmer:', error);
      setFormError('An unexpected error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const openEditDialog = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setFormData({
      name: farmer.name,
      phone: farmer.phone,
      village: farmer.village,
      is_active: farmer.is_active
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Farmers</h1>
            <p className="text-sm text-slate-600 mt-1">Manage your registered farmers and their details</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            if (open) resetForm();
            setIsAddDialogOpen(open);
          }}>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-slate-50 shadow hover:bg-blue-700 h-9 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Add New Farmer
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Farmer</DialogTitle>
                <DialogDescription>
                  Create a new farmer profile for your agricultural business.
                </DialogDescription>
              </DialogHeader>
              
              {formError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{formError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Farmer Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter farmer name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="village">Village *</Label>
                  <Input
                    id="village"
                    value={formData.village}
                    onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                    placeholder="Enter village name"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Active Status</Label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFarmer} disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Farmer
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Total Farmers</CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold">{totalFarmers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Active Farmers</CardTitle>
              <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {farmers.filter(f => f.is_active).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium truncate">Inactive Farmers</CardTitle>
              <UserX className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-lg sm:text-2xl font-bold text-red-600">
                {farmers.filter(f => !f.is_active).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search farmers by name, phone, or village..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {searchLoading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          <Button variant="outline" onClick={() => fetchFarmers(currentPage, searchTerm)} className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Farmers List */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Farmers List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-slate-600">Loading farmers...</span>
              </div>
            ) : farmers.length === 0 ? (
              <div className="text-center py-12 text-slate-600">
                {searchTerm ? "No farmers found matching your search." : "No farmers found. Add your first farmer to get started."}
              </div>
            ) : (
              <div className="space-y-0 relative max-h-[70vh] overflow-y-auto">
                {farmers.map((farmer, index) => (
                  <div key={farmer.id}>
                    <div className="p-3 sm:p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold text-sm sm:text-base">
                              {farmer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-base text-slate-900 truncate">
                              {farmer.name}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-3 text-xs text-slate-600">
                              <div className="flex items-center space-x-1 min-w-0">
                                <Phone className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{farmer.phone}</span>
                              </div>
                              <div className="flex items-center space-x-1 min-w-0">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{farmer.village}</span>
                              </div>
                              <div className="flex items-center space-x-1 min-w-0">
                                <Calendar className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">Joined {formatDate(farmer.created_at)}</span>
                              </div>
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              Last updated: {formatDate(farmer.updated_at)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end sm:justify-start space-x-2">
                          <Badge 
                            variant={farmer.is_active ? "success" : "secondary"}
                            className={`${farmer.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} text-xs px-2 py-0.5`}
                          >
                            {farmer.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <div 
                              className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
                              onClick={() => openEditDialog(farmer)}
                            >
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </div>
                            <div 
                              className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
                              onClick={() => openDeleteDialog(farmer)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < farmers.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalFarmers)} of {totalFarmers} farmers
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Farmer</DialogTitle>
              <DialogDescription>
                Update farmer information and settings.
              </DialogDescription>
            </DialogHeader>
            
            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Farmer Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter farmer name"
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone Number *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="edit-village">Village *</Label>
                <Input
                  id="edit-village"
                  value={formData.village}
                  onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                  placeholder="Enter village name"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="edit-is_active">Active Status</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditFarmer} disabled={formLoading}>
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Farmer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Farmer</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedFarmer?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            {formError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{formError}</AlertDescription>
              </Alert>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteFarmer} disabled={formLoading}>
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Farmer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
