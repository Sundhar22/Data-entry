-- Create triggers for automatic payment status updates
-- These triggers call the update function whenever auction items change

-- Trigger for INSERT operations
CREATE TRIGGER update_session_payment_status_on_insert
    AFTER INSERT ON auction_items
    FOR EACH ROW
    EXECUTE FUNCTION update_session_payment_status();

-- Trigger for UPDATE operations (when bill_id changes)
CREATE TRIGGER update_session_payment_status_on_update
    AFTER UPDATE OF bill_id ON auction_items
    FOR EACH ROW
    EXECUTE FUNCTION update_session_payment_status();

-- Trigger for DELETE operations
CREATE TRIGGER update_session_payment_status_on_delete
    AFTER DELETE ON auction_items
    FOR EACH ROW
    EXECUTE FUNCTION update_session_payment_status();
