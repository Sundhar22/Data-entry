# Farmers API Documentation

## Base URL
All endpoints are relative to your application base URL: `http://localhost:3000`

## Authentication
Currently, no authentication is required. In production, you should add authentication middleware.

---

## 📋 **Endpoints Overview**

### 1. **GET /api/farmers** - List all farmers with pagination

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `sortBy` (optional): Field to sort by (name, phone, village, created_at)
- `sortOrder` (optional): Sort order (asc, desc - default: asc)

**Example Request:**
```bash
GET /api/farmers?page=1&limit=10&sortBy=name&sortOrder=asc
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cm123abc",
      "name": "John Doe",
      "phone": "9876543210",
      "village": "Sample Village",
      "commissioner_id": "cm456def",
      "is_active": true,
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z",
      "commissioner": {
        "id": "cm456def",
        "name": "Commissioner Name",
        "location": "Commissioner Location"
      }
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

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "village": "Sample Village",
  "commissioner_id": "cm456def",
  "is_active": true
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `phone`: Required, exactly 10 digits
- `village`: Required, 2-100 characters
- `commissioner_id`: Required, valid commissioner ID
- `is_active`: Optional, boolean (default: true)

**Example Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "cm123abc",
    "name": "John Doe",
    "phone": "9876543210",
    "village": "Sample Village",
    "commissioner_id": "cm456def",
    "is_active": true,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:00:00Z",
    "commissioner": {
      "id": "cm456def",
      "name": "Commissioner Name",
      "location": "Commissioner Location"
    }
  },
  "message": "Farmer created successfully"
}
```

**Example Response (Error):**
```json
{
  "error": "Validation failed",
  "errors": {
    "phone": ["Phone number must be exactly 10 digits"],
    "name": ["Name must be at least 2 characters long"]
  },
  "message": "Invalid request data"
}
```

---

### 3. **GET /api/farmers/[id]** - Get farmer details

**URL Parameters:**
- `id`: Farmer ID

**Example Request:**
```bash
GET /api/farmers/cm123abc
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "cm123abc",
    "name": "John Doe",
    "phone": "9876543210",
    "village": "Sample Village",
    "commissioner_id": "cm456def",
    "is_active": true,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:00:00Z",
    "commissioner": {
      "id": "cm456def",
      "name": "Commissioner Name",
      "location": "Commissioner Location",
      "phone": "9876543210"
    },
    "auction_items": [
      {
        "id": "cm789ghi",
        "quantity": 100,
        "final_price": 50,
        "unit": "KG",
        "created_at": "2025-01-15T10:00:00Z",
        "product": {
          "id": "cm111jkl",
          "name": "Tomatoes",
          "category": {
            "name": "Vegetables"
          }
        }
      }
    ],
    "bills": [
      {
        "id": "cm222mno",
        "total_amount": 5000,
        "commission_amount": 250,
        "created_at": "2025-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

### 4. **PUT /api/farmers/[id]** - Update farmer

**URL Parameters:**
- `id`: Farmer ID

**Request Body (all fields optional):**
```json
{
  "name": "Updated Name",
  "phone": "9876543211",
  "village": "Updated Village",
  "commissioner_id": "cm456def",
  "is_active": false
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "cm123abc",
    "name": "Updated Name",
    "phone": "9876543211",
    "village": "Updated Village",
    "commissioner_id": "cm456def",
    "is_active": false,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T12:00:00Z",
    "commissioner": {
      "id": "cm456def",
      "name": "Commissioner Name",
      "location": "Commissioner Location"
    }
  },
  "message": "Farmer updated successfully"
}
```

---

### 5. **DELETE /api/farmers/[id]** - Delete farmer

**URL Parameters:**
- `id`: Farmer ID

**Example Request:**
```bash
DELETE /api/farmers/cm123abc
```

**Example Response (Success):**
```json
{
  "success": true,
  "message": "Farmer deleted successfully"
}
```

**Example Response (Error - Has Related Records):**
```json
{
  "error": "Cannot delete farmer with existing auction items or bills. Please remove related records first."
}
```

---

## 🔧 **Usage Examples**

### JavaScript/TypeScript (Frontend)

```javascript
// Fetch farmers with pagination
const fetchFarmers = async (page = 1) => {
  const response = await fetch(`/api/farmers?page=${page}&limit=10`);
  const data = await response.json();
  return data;
};

// Create new farmer
const createFarmer = async (farmerData) => {
  const response = await fetch('/api/farmers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(farmerData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }
  
  return await response.json();
};

// Update farmer
const updateFarmer = async (id, updateData) => {
  const response = await fetch(`/api/farmers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  
  return await response.json();
};

// Delete farmer
const deleteFarmer = async (id) => {
  const response = await fetch(`/api/farmers/${id}`, {
    method: 'DELETE',
  });
  
  return await response.json();
};
```

### cURL Examples

```bash
# List farmers
curl -X GET "http://localhost:3000/api/farmers?page=1&limit=10"

# Create farmer
curl -X POST "http://localhost:3000/api/farmers" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "village": "Sample Village",
    "commissioner_id": "cm456def",
    "is_active": true
  }'

# Get farmer details
curl -X GET "http://localhost:3000/api/farmers/cm123abc"

# Update farmer
curl -X PUT "http://localhost:3000/api/farmers/cm123abc" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "is_active": false
  }'

# Delete farmer
curl -X DELETE "http://localhost:3000/api/farmers/cm123abc"
```

---

## ⚠️ **Error Handling**

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "errors": {
    "field_name": ["Specific field error"]
  },
  "message": "Additional context"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created successfully
- `400`: Bad request / Validation error
- `404`: Resource not found
- `409`: Conflict (duplicate data)
- `500`: Internal server error

---

## 🎯 **Testing the API**

1. **Visit the UI**: Go to `/farmers` to see the farmers management interface
2. **Use API directly**: Use the endpoints with tools like Postman or curl
3. **Check validation**: Try sending invalid data to see error responses
4. **Test pagination**: Use different page and limit parameters

All endpoints include proper validation, error handling, and follow RESTful conventions!
