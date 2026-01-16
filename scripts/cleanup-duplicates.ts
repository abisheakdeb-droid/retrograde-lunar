import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../lib/db/index";
import { factoryUnits } from "../lib/db/schema";
import { sql } from "drizzle-orm";

async function cleanupDuplicates() {
  console.log("🧹 Cleaning up duplicate factory units...\n");
  
  // Get all factory units
  const units = await db.select().from(factoryUnits);
  console.log(`Found ${units.length} total factory units\n`);
  
  // Group by name and keep only the first occurrence
  const seen = new Set<string>();
  const toDelete: string[] = [];
  
  for (const unit of units) {
    if (seen.has(unit.name)) {
      toDelete.push(unit.id);
      console.log(`  Marking for deletion: ${unit.name} (ID: ${unit.id})`);
    } else {
      seen.add(unit.name);
      console.log(`  ✓ Keeping: ${unit.name} (ID: ${unit.id})`);
    }
  }
  
  if (toDelete.length > 0) {
    console.log(`\n🗑️  Deleting ${toDelete.length} duplicate entries...`);
    
    for (const id of toDelete) {
      await db.delete(factoryUnits).where(sql`${factoryUnits.id} = ${id}`);
    }
    
    console.log("✅ Cleanup complete!");
    
    // Verify
    const remaining = await db.select().from(factoryUnits);
    console.log(`\n📊 Final count: ${remaining.length} factory units`);
    remaining.forEach(u => console.log(`   - ${u.name}`));
  } else {
    console.log("\n✅ No duplicates found!");
  }
  
  process.exit(0);
}

cleanupDuplicates().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
