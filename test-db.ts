
import { db } from "./lib/data/mock-db";

async function main() {
    console.log("Testing MockDB filtering...");
    
    // Test 1: Fetch all (simulating Authority)
    const all = await db.getRequisitions(50);
    console.log(`[TEST] No Filter Count: ${all.length}`);

    // Test 2: Fetch specific User ID "3" (simulating Staff)
    const filtered = await db.getRequisitions(50, undefined, "3");
    console.log(`[TEST] Filter "3" Count: ${filtered.length}`);
    
    if (filtered.length > 0 && filtered.length < all.length) {
        console.log("SUCCESS: Filtering is working.");
        if (filtered.every(r => r.requesterId === "3")) {
            console.log("VERIFIED: All items match ID '3'.");
        } else {
            console.log("FAILURE: Filtered list contains wrong IDs:", filtered.map(r => r.requesterId));
        }
    } else {
        console.log("FAILURE: Filtering did not reduce count correctly.");
        console.log("Sample Data RequesterIDs:", all.slice(0, 5).map(r => r.requesterId));
    }
}

main();
