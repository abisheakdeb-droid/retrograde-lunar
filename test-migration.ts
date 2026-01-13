
import { prisma } from "./lib/db";

async function main() {
    console.log("🔍 Verifying Prisma Migration...");
    
    // 1. Check Total Count (Should be ~300 + 3 specific)
    const total = await prisma.requisition.count();
    console.log(`[TEST] Total Requisitions in DB: ${total}`);

    // 2. Test Staff Filter (ID: "3")
    const staffReqs = await prisma.requisition.findMany({
        where: { requesterId: "3" }
    });
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
    const searchResults = await prisma.requisition.findMany({
        where: {
            OR: [
                { item: { contains: 'Sewing' } },
                { requesterName: { contains: 'Sewing' } }
            ]
        }
    });
    console.log(`[TEST] Search 'Sewing' Results: ${searchResults.length}`);
    if (searchResults.length > 0) console.log("✅ Search OK");
    else console.error("❌ Search Failed");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
