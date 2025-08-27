# Complete API Documentation v2.0

## Overview

This document provides accurate and up-to-date API documentation for the Data Entry application, reflecting the actual implementation as of 2025.

## Base URL

All endpoints are relative to your application base URL: `http://localhost:3000`

## Authentication

- Authentication Required: Most endpoints require JWT authentication via HTTP-only cookies.
- Flow:
  1) Login via `/api/auth/login` to get authentication cookies
  2) Include cookies in all subsequent requests (`credentials: 'include'`)
  3) Token refresh via `/api/auth/refresh` happens automatically on the client

Important: The system uses HTTP-only cookies for security, not Authorization headers.

---

## Authentication Endpoints

### POST /api/auth/login
- Description: Authenticate user and get access tokens
- Request Body:
```json
{
  "email": "commissioner@example.com",
  "password": "password123"
}
```
- Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cm123abc",
      "name": "Commissioner Name",
      "email": "commissioner@example.com"
    },
    "message": "Login successful"
  }
}
```
- Cookies Set:
  - access_token (HTTP-only)
  - refresh_token (HTTP-only)

### POST /api/auth/logout
- Description: Logout user and clear tokens
- Response:
```json
{
  "success": true,
  "data": { "message": "Logout successful" }
}
```

### POST /api/auth/refresh
- Description: Refresh access token using refresh token
- Response:
```json
{
  "success": true,
  "data": { "message": "Token refreshed successfully" }
}
```

### POST /api/auth/signup
- Description: Create new commissioner account
- Request Body:
```json
{
  "name": "Commissioner Name",
  "email": "commissioner@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": "City, State"
}
```
- Response:
```json
{
  "success": true,
  "data": {
    "id": "cm123abc",
    "name": "Commissioner Name",
    "email": "commissioner@example.com",
    "phone": "1234567890",
    "location": "City, State",
    "commission_rate": 5.0,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:00:00Z"
  }
}
```

---

## Commissioner Endpoints

### GET /api/commissioner/me
- Description: Get current commissioner profile (auth required)
- Response:
```json
{
  "success": true,
  "data": {
    "id": "cm123abc",
    "name": "Commissioner Name",
    "email": "commissioner@example.com",
    "phone": "1234567890",
    "location": "City, State",
    "commission_rate": 5.0,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:00:00Z"
  }
}
```

---

## Farmer Endpoints

### GET /api/farmers
- Description: List all farmers (auth required)
- Query: `page`, `limit`
- Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "farmer_id",
      "name": "Farmer Name",
      "phone": "1234567890",
      "village": "Village Name",
      "is_active": true,
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 }
}
```

### POST /api/farmers
- Description: Create farmer
- Body: `{ name, phone, village, is_active }`
- Response: `{ success, data: { ...farmer } }`

### GET /api/farmers/[id]
- Description: Get farmer by ID
- Response: `{ success, data: { ...farmer } }`

### PUT /api/farmers/[id]
- Description: Update farmer
- Body: partial update fields
- Response: `{ success, data: { ...farmer } }`

### DELETE /api/farmers/[id]
- Description: Delete farmer
- Response: `{ success, data: { message } }`

---

## Buyer Endpoints

### GET /api/buyers
- Description: List buyers (auth required)
- Query: `page`, `limit`, `search`
- Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "buyer_id",
      "name": "Buyer Name",
      "phone": "+0987654321",
      "is_active": true,
      "created_at": "2025-08-03T10:00:00.000Z",
      "updated_at": "2025-08-03T10:00:00.000Z"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 10, "totalPages": 1 }
}
```

### POST /api/buyers
- Description: Create buyer
- Body: `{ name, phone, is_active }`
- Response: `{ success, data: { ...buyer } }`

### PUT /api/buyers/[id]
- Description: Update buyer
- Body: partial fields

### DELETE /api/buyers/[id]
- Description: Delete buyer

---

## Product Endpoints

### GET /api/products
- Description: List products (auth required)
- Query: `page`, `limit`, `category`, `is_active`
- Response: `{ success, data: [...], meta: { ... } }`

### POST /api/products
- Description: Create product
- Body: `{ name, category, unit, description, is_active }`

---

## Session Endpoints

### GET /api/sessions
- Description: List sessions with filtering
- Query: `status`, `startDate`, `endDate`, `page`, `limit`, `sortBy`, `sortOrder`
- Response: `{ success, data: [...], meta: { ... } }`

### POST /api/sessions
- Description: Create new session
- Body: `{ date? }`

### GET /api/sessions/[id]
- Description: Get detailed session including items and bills

### PUT /api/sessions/[id]
- Description: Update session status or date
- Body: `{ status?, date? }`

### DELETE /api/sessions/[id]
- Description: Delete session (constraints apply)

---

## Bills Endpoints

### GET /api/bills
- Description: List bills with filtering & pagination
- Query: `farmer_id`, `product_id`, `session_id`, `payment_status`, `start_date`, `end_date`, `page`, `limit`
- Response: `{ success, data: [...], meta: { ... } }`

### GET /api/bills/statistics
- Description: Comprehensive billing statistics and analytics
- Cache: `Cache-Control: public, max-age=60`
- Query: `start_date?`, `end_date?`
- Response:
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_bills": 10,
      "paid_bills": 5,
      "unpaid_bills": 5,
      "total_amount": 50000.0,
      "paid_amount": 25000.0,
      "unpaid_amount": 25000.0,
      "commission_amount": 2500.0,
      "gross_amount": 52500.0,
      "avg_bill_amount": 5000.0,
      "payment_rate": 50.0
    },
    "top_farmers": [
      { "name": "John Farmer", "village": "Village Name", "bills_count": 3, "total_amount": 15000.0 }
    ],
    "top_products": [
      { "name": "Tomatoes", "bills_count": 5, "total_amount": 25000.0, "total_quantity": 500.5 }
    ],
    "payment_methods": [
      { "method": "Cash", "bills_count": 3, "total_amount": 15000.0 }
    ]
  }
}
```

---

## Response Format Standards

### Success
```json
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "2025-01-15T10:00:00Z" }
}
```

### Paginated
```json
{
  "success": true,
  "data": [ ... ],
  "meta": { "page": 1, "limit": 10, "total": 100, "totalPages": 10, "timestamp": "..." }
}
```

### Error
```json
{
  "success": false,
  "error": { "message": "...", "code": "...", "details": "..." },
  "meta": { "timestamp": "..." }
}
```

---

## Error Handling

- Common Status Codes: 200, 201, 400, 401, 403, 404, 409, 422, 500
- Error Codes: UNAUTHORIZED, FORBIDDEN, NOT_FOUND, VALIDATION_ERROR, CONFLICT, INTERNAL_ERROR

---

## Changelog

### v2.0
- Fixed response format inconsistencies
- Updated endpoint paths (buyers -> /api/buyers)
- Added buyers, products, and bills statistics
- Documented cache headers and pagination meta

### v1.0
- Initial documentation
