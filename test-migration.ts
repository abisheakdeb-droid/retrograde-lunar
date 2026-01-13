
import { MockDatabase } from "./lib/data/mock-db";

async function main() {
    console.log("🔍 Verifying Mock Database Data...");
    
    // Initialize DB
    const db = MockDatabase.getInstance();

    // 1. Check Total Count (Should be ~300 + 3 specific)
    // Note: The Mock DB generates 300 items + 3 specific ones in the constructor.
    const total = db.requisitions.length;
    console.log(`[TEST] Total Requisitions in DB: ${total}`);

    // 2. Test Staff Filter (ID: "3")
    // We filter synchronously from the in-memory array
    const staffReqs = db.requisitions.filter(r => r.requesterId === "3");
    
    console.log(`[TEST] Staff User (ID 3) Requisitions: ${staffReqs.length}`);
    if (staffReqs.length >= 3) {
        console.log("✅ Staff Filter OK");
        // Check content
        const sewingMachine = staffReqs.find(r => r.item === 'Industrial Sewing Machine');
        if (sewingMachine) console.log("✅ Specific Data (Sewing Machine) Found");
        else console.error("❌ Sewing Machine NOT found!");
    } else {
        console.error("❌ Staff Filter Failed");
    }

    // 3. Test Admin Search (Search for 'Sewing')
    // Simulating OR condition: item contains 'Sewing' OR requesterName contains 'Sewing'
    const searchResults = db.requisitions.filter(r => 
        (r.item && r.item.includes('Sewing')) ||
        (r.requesterName && r.requesterName.includes('Sewing'))
    );

    console.log(`[TEST] Search 'Sewing' Results: ${searchResults.length}`);
    if (searchResults.length > 0) console.log("✅ Search OK");
    else console.error("❌ Search Failed");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
