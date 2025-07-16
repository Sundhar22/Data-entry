import { Commissioner } from '@/types/commissioner';
import { Farmer } from '@/types/farmer';
import { ApiResponse, PaginatedResponse, CommissionerFilter, FarmerFilter } from '@/types/common';

// Commissioner Service
export class CommissionerService {
  private static baseUrl = '/api/commissioners';

  static async getById(id: string): Promise<Commissioner | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch commissioner: ${response.statusText}`);
      }
      const data: Commissioner = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching commissioner:', error);
      return null;
    }
  }

  static async getAll(filter?: CommissionerFilter): Promise<Commissioner[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.location) params.append('location', filter.location);
      if (filter?.minCommissionRate) params.append('minCommissionRate', filter.minCommissionRate.toString());
      if (filter?.maxCommissionRate) params.append('maxCommissionRate', filter.maxCommissionRate.toString());

      const response = await fetch(`${this.baseUrl}?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch commissioners: ${response.statusText}`);
      }
      const data: Commissioner[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching commissioners:', error);
      return [];
    }
  }

  static async create(commissioner: Omit<Commissioner, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Commissioner>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commissioner),
      });

      if (!response.ok) {
        throw new Error(`Failed to create commissioner: ${response.statusText}`);
      }

      const data: Commissioner = await response.json();
      return {
        success: true,
        data,
        message: 'Commissioner created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }

  static async update(id: string, updates: Partial<Commissioner>): Promise<ApiResponse<Commissioner>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update commissioner: ${response.statusText}`);
      }

      const data: Commissioner = await response.json();
      return {
        success: true,
        data,
        message: 'Commissioner updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete commissioner: ${response.statusText}`);
      }

      return {
        success: true,
        message: 'Commissioner deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }
}

// Farmer Service
export class FarmerService {
  private static baseUrl = '/api/farmers';

  static async getById(id: string): Promise<Farmer | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch farmer: ${response.statusText}`);
      }
      const data: Farmer = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching farmer:', error);
      return null;
    }
  }

  static async getByCommissioner(commissionerId: string): Promise<Farmer[]> {
    try {
      const response = await fetch(`${this.baseUrl}?commissionerId=${commissionerId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch farmers: ${response.statusText}`);
      }
      const data: Farmer[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching farmers:', error);
      return [];
    }
  }

  static async getAll(filter?: FarmerFilter): Promise<Farmer[]> {
    try {
      const params = new URLSearchParams();
      if (filter?.village) params.append('village', filter.village);
      if (filter?.isActive !== undefined) params.append('isActive', filter.isActive.toString());
      if (filter?.commissionerId) params.append('commissionerId', filter.commissionerId);

      const response = await fetch(`${this.baseUrl}?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch farmers: ${response.statusText}`);
      }
      const data: Farmer[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching farmers:', error);
      return [];
    }
  }

  static async create(farmer: Omit<Farmer, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Farmer>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(farmer),
      });

      if (!response.ok) {
        throw new Error(`Failed to create farmer: ${response.statusText}`);
      }

      const data: Farmer = await response.json();
      return {
        success: true,
        data,
        message: 'Farmer created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }

  static async update(id: string, updates: Partial<Farmer>): Promise<ApiResponse<Farmer>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update farmer: ${response.statusText}`);
      }

      const data: Farmer = await response.json();
      return {
        success: true,
        data,
        message: 'Farmer updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }
}
