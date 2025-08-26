// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Filter Types
export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}

export interface CommissionerFilter {
  location?: string;
  minCommissionRate?: number;
  maxCommissionRate?: number;
  dateRange?: DateRangeFilter;
}

export interface FarmerFilter {
  village?: string;
  isActive?: boolean;
  commissionerId?: string;
  dateRange?: DateRangeFilter;
}

// Search Types
export interface SearchParams {
  query: string;
  filters?: CommissionerFilter | FarmerFilter;
  pagination?: PaginationParams;
}

// Dashboard Types
export interface DashboardStats {
  totalCommissioners: number;
  totalFarmers: number;
  totalProducts: number;
  activeAuctions: number;
  totalRevenue: number;
  revenueGrowth: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// User Session Types
export interface UserSession {
  commissionerId: string;
  isAuthenticated: boolean;
  permissions: string[];
  lastActivity: Date;
}
