import { z } from 'zod';

// Farmer validation schema
export const FarmerSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be less than 100 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  village: z.string().min(2, 'Village must be at least 2 characters long').max(100, 'Village must be less than 100 characters'),
  commissioner_id: z.string().cuid(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema for creating a new farmer
export const CreateFarmerSchema = FarmerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating a farmer
export const UpdateFarmerSchema = FarmerSchema.partial().extend({
  id: z.string().cuid(),
});

// Schema for API requests
export const FarmerApiSchema = FarmerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating via API
export const UpdateFarmerApiSchema = FarmerApiSchema.partial();

// Type inference
export type FarmerInput = z.infer<typeof CreateFarmerSchema>;
export type FarmerUpdate = z.infer<typeof UpdateFarmerApiSchema>;
export type FarmerApi = z.infer<typeof FarmerApiSchema>;
