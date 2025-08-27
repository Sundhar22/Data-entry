# Sessions API Documentation

This document describes the API endpoints for managing auction sessions in the data entry system.

## Overview

Auction sessions represent a specific time period during which farmers can sell their products through the auction system. Each session belongs to a commissioner and can contain multiple auction items and bills.

## Base URL

All session endpoints are prefixed with `/api/sessions`

## Authentication

All session endpoints require authentication. Include the access token as an HTTP-only cookie.

## Session Object

```typescript
{
  id: string;
  date: Date;
  commissioner_id: string;
  status: 'ACTIVE' | 'COMPLETED';
  created_at: Date;
  updated_at: Date;

  // Relations (when included)
  auction_items?: AuctionItem[];
  bills?: Bill[];
  _count?: {
    auction_items: number;
    bills: number;
  };
}
```

## Endpoints

### 1. List Sessions

**GET** `/api/sessions`

Retrieves a paginated list of auction sessions for the authenticated commissioner.

#### Query Parameters

| Parameter   | Type              | Default | Description                                        |
| ----------- | ----------------- | ------- | -------------------------------------------------- |
| `status`    | string            | -       | Filter by session status ('ACTIVE' or 'COMPLETED') |
| `startDate` | string (ISO date) | -       | Filter sessions from this date                     |
| `endDate`   | string (ISO date) | -       | Filter sessions up to this date                    |
| `page`      | number            | 1       | Page number for pagination                         |
| `limit`     | number            | 10      | Number of items per page (max 100)                 |
| `sortBy`    | string            | 'date'  | Sort field ('date', 'created_at', 'updated_at')    |
| `sortOrder` | string            | 'desc'  | Sort order ('asc' or 'desc')                       |

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "session_id",
      "date": "2025-08-03T10:00:00.000Z",
      "commissioner_id": "commissioner_id",
      "status": "ACTIVE",
      "created_at": "2025-08-03T09:00:00.000Z",
      "updated_at": "2025-08-03T09:00:00.000Z",
      "_count": {
        "auction_items": 5,
        "bills": 2
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "timestamp": "2025-08-03T10:00:00.000Z"
  }
}
```

#### Example Requests

```bash
# Get all active sessions
GET /api/sessions?status=ACTIVE

# Get sessions for a specific date range
GET /api/sessions?startDate=2025-08-01&endDate=2025-08-31

# Get paginated sessions
GET /api/sessions?page=1&limit=20&sortBy=date&sortOrder=desc
```

### 2. Create Session

**POST** `/api/sessions`

Creates a new auction session for the authenticated commissioner.

#### Request Body

```json
{
  "date": "2025-08-03T10:00:00.000Z" // Optional, defaults to current date/time
}
```

#### Response

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
  },
  "meta": {
    "timestamp": "2025-08-03T10:00:00.000Z"
  }
}
```

#### Business Rules

- Only one active session per commissioner per date is allowed
- If no date is provided, the current date/time is used
- New sessions are created with 'ACTIVE' status

#### Error Responses

```json
// If active session already exists for the date
{
  "success": false,
  "error": {
    "message": "An active session already exists for this date",
    "code": "CONFLICT"
  }
}
```

### 3. Get Session Details

**GET** `/api/sessions/{id}`

Retrieves detailed information about a specific auction session.

#### Path Parameters

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| `id`      | string | The session ID |

#### Response

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
          "name": "Tomatoes",
          "category": {
            "id": "category_id",
            "name": "Vegetables"
          }
        },
        "buyer": {
          "id": "buyer_id",
          "name": "Jane Buyer"
        }
      }
    ],
    "bills": [
      {
        "id": "bill_id",
        "bill_number": "BILL-001",
        "total_amount": 500.0,
        "commission_amount": 25.0,
        "net_amount": 475.0,
        "payment_status": "UNPAID",
        "farmer": {
          "id": "farmer_id",
          "name": "John Farmer"
        },
        "bill_items": [...]
      }
    ],
    "_count": {
      "auction_items": 1,
      "bills": 1
    }
  },
  "meta": {
    "timestamp": "2025-08-03T10:00:00.000Z"
  }
}
```

#### Error Responses

```json
// If session not found or doesn't belong to commissioner
{
  "success": false,
  "error": {
    "message": "Session not found",
    "code": "NOT_FOUND"
  }
}
```

### 4. Update Session

**PUT** `/api/sessions/{id}`

Updates a session's status or date.

#### Path Parameters

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| `id`      | string | The session ID |

#### Request Body

```json
{
  "status": "COMPLETED", // Optional: 'ACTIVE' or 'COMPLETED'
  "date": "2025-08-03T10:00:00.000Z" // Optional: new date for the session
}
```

#### Response

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
  },
  "meta": {
    "timestamp": "2025-08-03T10:30:00.000Z"
  }
}
```

#### Business Rules

- Cannot change status to 'COMPLETED' if the session has no auction items
- Can change from 'COMPLETED' back to 'ACTIVE' (useful for corrections)
- Only the session owner (commissioner) can update the session

#### Error Responses

```json
// If trying to complete session without auction items
{
  "success": false,
  "error": {
    "message": "Cannot complete session without any auction items",
    "code": "CONFLICT"
  }
}

// If session not found
{
  "success": false,
  "error": {
    "message": "Session not found",
    "code": "NOT_FOUND"
  }
}
```

### 5. Delete Session

**DELETE** `/api/sessions/{id}`

Deletes an auction session. Only empty sessions (no auction items or bills) can be deleted.

#### Path Parameters

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| `id`      | string | The session ID |

#### Response

```json
{
  "success": true,
  "data": {
    "message": "Session deleted successfully"
  },
  "meta": {
    "timestamp": "2025-08-03T10:00:00.000Z"
  }
}
```

#### Business Rules

- Cannot delete session with auction items
- Cannot delete session with bills
- Only the session owner (commissioner) can delete the session

#### Error Responses

```json
// If session has auction items
{
  "success": false,
  "error": {
    "message": "Cannot delete session with auction items. Please remove all auction items first.",
    "code": "CONFLICT"
  }
}

// If session has bills
{
  "success": false,
  "error": {
    "message": "Cannot delete session with bills. Please remove all bills first.",
    "code": "CONFLICT"
  }
}

// If session not found
{
  "success": false,
  "error": {
    "message": "Session not found",
    "code": "NOT_FOUND"
  }
}
```

## Error Handling

All endpoints follow the standard error response format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {} // Optional additional details
  },
  "meta": {
    "timestamp": "2025-08-03T10:00:00.000Z"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Access denied
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Business rule violation
- `INTERNAL_SERVER_ERROR` (500): Server error

## Usage Examples

### Create and manage a session workflow

```bash
# 1. Create a new session
POST /api/sessions
{
  "date": "2025-08-03T10:00:00.000Z"
}

# 2. Add auction items to the session (via auction items API)
# ...

# 3. Complete the session
PUT /api/sessions/{session_id}
{
  "status": "COMPLETED"
}

# 4. Get session details with all items
GET /api/sessions/{session_id}

# 5. If needed, reopen the session
PUT /api/sessions/{session_id}
{
  "status": "ACTIVE"
}
```

### Filter and search sessions

```bash
# Get active sessions from last month
GET /api/sessions?status=ACTIVE&startDate=2025-07-01&endDate=2025-07-31

# Get recent sessions, sorted by date
GET /api/sessions?sortBy=date&sortOrder=desc&limit=20

# Get completed sessions for reporting
# Get completed sessions for reporting
GET /api/sessions?status=COMPLETED&page=1&limit=50
```

## Auction Items Management

The following endpoints manage auction items within sessions. Note that `GET /api/sessions/[id]` already returns all auction items for a session, but these endpoints provide more granular control.

### 5. List Session Items

**GET** `/api/sessions/{sessionId}/items`

Retrieves all auction items for a specific session with filtering and pagination.

#### Query Parameters

| Parameter    | Type   | Default      | Description                                                          |
| ------------ | ------ | ------------ | -------------------------------------------------------------------- |
| `farmer_id`  | string | -            | Filter by farmer ID                                                  |
| `product_id` | string | -            | Filter by product ID                                                 |
| `buyer_id`   | string | -            | Filter by buyer ID                                                   |
| `paid`       | string | -            | Filter by payment status ('true' for paid items, 'false' for unpaid) |
| `page`       | number | 1            | Page number for pagination                                           |
| `limit`      | number | 10           | Number of items per page (max 100)                                   |
| `sortBy`     | string | 'created_at' | Sort field ('created_at', 'final_price', 'quantity')                 |
| `sortOrder`  | string | 'desc'       | Sort order ('asc' or 'desc')                                         |

#### Response

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
        "name": "Tomatoes",
        "category": {
          "id": "category_id",
          "name": "Vegetables"
        }
      },
      "buyer": {
        "id": "buyer_id",
        "name": "Buyer Name",
        "phone": "+0987654321"
      },
      "bill": null
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "timestamp": "2025-08-03T10:30:00.000Z"
  }
}
```

### 6. Add Auction Item

**POST** `/api/sessions/{sessionId}/items`

Adds a new auction item to an active session.

#### Request Body

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

#### Response

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
    "farmer": {
      /* farmer details */
    },
    "product": {
      /* product details */
    },
    "buyer": {
      /* buyer details */
    }
  }
}
```

### 7. Get Auction Item

**GET** `/api/sessions/{sessionId}/items/{itemId}`

Retrieves a specific auction item by ID.

#### Response

```json
{
  "success": true,
  "data": {
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
      /* farmer details */
    },
    "product": {
      /* product details */
    },
    "buyer": {
      /* buyer details */
    },
    "bill": null
  }
}
```

### 8. Update Auction Item

**PUT** `/api/sessions/{sessionId}/items/{itemId}`

Updates an existing auction item. Only unpaid items in active sessions can be updated.

#### Request Body (all fields optional)

```json
{
  "farmer_id": "new_farmer_id",
  "product_id": "new_product_id",
  "buyer_id": "new_buyer_id",
  "unit": "QUINTAL",
  "quantity": 75.0,
  "final_price": 3750.0
}
```

#### Response

```json
{
  "success": true,
  "data": {
    /* Updated auction item with relations */
  }
}
```

### 9. Delete Auction Item

**DELETE** `/api/sessions/{sessionId}/items/{itemId}`

Deletes an auction item. Only unpaid items in active sessions can be deleted.

#### Response

```
204 No Content
```

## Business Rules for Auction Items

1. **Session Status**: Items can only be added/updated/deleted in ACTIVE sessions
2. **Payment Status**: Paid items (items with bill_id) cannot be modified or deleted
3. **Validation**: All referenced farmers, buyers, and products must exist and be active
4. **Authorization**: Only commissioners who own the session can manage its items

## API Endpoint Summary

### Session Management

- `GET /api/sessions` - List sessions with summary data
- `POST /api/sessions` - Create new session
- `GET /api/sessions/[id]` - **Get session details INCLUDING all auction items**
- `PUT /api/sessions/[id]` - Update session
- `DELETE /api/sessions/[id]` - Delete session

### Auction Items Management

- `GET /api/sessions/[id]/items` - List items with filtering (alternative to session detail)
- `POST /api/sessions/[id]/items` - Add new auction item
- `GET /api/sessions/[id]/items/[itemId]` - Get specific auction item
- `PUT /api/sessions/[id]/items/[itemId]` - Update auction item
- `DELETE /api/sessions/[id]/items/[itemId]` - Delete auction item

## Clarification: Two Ways to Get Session Items

You have **two options** to get auction items for a session:

1. **`GET /api/sessions/[id]`** - Returns complete session details including ALL auction items, analytics, and summary data. This is the **recommended approach** for most use cases.

2. **`GET /api/sessions/[id]/items`** - Returns ONLY auction items with advanced filtering, pagination, and search. Use this when you need specific filtering or pagination of items.

Both endpoints return the same auction item data structure, but the session detail endpoint includes additional analytics and context.

````
```
````
