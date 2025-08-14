-- Create optimized function for updating session payment status
-- This function is called by triggers to automatically update payment status

CREATE OR REPLACE FUNCTION update_session_payment_status()
RETURNS TRIGGER AS $$
DECLARE
    session_id_to_update TEXT;
    unpaid_count INTEGER;
BEGIN
    -- Determine which session to update based on trigger operation
    IF TG_OP = 'DELETE' THEN
        session_id_to_update := OLD.session_id;
    ELSE
        session_id_to_update := NEW.session_id;
    END IF;

    -- Count unpaid items for this session (items without bill_id)
    SELECT COUNT(*)
    INTO unpaid_count
    FROM auction_items
    WHERE session_id = session_id_to_update
    AND bill_id IS NULL;

    -- Update session payment status based on unpaid count
    UPDATE auction_sessions
    SET 
        payment_status = CASE 
            WHEN unpaid_count = 0 THEN 'COMPLETED'::"SessionPaymentStatus"
            ELSE 'PENDING'::"SessionPaymentStatus"
        END,
        updated_at = NOW()
    WHERE id = session_id_to_update;

    -- Return appropriate record based on operation
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Fix existing session payment statuses after function creation
-- This ensures all existing sessions have correct payment_status values
UPDATE auction_sessions 
SET payment_status = CASE 
    WHEN (
        SELECT COUNT(*) 
        FROM auction_items 
        WHERE session_id = auction_sessions.id 
        AND bill_id IS NULL
    ) = 0 THEN 'COMPLETED'::"SessionPaymentStatus"
    ELSE 'PENDING'::"SessionPaymentStatus"
END;
