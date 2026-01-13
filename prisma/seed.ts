
import { PrismaClient } from '@prisma/client';
import { 
  generateEmployees, 
  generateInventory, 
  generateRequisitions, 
  generateAssets, 
  generateProjects, 
  generateSuppliers, 
  generatePayslips,
  generateLeaveRequests,
  generateTadaClaims,
  generateDocuments
} from '../lib/data/generators';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // 1. Clear existing data (in order of dependency)
  await prisma.candidate.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.requisition.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.disciplinaryCase.deleteMany();
  await prisma.tadaClaim.deleteMany();
  await prisma.employeeDocument.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.project.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.payslip.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Users
  console.log('Creating users...');
  await prisma.user.createMany({
    data: [
        { email: "admin@hameem.com", password: "admin123", role: "Admin", name: "Admin User", id: "1" },
        { email: "manager@hameem.com", password: "manager123", role: "Manager", name: "Manager User", id: "2" },
        { email: "staff@hameem.com", password: "staff123", role: "Staff", name: "Staff User", id: "3" },
    ]
  });

  // 3. Seed Employees (and related HR data)
  console.log('Generating employees and related records...');
  const employeesMock = generateEmployees(500);
  
  const employeeData = employeesMock.map(e => ({
     id: e.id,
     employeeId: e.employeeId,
     name: e.name,
     role: e.role,
     department: e.department,
     status: e.status,
     email: e.email,
     phone: e.phone,
     address: e.address,
     joinDate: e.joinDate,
     avatar: e.avatar,
     performance: e.performance,
     attendance: JSON.stringify(e.attendance),
     projects: JSON.stringify(e.projects),
     leaveBalances: JSON.stringify(e.leaveBalances),
     salary: JSON.stringify(e.salary),
  }));

  for (let i = 0; i < employeeData.length; i += 50) {
      await prisma.employee.createMany({ data: employeeData.slice(i, i + 50) });
  }
  
  // Seed Attendance Records
  console.log('Generating relational attendance records...');
  const relationalAttendance = employeesMock.flatMap(emp => 
      emp.attendance.map(att => ({
          employeeId: emp.id,
          date: att.date,
          clockIn: att.clockIn,
          clockOut: att.clockOut,
          status: att.status,
          isOvertime: att.isOvertime,
          isHolidayWork: att.isHolidayWork,
          totalHours: att.totalHours
      }))
  );

   for (let i = 0; i < relationalAttendance.length; i += 500) {
      await prisma.attendanceRecord.createMany({ data: relationalAttendance.slice(i, i + 500) });
  }

  // 4. Seed Inventory
  console.log('Generating inventory...');
  const inventoryMock = generateInventory(2500); 
  const inventoryData = inventoryMock.map(i => ({
      id: i.id,
      name: i.name,
      sku: i.sku,
      category: i.category,
      quantity: i.quantity,
      unit: i.unit,
      warehouse: i.warehouse,
      status: i.status,
      value: i.value,
      lastUpdated: i.lastUpdated
  }));

   for (let i = 0; i < inventoryData.length; i += 50) {
      await prisma.inventoryItem.createMany({ data: inventoryData.slice(i, i + 50) });
  }

  // 5. Seed Assets
  console.log('Generating assets...');
  const assetsMock = generateAssets(500, employeesMock);
  const assetData = assetsMock.map(a => ({
      id: a.id,
      name: a.name,
      category: a.category,
      sku: a.sku,
      serialNumber: a.serialNumber,
      location: a.location,
      purchaseDate: a.purchaseDate,
      purchaseValue: a.purchaseValue,
      condition: a.condition,
      lastMaintenance: a.lastMaintenance,
      assignedTo: a.assignedTo,
      assignedToName: a.assignedToName,
      status: a.status
  }));
  await prisma.asset.createMany({ data: assetData });

  // 6. Seed Projects
  console.log('Generating projects...');
  const projectsMock = generateProjects(50, employeesMock);
  const projectData = projectsMock.map(p => ({
      id: p.id,
      name: p.name,
      managerId: p.managerId,
      managerName: p.managerName,
      budget: p.budget,
      spent: p.spent,
      status: p.status,
      startDate: p.startDate,
      endDate: p.endDate,
      teamSize: p.teamSize,
      description: p.description
  }));
   await prisma.project.createMany({ data: projectData });

  // 7. Seed Suppliers
  console.log('Generating suppliers...');
  const suppliersMock = generateSuppliers(100);
  const supplierData = suppliersMock.map(s => ({
      id: s.id,
      name: s.name,
      category: s.category,
      contactPerson: s.contactPerson || faker.person.fullName(),
      email: s.email || faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      status: s.status,
      rating: s.rating,
      lastOrder: new Date().toISOString(),
      totalSpent: faker.number.int({ min: 1000, max: 50000 }),
      location: s.location || faker.location.country(),
      speed: s.speed || faker.number.int({ min: 50, max: 100 })
  }));
  await prisma.supplier.createMany({ data: supplierData });

  // 8. Seed Payslips
  console.log('Generating payslips...');
  const payslipsMock = generatePayslips(employeesMock);
  const payslipData = payslipsMock.map(p => ({
      id: p.id,
      employeeId: p.employeeId,
      employeeName: p.employeeName,
      month: p.month,
      year: p.year,
      earnings: JSON.stringify(p.earnings),
      deductions: JSON.stringify(p.deductions),
      netSalary: p.netSalary,
      status: p.status,
      paymentDate: p.paymentDate
  }));
   for (let i = 0; i < payslipData.length; i += 100) {
      await prisma.payslip.createMany({ data: payslipData.slice(i, i + 100) });
  }

  // 9. Seed Leave Requests
  console.log('Generating leave requests...');
  const leaveRequestsMock = generateLeaveRequests(200, employeesMock);
  const leaveData = leaveRequestsMock.map(r => ({
      id: r.id,
      employeeId: r.employeeId,
      employeeName: r.employeeName,
      employeeAvatar: r.employeeAvatar || "",
      type: r.type,
      startDate: r.startDate,
      endDate: r.endDate,
      days: r.days,
      reason: r.reason,
      status: r.status,
      appliedDate: r.appliedDate,
      approvedBy: r.approvedBy,
      approvedDate: r.approvedDate,
  }));
  await prisma.leaveRequest.createMany({ data: leaveData });

  // 10. Seed TADA Claims
  console.log('Generating TADA claims...');
  const tadaClaimsMock = generateTadaClaims(100, employeesMock);
  const tadaData = tadaClaimsMock.map(c => ({
      id: c.id,
      employeeId: c.employeeId,
      employeeName: c.employeeName,
      date: c.date,
      purpose: c.purpose,
      amount: c.amount,
      status: c.status,
      approvedBy: c.approvedBy,
      attachments: JSON.stringify(c.attachments),
  }));
  await prisma.tadaClaim.createMany({ data: tadaData });

  // 11. Seed Documents
  console.log('Generating documents...');
  const documentsMock = generateDocuments(employeesMock, 300);
  const docData = documentsMock.map(d => ({
      id: d.id,
      employeeId: d.employeeId,
      employeeName: d.employeeName,
      type: d.type,
      status: d.status,
      uploadDate: d.uploadDate,
      expiryDate: d.expiryDate,
      fileUrl: d.fileUrl,
      fileSize: d.fileSize,
  }));
  await prisma.employeeDocument.createMany({ data: docData });

  // 12. Seed Disciplinary Cases (Inline Generation as generator missing)
  console.log('Generating disciplinary cases...');
  const dcTypes = ['Behavioral', 'Safety', 'Attendance', 'Performance'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];
  const dcStatuses = ['Open', 'Under Investigation', 'Show-Cause', 'Resolved', 'Terminated'];
  
  const disciplinaryData = Array.from({ length: 50 }).map((_, i) => {
      const emp = faker.helpers.arrayElement(employeesMock);
      return {
          id: `DC-${2025}-${100 + i}`,
          employeeId: emp.id,
          employeeName: emp.name,
          employeeAvatar: emp.avatar,
          type: faker.helpers.arrayElement(dcTypes),
          severity: faker.helpers.arrayElement(severities),
          status: faker.helpers.arrayElement(dcStatuses),
          incidentDate: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
          description: faker.lorem.paragraph(),
          reportedBy: faker.person.fullName(),
          actionsTaken: JSON.stringify([]), // Empty for now
      };
  });
  await prisma.disciplinaryCase.createMany({ data: disciplinaryData });

  // 13. Seed Job Postings & Candidates
  console.log('Generating recruitment data...');
  const jobPostings = [
      {
          id: 'JOB-101',
          title: 'Senior Merchandiser',
          department: 'Merchandising',
          type: 'Full-time',
          location: 'Dhaka HQ',
          salaryRange: '80k - 120k BDT',
          status: 'Open',
          postedDate: '2025-01-10',
          candidatesCount: 0 // Will update later if needed, but simple seed is fine
      },
      {
          id: 'JOB-102',
          title: 'Quality Control Inspector',
          department: 'Quality Control',
          type: 'Contract',
          location: 'Gazipur Factory',
          salaryRange: '25k - 35k BDT',
          status: 'Open',
          postedDate: '2025-01-12',
          candidatesCount: 0
      },
      {
          id: 'JOB-103',
          title: 'Industrial Engineer',
          department: 'Production',
          type: 'Full-time',
          location: 'Gazipur Factory',
          salaryRange: '45k - 60k BDT',
          status: 'Draft',
          postedDate: '2025-01-13',
          candidatesCount: 0
      }
  ];
  await prisma.jobPosting.createMany({ data: jobPostings });

  const candidatesData = Array.from({ length: 20 }).map((_, i) => ({
      id: `CAND-${200 + i}`,
      jobId: i % 2 === 0 ? 'JOB-101' : 'JOB-102',
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      stage: faker.helpers.arrayElement(['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected']),
      matchScore: faker.number.int({ min: 60, max: 98 }),
      appliedDate: faker.date.recent({ days: 10 }).toISOString().split('T')[0],
      avatar: `https://i.pravatar.cc/150?u=${200 + i}`,
      experience: `${faker.number.int({ min: 2, max: 10 })} years`
  }));
  await prisma.candidate.createMany({ data: candidatesData });


  // 14. Seed Requisitions (Last due to dependencies and custom user logic)
  console.log('Generating requisitions...');
  
  // Create Staff User for special Requisitions
  await prisma.employee.upsert({
      where: { id: "3" },
      update: {},
      create: {
         id: "3",
         employeeId: "HMG-STAFF",
         name: "Staff User",
         role: "Staff",
         department: "Production",
         status: "Active",
         email: "staff@hameem.com",
         phone: "123456789",
         address: "Dhaka",
         joinDate: "2020-01-01",
         avatar: "/avatars/03.png",
         performance: 90,
         attendance: "[]",
         projects: "[]",
         leaveBalances: "[]",
         salary: "{}"
      }
  });

  const requisitionsMock = generateRequisitions(300, employeesMock); 
  const reqData = requisitionsMock.map(r => ({
      id: r.id,
      requesterId: r.requesterId,
      requesterName: r.requesterName,
      department: r.department,
      item: r.item,
      quantity: r.quantity,
      cost: r.cost,
      status: r.status,
      date: r.date,
      priority: r.priority,
  }));

    for (let i = 0; i < reqData.length; i += 50) {
      await prisma.requisition.createMany({ data: reqData.slice(i, i + 50) });
  }

  // Add the 3 specific verification items for Staff User (ID 3)
  await prisma.requisition.createMany({
      data: [
          {
                id: 'REQ-2026-9001',
                requesterId: '3',
                requesterName: 'Staff User',
                department: 'Production',
                item: 'Industrial Sewing Machine',
                quantity: 1,
                cost: 2500,
                status: 'Approved',
                date: '2026-01-13',
                priority: 'High'
          },
          {
                id: 'REQ-2026-9002',
                requesterId: '3',
                requesterName: 'Staff User',
                department: 'Production',
                item: 'Fabric Cutter Blades',
                quantity: 15,
                cost: 2500, // Fixed cost logic from prev edit
                status: 'Pending',
                date: '2026-01-11',
                priority: 'Medium'
          },
          {
                id: 'REQ-2026-9003',
                requesterId: '3',
                requesterName: 'Staff User',
                department: 'Production',
                item: 'Safety Gloves',
                quantity: 50,
                cost: 150,
                status: 'Rejected',
                date: '2026-01-08',
                priority: 'Low'
          }
      ]
  });


  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
