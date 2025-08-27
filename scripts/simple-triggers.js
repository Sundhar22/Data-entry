#!/usr/bin/env node
// Node.js-only trigger management script (no psql required)
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// For environments where pg is available
let Client;
try {
  const pkg = await import('pg');
  Client = pkg.default?.Client || pkg.Client;
} catch (error) {
  console.log("📦 Installing pg dependency...");
  const { execSync } = await import('child_process');
  try {
    execSync('npm install pg', { stdio: 'inherit' });
    const pkg = await import('pg');
    Client = pkg.default?.Client || pkg.Client;
  } catch (installError) {
    console.error("❌ Failed to install pg dependency:", installError.message);
    process.exit(1);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔧 Node.js Trigger Management Script");

// Extract database URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable not found");
  process.exit(1);
}

async function executeSQLFile(client, filePath, description) {
  console.log(`Executing: ${description}`);
  try {
    const sqlContent = readFileSync(filePath, 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        await client.query(statement);
      }
    }
    
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ Error in ${description}:`, error.message);
    throw error;
  }
}

async function executeSQL(client, sql, description) {
  console.log(`Executing: ${description}`);
  try {
    const result = await client.query(sql);
    console.log(`✅ ${description} completed`);
    return result;
  } catch (error) {
    console.error(`❌ Error in ${description}:`, error.message);
    throw error;
  }
}

async function installTriggers() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("✅ Connected to database");

    // 1. Drop existing triggers and function
    console.log("🗑️ Dropping existing triggers and function...");
    await executeSQL(client, `
      DROP TRIGGER IF EXISTS update_session_payment_status_on_insert ON auction_items;
      DROP TRIGGER IF EXISTS update_session_payment_status_on_update ON auction_items;
      DROP TRIGGER IF EXISTS update_session_payment_status_on_delete ON auction_items;
      DROP FUNCTION IF EXISTS update_session_payment_status();
    `, "Drop Triggers & Functions");

    // 2. Create the function with proper escaping
    console.log("🔧 Creating payment status function...");
    await executeSQL(client, `
      CREATE OR REPLACE FUNCTION update_session_payment_status()
      RETURNS TRIGGER AS $func$
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
      $func$ LANGUAGE plpgsql;
    `, "Create Function");

    // 3. Fix existing data
    console.log("🔄 Updating existing session payment statuses...");
    const result = await executeSQL(client, `
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
    `, "Fix Data");

    console.log(`Updated ${result.rowCount} session payment statuses`);

    // 4. Create triggers
    console.log("🔧 Creating triggers...");
    await executeSQL(client, `
      CREATE TRIGGER update_session_payment_status_on_insert
          AFTER INSERT ON auction_items
          FOR EACH ROW
          EXECUTE FUNCTION update_session_payment_status();
    `, "Create Insert Trigger");

    await executeSQL(client, `
      CREATE TRIGGER update_session_payment_status_on_update
          AFTER UPDATE OF bill_id ON auction_items
          FOR EACH ROW
          EXECUTE FUNCTION update_session_payment_status();
    `, "Create Update Trigger");

    await executeSQL(client, `
      CREATE TRIGGER update_session_payment_status_on_delete
          AFTER DELETE ON auction_items
          FOR EACH ROW
          EXECUTE FUNCTION update_session_payment_status();
    `, "Create Delete Trigger");

    // 5. Create index for better performance
    console.log("📊 Creating performance index...");
    await executeSQL(client, `
      CREATE INDEX IF NOT EXISTS idx_auction_items_session_bill_status 
      ON auction_items (session_id, bill_id) 
      WHERE bill_id IS NULL;
    `, "Create Index");

    console.log("🎉 All triggers installed successfully!");

  } catch (error) {
    console.error("❌ Script failed:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

async function removeTriggers() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("🗑️ Removing payment status triggers...");
    
    await executeSQL(client, `
      DROP TRIGGER IF EXISTS update_session_payment_status_on_insert ON auction_items;
      DROP TRIGGER IF EXISTS update_session_payment_status_on_update ON auction_items;
      DROP TRIGGER IF EXISTS update_session_payment_status_on_delete ON auction_items;
      DROP FUNCTION IF EXISTS update_session_payment_status();
      DROP INDEX IF EXISTS idx_auction_items_session_bill_status;
    `, "Remove Triggers & Functions");

    console.log("✅ All triggers and functions removed successfully!");

  } catch (error) {
    console.error("❌ Error removing triggers:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

async function listTriggers() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    
    console.log("📋 Database Triggers:");
    const triggers = await client.query(`
      SELECT trigger_name, event_manipulation, event_object_table 
      FROM information_schema.triggers 
      WHERE trigger_schema = 'public' 
      AND trigger_name LIKE '%payment_status%' 
      ORDER BY trigger_name;
    `);
    
    if (triggers.rows.length > 0) {
      console.table(triggers.rows);
    } else {
      console.log("No payment status triggers found.");
    }

    console.log("\n📋 Database Functions:");
    const functions = await client.query(`
      SELECT routine_name, routine_type 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' 
      AND routine_name LIKE '%payment_status%' 
      ORDER BY routine_name;
    `);
    
    if (functions.rows.length > 0) {
      console.table(functions.rows);
    } else {
      console.log("No payment status functions found.");
    }

  } catch (error) {
    console.error("❌ Error listing triggers:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

async function testTriggers() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    
    console.log("🧪 Testing payment status triggers...");
    const result = await client.query(`
      SELECT s.id, s.payment_status, 
             COUNT(ai.id) as total_items, 
             COUNT(ai.bill_id) as paid_items, 
             COUNT(*) FILTER (WHERE ai.bill_id IS NULL) as unpaid_items 
      FROM auction_sessions s 
      LEFT JOIN auction_items ai ON s.id = ai.session_id 
      GROUP BY s.id, s.payment_status 
      LIMIT 5;
    `);
    
    if (result.rows.length > 0) {
      console.table(result.rows);
    } else {
      console.log("No auction sessions found for testing.");
    }
    
    console.log("✅ Trigger test completed successfully!");

  } catch (error) {
    console.error("❌ Error testing triggers:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'install':
    await installTriggers();
    break;
  case 'remove':
    await removeTriggers();
    break;
  case 'list':
    await listTriggers();
    break;
  case 'test':
    await testTriggers();
    break;
  default:
    console.log("Usage: node nodejs-triggers.js <install|remove|list|test>");
    console.log("");
    console.log("Commands:");
    console.log("  install  - Install payment status triggers");
    console.log("  remove   - Remove all payment status triggers");
    console.log("  list     - List current database triggers");
    console.log("  test     - Test trigger functionality");
    process.exit(1);
}