import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../lib/db/index";
import { factoryUnits } from "../lib/db/schema";

async function checkDuplicates() {
  console.log("🔍 Checking for duplicate factory units...\n");
  
  const units = await db.select().from(factoryUnits);
  
  console.log(`Total factory units in database: ${units.length}\n`);
  
  // Group by id to find duplicates
  const grouped = units.reduce((acc: any, unit) => {
    if (!acc[unit.id]) {
      acc[unit.id] = [];
    }
    acc[unit.id].push(unit);
    return acc;
  }, {});
  
  let hasDuplicates = false;
  
  for (const [id, instances] of Object.entries(grouped) as any) {
    if (instances.length > 1) {
      hasDuplicates = true;
      console.log(`❌ Duplicate found: ${id} (${instances[0].name})`);
      console.log(`   Count: ${instances.length} instances`);
      console.log(`   Database IDs: ${instances.map((i: any) => i.dbId).join(', ')}\n`);
    }
  }
  
  if (!hasDuplicates) {
    console.log("✅ No duplicates found!");
  } else {
    console.log("\n⚠️  Duplicates detected! Run 'npm run db:reset' to clear and reseed the database.");
  }
  
  process.exit(0);
}

checkDuplicates().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
