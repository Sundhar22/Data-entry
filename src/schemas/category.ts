import { z } from 'zod';

// Category validation schema
export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2, 'Category name must be at least 2 characters long').max(100, 'Category name must be less than 100 characters'),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date(),
});

// Schema for creating a new category
export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating a category
export const UpdateCategorySchema = CategorySchema.partial().extend({
  id: z.string().cuid(),
});

// Schema for API requests
export const CategoryApiSchema = CategorySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating via API
export const UpdateCategoryApiSchema = CategoryApiSchema.partial();

// Type inference
export type CategoryInput = z.infer<typeof CreateCategorySchema>;
export type CategoryUpdate = z.infer<typeof UpdateCategoryApiSchema>;
export type CategoryApi = z.infer<typeof CategoryApiSchema>;
