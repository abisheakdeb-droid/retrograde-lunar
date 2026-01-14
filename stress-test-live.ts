
import { performance } from 'perf_hooks';

const TARGET_URL = "https://retrograde-lunar.vercel.app";
const CONCURRENT_REQUESTS = 20000; // Increased to 20k
const BATCH_SIZE = 500; // Increased batch size for speed

async function stressTest() {
    console.log(`🚀 Starting Stress Test on ${TARGET_URL}`);
    console.log(`📊 Total Requests: ${CONCURRENT_REQUESTS}`);
    console.log(`----------------------------------------`);

    let successCount = 0;
    let failCount = 0;
    let totalDuration = 0;
    const errors: Record<string, number> = {};

    const startTotal = performance.now();

    for (let i = 0; i < CONCURRENT_REQUESTS; i += BATCH_SIZE) {
        const batch = Array.from({ length: Math.min(BATCH_SIZE, CONCURRENT_REQUESTS - i) }, (_, idx) => idx + i + 1);
        
        const promises = batch.map(async (reqId) => {
            const start = performance.now();
            try {
                const res = await fetch(TARGET_URL);
                const duration = performance.now() - start;
                
                if (res.ok) {
                    successCount++;
                    totalDuration += duration;
                    // console.log(`✅ Req #${reqId}: ${res.status} (${duration.toFixed(2)}ms)`);
                } else {
                    failCount++;
                    const status = res.status;
                    errors[status] = (errors[status] || 0) + 1;
                    console.log(`❌ Req #${reqId}: ${res.status} (${duration.toFixed(2)}ms)`);
                }
            } catch (err: any) {
                failCount++;
                const msg = err.message || "Unknown Error";
                errors[msg] = (errors[msg] || 0) + 1;
                console.log(`❌ Req #${reqId}: Failed - ${msg}`);
            }
        });

        await Promise.all(promises);
        console.log(`Processed ${Math.min(i + BATCH_SIZE, CONCURRENT_REQUESTS)}/${CONCURRENT_REQUESTS} requests...`);
    }

    const endTotal = performance.now();
    const durationTotal = (endTotal - startTotal) / 1000;
    const avgResponseTime = successCount > 0 ? (totalDuration / successCount) : 0;

    console.log(`\n----------------------------------------`);
    console.log(`🏁 Stress Test Completed in ${durationTotal.toFixed(2)}s`);
    console.log(`✅ Successful Requests: ${successCount}`);
    console.log(`❌ Failed Requests: ${failCount}`);
    console.log(`⏱️  Average Response Time: ${avgResponseTime.toFixed(2)}ms`); // Latency
    console.log(`📈 Throughput: ${(CONCURRENT_REQUESTS / durationTotal).toFixed(2)} req/s`); // Approx user throughput

    if (failCount > 0) {
        console.log(`\n⚠️ Error Breakdown:`);
        console.table(errors);
    }
}

stressTest();
