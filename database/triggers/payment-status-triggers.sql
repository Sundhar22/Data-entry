-- Complete trigger system for payment status automation
-- This file contains all triggers in a single file for easier management

-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS update_session_payment_status_on_insert ON auction_items CASCADE;
DROP TRIGGER IF EXISTS update_session_payment_status_on_update ON auction_items CASCADE;
DROP TRIGGER IF EXISTS update_session_payment_status_on_delete ON auction_items CASCADE;
DROP FUNCTION IF EXISTS update_session_payment_status() CASCADE;

-- Create the payment status update function
CREATE OR REPLACE FUNCTION update_session_payment_status()
RETURNS TRIGGER AS $$
DECLARE
    session_id_to_update TEXT;
    unpaid_count INTEGER;
BEGIN
    -- Determine which session to update
    IF TG_OP = 'DELETE' THEN
        session_id_to_update := OLD.session_id;
    ELSE
        session_id_to_update := NEW.session_id;
    END IF;

    -- Count unpaid items for this session
    SELECT COUNT(*)
    INTO unpaid_count
    FROM auction_items
    WHERE session_id = session_id_to_update
    AND bill_id IS NULL;

    -- Update session payment status
    UPDATE auction_sessions
    SET 
        payment_status = CASE 
            WHEN unpaid_count = 0 THEN 'COMPLETED'::SessionPaymentStatus
            ELSE 'PENDING'::SessionPaymentStatus
        END,
        updated_at = NOW()
    WHERE id = session_id_to_update;

    -- Return appropriate record
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_session_payment_status_on_insert
    AFTER INSERT ON auction_items
    FOR EACH ROW
    EXECUTE FUNCTION update_session_payment_status();

CREATE TRIGGER update_session_payment_status_on_update
    AFTER UPDATE OF bill_id ON auction_items
    FOR EACH ROW
    EXECUTE FUNCTION update_session_payment_status();

CREATE TRIGGER update_session_payment_status_on_delete
    AFTER DELETE ON auction_items
    FOR EACH ROW
    EXECUTE FUNCTION update_session_payment_status();

-- Create performance index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_auction_items_session_unpaid 
ON auction_items (session_id) 
WHERE bill_id IS NULL;
