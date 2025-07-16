import { Commissioner } from '@/types/commissioner';
import { Farmer } from '@/types/farmer';
import { Product } from '@/types/product';

// Utility functions for Commissioner
export const commissionerUtils = {
  // Format commissioner name for display
  formatName: (commissioner: Commissioner): string => {
    return `${commissioner.name} (${commissioner.location})`;
  },

  // Calculate commission amount
  calculateCommission: (commissioner: Commissioner, saleAmount: number): number => {
    return (saleAmount * commissioner.commission_rate) / 100;
  },

  // Check if commissioner is from a specific location
  isFromLocation: (commissioner: Commissioner, location: string): boolean => {
    return commissioner.location.toLowerCase().includes(location.toLowerCase());
  },

  // Get commissioner info for display
  getDisplayInfo: (commissioner: Commissioner): string => {
    return `${commissioner.name} - ${commissioner.phone} - ${commissioner.location}`;
  }
};

// Utility functions for Farmer
export const farmerUtils = {
  // Check if farmer is active
  isActive: (farmer: Farmer): boolean => {
    return farmer.is_active;
  },

  // Format farmer contact info
  formatContactInfo: (farmer: Farmer): string => {
    return `${farmer.name} - ${farmer.phone} (${farmer.village})`;
  },

  // Filter active farmers
  filterActive: (farmers: Farmer[]): Farmer[] => {
    return farmers.filter(farmer => farmer.is_active);
  },

  // Group farmers by village
  groupByVillage: (farmers: Farmer[]): Record<string, Farmer[]> => {
    return farmers.reduce((acc, farmer) => {
      const village = farmer.village;
      if (!acc[village]) {
        acc[village] = [];
      }
      acc[village].push(farmer);
      return acc;
    }, {} as Record<string, Farmer[]>);
  }
};

// Utility functions for Product
export const productUtils = {
  // Check if product is active
  isActive: (product: Product): boolean => {
    return product.is_active;
  },

  // Filter active products
  filterActive: (products: Product[]): Product[] => {
    return products.filter(product => product.is_active);
  },

  // Group products by category
  groupByCategory: (products: Product[]): Record<string, Product[]> => {
    return products.reduce((acc, product) => {
      const categoryId = product.category_id;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form validation types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Validation functions
export const validateCommissioner = (commissioner: Partial<Commissioner>): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!commissioner.name || commissioner.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!commissioner.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commissioner.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!commissioner.phone || !/^\d{10}$/.test(commissioner.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  if (!commissioner.location || commissioner.location.trim().length < 2) {
    errors.location = 'Location must be at least 2 characters long';
  }

  if (commissioner.commission_rate === undefined || commissioner.commission_rate < 0 || commissioner.commission_rate > 100) {
    errors.commission_rate = 'Commission rate must be between 0 and 100';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateFarmer = (farmer: Partial<Farmer>): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!farmer.name || farmer.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!farmer.phone || !/^\d{10}$/.test(farmer.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  if (!farmer.village || farmer.village.trim().length < 2) {
    errors.village = 'Village must be at least 2 characters long';
  }

  if (!farmer.commissioner_id) {
    errors.commissioner_id = 'Commissioner ID is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
