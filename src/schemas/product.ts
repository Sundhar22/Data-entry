import { z } from 'zod';

// Product validation schema
export const ProductSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2, 'Product name must be at least 2 characters long').max(100, 'Product name must be less than 100 characters'),
  category_id: z.string().cuid(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema for creating a new product
export const CreateProductSchema = ProductSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating a product
export const UpdateProductSchema = ProductSchema.partial().extend({
  id: z.string().cuid(),
});

// Schema for API requests
export const ProductApiSchema = ProductSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating via API
export const UpdateProductApiSchema = ProductApiSchema.partial();

// Type inference
export type ProductInput = z.infer<typeof CreateProductSchema>;
export type ProductUpdate = z.infer<typeof UpdateProductApiSchema>;
export type ProductApi = z.infer<typeof ProductApiSchema>;
