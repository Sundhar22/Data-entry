# Commissioner API Documentation

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

### 1. **GET /api/commissioner/me** - Get current commissioner profile

**Authentication:** Required (Commissioner can only access their own profile)

**Example Request:**

```bash
GET /api/commissioner/me
```

**Example Response:**

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

**Error Response (401):**

```json
{
  "error": "Unauthorized"
}
```

**Error Response (404):**

```json
{
  "error": "Commissioner not found"
}
```

---

### 2. **PUT /api/commissioner/me** - Update commissioner profile

**Authentication:** Required (Commissioner can only update their own profile)

**Request Body:**

```json
{
  "name": "Updated Commissioner Name",
  "email": "updated.email@example.com",
  "phone": "0987654321",
  "location": "Updated City, State",
  "commission_rate": 7.5
}
```

**Validation Rules (UpdateCommissionerSchema):**

- `name`: Optional, minimum 1 character if provided
- `email`: Optional, valid email format if provided
- `phone`: Optional, minimum 1 character if provided
- `location`: Optional, minimum 1 character if provided
- `commission_rate`: Optional, number between 0 and 100

**Example Response (Success):**

```json
{
  "id": "cm123abc",
  "name": "Updated Commissioner Name",
  "email": "updated.email@example.com",
  "phone": "0987654321",
  "location": "Updated City, State",
  "commission_rate": 7.5,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T12:00:00Z"
}
```

**Example Response (Validation Error):**

```json
{
  "error": "Validation failed",
  "errors": {
    "email": ["Please provide a valid email address"],
    "commission_rate": ["Commission rate must be between 0 and 100"]
  }
}
```

**Error Response (404):**

```json
{
  "error": "Commissioner not found"
}
```

---

### 3. **GET /api/commissioner** - List all commissioners (Admin only)

**Authentication:** Required (Admin access only)
**Note:** This endpoint may be restricted based on your permission system

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `location` (optional): Filter by location
- `min_commission_rate` (optional): Filter by minimum commission rate
- `max_commission_rate` (optional): Filter by maximum commission rate

**Example Request:**

```bash
GET /api/commissioner?page=1&limit=10&location=Mumbai
```

**Example Response:**

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

// Get current commissioner profile
const getProfile = async () => {
  const response = await fetchWithAuth("/api/commissioner/me");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch profile");
  }
  return await response.json();
};

// Update commissioner profile
const updateProfile = async (profileData) => {
  const response = await fetchWithAuth("/api/commissioner/me", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update profile");
  }

  return await response.json();
};

// List all commissioners (Admin only)
const fetchCommissioners = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    ...filters,
  });

  const response = await fetchWithAuth(`/api/commissioner?${params}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch commissioners");
  }
  return await response.json();
};

// Example usage in a React component
const CommissionerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const updated = await updateProfile(updatedData);
      setProfile(updated);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Error loading profile</div>;

  return (
    <div>
      <h1>Commissioner Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Location: {profile.location}</p>
      <p>Commission Rate: {profile.commission_rate}%</p>
    </div>
  );
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

# Get current commissioner profile (include cookies)
curl -X GET "http://localhost:3000/api/commissioner/me" \
  -b cookies.txt

# Update commissioner profile (include cookies)
curl -X PUT "http://localhost:3000/api/commissioner/me" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Updated Name",
    "phone": "0987654321",
    "commission_rate": 7.5
  }'

# List all commissioners (Admin only)
curl -X GET "http://localhost:3000/api/commissioner?page=1&limit=10" \
  -b cookies.txt
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
- `400`: Bad request / Validation error
- `401`: Unauthorized (authentication required)
- `404`: Resource not found
- `500`: Internal server error

**Authentication Errors:**

- `401 Unauthorized`: No tokens, invalid tokens, or user not found
- Auto-refresh: System automatically tries refresh token if access token is expired

**Validation Error Examples:**

```json
{
  "error": "Validation failed",
  "errors": {
    "email": ["Please provide a valid email address"],
    "commission_rate": ["Commission rate must be a number between 0 and 100"],
    "name": ["Name must be at least 1 character long"]
  }
}
```

---

## 🎯 **Testing the API**

### Prerequisites

1. **Authentication**: Login via `/api/auth/login` first to get authentication cookies
2. **Database**: Make sure your database is running and migrated

### Testing Steps

1. **Login**: Use `/api/auth/login` to authenticate
2. **Get Profile**: Use GET `/api/commissioner/me` to get current profile
3. **Update Profile**: Use PUT `/api/commissioner/me` with updated data
4. **List Commissioners**: Use GET `/api/commissioner` (if admin access available)

### Test Data Examples

```json
// Valid profile update data
{
  "name": "Updated Commissioner Name",
  "phone": "1234567890",
  "location": "Mumbai, Maharashtra",
  "commission_rate": 6.5
}

// Invalid profile update data (for testing validation)
{
  "email": "invalid-email",  // Invalid email format
  "commission_rate": 150,    // Invalid commission rate (>100)
  "name": ""                 // Empty name
}
```

### Commission Rate Guidelines

- Commission rate should be a number between 0 and 100
- Represents the percentage of commission charged
- Typical values range from 2% to 10%
- Default value is usually 5.0%

### Related Documentation

- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Learn about authentication system
- [Validation Guide](./VALIDATION_GUIDE.md) - Learn about Zod validation schemas
- [API Overview](./API_OVERVIEW.md) - Complete API documentation
- [Farmers API](./FARMERS_API_DOCS.md) - Farmer management endpoints

All endpoints include proper authentication, validation, error handling, and follow RESTful conventions!
