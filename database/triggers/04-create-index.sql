-- Create performance index for trigger optimization
-- This index speeds up the COUNT query in the trigger function

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_auction_items_session_unpaid 
ON auction_items (session_id) 
WHERE bill_id IS NULL;
