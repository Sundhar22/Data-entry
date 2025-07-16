import { z } from 'zod';
import { NextResponse } from 'next/server';

// Common validation response types
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

// Generic validation function
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  try {
    const result = schema.parse(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      });

      return {
        success: false,
        error: 'Validation failed',
        errors,
      };
    }

    return {
      success: false,
      error: 'Unknown validation error',
    };
  }
}

// Validation middleware for API routes
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return async (req: Request): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> => {
    try {
      const body = await req.json();
      const result = validateSchema(schema, body);

      if (!result.success) {
        return {
          success: false,
          response: NextResponse.json(
            {
              error: result.error,
              errors: result.errors,
              message: 'Invalid request data'
            },
            { status: 400 }
          ),
        };
      }

      return {
        success: true,
        data: result.data!,
      };
    } catch (error) {
      console.error('Error parsing request body:', error);
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Invalid JSON in request body' },
          { status: 400 }
        ),
      };
    }
  };
}

// Query parameter validation
export function validateQueryParams<T>(schema: z.ZodSchema<T>, params: URLSearchParams): ValidationResult<T> {
  const data: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        (data[key] as string[]).push(value);
      } else {
        data[key] = [data[key] as string, value];
      }
    } else {
      data[key] = value;
    }
  }

  return validateSchema(schema, data);
}

// Common API response schemas
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const DateRangeSchema = z.object({
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
});

export type PaginationParams = z.infer<typeof PaginationSchema>;
export type DateRangeParams = z.infer<typeof DateRangeSchema>;
