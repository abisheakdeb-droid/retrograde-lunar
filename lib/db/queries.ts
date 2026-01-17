import { db } from "./index";
import { eq, desc, and, or, ilike, count, sql } from "drizzle-orm";
import { employees, users, tasks, notifications, auditLogs, attendance, leaveRequests, inventory, assets, projects, tadaClaims, productionStats, factoryUnits, payslips, requisitions, suppliers, jobPostings, candidates, disciplinaryCases, documents } from "./schema";
import { generateProductionStats, generateHaMeemFactoryData } from "@/lib/data/generators";

// ... existing code ...

export async function createTadaClaim(data: { purpose: string; amount: number; date: string; status: 'Pending' }) {
    await db.insert(tadaClaims).values({
        employeeId: 'EMP-CURRENT', // Hardcoded for now until Auth is fully migrated
        employeeName: 'Current User',
        date: new Date(data.date),
        purpose: data.purpose,
        amount: data.amount,
        status: data.status,
    });
}

export async function getProductionStats() {
    return await db.select().from(productionStats);
}

export async function createInventoryItem(data: any) {
    // Stub for future use
    console.log("createInventoryItem", data);
}

export async function createAsset(data: any) {
    // Stub for future use
    console.log("createAsset", data);
}

/**
 * Data Access Layer (DAL)
 * Replaces MockDatabase methods with real Drizzle/Postgres queries.
 */

// --- Employees ---
export async function getEmployees(page: number = 1, pageSize: number = 10, search: string = "") {
  const offset = (page - 1) * pageSize;

  // Conditions for search
  const searchCondition = search 
    ? or(
        ilike(employees.name, `%${search}%`),
        ilike(employees.department, `%${search}%`),
        ilike(employees.role, `%${search}%`),
        ilike(employees.employeeId, `%${search}%`)
      )
    : undefined;

  // Get Data
  const data = await db.select()
    .from(employees)
    .where(searchCondition)
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(employees.createdAt));

  // Get Total Count (Separate query for pagination metadata)
  const allMatching = await db.select({ id: employees.id }).from(employees).where(searchCondition);
  const total = allMatching.length;
  const totalPages = Math.ceil(total / pageSize);

  // Map database fields to UI expected format (e.g. performanceScore -> performance)
  const mappedData = data.map(emp => ({
    ...emp,
    performance: emp.performanceScore || 0, // Fallback to 0 if null
    // Add other mappings if needed, e.g. joinDate string/date mismatch?
    // DB returns Date object, UI might expect string or handle Date. 
    // page.tsx line 43 export uses: new Date(emp.joinDate).toLocaleDateString() which handles Date or string.
    // seed script used new Date(emp.joinDate).
  }));

  return {
    data: mappedData,
    total,
    page,
    pageSize,
    totalPages
  };
}

// --- Employee Detail (Composite Fetch) ---
export async function getEmployeeById(id: string) {
  // 1. Fetch Core Employee
  const result = await db.select().from(employees).where(
    or(eq(employees.id, id), eq(employees.employeeId, id))
  ).limit(1);
  const employee = result[0];
  if (!employee) return null;

  // 2. Fetch Attendance (for summary cards)
  const attendanceRecords = await db.select().from(attendance)
    .where(eq(attendance.employeeId, employee.id)) // Use UUID here if seeded correctly, or text ID
    .orderBy(desc(attendance.date))
    .limit(30);

  // 3. Construct Composite Object (matching Mock Interface)
  return {
    ...employee,
    salary: employee.salaryStructure as any, // Map JSONB to salary object
    performance: employee.performanceScore || 0,
    attendance: attendanceRecords,
    projects: [] as any[], 
    leaveBalances: [ 
        { type: 'Annual' as const, total: 15, used: 0, available: 15 },
        { type: 'Sick' as const, total: 10, used: 0, available: 10 },
        { type: 'Earned' as const, total: 10, used: 0, available: 10 }
    ]
  };
}

export async function getEmployeePerformance(id: string) {
    // Stub: Return empty array as KPIScorecards table doesn't exist
    return [] as any[]; // Cast to avoid never[] error
}

export async function getEmployeeByEmail(email: string) {
  const result = await db.select().from(employees).where(eq(employees.email, email)).limit(1);
  return result[0] || null;
}

// --- Tasks ---
export async function getTasks(status?: string, priority?: string) {
  let conditions = [];
  if (status) conditions.push(eq(tasks.status, status));
  if (priority) conditions.push(eq(tasks.priority, priority));

  return await db.select().from(tasks)
    .where(and(...conditions))
    .orderBy(desc(tasks.updatedAt))
    .then(res => res.map(t => ({
        ...t,
        status: t.status as 'PENDING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED',
        priority: (t.priority || 'NORMAL') as 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW',
        tags: t.tags || [],
        description: t.description || undefined,
        dueDate: t.dueDate || undefined,
        createdAt: t.createdAt || new Date(),
        updatedAt: t.updatedAt || new Date()
    })));
}

export async function getEmployeeTasks(employeeId: string) {
    // Requires joining or checking assigneeId
    // For now assuming assigneeId stores the exact employee ID or Name (as per schema migration strategy)
    // In real app, better to use ID.
    const employee = await getEmployeeById(employeeId);
    if (!employee) return [];

    return await db.select().from(tasks).where(
        or(eq(tasks.assigneeId, employee.id), eq(tasks.assigneeId, employee.name))
    ).orderBy(desc(tasks.dueDate)).then(res => res.map(t => ({
        ...t,
        description: t.description || undefined, // Fix null vs undefined mismatch
        dueDate: t.dueDate || undefined
    })));
}

export async function updateTaskStatus(taskId: string, status: string) {
    return await db.update(tasks).set({ status }).where(eq(tasks.id, taskId));
}

export async function createTask(data: typeof tasks.$inferInsert) {
    return await db.insert(tasks).values(data).returning();
}

// --- Notifications ---
export async function getNotifications(userId: string) {
  return await db.select().from(notifications)
    .where(or(eq(notifications.userId, userId), eq(notifications.userId, 'all')))
    .orderBy(desc(notifications.createdAt))
    .limit(50);
}

export async function markNotificationAsRead(id: string) {
    if (id === 'all') {
        // Warning: This marks ALL notifications as read for EVERYONE if not careful
        // In real app, we need to know WHICH user is marking all as read 
        // For now, let's just update all where isRead is false (Mock behavior)
        await db.update(notifications).set({ isRead: true });
    } else {
        await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
    }
}

export async function createNotification(data: typeof notifications.$inferInsert) {
  return await db.insert(notifications).values(data).returning();
}

// --- HRM ---
export async function getAttendanceHistory(employeeId: string) {
  return await db.select().from(attendance)
    .where(eq(attendance.employeeId, employeeId))
    .orderBy(desc(attendance.date));
}

export async function getLeaveRequests(page: number = 1, pageSize: number = 10, search: string = "") {
    const offset = (page - 1) * pageSize;
    // Join with employees to get name and avatar
    const data = await db.select({
        id: leaveRequests.id,
        employeeId: leaveRequests.employeeId,
        type: leaveRequests.type,
        startDate: leaveRequests.startDate,
        endDate: leaveRequests.endDate,
        reason: leaveRequests.reason,
        status: leaveRequests.status,
        createdAt: leaveRequests.createdAt,
        employeeName: employees.name,
        employeeAvatar: employees.avatar
    })
    .from(leaveRequests)
    .leftJoin(employees, sql`${leaveRequests.employeeId} = ${employees.id}::text`)
    .limit(pageSize)
    .offset(offset)
    .orderBy(desc(leaveRequests.createdAt));
    
    return { data, total: 100 }; // Stub total
}

// --- Audit Logs ---
export async function getAuditLogs(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;
    const data = await db.select().from(auditLogs).limit(pageSize).offset(offset).orderBy(desc(auditLogs.timestamp));
    return { data, total: 100 }; // Stub total
}

// --- Dashboard Stats (Hybrid/Stubbed) ---
export async function getStats() {
    // 1. Real DB Stats
    const empCountRes = await db.select({ count: count() }).from(employees);
    const totalEmployees = empCountRes[0]?.count || 0;

    const inventoryValueRes = await db.select({ value: sql`SUM(${inventory.value} * ${inventory.quantity})` }).from(inventory);
    const totalInventoryValue = Number(inventoryValueRes[0]?.value) || 0;

    const lowStockRes = await db.select({ count: count() }).from(inventory).where(
        or(eq(inventory.status, 'Low Stock'), eq(inventory.status, 'Out of Stock'))
    );
    const lowStockItems = lowStockRes[0]?.count || 0;

    // 2. Real Count for Requisitions
    const reqCountRes = await db.select({ count: count() }).from(requisitions).where(eq(requisitions.status, 'Pending'));
    const pendingRequisitions = reqCountRes[0]?.count || 0;

    return {
        totalEmployees,
        totalInventoryValue, 
        pendingRequisitions,
        lowStockItems
    };
}


// Moved to real DB implementation above

export async function getFactoryPerformance() {
     const data = await db.select().from(factoryUnits);
     return data.map(u => ({
         ...u,
         lines: (u.lines as any[]) || [] // Cast JSONB back to array, ensure not null
     }));
}

export async function getUpcomingReviews() {
    // Stub
    return [];
}

// --- Inventory & Assets ---
export async function getInventory(page: number = 1, pageSize: number = 15, search: string = "") {
    const offset = (page - 1) * pageSize;
    
    let whereClause = undefined;
    if (search) {
        whereClause = or(
            ilike(inventory.name, `%${search}%`),
            ilike(inventory.sku, `%${search}%`),
            ilike(inventory.category, `%${search}%`)
        );
    }

    const data = await db.select().from(inventory)
        .where(whereClause)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(inventory.lastUpdated));

    // Get total count for pagination
    const totalRes = await db.select({ count: count() }).from(inventory).where(whereClause);
    const total = totalRes[0]?.count || 0;
    
    return { 
        data: data.map(i => ({ 
            ...i, 
            quantity: i.quantity || 0,
            value: i.value || 0,
            unit: i.unit || 'pcs',
            status: (i.status || 'In Stock') as 'In Stock' | 'Low Stock' | 'Out of Stock',
            warehouse: i.warehouse || 'Main',
            lastUpdated: i.lastUpdated ? i.lastUpdated.toISOString() : '' 
        })), 
        total, 
        totalPages: Math.ceil(total / pageSize) 
    };
}

export async function getAssets(page: number = 1, pageSize: number = 100, search: string = "") {
    const offset = (page - 1) * pageSize;

    let whereClause = undefined;
    if (search) {
        whereClause = or(
            ilike(assets.name, `%${search}%`),
            ilike(assets.sku, `%${search}%`),
            ilike(assets.serialNumber, `%${search}%`)
        );
    }

    const data = await db.select().from(assets)
        .where(whereClause)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(assets.createdAt));

    const totalRes = await db.select({ count: count() }).from(assets).where(whereClause);
    const total = totalRes[0]?.count || 0;

    return { 
        data: data.map(a => ({
            ...a,
            purchaseDate: a.purchaseDate ? a.purchaseDate.toISOString().split('T')[0] : '', // Format for UI
            lastMaintenance: a.lastMaintenance ? a.lastMaintenance.toISOString().split('T')[0] : null,
            purchaseValue: a.purchaseValue || 0,
            status: (a.status || 'In Use') as any, // Cast to match UI expected union type
            condition: (a.condition || 'Good') as any
        })), 
        total 
    };
}

// --- Projects & TADA ---
export async function getProjects(page: number = 1, pageSize: number = 20, search: string = "") {
    const offset = (page - 1) * pageSize;
    
    let whereClause = undefined;
    if (search) {
        whereClause = or(
            ilike(projects.name, `%${search}%`),
            ilike(projects.managerName, `%${search}%`),
            ilike(projects.status, `%${search}%`)
        );
    }

    const data = await db.select().from(projects)
        .where(whereClause)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(projects.createdAt));

    const totalRes = await db.select({ count: count() }).from(projects).where(whereClause);
    const total = totalRes[0]?.count || 0;

    return { 
        data: data.map(p => ({
             ...p,
             // Ensure non-null for UI
             status: (p.status || 'Active') as 'Active' | 'On Hold' | 'Completed' | 'Planning',
             budget: p.budget || 0,
             spent: p.spent || 0
        })), 
        total 
    };
}

export async function getTadaClaims(page: number = 1, pageSize: number = 20, search: string = "") {
    const offset = (page - 1) * pageSize;

    let whereClause = undefined;
    if (search) {
        whereClause = or(
            ilike(tadaClaims.employeeName, `%${search}%`),
            ilike(tadaClaims.purpose, `%${search}%`),
            ilike(tadaClaims.status, `%${search}%`)
        );
    }

    const data = await db.select().from(tadaClaims)
        .where(whereClause)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(tadaClaims.createdAt));
        
    const totalRes = await db.select({ count: count() }).from(tadaClaims).where(whereClause);
    const total = totalRes[0]?.count || 0;

    return {
        data: data.map(c => ({
            ...c,
            date: c.date.toLocaleDateString(), // Format Date for UI
            amount: c.amount || 0,
            status: (c.status || 'Pending') as 'Draft' | 'Pending' | 'Approved' | 'Disbursed' | 'Rejected',
            approvedBy: c.approvedBy || undefined,
            employeeName: c.employeeName || 'Unknown',
            purpose: c.purpose || '',
            attachments: c.attachments || [] 
        })),
        total
    };
}

// --- Payroll ---
export async function getPayslips(page: number = 1, pageSize: number = 100) {
    const offset = (page - 1) * pageSize;
    const data = await db.select().from(payslips)
        .limit(pageSize)
        .offset(offset)
        .orderBy(desc(payslips.createdAt));
        
    const totalRes = await db.select({ count: count() }).from(payslips);
    const total = totalRes[0]?.count || 0;

    return {
        data: data.map(p => ({
            ...p,
            earnings: p.earnings as { name: string; amount: number }[],
            deductions: p.deductions as { name: string; amount: number }[],
            status: (p.status || 'Processing') as 'Paid' | 'Processing' | 'Hold',
            paymentDate: p.paymentDate ? p.paymentDate.toISOString() : undefined
        })),
        total
    };
}

export async function executePayroll(month: string) {
    // 1. Get all employees
    const allEmployees = await db.select().from(employees).where(eq(employees.status, 'Active'));
    
    // 2. Generate Payslips for them (Mock Logic for now, using Salary Structure)
    const newPayslips = allEmployees.map(emp => {
        const salary = emp.salaryStructure as any || { basic: 20000, houseRent: 10000, medical: 2000, conveyance: 2000, totalGross: 34000 };
        return {
            employeeId: emp.employeeId,
            employeeName: emp.name,
            month: month,
            year: new Date().getFullYear(),
            earnings: [
                { name: 'Basic Salary', amount: salary.basic },
                { name: 'House Rent', amount: salary.houseRent },
                { name: 'Medical Allowance', amount: salary.medical },
                { name: 'Conveyance', amount: salary.conveyance }
            ],
            deductions: [
                { name: 'Tax', amount: Math.floor(salary.basic * 0.1) },
                { name: 'Provident Fund', amount: Math.floor(salary.basic * 0.05) }
            ],
            netSalary: Math.floor(salary.totalGross * 0.85), // Rough calc
            status: 'Processing' as const
        };
    });

    // 3. Insert into DB
    for (const p of newPayslips) {
        await db.insert(payslips).values(p);
    }

    return { success: true, count: newPayslips.length };
}

// --- Requisitions ---
export async function getRequisitions(limit: number = 50) {
    const data = await db.select().from(requisitions).limit(limit).orderBy(desc(requisitions.createdAt));
    return data.map(r => ({
        ...r,
        quantity: r.quantity || 1, // Defaulting if null, though schema says not null default 1
    }));
}

export async function createRequisition(data: any) {
    // Basic validation or transformation could go here
    const [newItem] = await db.insert(requisitions).values({
        id: `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`, // Simple ID gen
        requesterId: data.requesterId,
        requesterName: data.requesterName,
        department: data.department,
        item: data.item,
        quantity: data.quantity,
        cost: data.cost,
        status: data.status,
        date: new Date(),
        priority: data.priority,
    }).returning();
    return newItem;
}

// --- Suppliers ---
export async function getSuppliers(limit: number = 50) {
    const data = await db.select().from(suppliers).limit(limit).orderBy(desc(suppliers.createdAt));
    return data;
}

export async function createSupplier(data: any) {
    return await db.insert(suppliers).values({
        id: `SPL-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.name,
        category: data.category,
        status: 'Active',
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        rating: 0,
        speed: 0,
        createdAt: new Date(),
    }).returning();
}

// --- Recruitment ---
export async function getJobPostings(limit: number = 50) {
    return await db.select().from(jobPostings).limit(limit).orderBy(desc(jobPostings.postedDate));
}

export async function createJobPosting(data: any) {
    return await db.insert(jobPostings).values({
        id: `JOB-${Math.floor(202500 + Math.random() * 900)}`,
        title: data.title,
        department: data.department,
        type: data.type,
        location: data.location,
        salaryRange: data.salaryRange,
        status: 'Open',
        postedDate: new Date(),
        candidatesCount: 0,
        createdAt: new Date(),
    }).returning();
}

export async function getCandidates(limit: number = 50) {
    return await db.select().from(candidates).limit(limit).orderBy(desc(candidates.appliedDate));
}

export async function createCandidate(data: any) {
    return await db.insert(candidates).values({
        id: `CND-${Math.floor(5000 + Math.random() * 5000)}`,
        jobId: data.jobId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        stage: 'Applied',
        matchScore: 0,
        appliedDate: new Date(),
        experience: data.experience,
        createdAt: new Date(),
    }).returning();
}

// --- Disciplinary ---
export async function getDisciplinaryCases(limit: number = 50) {
    return await db.select().from(disciplinaryCases).limit(limit).orderBy(desc(disciplinaryCases.date));
}

export async function createDisciplinaryCase(data: any) {
    return await db.insert(disciplinaryCases).values({
        id: `CASE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        type: data.type,
        severity: data.severity,
        description: data.description,
        status: 'Open',
        date: new Date(data.date),
        createdAt: new Date(),
    }).returning();
}

// --- Documents ---
export async function getDocuments(limit: number = 50) {
    return await db.select().from(documents).limit(limit).orderBy(desc(documents.uploadDate));
}

export async function createDocument(data: any) {
    return await db.insert(documents).values({
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        type: data.type,
        name: data.name,
        url: data.url || '#',
        status: 'Pending',
        uploadDate: new Date(),
        fileSize: data.fileSize || '0 MB',
        createdAt: new Date(),
    }).returning();
}
