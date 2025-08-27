# Real-time Updates and Backend Analytics Optimization Plan

## Goals
- Reduce polling and latency with WebSocket-based updates
- Shift heavy analytics to the database and add caching/indexes

## Real-time Updates (WebSocket)

### Events
- `session.status.changed`: { sessionId, status }
- `auction.item.created`: { sessionId, item }
- `auction.item.updated`: { sessionId, item }
- `bill.status.changed`: { billId, payment_status }

### Server
- Implement a WS gateway (Node server or Next.js custom server) that authenticates via cookies
- Broadcast events on DB changes (via Prisma hooks or application services)

### Client
- Create a `useWebSocket` hook to:
  - connect on mount, auto-reconnect
  - subscribe to relevant events
  - on message, update TanStack Query caches via `queryClient.setQueryData` or `invalidateQueries`

### Query invalidation map
- `session.status.changed` -> invalidate ['sessions'], ['sessions', {id}]
- `auction.item.*` -> invalidate ['sessions', {id}], ['bills', {sessionId}]
- `bill.status.changed` -> invalidate ['bills'], ['bill-stats']

## Backend Analytics Optimization

### DB Aggregations
- Use Prisma `aggregate` and `$queryRaw` for grouped analytics (already in place for /api/bills/statistics)
- Slice top lists to 3–5 items on server to reduce payload size

### Indexing
- Ensure composite indexes for frequent filters:
  - bills: `(commissioner_id, created_at)`, `(commissioner_id, payment_status)`
  - sessions: `(commissioner_id, status)`, `(commissioner_id, date)`
  - buyers/farmers/products: `(commissioner_id, created_at)`, `(commissioner_id, is_active)`

### Caching
- Add `Cache-Control: public, max-age=60` for statistics endpoints (done for `/api/bills/statistics`)
- Consider in-memory cache (LRU) for hot queries if load increases

### Request Shaping
- Avoid N+1 from client: aggregate on server, request only required fields
- Paginate consistently with `meta: { page, limit, total, totalPages }`

## Next Steps
1. Implement `useWebSocket` hook and server endpoint
2. Wire event -> query invalidation map
3. Add missing composite indexes in a Prisma migration
4. Add cache headers to other heavy endpoints as needed
