# Authentication System Documentation

## Overview

This authentication system provides multiple ways to protect your API routes and verify user tokens. It supports JWT-based authentication with access tokens and refresh tokens.

## Files Created/Modified

1. **`/src/lib/auth.ts`** - Core authentication functions
2. **`/src/types/auth.ts`** - Updated with AuthenticatedRequest interface
3. **`/middleware.ts`** - Global route protection (optional)
4. **Route files** - Updated to use authentication

## Usage Methods

### Method 1: Using `requireAuth` function (Current Implementation)

```typescript
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Verify authentication
    const authResult = await requireAuth(req);
    if (!authResult.success) {
      return authResult.error!;
    }

    const userId = authResult.user!.id;

    // Your protected route logic here
    // Access user data via authResult.user
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### Method 2: Using `withAuth` Higher-Order Function

```typescript
import { withAuth, AuthenticatedRequest } from "@/lib/auth";
import { NextResponse } from "next/server";

async function getProtectedData(
  req: AuthenticatedRequest,
): Promise<NextResponse> {
  try {
    const userId = req.user.id; // User data is automatically attached

    // Your protected route logic here
    // Access user data via req.user

    return NextResponse.json({ data: "success" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Export the protected route
export const GET = withAuth(getProtectedData);
```

### Method 3: Using Global Middleware (Optional)

The global middleware in `/middleware.ts` automatically protects routes and adds user information to request headers.

```typescript
import { getUserFromHeaders } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Get user from headers (set by middleware)
    const user = getUserFromHeaders(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Your protected route logic here
    // Access user data via user object
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

## Authentication Flow

1. **Token Verification**: The system first tries to verify the access token
2. **Token Refresh**: If access token is invalid, it tries to use the refresh token
3. **Database Check**: Verifies that the user still exists in the database
4. **User Attachment**: Attaches user data to the request for easy access

## Protected Routes Configuration

To add new protected routes, update the `protectedRoutes` array in `/middleware.ts`:

```typescript
const protectedRoutes = [
  "/api/commissioner/me",
  "/api/farmers",
  "/api/farmers/[id]",
  "/api/products",
  "/api/bills",
  "/api/auction",
  "/api/your-new-protected-route", // Add new routes here
];
```

**Current Protected Routes:**

- `/api/commissioner/me` - Get current commissioner profile
- `/api/farmers` - All farmer operations (GET, POST, PUT, DELETE)
- `/api/farmers/[id]` - Get specific farmer by ID
- All other API routes should be added as needed

## Token Management

- **Access Token**: Short-lived (15 minutes), stored in httpOnly cookie
- **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie
- **Automatic Refresh**: System automatically refreshes tokens when access token expires

## Security Features

- **HttpOnly Cookies**: Tokens are stored in httpOnly cookies to prevent XSS attacks
- **Database Verification**: Each request verifies user existence in database
- **Token Expiration**: Automatic token expiration and refresh
- **Secure Settings**: Cookies are marked as secure in production

## Example Usage in New Routes

```typescript
// /src/app/(routes)/api/farmers/route.ts
import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateFarmerSchema } from "@/schemas/farmer";
import { validateRequest } from "@/lib/validation";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await requireAuth(req);
    if (!authResult.success) {
      return authResult.error!;
    }

    const userId = authResult.user!.id;

    // Get farmers for this commissioner only
    const farmers = await prisma.farmer.findMany({
      where: { commissioner_id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        village: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ farmers });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await requireAuth(req);
    if (!authResult.success) {
      return authResult.error!;
    }

    const userId = authResult.user!.id;

    // Validate request body
    const validator = validateRequest(CreateFarmerSchema);
    const validation = await validator(req);

    if (!validation.success) {
      return validation.response;
    }

    // Create farmer for authenticated commissioner
    const farmer = await prisma.farmer.create({
      data: {
        ...validation.data,
        commissioner_id: userId,
      },
    });

    return NextResponse.json(farmer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

## Error Handling

The authentication system returns appropriate HTTP status codes:

- **401 Unauthorized**: No tokens, invalid tokens, or user not found
- **500 Internal Server Error**: Database or server errors

## Best Practices

1. **Always handle authentication errors properly**
2. **Use the most appropriate method for your use case**
3. **Keep sensitive operations in protected routes**
4. **Log authentication attempts for security monitoring**
5. **Regularly rotate JWT secrets in production**
6. **Use Zod validation with authentication for data integrity**
7. **Implement proper error handling for both auth and validation**
8. **Test authentication flows thoroughly**

## Testing

You can test the authentication by:

1. **Login Flow**: POST to `/api/auth/login` with valid credentials
2. **Protected Routes**: Try accessing `/api/farmers` without authentication (should return 401)
3. **Authenticated Requests**: Access protected routes with valid cookies (should work)
4. **Token Refresh**: Wait for access token to expire and make requests (should auto-refresh)
5. **Logout**: POST to `/api/auth/logout` and try accessing protected routes (should return 401)

### Example Test Flow:

```bash
# 1. Login
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}' \
  -c cookies.txt

# 2. Access protected route
curl -X GET "http://localhost:3000/api/farmers" \
  -b cookies.txt

# 3. Create farmer (test validation + auth)
curl -X POST "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name": "Test Farmer", "phone": "1234567890", "village": "Test Village"}'
```
