# Data Models & Types Documentation

## Overview

This document provides comprehensive information about all data models, types, and interfaces used in the Data Entry application. It includes database models, TypeScript interfaces, and enums.

---

## 📊 **Database Models**

### Commissioner Model

The Commissioner model represents agricultural commissioners who manage farmers and auctions.

```typescript
interface Commissioner {
  id: string; // CUID - Unique identifier
  name: string; // Commissioner's full name
  email: string; // Unique email address
  phone: string; // Contact phone number
  location: string; // Geographic location/address
  password: string; // Hashed password (bcrypt)
  commission_rate: number; // Commission percentage (default: 5.0)
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `email`: Unique index
- `commission_rate`: Default value 5.0
- `password`: Hashed using bcrypt before storage

---

### Farmer Model

The Farmer model represents farmers associated with commissioners.

```typescript
interface Farmer {
  id: string; // CUID - Unique identifier
  name: string; // Farmer's full name
  phone: string; // Contact phone number
  village: string; // Village/location name
  commissioner_id: string; // Foreign key to Commissioner
  is_active: boolean; // Active status (default: true)
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `commissioner_id`: Foreign key referencing Commissioner.id
- `is_active`: Default value true
- Composite index on (commissioner_id, is_active)

---

### Product Model

The Product model represents agricultural products in the system.

```typescript
interface Product {
  id: string; // CUID - Unique identifier
  name: string; // Product name
  category: string; // Product category
  unit: UnitType; // Unit of measurement (enum)
  description?: string; // Optional product description
  commissioner_id: string; // Foreign key to Commissioner
  is_active: boolean; // Active status (default: true)
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `commissioner_id`: Foreign key referencing Commissioner.id
- `is_active`: Default value true
- Index on (commissioner_id, category)

---

### Auction Session Model

The AuctionSession model represents auction sessions conducted by commissioners.

```typescript
interface AuctionSession {
  id: string; // CUID - Unique identifier
  date: Date; // Auction date
  commissioner_id: string; // Foreign key to Commissioner
  status: AuctionSessionStatus; // Session status (enum)
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `commissioner_id`: Foreign key referencing Commissioner.id
- `status`: Enum (ACTIVE, COMPLETED)
- Index on (commissioner_id, date, status)

---

### Auction Item Model

The AuctionItem model represents individual items sold in auction sessions.

```typescript
interface AuctionItem {
  id: string; // CUID - Unique identifier
  session_id: string; // Foreign key to AuctionSession
  farmer_id: string; // Foreign key to Farmer
  product_id: string; // Foreign key to Product
  unit: UnitType; // Unit of measurement (enum)
  quantity: number; // Quantity of the product
  final_price: number; // Final selling price
  buyer_id: string; // Foreign key to Buyer
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `session_id`: Foreign key referencing AuctionSession.id
- `farmer_id`: Foreign key referencing Farmer.id
- `product_id`: Foreign key referencing Product.id
- `buyer_id`: Foreign key referencing Buyer.id
- `quantity`: Positive number
- `final_price`: Positive number
- Composite index on (session_id, farmer_id)

---

### Buyer Model

The Buyer model represents buyers who purchase products at auctions.

```typescript
interface Buyer {
  id: string; // CUID - Unique identifier
  name: string; // Buyer's full name
  phone: string; // Contact phone number
  location: string; // Buyer's location/address
  commissioner_id: string; // Foreign key to Commissioner
  is_active: boolean; // Active status (default: true)
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `commissioner_id`: Foreign key referencing Commissioner.id
- `is_active`: Default value true
- Index on (commissioner_id, is_active)

---

### Bill Model

The Bill model represents bills generated for farmers after auctions.

```typescript
interface Bill {
  id: string; // CUID - Unique identifier
  session_id: string; // Foreign key to AuctionSession
  farmer_id: string; // Foreign key to Farmer
  total_amount: number; // Total bill amount
  commission_amount: number; // Commission charged
  net_amount: number; // Net amount after commission
  bill_date: Date; // Bill generation date
  payment_status: PaymentStatus; // Payment status (enum)
  printed_at?: Date; // Optional print timestamp
  paid_at?: Date; // Optional payment timestamp
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `session_id`: Foreign key referencing AuctionSession.id
- `farmer_id`: Foreign key referencing Farmer.id
- `payment_status`: Enum (UNPAID, PAID)
- `total_amount`, `commission_amount`, `net_amount`: Positive numbers
- Index on (session_id, farmer_id, payment_status)

---

### Bill Item Model

The BillItem model represents individual items in a bill.

```typescript
interface BillItem {
  id: string; // CUID - Unique identifier
  bill_id: string; // Foreign key to Bill
  auction_item_id: string; // Foreign key to AuctionItem
  quantity: number; // Quantity sold
  unit_price: number; // Price per unit
  total_price: number; // Total price for this item
  created_at: Date; // Record creation timestamp
  updated_at: Date; // Last update timestamp
}
```

**Database Constraints:**

- `id`: Primary key, auto-generated CUID
- `bill_id`: Foreign key referencing Bill.id
- `auction_item_id`: Foreign key referencing AuctionItem.id
- `quantity`, `unit_price`, `total_price`: Positive numbers
- Index on (bill_id, auction_item_id)

---

## 🏷️ **Enums**

### UnitType Enum

Defines the units of measurement for products.

```typescript
enum UnitType {
  KG = "KG", // Kilogram
  BUNDLE = "BUNDLE", // Bundle/bunch
  PIECE = "PIECE", // Individual pieces
  LITRE = "LITRE", // Litre
  DOZEN = "DOZEN", // Dozen (12 pieces)
  BOX = "BOX", // Box/container
  OTHER = "OTHER", // Other units
}
```

**Usage Examples:**

- Vegetables: KG, BUNDLE, PIECE
- Fruits: KG, DOZEN, BOX
- Liquids: LITRE
- Grains: KG
- Flowers: BUNDLE, DOZEN

---

### AuctionSessionStatus Enum

Defines the status of auction sessions.

```typescript
enum AuctionSessionStatus {
  ACTIVE = "ACTIVE", // Session is ongoing
  COMPLETED = "COMPLETED", // Session has ended
}
```

**Status Transitions:**

- New sessions start as ACTIVE
- Completed sessions change to COMPLETED
- COMPLETED sessions cannot be changed back to ACTIVE

---

### PaymentStatus Enum

Defines the payment status for bills.

```typescript
enum PaymentStatus {
  UNPAID = "UNPAID", // Payment pending
  PAID = "PAID", // Payment completed
}
```

**Status Transitions:**

- New bills start as UNPAID
- After payment, status changes to PAID
- PAID status cannot be changed back to UNPAID

---

## 📋 **API Response Types**

### Generic API Response

Standard response format for all API endpoints.

```typescript
interface ApiResponse<T> {
  success: boolean; // Indicates if request was successful
  data?: T; // Response data (if successful)
  error?: string; // Error message (if failed)
  message?: string; // Additional message
}
```

---

### Paginated Response

Response format for paginated API endpoints.

```typescript
interface PaginatedResponse<T> {
  data: T[]; // Array of data items
  pagination: {
    page: number; // Current page number
    limit: number; // Items per page
    total: number; // Total number of items
    totalPages: number; // Total number of pages
    hasNext: boolean; // Has next page
    hasPrev: boolean; // Has previous page
  };
}
```

---

## 🔍 **Filter & Search Types**

### Commissioner Filter

Filter options for commissioner queries.

```typescript
interface CommissionerFilter {
  location?: string; // Filter by location
  minCommissionRate?: number; // Minimum commission rate
  maxCommissionRate?: number; // Maximum commission rate
  dateRange?: DateRangeFilter; // Date range filter
}
```

---

### Farmer Filter

Filter options for farmer queries.

```typescript
interface FarmerFilter {
  village?: string; // Filter by village
  isActive?: boolean; // Filter by active status
  commissionerId?: string; // Filter by commissioner
  dateRange?: DateRangeFilter; // Date range filter
}
```

---

### Product Filter

Filter options for product queries.

```typescript
interface ProductFilter {
  category?: string; // Filter by category
  unit?: UnitType; // Filter by unit type
  isActive?: boolean; // Filter by active status
  commissionerId?: string; // Filter by commissioner
  dateRange?: DateRangeFilter; // Date range filter
}
```

---

### Date Range Filter

Common date range filter for queries.

```typescript
interface DateRangeFilter {
  startDate: Date; // Start date
  endDate: Date; // End date
}
```

---

## 📊 **Dashboard & Analytics Types**

### Dashboard Stats

Statistics displayed on the dashboard.

```typescript
interface DashboardStats {
  totalCommissioners: number; // Total number of commissioners
  totalFarmers: number; // Total number of farmers
  totalProducts: number; // Total number of products
  activeAuctions: number; // Number of active auctions
  totalRevenue: number; // Total revenue generated
  revenueGrowth: number; // Revenue growth percentage
}
```

---

### Search Parameters

Generic search parameters for queries.

```typescript
interface SearchParams {
  query: string; // Search query string
  filters?: CommissionerFilter | FarmerFilter | ProductFilter; // Type-specific filters
  pagination?: PaginationParams; // Pagination options
}
```

---

### Pagination Parameters

Parameters for paginated queries.

```typescript
interface PaginationParams {
  page: number; // Page number (1-based)
  limit: number; // Items per page
  sortBy?: string; // Field to sort by
  sortOrder?: "asc" | "desc"; // Sort order
}
```

---

## 🔐 **Authentication Types**

### User Session

User session information stored in the application.

```typescript
interface UserSession {
  commissionerId: string; // Authenticated commissioner ID
  isAuthenticated: boolean; // Authentication status
  permissions: string[]; // User permissions array
  lastActivity: Date; // Last activity timestamp
}
```

---

### JWT Payload

Payload structure for JWT tokens.

```typescript
interface JwtPayload {
  id: string; // User ID (commissioner ID)
  email: string; // User email
  name: string; // User name
  iat?: number; // Issued at timestamp
  exp?: number; // Expiration timestamp
}
```

---

## 🔔 **Notification Types**

### Notification

Structure for system notifications.

```typescript
interface Notification {
  id: string; // Unique identifier
  type: "success" | "error" | "warning" | "info"; // Notification type
  title: string; // Notification title
  message: string; // Notification message
  timestamp: Date; // Creation timestamp
  read: boolean; // Read status
}
```

---

## 🎨 **Form Types**

### Form State

Generic form state management structure.

```typescript
interface FormState<T> {
  values: T; // Form values
  errors: Record<keyof T, string>; // Validation errors
  touched: Record<keyof T, boolean>; // Touched fields
  isSubmitting: boolean; // Submission status
  isValid: boolean; // Overall validation status
}
```

---

## 💾 **Database Relationships**

### Entity Relationships

```
Commissioner (1) -----> (*) Farmer
Commissioner (1) -----> (*) Product
Commissioner (1) -----> (*) AuctionSession
Commissioner (1) -----> (*) Buyer

AuctionSession (1) -----> (*) AuctionItem
AuctionSession (1) -----> (*) Bill

Farmer (1) -----> (*) AuctionItem
Product (1) -----> (*) AuctionItem
Buyer (1) -----> (*) AuctionItem

Bill (1) -----> (*) BillItem
AuctionItem (1) -----> (1) BillItem
```

### Key Relationships:

- Each **Commissioner** can have many **Farmers**, **Products**, **AuctionSessions**, and **Buyers**
- Each **AuctionSession** can have many **AuctionItems** and **Bills**
- Each **AuctionItem** links a **Farmer**, **Product**, and **Buyer** in a specific **AuctionSession**
- Each **Bill** contains multiple **BillItems**, each referencing an **AuctionItem**

---

## 🔗 **Related Documentation**

- [API Overview](./API_OVERVIEW.md) - Complete API documentation
- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Authentication system
- [Validation Guide](./VALIDATION_GUIDE.md) - Zod validation schemas
- [Farmers API](./FARMERS_API_DOCS.md) - Farmer endpoints
- [Products API](./PRODUCTS_API_DOCS.md) - Product endpoints
- [Commissioner API](./COMMISSIONER_API_DOCS.md) - Commissioner endpoints

This documentation covers all data models and types used in the Data Entry application. All models include proper relationships, constraints, and indexing for optimal performance.
