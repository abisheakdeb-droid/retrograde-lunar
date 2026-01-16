
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { 
    createSupplier, getSuppliers,
    createJobPosting, getJobPostings,
    createCandidate, getCandidates,
    createDisciplinaryCase, getDisciplinaryCases,
    createDocument, getDocuments,
    getStats
} from "../lib/db/queries";

async function verifyPersistence() {
    console.log("🔍 Verifying Persistence...");

    // 1. Supplier
    console.log("Testing Supplier...");
    await createSupplier({ name: "Verify Corp", category: "Test", email: "test@verify.com" });
    const suppliers = await getSuppliers(1);
    if (suppliers.some(s => s.name === "Verify Corp")) console.log("✅ Supplier Presisted");
    else console.error("❌ Supplier Failed");

    // 2. Job Posting
    console.log("Testing Job Posting...");
    await createJobPosting({ 
        title: "Verify Dev", 
        department: "IT", 
        type: "Full-time", 
        location: "Dhaka HQ",
        salaryRange: "100k" 
    });
    const jobs = await getJobPostings(1);
    if (jobs.some(j => j.title === "Verify Dev")) console.log("✅ Job Posting Presisted");
    else console.error("❌ Job Posting Failed");

    // 3. Disciplinary Case
    console.log("Testing Disciplinary Case...");
    await createDisciplinaryCase({ 
        employeeId: "EMP-TEST", 
        employeeName: "Test User", 
        type: "Behavioral", 
        severity: "Low", 
        description: "Test description", 
        date: new Date().toISOString() 
    });
    const cases = await getDisciplinaryCases(1);
    if (cases.some(c => c.employeeId === "EMP-TEST")) console.log("✅ Disciplinary Case Presisted");
    else console.error("❌ Disciplinary Case Failed");

    // 4. Document
    console.log("Testing Document...");
    await createDocument({
        employeeId: "EMP-TEST",
        employeeName: "Test User",
        type: "Contract",
        name: "Test Contract",
        fileSize: "1MB"
    });
    const docs = await getDocuments(1);
    if (docs.some(d => d.type === "Contract")) console.log("✅ Document Presisted");
    else console.error("❌ Document Failed");

    // 5. Stats
    console.log("Testing Stats...");
    const stats = await getStats();
    console.log("Stats:", stats);

    console.log("🎉 Verification Complete");
    process.exit(0);
}

verifyPersistence().catch(console.error);
