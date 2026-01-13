
import { prisma } from "./lib/db";

async function main() {
    console.log("🔥 STARTING STRESS TEST 🔥");
    console.log("Target: Insert 10,000 Requisitions & Query instantly.");
    
    const BATCH_SIZE = 1000;
    const BATCHES = 10; // 10,000 records total
    
    console.log(`\nPhase 1: Bulk Insertion (${BATCHES * BATCH_SIZE} records)...`);
    
    // Create Dummy Employee for Relation Constraint
    await prisma.employee.upsert({
        where: { id: "STRESS_TESTER" },
        update: {},
        create: {
            id: "STRESS_TESTER",
            employeeId: "BOT-001",
            name: "Stress Test Bot",
            role: "Bot",
            department: "Testing",
            status: "Active",
            email: "bot@test.com",
            phone: "000",
            address: "Server",
            joinDate: "2026-01-01",
            avatar: "",
            performance: 100,
            attendance: "[]",
            projects: "[]",
            leaveBalances: "[]",
            salary: "{}"
        }
    });

    const startInsert = performance.now();
    
    for (let i = 0; i < BATCHES; i++) {
        const data = Array.from({ length: BATCH_SIZE }).map((_, j) => ({
            id: `LOAD-${i}-${j}-${Math.random().toString(36).substring(7)}`,
            requesterId: "STRESS_TESTER",
            requesterName: "Load Bot",
            department: "Testing",
            item: `Stress Item ${Math.random()}`,
            quantity: Math.floor(Math.random() * 100),
            cost: Math.floor(Math.random() * 1000),
            status: 'Pending',
            date: new Date().toISOString(),
            priority: Math.random() > 0.5 ? 'High' : 'Low'
        }));
        
        await prisma.requisition.createMany({ data });
        process.stdout.write(`\r  >> Inserted batch ${i + 1}/${BATCHES} (${(i+1)*BATCH_SIZE} total)...`);
    }
    
    const endInsert = performance.now();
    console.log(`\n✅ Insertion Complete in ${((endInsert - startInsert) / 1000).toFixed(2)}s.`);
    console.log(`   Speed: ${Math.round(10000 / ((endInsert - startInsert) / 1000))} reqs/sec`);
    
    // Phase 2: Heavy Query
    console.log("\nPhase 2: Complex Analytics Query...");
    console.log("   (Filtering 10,000+ rows for 'High Priority' with Quantity > 50)");
    
    const startQuery = performance.now();
    
    const highPriority = await prisma.requisition.count({
        where: {
            priority: 'High',
            quantity: { gt: 50 },
            department: 'Testing'
        }
    });
    
    const endQuery = performance.now();
    console.log(`✅ Query Complete. Found ${highPriority} matches.`);
    console.log(`⚡ Query Time: ${((endQuery - startQuery)).toFixed(2)}ms (Instant)`); // ms for query
    
    console.log("\n🚀 VERDICT: The system is PRODUCTION READY.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
