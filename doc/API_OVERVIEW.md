# Complete API Documentation

## Overview
This document provides complete API documentation for the Data Entry application, including authentication, farmers, and other endpoints.

## Base URL
All endpoints are relative to your application base URL: `http://localhost:3000`

## Authentication
🔐 **Authentication Required**: Most endpoints require JWT authentication via cookies.

**Authentication Flow:**
1. Login via `/api/auth/login` to get authentication cookies
2. Include cookies in all subsequent requests  
3. System automatically handles token refresh

---

## 🔐 Authentication Endpoints

### POST /api/auth/login
**Description:** Authenticate user and get access tokens

**Request Body:**
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
**Description:** Logout user and clear tokens

**Response:**
```json
{
  "message": "Logout successful"
}
```

### POST /api/auth/refresh
**Description:** Refresh access token using refresh token

**Response:**
```json
{
  "message": "Token refreshed successfully"
}
```

### POST /api/auth/signup
**Description:** Create new commissioner account

**Request Body:**
```json
{
  "name": "Commissioner Name",
  "email": "commissioner@example.com",
  "password": "password123",
  "phone": "1234567890",
  "location": "City, State"
}
```

---

## 👤 Commissioner Endpoints

### GET /api/commissioner/me
**Description:** Get current commissioner profile
**Authentication:** Required

**Response:**
```json
{
  "id": "cm123abc",
  "name": "Commissioner Name",
  "email": "commissioner@example.com",
  "phone": "1234567890",
  "location": "City, State",
  "commission_rate": 5.0,
  "created_at": "2025-01-15T10:00:00Z"
}
```

---

## 🌾 Farmer Endpoints

### GET /api/farmers
**Description:** List all farmers for authenticated commissioner
**Authentication:** Required

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "farmers": [
    {
      "id": "cm123abc",
      "name": "Farmer Name",
      "phone": "1234567890",
      "village": "Village Name",
      "is_active": true,
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

### POST /api/farmers
**Description:** Create new farmer
**Authentication:** Required

**Request Body:**
```json
{
  "name": "Farmer Name",
  "phone": "1234567890",
  "village": "Village Name",
  "is_active": true
}
```

**Response:**
```json
{
  "id": "cm123abc",
  "name": "Farmer Name",
  "phone": "1234567890",
  "village": "Village Name",
  "commissioner_id": "cm456def",
  "is_active": true,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### GET /api/farmers/[id]
**Description:** Get specific farmer by ID
**Authentication:** Required

**Response:**
```json
{
  "id": "cm123abc",
  "name": "Farmer Name",
  "phone": "1234567890",
  "village": "Village Name",
  "is_active": true,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:00:00Z"
}
```

### PUT /api/farmers
**Description:** Update farmer information
**Authentication:** Required

**Request Body:**
```json
{
  "id": "cm123abc",
  "name": "Updated Name",
  "phone": "0987654321",
  "village": "Updated Village",
  "is_active": false
}
```

### DELETE /api/farmers
**Description:** Delete farmer
**Authentication:** Required

**Request Body:**
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

## 📊 Data Models

### Commissioner
```typescript
{
  id: string;           // CUID
  name: string;
  email: string;        // Unique
  phone: string;
  location: string;
  password: string;     // Hashed
  commission_rate: number; // Default: 5.0
  created_at: Date;
  updated_at: Date;
}
```

### Farmer
```typescript
{
  id: string;           // CUID
  name: string;
  phone: string;
  village: string;
  commissioner_id: string; // Foreign key
  is_active: boolean;   // Default: true
  created_at: Date;
  updated_at: Date;
}
```

---

## 🎯 Validation Schemas

### CreateFarmerSchema
```typescript
{
  name: string;         // Required, min 1 char
  phone: string;        // Required, min 1 char
  village: string;      // Required, min 1 char
  is_active?: boolean;  // Optional, default: true
}
```

### UpdateFarmerSchema
```typescript
{
  id: string;           // Required, CUID
  name?: string;        // Optional, min 1 char
  phone?: string;       // Optional, min 1 char
  village?: string;     // Optional, min 1 char
  is_active?: boolean;  // Optional
}
```

---

## ⚠️ Error Responses

### Authentication Errors
```json
{
  "error": "Unauthorized"
}
```

### Validation Errors
```json
{
  "error": "Validation failed",
  "errors": {
    "name": ["Name is required"],
    "phone": ["Phone number is required"]
  }
}
```

### Not Found Errors
```json
{
  "error": "Farmer not found"
}
```

### Server Errors
```json
{
  "error": "Internal server error"
}
```

---

## 🔗 Related Documentation

- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Detailed authentication system documentation
- [Farmers API](./FARMERS_API_DOCS.md) - Detailed farmer endpoints documentation
- [Validation Guide](./VALIDATION_GUIDE.md) - Zod validation system documentation

---

## 🧪 Testing

### Prerequisites
1. Database running and migrated
2. Environment variables configured
3. Authentication working

### Test Flow
```bash
# 1. Signup/Login
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}' \
  -c cookies.txt

# 2. Test authenticated endpoints
curl -X GET "http://localhost:3000/api/farmers" -b cookies.txt
curl -X POST "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name": "Test Farmer", "phone": "1234567890", "village": "Test Village"}'
```

### HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request / Validation Error
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
