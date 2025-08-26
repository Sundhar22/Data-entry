# API Endpoints Documentation

This document provides a comprehensive list of all API endpoints with their request and response formats for the Data Entry application.

## Table of Contents

- [Authentication Endpoints](#-authentication-endpoints)
- [Commissioner Endpoints](#-commissioner-endpoints)
- [Farmer Endpoints](#-farmer-endpoints)
- [Product Endpoints](#-product-endpoints)
- [Buyer Endpoints](#-buyer-endpoints)
- [Session Endpoints](#-session-endpoints)
- [Session Items Endpoints](#-session-items-endpoints)
- [Bills Endpoints](#-bills-endpoints)

---

## 🔐 Authentication Endpoints

### POST /api/auth/login

Login to the system with email and password.

**Request:**

```json
{
  "email": "commissioner@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "cm123abc",
    "name": "Commissioner Name",
    "email": "commissioner@example.com"
  },
  "message": "Login successful"
}
```

### POST /api/auth/logout

Logout from the current session.

**Response:**

```json
{
  "message": "Logout successful"
}
```

### POST /api/auth/signup

Register a new commissioner account.

**Request:**

```json
{
  "name": "Commissioner Name",
  "email": "commissioner@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": "City, State"
}
```

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Commissioner Name",
  "email": "commissioner@example.com",
  "phone": "1234567890",
  "location": "City, State",
  "commission_rate": 5.0,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### POST /api/auth/refresh

Refresh the authentication token.

**Response:**

```json
{
  "message": "Token refreshed successfully"
}
```

---

## 👤 Commissioner Endpoints

### GET /api/commissioner/me

Get current commissioner's profile information.

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Commissioner Name",
  "email": "commissioner@example.com",
  "phone": "1234567890",
  "location": "City, State",
  "commission_rate": 5.0,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### PUT /api/commissioner/me

Update current commissioner's profile.

**Request:**

```json
{
  "name": "Updated Name",
  "phone": "0987654321",
  "commission_rate": 7.5
}
```

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Updated Name",
  "email": "commissioner@example.com",
  "phone": "0987654321",
  "commission_rate": 7.5,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T12:00:00Z"
}
```

### GET /api/commissioner

Get list of all commissioners with pagination and filtering.

**Query Parameters:**

- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `location` (string): Filter by location
- `min_commission_rate` (number): Minimum commission rate filter
- `max_commission_rate` (number): Maximum commission rate filter

**Response:**

```json
{
  "commissioners": [
    {
      "id": "cm123abc",
      "name": "Commissioner One",
      "email": "commissioner1@example.com",
      "phone": "1234567890",
      "location": "Mumbai, Maharashtra",
      "commission_rate": 5.0,
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalCount": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🌾 Farmer Endpoints

### GET /api/farmers

Get list of farmers with pagination.

**Query Parameters:**

- `page` (number): Page number for pagination
- `limit` (number): Number of items per page

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "cm123abc",
      "name": "John Doe",
      "phone": "9876543210",
      "village": "Sample Village",
      "is_active": true,
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### POST /api/farmers

Create a new farmer.

**Request:**

```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "village": "Sample Village",
  "is_active": true
}
```

**Response:**

```json
{
  "id": "cm123abc",
  "name": "John Doe",
  "phone": "9876543210",
  "village": "Sample Village",
  "commissioner_id": "cm456def",
  "is_active": true,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### GET /api/farmers/[id]

Get a specific farmer by ID.

**Response:**

```json
{
  "id": "cm123abc",
  "name": "John Doe",
  "phone": "9876543210",
  "village": "Sample Village",
  "is_active": true,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### PUT /api/farmers

Update an existing farmer.

**Request:**

```json
{
  "id": "cm123abc",
  "name": "Updated Name",
  "phone": "9876543211",
  "village": "Updated Village",
  "is_active": false
}
```

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Updated Name",
  "phone": "9876543211",
  "village": "Updated Village",
  "commissioner_id": "cm456def",
  "is_active": false,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T12:00:00Z"
}
```

### DELETE /api/farmers

Delete a farmer.

**Request:**

```json
{
  "id": "cm123abc"
}
```

**Response:**

```json
{
  "message": "Farmer deleted successfully"
}
```

---

## 📦 Product Endpoints

### GET /api/products

Get list of products with pagination and filtering.

**Query Parameters:**

- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `category` (string): Filter by product category
- `is_active` (boolean): Filter by active status

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "cm123abc",
      "name": "Tomatoes",
      "category": "Vegetables",
      "unit": "KG",
      "is_active": true,
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### POST /api/products

Create a new product.

**Request:**

```json
{
  "name": "Tomatoes",
  "category": "Vegetables",
  "unit": "KG",
  "description": "Fresh red tomatoes",
  "is_active": true
}
```

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Tomatoes",
  "category": "Vegetables",
  "unit": "KG",
  "description": "Fresh red tomatoes",
  "commissioner_id": "cm456def",
  "is_active": true,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### GET /api/products/[id]

Get a specific product by ID.

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Tomatoes",
  "category": "Vegetables",
  "unit": "KG",
  "description": "Fresh red tomatoes",
  "is_active": true,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### PUT /api/products

Update an existing product.

**Request:**

```json
{
  "id": "cm123abc",
  "name": "Updated Product Name",
  "category": "Updated Category",
  "unit": "PIECE",
  "description": "Updated description",
  "is_active": false
}
```

**Response:**

```json
{
  "id": "cm123abc",
  "name": "Updated Product Name",
  "category": "Updated Category",
  "unit": "PIECE",
  "description": "Updated description",
  "commissioner_id": "cm456def",
  "is_active": false,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T12:00:00Z"
}
```

### DELETE /api/products

Delete a product.

**Request:**

```json
{
  "id": "cm123abc"
}
```

**Response:**

```json
{
  "message": "Product deleted successfully"
}
```

---

## 🛒 Buyer Endpoints

### GET /api/buyers

Get list of buyers with pagination.

**Query Parameters:**

- `page` (number): Page number for pagination
- `limit` (number): Number of items per page

**Response:**

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
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "totalPages": 1
  }
}
```

### POST /api/buyers

Create a new buyer.

**Request:**

```json
{
  "name": "New Buyer",
  "phone": "1234567890",
  "is_active": true
}
```

**Response:**

```json
{
  "id": "buyer_id",
  "name": "New Buyer",
  "phone": "1234567890",
  "is_active": true,
  "created_at": "2025-08-03T10:00:00.000Z",
  "updated_at": "2025-08-03T10:00:00.000Z"
}
```

---

## 📅 Session Endpoints

### GET /api/sessions

Get list of auction sessions with filtering and pagination.

**Query Parameters:**

- `status` (string): Filter by session status (ACTIVE, COMPLETED, CANCELLED)
- `startDate` (string): Filter sessions from this date
- `endDate` (string): Filter sessions until this date
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `sortBy` (string): Sort field (date, status, etc.)
- `sortOrder` (string): Sort order (asc, desc)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "session_id",
      "date": "2025-08-03T10:00:00.000Z",
      "commissioner_id": "commissioner_id",
      "status": "ACTIVE",
      "payment_status": "PENDING",
      "created_at": "2025-08-03T09:00:00.000Z",
      "updated_at": "2025-08-03T09:00:00.000Z",
      "commissioner": {
        "name": "Commissioner Name"
      },
      "summary": {
        "total_items": 5,
        "total_value": 2500.0,
        "paid_items": 2,
        "pending_items": 3,
        "completion_percentage": 40
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### POST /api/sessions

Create a new auction session.

**Request:**

```json
{
  "date": "2025-08-03T10:00:00.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "new_session_id",
    "date": "2025-08-03T10:00:00.000Z",
    "commissioner_id": "commissioner_id",
    "status": "ACTIVE",
    "created_at": "2025-08-03T10:00:00.000Z",
    "updated_at": "2025-08-03T10:00:00.000Z",
    "_count": {
      "auction_items": 0,
      "bills": 0
    }
  }
}
```

### GET /api/sessions/[id]

Get detailed information about a specific session.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "session_id",
    "date": "2025-08-03T10:00:00.000Z",
    "commissioner_id": "commissioner_id",
    "status": "ACTIVE",
    "created_at": "2025-08-03T09:00:00.000Z",
    "updated_at": "2025-08-03T09:00:00.000Z",
    "auction_items": [
      {
        "id": "item_id",
        "quantity": 10.5,
        "unit": "KG",
        "final_price": 50.0,
        "farmer": {
          "id": "farmer_id",
          "name": "John Farmer",
          "village": "Village Name"
        },
        "product": {
          "id": "product_id",
          "name": "Tomatoes"
        },
        "buyer": {
          "id": "buyer_id",
          "name": "Jane Buyer"
        }
      }
    ],
    "bills": [],
    "_count": {
      "auction_items": 1,
      "bills": 0
    },
    "analytics": {
      "total_items": 1,
      "total_value": 525.0,
      "items_by_status": {
        "paid": 0,
        "unpaid": 1
      }
    }
  }
}
```

### PUT /api/sessions/[id]

Update a session's details.

**Request:**

```json
{
  "status": "COMPLETED",
  "date": "2025-08-03T10:00:00.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "session_id",
    "date": "2025-08-03T10:00:00.000Z",
    "commissioner_id": "commissioner_id",
    "status": "COMPLETED",
    "created_at": "2025-08-03T09:00:00.000Z",
    "updated_at": "2025-08-03T10:30:00.000Z",
    "_count": {
      "auction_items": 5,
      "bills": 2
    }
  }
}
```

### DELETE /api/sessions/[id]

Delete a session and all its related data.

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Session deleted successfully"
  }
}
```

---

## 🔨 Session Items Endpoints

### GET /api/sessions/[id]/items

Get all auction items for a specific session.

**Query Parameters:**

- Standard pagination and filtering options

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "item_id",
      "session_id": "session_id",
      "farmer_id": "farmer_id",
      "product_id": "product_id",
      "buyer_id": "buyer_id",
      "unit": "KG",
      "quantity": 50.5,
      "final_price": 2525.0,
      "bill_id": null,
      "created_at": "2025-08-03T10:15:00.000Z",
      "updated_at": "2025-08-03T10:15:00.000Z",
      "farmer": {
        "id": "farmer_id",
        "name": "John Farmer",
        "phone": "+1234567890",
        "village": "Village Name"
      },
      "product": {
        "id": "product_id",
        "name": "Tomatoes"
      },
      "buyer": {
        "id": "buyer_id",
        "name": "Buyer Name"
      },
      "bill": null
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### POST /api/sessions/[id]/items

Add a new auction item to a session.

**Request:**

```json
{
  "farmer_id": "farmer_id",
  "product_id": "product_id",
  "buyer_id": "buyer_id",
  "unit": "KG",
  "quantity": 50.5,
  "final_price": 2525.0
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "new_item_id",
    "session_id": "session_id",
    "farmer_id": "farmer_id",
    "product_id": "product_id",
    "buyer_id": "buyer_id",
    "unit": "KG",
    "quantity": 50.5,
    "final_price": 2525.0,
    "bill_id": null,
    "created_at": "2025-08-03T10:15:00.000Z",
    "updated_at": "2025-08-03T10:15:00.000Z",
    "farmer": {},
    "product": {},
    "buyer": {}
  }
}
```

### GET /api/sessions/[id]/items/[itemId]

Get details of a specific auction item.

**Response:**
Same structure as individual item in the list above.

### PUT /api/sessions/[id]/items/[itemId]

Update an existing auction item.

**Request:**

```json
{
  "quantity": 45.0,
  "final_price": 2250.0
}
```

**Response:**
Updated item with same structure as GET response.

### DELETE /api/sessions/[id]/items/[itemId]

Delete an auction item from a session.

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Auction item deleted successfully"
  }
}
```

---

## 🧾 Bills Endpoints

### GET /api/bills

Get list of bills with advanced filtering and pagination.

**Query Parameters:**

- `farmer_id` (string): Filter by farmer ID
- `product_id` (string): Filter by product ID
- `session_id` (string): Filter by session ID
- `payment_status` (string): Filter by payment status (PAID, UNPAID, PARTIAL)
- `start_date` (string): Filter bills from this date
- `end_date` (string): Filter bills until this date
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page
- `sortBy` (string): Sort field

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "bill_id",
      "bill_number": "BILL-001",
      "farmer_id": "farmer_id",
      "product_id": "product_id",
      "session_id": "session_id",
      "total_quantity": 100.5,
      "gross_amount": 5000.0,
      "commission_rate": 5.0,
      "commission_amount": 250.0,
      "net_payable": 4750.0,
      "payment_status": "UNPAID",
      "payment_method": null,
      "payment_date": null,
      "created_at": "2025-08-03T10:00:00.000Z",
      "farmer": {
        "name": "John Farmer",
        "village": "Village Name"
      },
      "product": {
        "name": "Tomatoes"
      },
      "_count": {
        "auction_items": 5
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /api/bills/preview

Preview bills before generation for a specific farmer.

**Query Parameters:**

- `farmer_id` (string): Required - Farmer ID to preview bills for

**Response:**

```json
{
  "success": true,
  "data": {
    "farmer": {
      "name": "John Farmer",
      "village": "Village Name"
    },
    "previews": [
      {
        "session_id": "session_id",
        "product_id": "product_id",
        "product_name": "Tomatoes",
        "items": [
          {
            "quantity": 50.5,
            "rate": 50.0,
            "unit": "KG",
            "amount": 2525.0
          }
        ],
        "total_quantity": 50.5,
        "total_bags": 51,
        "gross_amount": 2525.0,
        "commission_rate": 5.0,
        "commission_amount": 126.25,
        "suggested_other_charges": 0,
        "net_payable": 2398.75
      }
    ],
    "summary": {
      "total_previews": 1,
      "total_gross_amount": 2525.0
    }
  }
}
```

### GET /api/bills/statistics

Get billing statistics and summary.

**Response:**

```json
{
  "success": true,
  "data": {
    "total_bills": 10,
    "paid_bills": 5,
    "unpaid_bills": 5,
    "total_amount": 50000.0,
    "paid_amount": 25000.0,
    "pending_amount": 25000.0
  }
}
```

---

## Response Format Notes

- All endpoints follow the standard `ApiResponse` format
- Proper error handling is implemented as defined in `CommonErrors`
- Authentication is handled via the `withAuth` middleware
- All endpoints are protected by the routes defined in `middleware.ts`
- Timestamps are in ISO 8601 format
- Monetary values are in decimal format with 2 decimal places
- Pagination follows a consistent format with `page`, `limit`, `total`, and `totalPages`

## Error Responses

All endpoints may return standard error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details if available"
  }
}
```

Common error codes:

- `UNAUTHORIZED` - Authentication required or invalid
- `FORBIDDEN` - Access denied
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `INTERNAL_ERROR` - Server error
