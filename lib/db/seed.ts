import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import { 
  employees, 
  tasks, 
  notifications, 
  auditLogs, 
  attendance, 
  leaveRequests,
  inventory,
  assets,
  projects,
  tadaClaims,
  productionStats,
  factoryUnits,
  payslips,
  requisitions,
  suppliers,
  jobPostings,
  candidates,
  disciplinaryCases,
  documents
} from "./schema";
import { MockDatabase } from "../data/mock-db";
import { 
  generateProductionStats, 
  generateHaMeemFactoryData, 
  generateSuppliers,
  generateJobPostings,
  generateCandidates,
  generateDisciplinaryCases,
  generateDocuments 
} from "../data/generators";

async function main() {
  console.log("🌱 Starting Database Seed...");

  // 1. Get Mock Data Instance
  const mockDb = MockDatabase.getInstance();
  
  // Wait for it to initialize (it simulates generation)
  // Accessing private properties via 'any' cast since they are initialized in constructor
  const mockEmployees = (mockDb as any).employees;
  const mockTasks = (mockDb as any).tasks;
  const mockNotifications = (mockDb as any).notifications;
  const mockAuditLogs = (mockDb as any).auditLogs;
  const mockLeaveRequests = (mockDb as any).leaveRequests;
  const mockInventory = (mockDb as any).inventory;
  const mockAssets = (mockDb as any).assets;
  const mockProjects = (mockDb as any).projects;
  const mockTadaClaims = (mockDb as any).tadaClaims;
  // Mock Attendance is embedded in Employee object usually, or generated.
  
  console.log(`Found ${mockEmployees.length} Mock Employees`);

  // 2. Seed Employees
  console.log("... Seeding Employees");
  for (const emp of mockEmployees) {
    // Map Mock Employee to DB Schema
    await db.insert(employees).values({
      employeeId: emp.employeeId,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      department: emp.department,
      status: emp.status,
      phone: emp.phone,
      address: emp.address,
      joinDate: new Date(emp.joinDate),
      avatar: emp.avatar,
      performanceScore: emp.performance,
      salaryStructure: emp.salary, // JSONB
    }).onConflictDoNothing(); // Prevent duplicates on re-runs
  }
  
  // 3. Seed Tasks
  console.log(`... Seeding ${mockTasks.length} Tasks`);
  for (const task of mockTasks) {
    await db.insert(tasks).values({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assignee?.name || 'Unassigned', // Schema uses text, ideally should map to ID but Name is safer for now based on Mock
      dueDate: new Date(task.dueDate),
      tags: task.tags,
    }).onConflictDoNothing();
  }

  // 4. Seed Notifications
  console.log(`... Seeding ${mockNotifications.length} Notifications`);
  for (const notif of mockNotifications) {
    await db.insert(notifications).values({
      userId: notif.userId,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      link: notif.link,
      isRead: notif.isRead,
      createdAt: new Date(notif.createdAt),
    }).onConflictDoNothing();
  }

  // 5. Seed Audit Logs
  console.log(`... Seeding ${mockAuditLogs.length} Audit Logs`);
  for (const log of mockAuditLogs) {
      await db.insert(auditLogs).values({
          action: log.action,
          entity: log.entity,
          entityId: log.entityId,
          actorId: log.actorId,
          actorName: log.actorName,
          details: log.details,
          metadata: log.metadata,
          timestamp: new Date(log.timestamp)
      }).onConflictDoNothing();
  }
  
  // 6. Seed Leave Requests (Sample)
  console.log(`... Seeding ${mockLeaveRequests.length} Leave Requests`);
   for (const req of mockLeaveRequests) {
      await db.insert(leaveRequests).values({
          employeeId: req.employeeId,
          type: req.type,
          startDate: new Date(req.startDate),
          endDate: new Date(req.endDate),
          reason: req.reason,
          status: req.status
      }).onConflictDoNothing();
  }

  // 7. Seed Inventory
  console.log(`... Seeding ${mockInventory.length} Inventory Items`);
  for (const item of mockInventory) {
      await db.insert(inventory).values({
          name: item.name,
          sku: item.sku,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          warehouse: item.warehouse,
          status: item.status,
          value: item.value,
          lastUpdated: new Date(item.lastUpdated)
      }).onConflictDoNothing();
  }

  // 8. Seed Assets
  console.log(`... Seeding ${mockAssets.length} Assets`);
  for (const asset of mockAssets) {
      await db.insert(assets).values({
          name: asset.name,
          category: asset.category,
          sku: asset.sku,
          serialNumber: asset.serialNumber,
          location: asset.location,
          purchaseDate: new Date(asset.purchaseDate),
          purchaseValue: asset.purchaseValue,
          condition: asset.condition,
          lastMaintenance: asset.lastMaintenance ? new Date(asset.lastMaintenance) : null,
          assignedTo: asset.assignedTo,
          status: asset.status
      }).onConflictDoNothing();
  }

  // 9. Seed Projects
  console.log(`... Seeding ${mockProjects.length} Projects`);
  for (const proj of mockProjects) {
      await db.insert(projects).values({
          name: proj.name,
          description: proj.description,
          managerId: proj.managerId,
          managerName: proj.managerName,
          status: proj.status,
          startDate: proj.startDate ? new Date(proj.startDate) : null,
          endDate: proj.endDate ? new Date(proj.endDate) : null,
          budget: proj.budget,
          spent: proj.spent,
          teamSize: proj.teamSize,
      }).onConflictDoNothing();
  }

  // 10. Seed TADA Claims
  console.log(`... Seeding ${mockTadaClaims.length} TADA Claims`);
  for (const claim of mockTadaClaims) {
      await db.insert(tadaClaims).values({
          employeeId: claim.employeeId,
          employeeName: claim.employeeName,
          date: new Date(claim.date),
          purpose: claim.purpose,
          amount: claim.amount,
          status: claim.status,
          approvedBy: claim.approvedBy,
          attachments: claim.attachments
      }).onConflictDoNothing();
  }

  // 11. Seed Production Stats
  console.log(`... Seeding Production Stats`);
  const productionData = generateProductionStats();
  for (const stat of productionData) {
      await db.insert(productionStats).values({
          month: stat.month,
          production: stat.production,
          cost: stat.cost
      }).onConflictDoNothing();
  }

  // 12. Seed Factory Units
  console.log(`... Seeding Factory Units`);
  const factoryData = generateHaMeemFactoryData();
  for (const unit of factoryData) {
      await db.insert(factoryUnits).values({
          name: unit.name,
          type: unit.type,
          manager: unit.manager,
          lines: unit.lines, // JSONB
          overallEfficiency: unit.overallEfficiency
      }).onConflictDoNothing();
  }

  // 13. Payslips (Generated via executePayroll logic in a real app, but stubbing here for dash)
  console.log(`... Seeding Payslips`);
  // Mock generated payslips logic
  const someEmployees = (mockDb as any).employees.slice(0, 50); // Seed for 50 employees
  for (const emp of someEmployees) {
      const salary = emp.salary;
      await db.insert(payslips).values({
          employeeId: emp.employeeId,
          employeeName: emp.name,
          month: "January 2026",
          year: 2026,
          earnings: [
             { name: 'Basic Salary', amount: salary.basic },
             { name: 'House Rent', amount: salary.houseRent }
          ],
          deductions: [
             { name: 'Tax', amount: Math.floor(salary.basic * 0.1) }
          ],
          netSalary: Math.floor(salary.totalGross * 0.9),
          status: 'Paid',
      }).onConflictDoNothing();
  }

  // 14. Seed Requisitions
  console.log(`... Seeding Requisitions`);
  const mockRequisitions = (mockDb as any).requisitions || [];
  for (const req of mockRequisitions) {
      // Requisition mock data structure might need mapping if it doesn't match schema perfectly
      await db.insert(requisitions).values({
          id: req.id,
          requesterId: req.requesterId,
          requesterName: req.requesterName,
          department: req.department,
          item: req.item,
          quantity: req.quantity,
          cost: req.cost,
          status: req.status,
          date: new Date(req.date),
          priority: req.priority
      }).onConflictDoNothing();
  }

  // 15. Seed Suppliers
  console.log(`... Seeding Suppliers`);
  const supplierData = generateSuppliers(20);
  for (const sup of supplierData) {
      await db.insert(suppliers).values({
          id: sup.id,
          name: sup.name,
          category: sup.category,
          status: sup.status,
          contactPerson: sup.contactPerson,
          email: sup.email,
          rating: sup.rating,
          speed: sup.speed,
          createdAt: new Date(),
      }).onConflictDoNothing();
  }

  // 16. Seed Recruitment (Jobs & Candidates)
  console.log(`... Seeding Recruitment`);
  const jobs = generateJobPostings(5);
  for (const job of jobs) {
      await db.insert(jobPostings).values({
          id: job.id,
          title: job.title,
          department: job.department,
          type: job.type,
          location: job.location,
          salaryRange: job.salaryRange,
          status: job.status,
          postedDate: new Date(job.postedDate),
          candidatesCount: job.candidatesCount,
          createdAt: new Date(),
      }).onConflictDoNothing();
  }

  const candidateData = generateCandidates(20);
  for (const cand of candidateData) {
      await db.insert(candidates).values({
          id: cand.id,
          jobId: cand.jobId,
          name: cand.name,
          email: cand.email,
          phone: cand.phone,
          stage: cand.stage,
          matchScore: cand.matchScore,
          appliedDate: new Date(cand.appliedDate),
          avatar: cand.avatar,
          experience: cand.experience,
          createdAt: new Date(),
      }).onConflictDoNothing();
  }

  // 17. Seed Disciplinary Cases
  console.log(`... Seeding Disciplinary Cases`);
  const cases = generateDisciplinaryCases(10, mockEmployees); // Pass employees
  for (const c of cases) {
      await db.insert(disciplinaryCases).values({
          id: c.id,
          employeeId: c.employeeId,
          employeeName: c.employeeName,
          type: c.type,
          date: new Date(c.incidentDate),
          severity: c.severity,
          description: c.description,
          status: c.status,
          actionTaken: c.actionsTaken?.[0] || 'Under review',
          createdAt: new Date(),
      }).onConflictDoNothing();
  }

  // 18. Seed Documents
  console.log(`... Seeding Documents`);
  const docs = generateDocuments(mockEmployees, 20); // Pass employees first, count second
  for (const d of docs) {
      await db.insert(documents).values({
          id: d.id,
          employeeId: d.employeeId,
          employeeName: d.employeeName,
          type: d.type,
          name: d.type + " - " + d.employeeName, // Add missing name field
          url: d.fileUrl, // Map fileUrl to url
          uploadDate: new Date(d.uploadDate),
          status: d.status,
          fileSize: d.fileSize,
          createdAt: new Date(),
      }).onConflictDoNothing();
  }

  console.log("✅ Database Seed Completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding Failed:", err);
  process.exit(1);
});
