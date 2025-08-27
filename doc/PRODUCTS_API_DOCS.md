# Products API Documentation

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

### 1. **GET /api/products** - List all products with pagination

**Authentication:** Required (Commissioner only sees their relevant products)

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by product category
- `is_active` (optional): Filter by active status (true/false)

**Example Request:**

```bash
GET /api/products?page=1&limit=10&category=vegetables&is_active=true
```

**Example Response:**

```json
{
  "products": [
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

### 2. **POST /api/products** - Create new product

**Authentication:** Required (Product will be associated with authenticated commissioner)

**Request Body:**

```json
{
  "name": "Tomatoes",
  "category": "Vegetables",
  "unit": "KG",
  "description": "Fresh red tomatoes",
  "is_active": true
}
```

**Validation Rules (Zod Schema):**

- `name`: Required, minimum 1 character
- `category`: Required, minimum 1 character
- `unit`: Required, valid unit type (KG, BUNDLE, PIECE, LITRE, DOZEN, BOX, OTHER)
- `description`: Optional, string
- `is_active`: Optional, boolean (default: true)

**Example Response (Success):**

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

**Example Response (Error):**

```json
{
  "error": "Validation failed",
  "errors": {
    "name": ["Name is required"],
    "category": ["Category is required"]
  }
}
```

---

### 3. **GET /api/products/[id]** - Get product by ID

**Authentication:** Required (Commissioner can only access their relevant products)

**URL Parameters:**

- `id`: Product ID

**Example Request:**

```bash
GET /api/products/cm123abc
```

**Example Response:**

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

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

---

### 4. **PUT /api/products** - Update product

**Authentication:** Required (Commissioner can only update their own products)

**Request Body:**

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

**Validation Rules (UpdateProductSchema):**

- `id`: Required, valid CUID
- `name`: Optional, minimum 1 character if provided
- `category`: Optional, minimum 1 character if provided
- `unit`: Optional, valid unit type if provided
- `description`: Optional, string
- `is_active`: Optional, boolean

**Example Response:**

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

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

---

### 5. **DELETE /api/products** - Delete product

**Authentication:** Required (Commissioner can only delete their own products)

**Request Body:**

```json
{
  "id": "cm123abc"
}
```

**Example Response (Success):**

```json
{
  "message": "Product deleted successfully"
}
```

**Error Response (404):**

```json
{
  "error": "Product not found"
}
```

---

## 🔧 **Usage Examples**

### JavaScript/TypeScript (Frontend)

```javascript
// Helper function to include credentials
const fetchWithAuth = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: "include", // Include cookies for authentication
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};

// Fetch products with pagination
const fetchProducts = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    ...filters,
  });

  const response = await fetchWithAuth(`/api/products?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};

// Create new product
const createProduct = async (productData) => {
  const response = await fetchWithAuth("/api/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create product");
  }

  return await response.json();
};

// Get product by ID
const getProduct = async (id) => {
  const response = await fetchWithAuth(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return await response.json();
};

// Update product
const updateProduct = async (productData) => {
  const response = await fetchWithAuth("/api/products", {
    method: "PUT",
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update product");
  }

  return await response.json();
};

// Delete product
const deleteProduct = async (id) => {
  const response = await fetchWithAuth("/api/products", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete product");
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

# List products (include cookies)
curl -X GET "http://localhost:3000/api/products?page=1&limit=10" \
  -b cookies.txt

# Create product (include cookies)
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Tomatoes",
    "category": "Vegetables",
    "unit": "KG",
    "description": "Fresh red tomatoes",
    "is_active": true
  }'

# Get product by ID (include cookies)
curl -X GET "http://localhost:3000/api/products/cm123abc" \
  -b cookies.txt

# Update product (include cookies)
curl -X PUT "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "id": "cm123abc",
    "name": "Updated Product Name",
    "is_active": false
  }'

# Delete product (include cookies)
curl -X DELETE "http://localhost:3000/api/products" \
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
2. **Create Product**: Use POST `/api/products` with valid data
3. **List Products**: Use GET `/api/products` to see all products
4. **Get Product**: Use GET `/api/products/{id}` to get specific product
5. **Update Product**: Use PUT `/api/products` with product data
6. **Delete Product**: Use DELETE `/api/products` with product ID

### Test Data Examples

```json
// Valid product data
{
  "name": "Test Product",
  "category": "Test Category",
  "unit": "KG",
  "description": "Test Description",
  "is_active": true
}

// Invalid product data (for testing validation)
{
  "name": "",  // Empty name should fail
  "category": "",  // Empty category should fail
  "unit": "INVALID_UNIT"  // Invalid unit should fail
}
```

### Unit Types

Valid unit types include:

- `KG` - Kilogram
- `BUNDLE` - Bundle
- `PIECE` - Piece
- `LITRE` - Litre
- `DOZEN` - Dozen
- `BOX` - Box
- `OTHER` - Other

### Related Documentation

- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Learn about authentication system
- [Validation Guide](./VALIDATION_GUIDE.md) - Learn about Zod validation schemas
- [API Overview](./API_OVERVIEW.md) - Complete API documentation

All endpoints include proper authentication, validation, error handling, and follow RESTful conventions!
