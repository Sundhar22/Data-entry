#!/usr/bin/env node
// Cloud-compatible trigger management script
import { execSync } from "child_process";
import fs from "fs";

console.log("🔧 Cloud Trigger Management Script");

// Extract database URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable not found");
  process.exit(1);
}

try {
  const command = process.argv[2];
  if (!command) {
    console.log("Usage: node cloud-triggers.js <install|remove|list|test>");
    console.log("");
    console.log("Commands:");
    console.log("  install  - Install payment status triggers");
    console.log("  remove   - Remove all payment status triggers");
    console.log("  list     - List current database triggers");
    console.log("  test     - Test trigger functionality");
    process.exit(1);
  }

  function runSQL(sql, description) {
    console.log(`Executing: ${description}`);
    try {
      const result = execSync(
        `psql "${DATABASE_URL}" -c "${sql}"`,
        {
          encoding: "utf8",
        },
      );
      console.log(result);
      return result;
    } catch (error) {
      console.error(`❌ Error in ${description}:`, error.message);
      throw error;
    }
  }

  function runSQLFile(file, description) {
    console.log(`Executing: ${description}`);
    try {
      // Write SQL content to a temporary file and execute it
      const sqlContent = fs.readFileSync(`database/triggers/${file}`, 'utf8');
      const tempFile = `/tmp/${file}`;
      fs.writeFileSync(tempFile, sqlContent);
      
      execSync(
        `psql "${DATABASE_URL}" -f "${tempFile}"`,
        {
          stdio: "inherit",
        },
      );
      
      // Clean up temp file
      fs.unlinkSync(tempFile);
      console.log(`✅ ${description} completed`);
    } catch (error) {
      console.error(`❌ Error in ${description}:`, error.message);
      throw error;
    }
  }

  switch (command) {
    case "install":
      console.log("🚀 Installing payment status triggers...");
      const files = [
        { file: "01-drop-triggers.sql", desc: "Drop Triggers & Functions" },
        { file: "02-create-function.sql", desc: "Create Function & Fix Data" },
        { file: "03-create-trigger.sql", desc: "Create Triggers" },
        { file: "04-create-index.sql", desc: "Create Index" },
      ];
      
      for (const { file, desc } of files) {
        runSQLFile(file, desc);
      }
      console.log("✅ All triggers installed successfully!");
      break;

    case "remove":
      console.log("🗑️  Removing payment status triggers...");
      runSQLFile("01-drop-triggers.sql", "Remove Triggers & Functions");
      console.log("✅ All triggers and functions removed successfully!");
      break;

    case "list":
      console.log("📋 Listing database triggers...");
      console.log("\nDatabase Triggers:");
      runSQL(
        "SELECT trigger_name, event_manipulation, event_object_table FROM information_schema.triggers WHERE trigger_schema = 'public' AND trigger_name LIKE '%payment_status%' ORDER BY trigger_name;",
        "List Triggers",
      );
      console.log("\nDatabase Functions:");
      runSQL(
        "SELECT routine_name, routine_type FROM information_schema.routines WHERE routine_schema = 'public' AND routine_name LIKE '%payment_status%' ORDER BY routine_name;",
        "List Functions",
      );
      break;

    case "test":
      console.log("🧪 Testing payment status triggers...");
      runSQL(
        "SELECT s.id, s.payment_status, COUNT(ai.id) as total_items, COUNT(ai.bill_id) as paid_items, COUNT(*) FILTER (WHERE ai.bill_id IS NULL) as unpaid_items FROM auction_sessions s LEFT JOIN auction_items ai ON s.id = ai.session_id GROUP BY s.id, s.payment_status LIMIT 5;",
        "Test Trigger Functionality",
      );
      console.log("✅ Trigger test completed successfully!");
      break;

    default:
      console.log("❌ Unknown command:", command);
      console.log("Usage: node cloud-triggers.js <install|remove|list|test>");
      process.exit(1);
  }
} catch (error) {
  console.error("❌ Script failed:", error.message);
  process.exit(1);
}