import { z } from 'zod';

// Base Farmer schema for validation
export const FarmerSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  village: z.string().min(1, "Village is required"),
  commissioner_id: z.cuid(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema for creating a new farmer (excludes auto-generated fields)
export const CreateFarmerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  village: z.string().min(1, "Village is required"),
  commissioner_id: z.cuid(),
  is_active: z.boolean().default(true).optional(),
});

// Schema for updating a farmer (all fields optional except id)
export const UpdateFarmerSchema = z.object({
  id: z.cuid(),
  name: z.string().min(1, "Name is required").optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
  village: z.string().min(1, "Village is required").optional(),
  commissioner_id: z.cuid().optional(),
  is_active: z.boolean().optional(),
});

// Type exports for TypeScript
export type Farmer = z.infer<typeof FarmerSchema>;
export type CreateFarmer = z.infer<typeof CreateFarmerSchema>;
export type UpdateFarmer = z.infer<typeof UpdateFarmerSchema>;