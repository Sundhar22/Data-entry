# Farmers API Documentation

## Base URL
All endpoints are relative to your application base URL: `http://localhost:3000`

## Authentication
**🔐 Authentication Required**: All endpoints require JWT authentication via cookies. See the [Authentication Guide](./AUTHENTICATION_GUIDE.md) for details.

**Headers Required:**
- Requests must include valid `access_token` and `refresh_token` cookies
- The system automatically handles token refresh when needed

**Authentication Flow:**
1. Login via `/api/auth/login` to get authentication cookies
2. Include cookies in all subsequent requests
3. System will automatically refresh tokens when needed

---

## 📋 **Endpoints Overview**

### 1. **GET /api/farmers** - List all farmers with pagination

**Authentication:** Required (Commissioner only sees their own farmers)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```bash
GET /api/farmers?page=1&limit=10
```

**Example Response:**
```json
{
  "farmers": [
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

### 2. **POST /api/farmers** - Create new farmer

**Authentication:** Required (Farmer will be associated with authenticated commissioner)

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "village": "Sample Village",
  "is_active": true
}
```

**Validation Rules (Zod Schema):**
- `name`: Required, minimum 1 character
- `phone`: Required, minimum 1 character
- `village`: Required, minimum 1 character
- `is_active`: Optional, boolean (default: true)

**Example Response (Success):**
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

**Example Response (Error):**
```json
{
  "error": "Validation failed",
  "errors": {
    "name": ["Name is required"],
    "phone": ["Phone number is required"]
  }
}
```

---

### 3. **GET /api/farmers/[id]** - Get farmer by ID

**Authentication:** Required (Commissioner can only access their own farmers)

**URL Parameters:**
- `id`: Farmer ID

**Example Request:**
```bash
GET /api/farmers/cm123abc
```

**Example Response:**
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

**Error Response (404):**
```json
{
  "error": "Farmer not found"
}
```
```

---

### 4. **PUT /api/farmers** - Update farmer

**Authentication:** Required (Commissioner can only update their own farmers)

**Request Body:**
```json
{
  "id": "cm123abc",
  "name": "Updated Name",
  "phone": "9876543211",
  "village": "Updated Village",
  "is_active": false
}
```

**Validation Rules (UpdateFarmerSchema):**
- `id`: Required, valid CUID
- `name`: Optional, minimum 1 character if provided
- `phone`: Optional, minimum 1 character if provided  
- `village`: Optional, minimum 1 character if provided
- `is_active`: Optional, boolean

**Example Response:**
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

**Error Response (404):**
```json
{
  "error": "Farmer not found"
}
```
```

---

### 5. **DELETE /api/farmers** - Delete farmer

**Authentication:** Required (Commissioner can only delete their own farmers)

**Request Body:**
```json
{
  "id": "cm123abc"
}
```

**Example Response (Success):**
```json
{
  "message": "Farmer deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Farmer not found"
}
```
```

---

## 🔧 **Usage Examples**

### JavaScript/TypeScript (Frontend)

```javascript
// Helper function to include credentials
const fetchWithAuth = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// Fetch farmers with pagination
const fetchFarmers = async (page = 1) => {
  const response = await fetchWithAuth(`/api/farmers?page=${page}&limit=10`);
  if (!response.ok) {
    throw new Error('Failed to fetch farmers');
  }
  return await response.json();
};

// Create new farmer
const createFarmer = async (farmerData) => {
  const response = await fetchWithAuth('/api/farmers', {
    method: 'POST',
    body: JSON.stringify(farmerData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create farmer');
  }
  
  return await response.json();
};

// Get farmer by ID
const getFarmer = async (id) => {
  const response = await fetchWithAuth(`/api/farmers/${id}`);
  if (!response.ok) {
    throw new Error('Farmer not found');
  }
  return await response.json();
};

// Update farmer
const updateFarmer = async (farmerData) => {
  const response = await fetchWithAuth('/api/farmers', {
    method: 'PUT',
    body: JSON.stringify(farmerData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update farmer');
  }
  
  return await response.json();
};

// Delete farmer
const deleteFarmer = async (id) => {
  const response = await fetchWithAuth('/api/farmers', {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete farmer');
  }
  
  return await response.json();
};
```

### cURL Examples

```bash
# Login first to get authentication cookies
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "commissioner@example.com",
    "password": "password123"
  }' \
  -c cookies.txt

# List farmers (include cookies)
curl -X GET "http://localhost:3000/api/farmers?page=1&limit=10" \
  -b cookies.txt

# Create farmer (include cookies)
curl -X POST "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "village": "Sample Village",
    "is_active": true
  }'

# Get farmer by ID (include cookies)
curl -X GET "http://localhost:3000/api/farmers/cm123abc" \
  -b cookies.txt

# Update farmer (include cookies)
curl -X PUT "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "id": "cm123abc",
    "name": "Updated Name",
    "is_active": false
  }'

# Delete farmer (include cookies)
curl -X DELETE "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "id": "cm123abc"
  }'
```

---

## ⚠️ **Error Handling**

All endpoints return consistent error responses:

```json
{
  "error": "Error message"
}
```

**For validation errors:**
```json
{
  "error": "Validation failed",
  "errors": {
    "field_name": ["Specific field error message"]
  }
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created successfully
- `400`: Bad request / Validation error
- `401`: Unauthorized (authentication required)
- `404`: Resource not found
- `500`: Internal server error

**Authentication Errors:**
- `401 Unauthorized`: No tokens, invalid tokens, or user not found
- Auto-refresh: System automatically tries refresh token if access token is expired

---

## 🎯 **Testing the API**

### Prerequisites
1. **Authentication**: Login via `/api/auth/login` first to get authentication cookies
2. **Database**: Make sure your database is running and migrated

### Testing Steps
1. **Login**: Use `/api/auth/login` to authenticate
2. **Create Farmer**: Use POST `/api/farmers` with valid data
3. **List Farmers**: Use GET `/api/farmers` to see all farmers
4. **Get Farmer**: Use GET `/api/farmers/{id}` to get specific farmer
5. **Update Farmer**: Use PUT `/api/farmers` with farmer data
6. **Delete Farmer**: Use DELETE `/api/farmers` with farmer ID

### Test Data Examples
```json
// Valid farmer data
{
  "name": "Test Farmer",
  "phone": "1234567890",
  "village": "Test Village",
  "is_active": true
}

// Invalid farmer data (for testing validation)
{
  "name": "",  // Empty name should fail
  "phone": "",  // Empty phone should fail
  "village": ""  // Empty village should fail
}
```

### Related Documentation
- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Learn about authentication system
- [Validation Guide](./VALIDATION_GUIDE.md) - Learn about Zod validation schemas

All endpoints include proper authentication, validation, error handling, and follow RESTful conventions!
