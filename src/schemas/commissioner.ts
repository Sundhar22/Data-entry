import { z } from 'zod';

// Commissioner validation schema
export const CommissionerSchema = z.object({
  id: z.cuid(),
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be less than 100 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters long').max(100, 'Location must be less than 100 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  email: z.email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  commission_rate: z.number().min(0, 'Commission rate must be at least 0').max(100, 'Commission rate must be at most 100'),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema for creating a new commissioner (without id, created_at, updated_at)
export const CreateCommissionerSchema = CommissionerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating a commissioner (all fields optional except id)
export const UpdateCommissionerSchema = CommissionerSchema.partial().extend({
  id: z.cuid(),
});

// Schema for API requests (without id, created_at, updated_at, password)
export const CommissionerApiSchema = CommissionerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  password: true,
});

// Schema for updating via API (all fields optional)
export const UpdateCommissionerApiSchema = CommissionerApiSchema.partial();

// Type inference from schemas
export type CommissionerInput = z.infer<typeof CreateCommissionerSchema>;
export type CommissionerUpdate = z.infer<typeof UpdateCommissionerApiSchema>;
export type CommissionerApi = z.infer<typeof CommissionerApiSchema>;
