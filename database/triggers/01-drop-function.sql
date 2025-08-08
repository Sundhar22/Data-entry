-- Drop existing triggers and functions (if they exist)
-- This ensures clean reinstallation

DROP TRIGGER IF EXISTS update_session_payment_status_on_insert ON auction_items CASCADE;
DROP TRIGGER IF EXISTS update_session_payment_status_on_update ON auction_items CASCADE;
DROP TRIGGER IF EXISTS update_session_payment_status_on_delete ON auction_items CASCADE;

DROP FUNCTION IF EXISTS update_session_payment_status() CASCADE;
