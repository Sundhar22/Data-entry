# Global Error Handler & Standardized API Responses

This document describes the global error handling system and standardized API response format implemented in the Data Entry System.

## Overview

The system provides:

1. **Standardized API Response Format** - Consistent response structure across all API endpoints
2. **Global Error Handler** - Centralized error handling with proper error categorization
3. **Custom Error Classes** - Typed error classes for different error scenarios
4. **Client-Side Error Handling** - Utilities for handling API errors on the frontend

## API Response Format

All API responses follow this standardized format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    timestamp?: string;
  };
}
```

### Success Response Example

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "meta": {
    "timestamp": "2025-07-17T10:30:00.000Z"
  }
}
```

### Error Response Example

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "meta": {
    "timestamp": "2025-07-17T10:30:00.000Z"
  }
}
```

### Paginated Response Example

```json
{
  "success": true,
  "data": [
    { "id": "1", "name": "Farmer 1" },
    { "id": "2", "name": "Farmer 2" }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "timestamp": "2025-07-17T10:30:00.000Z"
  }
}
```

## Error Handling System

### Custom Error Classes

```typescript
// Generic application error
class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;
}

// Specific error types
class ValidationError extends AppError     // 400 - Bad Request
class AuthenticationError extends AppError // 401 - Unauthorized
class AuthorizationError extends AppError  // 403 - Forbidden
class NotFoundError extends AppError       // 404 - Not Found
class ConflictError extends AppError       // 409 - Conflict
```

### Error Codes

| Code                    | HTTP Status | Description                  |
| ----------------------- | ----------- | ---------------------------- |
| `BAD_REQUEST`           | 400         | General bad request          |
| `VALIDATION_ERROR`      | 400         | Request validation failed    |
| `UNAUTHORIZED`          | 401         | Authentication required      |
| `INVALID_CREDENTIALS`   | 401         | Login credentials invalid    |
| `TOKEN_EXPIRED`         | 401         | Authentication token expired |
| `FORBIDDEN`             | 403         | Access denied                |
| `NOT_FOUND`             | 404         | Resource not found           |
| `CONFLICT`              | 409         | Resource conflict            |
| `ALREADY_EXISTS`        | 409         | Resource already exists      |
| `UNPROCESSABLE_ENTITY`  | 422         | Invalid request data         |
| `INTERNAL_SERVER_ERROR` | 500         | Server error                 |
| `DATABASE_ERROR`        | 500         | Database operation failed    |

### Common Error Responses

Pre-built error response functions:

```typescript
// 400 Errors
CommonErrors.BadRequest(message, details);
CommonErrors.ValidationError(message, details);

// 401 Errors
CommonErrors.Unauthorized(message);
CommonErrors.InvalidCredentials(message);
CommonErrors.TokenExpired(message);

// 403 Errors
CommonErrors.Forbidden(message);

// 404 Errors
CommonErrors.NotFound(message);

// 409 Errors
CommonErrors.Conflict(message);
CommonErrors.AlreadyExists(message);

// 500 Errors
CommonErrors.InternalServerError(message);
CommonErrors.DatabaseError(message);
```

## Usage Examples

### API Route Implementation

```typescript
import { withErrorHandling, NotFoundError } from "@/lib/error-handler";
import { createSuccessResponse, CommonErrors } from "@/lib/api-response";

async function getFarmerHandler(req: NextRequest) {
  const { id } = params;

  const farmer = await prisma.farmer.findUnique({
    where: { id },
  });

  if (!farmer) {
    throw new NotFoundError("Farmer not found");
  }

  return createSuccessResponse(farmer);
}

// Export with error handling wrapper
export const GET = withErrorHandling(getFarmerHandler, "Get Farmer");
```

### Response Helpers

```typescript
// Success response
return createSuccessResponse(data, 200, { customMeta });

// Error response
return CommonErrors.ValidationError("Invalid data", validationErrors);

// Paginated response
return createPaginatedResponse(farmers, page, limit, total);
```

### Client-Side Error Handling

```typescript
import { apiClient, ApiError } from "@/lib/api-client";

try {
  const response = await apiClient.get<Farmer[]>("/farmers");
  console.log(response.data);
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "VALIDATION_ERROR":
        // Handle validation errors
        console.error("Validation failed:", error.details);
        break;
      case "UNAUTHORIZED":
        // Redirect to login
        window.location.href = "/login";
        break;
      case "NOT_FOUND":
        // Show not found message
        console.error("Resource not found");
        break;
      default:
        console.error("API error:", error.message);
    }
  }
}
```

## Automatic Error Handling

The system automatically handles:

1. **Zod Validation Errors** - Converts to `VALIDATION_ERROR` with field details
2. **Prisma Database Errors** - Converts to appropriate error codes:
   - `P2002` → `CONFLICT` (Unique constraint violation)
   - `P2025` → `NOT_FOUND` (Record not found)
   - `P2003` → `BAD_REQUEST` (Foreign key constraint)
3. **JWT Token Errors** - Converts to `UNAUTHORIZED` or `TOKEN_EXPIRED`
4. **Generic Errors** - Converts to `INTERNAL_SERVER_ERROR`

## Migration Guide

### Before (Old Format)

```typescript
export async function GET(req: NextRequest) {
  try {
    const data = await getData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### After (New Format)

```typescript
async function getHandler(req: NextRequest) {
  const data = await getData();
  return createSuccessResponse(data);
}

export const GET = withErrorHandling(getHandler, "Get Data");
```

## Best Practices

1. **Use Custom Error Classes** - Throw specific error types instead of generic errors
2. **Provide Context** - Include the operation name in `withErrorHandling`
3. **Validate Input** - Use Zod schemas and let the system handle validation errors
4. **Handle Async Errors** - Always wrap async operations in try-catch or use `withErrorHandling`
5. **Don't Log Sensitive Data** - Error messages should not contain sensitive information
6. **Use Consistent Error Codes** - Use predefined error codes for client-side handling

## Configuration

### Environment Variables

- `NODE_ENV=production` - Hides internal error details in production
- Error logging can be configured to use external services (Sentry, LogRocket, etc.)

### Extending the System

To add new error types:

```typescript
// Add to error-handler.ts
export class CustomError extends AppError {
  constructor(message: string) {
    super(message, 422, "CUSTOM_ERROR");
    this.name = "CustomError";
  }
}

// Add to api-response.ts
export const CommonErrors = {
  // ... existing errors
  CustomError: (message: string) =>
    createErrorResponse(message, 422, "CUSTOM_ERROR"),
};
```

## Testing

Error handling can be tested by:

1. **Unit Tests** - Test error classes and response helpers
2. **Integration Tests** - Test API routes with various error scenarios
3. **Error Simulation** - Temporarily throw errors to test error boundaries

```typescript
// Test error handling
describe("Error Handling", () => {
  it("should handle validation errors", async () => {
    const response = await request(app).post("/api/farmers").send({
      /* invalid data */
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
```

This system provides a robust foundation for error handling and API responses that scales with your application.
