import { faker } from '@faker-js/faker';
import { Employee, InventoryItem, Requisition, FactoryUnit, Asset, LeaveRequest, Holiday, LeaveStatus, LeaveType, Payslip, EmployeeDocument, Project, ProjectStatus, TadaClaim, TadaStatus, PerformanceCategory, KpiScorecard, Supplier, generateEmployees, generateInventory, generateRequisitions, generateMonthlyAttendance, generateProductionStats, generateHaMeemFactoryData, generateAssets, generateLeaveRequests, generateHolidays, generatePayslips, generateDocuments, generateProjects, generateTadaClaims, generateKpiScorecards, generateSuppliers, generateTasks } from './generators';
import { generateAnalyticsKPIs, generateActivityFeed, AnalyticsKPI, ActivityItem } from '@/components/mock-data/generate-analytics';
import { Task, TaskStatus } from '@/types/task-types';
import { generateERPInventory } from '@/components/mock-data/generate-erp';


export interface JobPosting {
    id: string;
    title: string;
    department: string;
    type: 'Full-time' | 'Contract' | 'Internship';
    location: string;
    salaryRange: string;
    status: 'Open' | 'Closed' | 'Draft';
    postedDate: string;
    candidatesCount: number;
}

export interface Candidate {
    id: string;
    jobId: string;
    name: string;
    email: string;
    phone: string;
    stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
    matchScore: number; // 0-100
    appliedDate: string;
    avatar: string;
    experience: string;
}

export interface OrgNode {
    id: string;
    name: string;
    role: string;
    avatar: string;
    department?: string;
    children?: OrgNode[];
    directReportsCount?: number;
    status: 'Online' | 'Offline' | 'In Meeting';
    email?: string;
    phone?: string;
    location?: string;
}

export interface ShiftAssignment {
    id: string;
    date: string;
    lineId: string;
    lineName: string;
    shiftType: 'A' | 'B' | 'C'; // A=Morning, B=Evening, C=Night
    supervisorId: string;
    supervisorName: string;
    operatorCount: number;
    status: 'Scheduled' | 'Completed' | 'Shortage';
}

export interface DisciplinaryCase {
    id: string;
    employeeId: string;
    employeeName: string;
    employeeAvatar: string;
    type: 'Behavioral' | 'Safety' | 'Attendance' | 'Performance';
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'Under Investigation' | 'Show-Cause' | 'Resolved' | 'Terminated';
    incidentDate: string;
    description: string;
    reportedBy: string;
    actionsTaken: string[];
}

export interface Review {
    id: string;
    name: string;
    role: string;
    avatar: string;
    kpiTrend: 'up' | 'down';
}

export interface AuditLog {
    id: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'APPROVE' | 'REJECT';
    entity: 'Employee' | 'Requisition' | 'Inventory' | 'System' | 'Supplier' | 'Project' | 'Task';
    entityId: string;
    actorId: string;
    actorName: string;
    details: string;
    timestamp: string;
    metadata?: Record<string, any>;
}

export interface Notification {
    id: string;
    userId: string; // 'all' or specific user ID
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    link?: string;
    isRead: boolean;
    createdAt: string;
}

export class MockDatabase {
    private static instance: MockDatabase;

    public employees: Employee[] = [];
    public inventory: InventoryItem[] = [];
    public requisitions: Requisition[] = [];
    public assets: Asset[] = [];
    public leaveRequests: LeaveRequest[] = [];
    public holidays: Holiday[] = [];
    public payslips: Payslip[] = [];
    public documents: EmployeeDocument[] = [];
    public projects: Project[] = [];
    public tadaClaims: TadaClaim[] = [];
    public tasks: Task[] = [];
    public suppliers: Supplier[] = [];

    public kpiScorecards: KpiScorecard[] = [];
    public analyticsKPIs: AnalyticsKPI[] = [];

    public activityFeed: ActivityItem[] = [];
    public auditLogs: AuditLog[] = [];
    public notifications: Notification[] = [];

    private constructor() {
        this.initialize();
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async updateRequisitionStatus(id: string, status: 'Approved' | 'Rejected') {
        await this.delay(200);
        const req = this.requisitions.find(r => r.id === id);
        if (req) {
            req.status = status;
        }
    }

    async executePayroll(month: string) {
        await this.delay(1000); // Simulate processing time
        const targetSlips = this.payslips.filter(p => p.month === month && p.status === 'Processing');
        let processedCount = 0;
        let totalAmount = 0;

        targetSlips.forEach(slip => {
            slip.status = 'Paid';
            processedCount++;
            totalAmount += slip.netSalary;
        });

        return {
            success: true,
            processedCount,
            totalAmount,
            message: `Successfully processed ${processedCount} payslips for ${month}`
        };
    }

    public static getInstance(): MockDatabase {
        const globalForDb = globalThis as unknown as { mockDb_v16: MockDatabase | undefined };
        if (!globalForDb.mockDb_v16) {
            globalForDb.mockDb_v16 = new MockDatabase();
        }
        return globalForDb.mockDb_v16;
    }

    private initialize() {
        // "Huge" dataset generation
        console.log('Initializing Mock Database...');
        this.employees = generateEmployees(500); // 500 Employees
        this.inventory = generateInventory(2000); // 2000 Inventory Items
        this.requisitions = generateRequisitions(300, this.employees); // 300 Requisitions
        
        // Add specific requisitions for the logged-in user (Staff User - ID: 3)
        this.requisitions.push(
            {
                id: 'REQ-2026-9001',
                requesterId: '3',
                requesterName: 'Staff User',
                department: 'Production',
                item: 'Industrial Sewing Machine',
                quantity: 2,
                cost: 2500,
                status: 'Approved',
                date: new Date().toISOString(),
                priority: 'High'
            },
            {
                id: 'REQ-2026-9002',
                requesterId: '3',
                requesterName: 'Staff User',
                department: 'Production',
                item: 'Fabric Cutter Blades',
                quantity: 50,
                cost: 500,
                status: 'Pending',
                date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
                priority: 'Medium'
            },
            {
                id: 'REQ-2026-9003',
                requesterId: '3',
                requesterName: 'Staff User',
                department: 'Production',
                item: 'Safety Gloves',
                quantity: 100,
                cost: 200,
                status: 'Rejected',
                date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
                priority: 'Low'
            }
        );
        this.assets = generateAssets(150, this.employees); // 150 Assets
        this.leaveRequests = generateLeaveRequests(100, this.employees); // 100 Leave Requests
        this.holidays = generateHolidays(); // Common Holidays
        this.payslips = generatePayslips(this.employees); // Generate Payslips
        this.documents = generateDocuments(this.employees); // Generate Documents
        this.projects = generateProjects(15, this.employees); // Generate Projects
        this.tadaClaims = generateTadaClaims(80, this.employees); // Generate TADA Claims
        this.tasks = generateTasks(50, this.employees); // Generate Tasks
        this.kpiScorecards = generateKpiScorecards(this.employees); // Generate KPI Scorecards
        this.analyticsKPIs = generateAnalyticsKPIs();
        this.activityFeed = generateActivityFeed(20);
        
        // Initial Suppliers (Predefined from Page + Generated)
        const predefinedSuppliers: Supplier[] = [
            { id: "SPL-001", name: "Global Fabrics Ltd.", category: "Textiles", status: "Vetted", location: "China", rating: 98, speed: 95 },
            { id: "SPL-002", name: "Dhaka Dyeing Co.", category: "Chemicals", status: "Active", location: "Bangladesh", rating: 85, speed: 90 },
            { id: "SPL-003", name: "YKK Zippers", category: "Trims", status: "Vetted", location: "Japan", rating: 99, speed: 92 },
            { id: "SPL-004", name: "TexTech Solutions", category: "Machinery", status: "Risk", location: "Germany", rating: 65, speed: 70 },
            { id: "SPL-005", name: "Cotton Connect", category: "Raw Materials", status: "Active", location: "India", rating: 88, speed: 85 },
            { id: "SPL-006", name: "Button World", category: "Trims", status: "Active", location: "Bangladesh", rating: 82, speed: 88 },
            { id: "SPL-007", name: "EcoPack Systems", category: "Packaging", status: "Vetted", location: "Vietnam", rating: 94, speed: 91 },
        ];
        this.suppliers = [...predefinedSuppliers, ...generateSuppliers(20)];

        // Merge standard inventory with new ERP inventory slightly
        const erpItems = generateERPInventory(500);
        // Cast to any to bypass minor type mismatch if any, though we aligned them
        this.inventory = [...this.inventory, ...(erpItems as unknown as InventoryItem[])];
        
        // Initial Audit Logs
        this.auditLogs = [
            {
                id: 'LOG-001',
                action: 'LOGIN',
                entity: 'System',
                entityId: 'SYS',
                actorId: '3',
                actorName: 'Staff User',
                details: 'User logged into the system',
                timestamp: new Date().toISOString()
            }
        ];

        // Initial Notifications
        this.notifications = [
            {
                id: 'NOTIF-001',
                userId: 'all',
                title: 'System Maintenance',
                message: 'Scheduled maintenance tonight at 02:00 AM.',
                type: 'info',
                isRead: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 'NOTIF-002',
                userId: 'user-123',
                title: 'Payroll Processed',
                message: 'January payroll has been successfully processed.',
                type: 'success',
                link: '/dashboard/payroll',
                isRead: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
            },
            {
                id: 'NOTIF-003',
                userId: 'user-123',
                title: 'Requisition Pending',
                message: 'Hardware requisition REQ-2024-89 requires approval.',
                type: 'warning',
                link: '/dashboard/requisition',
                isRead: true,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
            }
        ];

        console.log(`Generated: ${this.employees.length} employees, ${this.inventory.length} items, ${this.requisitions.length} requests.`);
    }

    // --- Service Methods (simulate async DB calls) ---

    async getEmployees(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(300); // Simulate network latency
        let data = this.employees;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(e =>
                e.name.toLowerCase().includes(lowerSearch) ||
                e.department.toLowerCase().includes(lowerSearch) ||
                e.role.toLowerCase().includes(lowerSearch) ||
                (e.employeeId || '').toLowerCase().includes(lowerSearch) ||
                (e.id || '').toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        return {
            data: data.slice(start, end),
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getEmployeeById(id: string) {
        await this.delay(200);
        return this.employees.find(e => e.id === id) || null;
    }

    async getAttendanceHistory(employeeId: string) {
        await this.delay(300);
        const employee = this.employees.find(e => e.id === employeeId);
        return employee?.attendance || generateMonthlyAttendance();
    }

    async getAllAttendanceRecords() {
        await this.delay(500);
        return this.employees.map(e => ({
            employeeId: e.id,
            employeeName: e.name,
            department: e.department,
            attendance: e.attendance
        }));
    }

    async getInventory(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.inventory;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(i =>
                i.name.toLowerCase().includes(lowerSearch) ||
                i.sku.toLowerCase().includes(lowerSearch) ||
                (i.id || '').toLowerCase().includes(lowerSearch) ||
                i.quantity.toString().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getRequisitions(limit: number = 50, search?: string, requesterId?: string, status?: string, priority?: string) {
        await this.delay(200);
        let data = this.requisitions;

        console.log('[MOCK_DB] getRequisitions CALLED with:', { limit, search, requesterId, status, priority });
        
        if (requesterId) {
            console.log(`[MOCK_DB] Filtering by RequesterID: ${requesterId}. Total before: ${data.length}`);
            data = data.filter(r => r.requesterId === requesterId);
            console.log(`[MOCK_DB] Total after: ${data.length}`);
        } else {
            console.log('[MOCK_DB] No RequesterID provided. Skipping filter.');
        }

        if (status && status !== 'All') {
            data = data.filter(r => r.status === status);
        }

        if (priority && priority !== 'All') {
            data = data.filter(r => r.priority === priority);
        }

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(r =>
                r.item.toLowerCase().includes(lowerSearch) ||
                r.requesterName.toLowerCase().includes(lowerSearch) ||
                r.id.toLowerCase().includes(lowerSearch) ||
                r.requesterId.toLowerCase().includes(lowerSearch)
            );
        }

        return data.slice(0, limit);
    }

    async getAssets(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.assets;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(a =>
                a.name.toLowerCase().includes(lowerSearch) ||
                a.category.toLowerCase().includes(lowerSearch) ||
                a.id.toLowerCase().includes(lowerSearch) ||
                a.location.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getAssetById(id: string) {
        await this.delay(200);
        return this.assets.find(a => a.id === id) || null;
    }

    async getLeaveRequests(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.leaveRequests;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(r =>
                r.employeeName.toLowerCase().includes(lowerSearch) ||
                r.type.toLowerCase().includes(lowerSearch) ||
                r.status.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getHolidays() {
        await this.delay(200);
        return this.holidays;
    }

    async updateLeaveStatus(id: string, status: LeaveStatus) {
        await this.delay(300);
        const req = this.leaveRequests.find(r => r.id === id);
        if (req) {
            req.status = status;
            req.approvedDate = new Date().toISOString().split('T')[0];
            return req;
        }
        return null;
    }

    async getPayslips(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.payslips;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(p =>
                p.employeeName.toLowerCase().includes(lowerSearch) ||
                p.id.toLowerCase().includes(lowerSearch) ||
                p.month.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getPayslipById(id: string) {
        await this.delay(200);
        return this.payslips.find(p => p.id === id) || null;
    }

    async getDocuments(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.documents;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(d =>
                d.employeeName.toLowerCase().includes(lowerSearch) ||
                d.id.toLowerCase().includes(lowerSearch) ||
                d.type.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getProjects(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.projects;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(p =>
                p.name.toLowerCase().includes(lowerSearch) ||
                p.id.toLowerCase().includes(lowerSearch) ||
                p.managerName.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getTadaClaims(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.tadaClaims;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(c =>
                c.employeeName.toLowerCase().includes(lowerSearch) ||
                c.id.toLowerCase().includes(lowerSearch) ||
                c.purpose.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async getSuppliers(page: number = 1, pageSize: number = 20, search?: string) {
        await this.delay(200);
        let data = this.suppliers;

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(s =>
                s.name.toLowerCase().includes(lowerSearch) ||
                s.id.toLowerCase().includes(lowerSearch) ||
                s.category.toLowerCase().includes(lowerSearch) ||
                s.location.toLowerCase().includes(lowerSearch)
            );
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    async addSupplier(data: Partial<Supplier>) {
        await this.delay(500);
        const nextIdNum = 1000 + this.suppliers.length + 1;
        const newSupplier: Supplier = {
            id: `SPL-${nextIdNum}`,
            name: data.name || 'Unknown Supplier',
            category: data.category || 'General',
            status: 'Active', // Default
            location: data.location || 'Unknown',
            rating: 50, // Initial rating
            speed: 50, // Initial speed
            contactPerson: data.contactPerson,
            email: data.email
        };
        this.suppliers.unshift(newSupplier);
        return newSupplier;
    }

    async getStats() {
        await this.delay(100);
        return {
            totalEmployees: this.employees.length,
            totalInventoryValue: this.inventory.reduce((acc, item) => acc + (item.value * item.quantity), 0),
            pendingRequisitions: this.requisitions.filter(r => r.status === 'Pending').length,
            lowStockItems: this.inventory.filter(i => i.status === 'Low Stock').length
        };
    }

    async getProductionStats() {
        await this.delay(500);
        return generateProductionStats();
    }

    async getFactoryPerformance() {
        await this.delay(400); // Simulate slightly heavier query
        return generateHaMeemFactoryData();
    }

    async addAuditLog(log: Partial<AuditLog>) {
        await this.delay(100);
        const newLog: AuditLog = {
            id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            action: log.action || 'UPDATE',
            entity: log.entity || 'System',
            entityId: log.entityId || 'N/A',
            actorId: log.actorId || 'UNKNOWN',
            actorName: log.actorName || 'Unknown Actor',
            details: log.details || 'No details provided',
            timestamp: new Date().toISOString(),
            metadata: log.metadata
        };
        this.auditLogs.unshift(newLog);
        return newLog;
    }

    async getAuditLogs(page: number = 1, pageSize: number = 20, filters?: {
        action?: string;
        entity?: string;
        search?: string;
        startDate?: string;
        endDate?: string;
    }) {
        await this.delay(300);
        let data = this.auditLogs;

        if (filters?.action && filters.action !== 'All') {
            data = data.filter(l => l.action === filters.action);
        }

        if (filters?.entity && filters.entity !== 'All') {
            data = data.filter(l => l.entity === filters.entity);
        }

        if (filters?.search) {
            const search = filters.search.toLowerCase();
            data = data.filter(l => 
                l.details.toLowerCase().includes(search) ||
                l.actorName.toLowerCase().includes(search) ||
                l.entityId.toLowerCase().includes(search)
            );
        }

        if (filters?.startDate) {
            data = data.filter(l => l.timestamp >= filters.startDate!);
        }

        if (filters?.endDate) {
            data = data.filter(l => l.timestamp <= filters.endDate!);
        }

        const total = data.length;
        const start = (page - 1) * pageSize;
        
        return {
            data: data.slice(start, start + pageSize),
            total,
            totalPages: Math.ceil(total / pageSize)
        };
    }



    async getAnalytics() {
        await this.delay(300);
        return {
            kpis: this.analyticsKPIs,
            activity: this.activityFeed
        };
    }

    async addEmployee(data: Partial<Employee>) {
        await this.delay(500);
        // Ensure ID is unique and sequential based on current length + buffer
        const nextIdNum = 2000 + this.employees.length + 1;
        const newId = `HMG-${nextIdNum}`;

        const newEmployee: Employee = {
            id: newId,
            employeeId: newId,
            name: data.name || 'Unknown',
            role: data.role || 'Staff',
            department: data.department || 'General',
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            email: data.email || '',
            phone: faker.phone.number(),
            address: faker.location.streetAddress(true),
            avatar: `https://i.pravatar.cc/150?u=${newId}`,
            performance: 100,
            attendance: generateMonthlyAttendance(),
            projects: [],
            leaveBalances: [
                { type: 'Annual' as LeaveType, total: 15, used: 0, available: 15 },
                { type: 'Sick' as LeaveType, total: 10, used: 0, available: 10 },
                { type: 'Earned' as LeaveType, total: 20, used: 0, available: 20 }
            ],
            salary: {
                basic: 30000,
                houseRent: 12000,
                medical: 3000,
                conveyance: 5000,
                others: 2000,
                totalGross: 52000,
                bankAccount: 'N/A',
                bankName: 'N/A'
            }
        };
        this.employees.unshift(newEmployee);
        return newEmployee;
    }

    async updateEmployee(id: string, data: Partial<Employee>) {
        await this.delay(500);
        const employee = this.employees.find(e => e.id === id);
        if (employee) {
            Object.assign(employee, data);
            return employee;
        }
        return null;
    }

    async deleteEmployee(id: string) {
        await this.delay(300);
        const index = this.employees.findIndex(e => e.id === id);
        if (index !== -1) {
            this.employees.splice(index, 1);
            return true;
        }
        return false;
    }

    async addTadaClaim(data: Partial<TadaClaim>) {
        await this.delay(500);
        const nextIdNum = 1000 + this.tadaClaims.length + 1;
        const newClaim: TadaClaim = {
            id: `TC-${nextIdNum}`,
            employeeId: data.employeeId || 'EMP-001', // Fallback for mock
            employeeName: data.employeeName || 'Current User', // Fallback for mock
            date: data.date || new Date().toISOString().split('T')[0],
            purpose: data.purpose || 'General Expense',
            amount: Number(data.amount) || 0,
            status: 'Pending',
            attachments: []
        };
        this.tadaClaims.unshift(newClaim);
        return newClaim;
    }

    async addDocument(data: Partial<EmployeeDocument>) {
        await this.delay(500);
        const nextIdNum = 5000 + this.documents.length + 1;
        
        // Mock File URL generator
        const fileType = data.type ? data.type.toLowerCase().replace(' ', '-') : 'doc';
        
        const newDoc: EmployeeDocument = {
            id: `DOC-${nextIdNum}`,
            employeeId: data.employeeId || 'EMP-000',
            employeeName: data.employeeName || 'Unknown Employee',
            type: data.type || 'Contract',
            status: 'Pending', // Default status for new uploads is Pending verification
            uploadDate: new Date().toISOString().split('T')[0],
            expiryDate: data.expiryDate,
            fileUrl: `/uploads/mock/${fileType}-${nextIdNum}.pdf`,
            fileSize: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`
        };
        
        this.documents.unshift(newDoc);
        return newDoc;
    }

    async addRequisition(req: Partial<Requisition>): Promise<Requisition> {
        await this.delay(800);
        const newReq: Requisition = {
            id: `REQ-${faker.number.int({ min: 1000, max: 9999 })}`,
            requesterId: req.requesterId || 'REQ-001',
            requesterName: req.requesterName || 'Unknown User',
            department: req.department || 'General',
            item: req.item || 'New Requisition Item',
            quantity: req.quantity || 1,
            cost: req.cost || 0,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            priority: req.priority || 'Medium',
        };
        this.requisitions.unshift(newReq);
        return newReq;
    }

    // ATS Methods
    async getJobPostings(): Promise<JobPosting[]> {
        await this.delay(500); // Changed to this.delay
        // Generate some mock jobs if not exists (in a real app this would be persistent)
        return [
            {
                id: 'JOB-101',
                title: 'Senior Merchandiser',
                department: 'Merchandising',
                type: 'Full-time',
                location: 'Dhaka HQ',
                salaryRange: '80k - 120k BDT',
                status: 'Open',
                postedDate: '2025-01-10',
                candidatesCount: 12
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
                candidatesCount: 5
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
    }

    async getCandidates(jobId?: string): Promise<Candidate[]> {
        await this.delay(600); // Changed to this.delay
        // Generate structured mock candidates
        const stages: Candidate['stage'][] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];
        
        return Array.from({ length: 15 }).map((_, i) => ({
            id: `CAND-${200 + i}`,
            jobId: jobId || (i % 2 === 0 ? 'JOB-101' : 'JOB-102'),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            stage: stages[i % stages.length], // Distribute across stages
            matchScore: faker.number.int({ min: 60, max: 98 }),
            appliedDate: faker.date.recent({ days: 10 }).toISOString().split('T')[0],
            avatar: `https://i.pravatar.cc/150?u=${200 + i}`,
            experience: `${faker.number.int({ min: 2, max: 10 })} years`
        }));
    }

    async updateCandidateStage(candidateId: string, stage: Candidate['stage']): Promise<void> {
        await this.delay(300);
        console.log(`Moved candidate ${candidateId} to ${stage}`);
        // In a real DB, we would update the record here
    }

    async getOrgChart(): Promise<OrgNode> {
        await this.delay(400);
        // Manually constructed tree for the "Tactical Demo"
        return {
            id: 'MD-001',
            name: 'A. K. Azad',
            role: 'Managing Director',
            avatar: 'https://i.pravatar.cc/150?u=MD',
            department: 'Strategic Command',
            status: 'Online',
            directReportsCount: 3,
            email: 'ak.azad@hameemgroup.com',
            phone: '+880 1711-000001',
            location: 'Dhaka HQ - Level 12',
            children: [
                {
                    id: 'ED-001',
                    name: 'Delwar Hossain',
                    role: 'Executive Director',
                    avatar: 'https://i.pravatar.cc/150?u=ED',
                    department: 'Operations',
                    status: 'In Meeting',
                    directReportsCount: 2,
                    email: 'delwar.hossain@hameemgroup.com',
                    phone: '+880 1711-000002',
                    location: 'Dhaka HQ - Level 11',
                    children: [
                        {
                            id: 'GM-001',
                            name: 'Sajid Rahman',
                            role: 'General Manager (Production)',
                            avatar: 'https://i.pravatar.cc/150?u=GM1',
                            department: 'Production',
                            status: 'Online',
                            directReportsCount: 5,
                            email: 'sajid.rahman@hameemgroup.com',
                            phone: '+880 1711-000003',
                            location: 'Gazipur Plant - Block A',
                            children: [
                                {
                                    id: 'MGR-001',
                                    name: 'Rafiqul Islam',
                                    role: 'Production Manager',
                                    avatar: 'https://i.pravatar.cc/150?u=MGR1',
                                    department: 'Denim Unit',
                                    status: 'Offline',
                                    directReportsCount: 45,
                                    email: 'rafiqul.islam@hameemgroup.com',
                                    phone: '+880 1711-000004',
                                    location: 'Gazipur Plant - Floor 2'
                                },
                                {
                                    id: 'MGR-002',
                                    name: 'Abdul Malek',
                                    role: 'Washing In-Charge',
                                    avatar: 'https://i.pravatar.cc/150?u=MGR2',
                                    department: 'Washing Plant',
                                    status: 'Online',
                                    directReportsCount: 22,
                                    email: 'abdul.malek@hameemgroup.com',
                                    phone: '+880 1711-000005',
                                    location: 'Gazipur Plant - Washing Unit'
                                }
                            ]
                        },
                        {
                            id: 'GM-002',
                            name: 'Farhana Ahmed',
                            role: 'General Manager (HR)',
                            avatar: 'https://i.pravatar.cc/150?u=GM2',
                            department: 'Human Resources',
                            status: 'Online',
                            directReportsCount: 3,
                            email: 'farhana.ahmed@hameemgroup.com',
                            phone: '+880 1711-000006',
                            location: 'Dhaka HQ - Level 4'
                        }
                    ]
                },
                {
                    id: 'DMD-001',
                    name: 'Tanvir Ahmed',
                    role: 'Deputy Managing Director',
                    avatar: 'https://i.pravatar.cc/150?u=DMD',
                    status: 'Online',
                    department: 'Administration',
                    directReportsCount: 4,
                    email: 'tanvir.ahmed@hameemgroup.com',
                    phone: '+880 1711-000007',
                    location: 'Dhaka HQ - Level 12',
                    children: [
                         {
                            id: 'DIR-001',
                            name: 'Kamrul Hasan',
                            role: 'Director (Finance)',
                            avatar: 'https://i.pravatar.cc/150?u=DIR1',
                            status: 'Online',
                            department: 'Finance',
                            directReportsCount: 10,
                            email: 'kamrul.hasan@hameemgroup.com',
                            phone: '+880 1711-000008',
                            location: 'Dhaka HQ - Level 8'
                        },

                         {
                            id: 'DIR-002',
                            name: 'Nusrat Jahan',
                            role: 'Director (Marketing)',
                            avatar: 'https://i.pravatar.cc/150?u=DIR2',
                            department: 'Marketing',
                            status: 'In Meeting',
                            directReportsCount: 8,
                            email: 'nusrat.jahan@hameemgroup.com',
                            phone: '+880 1711-000009',
                            location: 'Dhaka HQ - Level 9',
                            children: [
                                {
                                    id: 'MKT-001',
                                    name: 'Rahim Uddin',
                                    role: 'Brand Manager',
                                    avatar: 'https://i.pravatar.cc/150?u=MKT1',
                                    department: 'Brand Management',
                                    status: 'Online',
                                    directReportsCount: 4,
                                    email: 'rahim.uddin@hameemgroup.com',
                                    phone: '+880 1711-000018',
                                    location: 'Dhaka HQ - Level 9'
                                },
                                {
                                    id: 'MKT-002',
                                    name: 'Sonia Akter',
                                    role: 'Digital Marketing Lead',
                                    avatar: 'https://i.pravatar.cc/150?u=MKT2',
                                    department: 'Digital Marketing',
                                    status: 'Online',
                                    directReportsCount: 6,
                                    email: 'sonia.akter@hameemgroup.com',
                                    phone: '+880 1711-000019',
                                    location: 'Dhaka HQ - Level 9'
                                }
                            ]
                        },
                        {
                            id: 'CTO-001',
                            name: 'Arif Hasan',
                            role: 'Chief Technology Officer',
                            avatar: 'https://i.pravatar.cc/150?u=CTO',
                            department: 'IT & Systems',
                            status: 'Online',
                            directReportsCount: 15,
                            email: 'arif.hasan@hameemgroup.com',
                            phone: '+880 1711-000020',
                            location: 'Dhaka HQ - Level 14',
                            children: [
                                {
                                    id: 'IT-001',
                                    name: 'Rakib Islam',
                                    role: 'Head of Infrastructure',
                                    avatar: 'https://i.pravatar.cc/150?u=IT1',
                                    department: 'IT Infrastructure',
                                    status: 'Offline',
                                    directReportsCount: 8,
                                    email: 'rakib.islam@hameemgroup.com',
                                    phone: '+880 1711-000021',
                                    location: 'Dhaka HQ - Server Room'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'ED-002',
                    name: 'Michael Chen',
                    role: 'Operations Director',
                    avatar: 'https://i.pravatar.cc/150?u=ED2',
                    status: 'Offline',
                    department: 'Supply Chain',
                    directReportsCount: 5,
                    email: 'michael.chen@hameemgroup.com',
                    phone: '+880 1711-000010',
                    location: 'Chittagong Port Office',
                    children: [
                        {
                            id: 'SCM-001',
                            name: 'David Lee',
                            role: 'Head of Logistics',
                            avatar: 'https://i.pravatar.cc/150?u=SCM1',
                            department: 'Logistics',
                            status: 'Online',
                            directReportsCount: 20,
                            email: 'david.lee@hameemgroup.com',
                            phone: '+880 1711-000011',
                            location: 'Chittagong Depot',
                            children: [
                                {
                                    id: 'LOG-001',
                                    name: 'Abdul Karim',
                                    role: 'Fleet Manager',
                                    avatar: 'https://i.pravatar.cc/150?u=LOG1',
                                    department: 'Logistics',
                                    status: 'In Meeting',
                                    directReportsCount: 50,
                                    email: 'abdul.karim@hameemgroup.com',
                                    phone: '+880 1711-000012',
                                    location: 'Transport Yard'
                                }
                            ]
                        },
                        {
                            id: 'SCM-002',
                            name: 'Sarah Khan',
                            role: 'Procurement Manager',
                            avatar: 'https://i.pravatar.cc/150?u=SCM2',
                            department: 'Procurement',
                            status: 'Online',
                            directReportsCount: 5,
                            email: 'sarah.khan@hameemgroup.com',
                            phone: '+880 1711-000013',
                            location: 'Dhaka HQ - Level 2'
                        }
                    ]
                }
            ]
        };
    }



    async getWeeklyRoster(startDate?: string): Promise<ShiftAssignment[]> {
        await this.delay(600);
        // Generate a mock roster for the current week for all Units
        const roster: ShiftAssignment[] = [];
        const baseDate = startDate ? new Date(startDate) : new Date();
        const startOfWeek = new Date(baseDate); 
        // Adjust to Monday if needed, but for now just use baseDate as start or generate +/- 3 days
        
        const lines = ['L-10', 'L-11', 'L-12', 'L-13', 'L-20', 'L-21']; // Subset of lines
        const supervisors = this.employees.filter(e => e.role.includes('Manager') || e.role.includes('Supervisor'));

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            lines.forEach((lineId, idx) => {
                // Determine shifts based on day/line (randomized for demo)
                // Cycle shifts: Line 10 is A, Line 11 is B, etc.
                const shiftType = (idx + i) % 3 === 0 ? 'A' : (idx + i) % 3 === 1 ? 'B' : 'C';
                
                const supervisor = supervisors.length > 0 
                    ? supervisors[(idx + i) % supervisors.length] 
                    : { id: 'SUP-000', name: 'Unknown Sup', role: 'Supervisor' };

                roster.push({
                    id: `SHIFT-${dateStr}-${lineId}`,
                    date: dateStr,
                    lineId: lineId,
                    lineName: `Line ${lineId.split('-')[1]}`,
                    shiftType: shiftType,
                    supervisorId: supervisor.id,
                    supervisorName: supervisor.name,
                    operatorCount: faker.number.int({ min: 35, max: 45 }),
                    status: faker.helpers.arrayElement(['Scheduled', 'Scheduled', 'Shortage'])
                });
            });
        }
        return roster;
    }

    async getUpcomingReviews() {
        try {
            await this.delay(400);
            if (!this.employees || this.employees.length === 0) return [];
            
            const candidates = this.employees.filter(e => e.role && (e.role.includes('Operator') || e.role.includes('Executive')));
            if (candidates.length === 0) return [];

            return faker.helpers.arrayElements(candidates, 3).map(e => ({
                id: e.id,
                name: e.name,
                role: e.role,
                avatar: e.avatar,
                kpiTrend: faker.datatype.boolean() ? 'up' : 'down'
            }));
        } catch (error) {
            console.error("Failed to fetch upcoming reviews:", error);
            return [];
        }
    }

    async getDisciplinaryCases(): Promise<DisciplinaryCase[]> {
        await this.delay(500);
        // Mock cases
        return [
             {
                id: 'CASE-2025-089',
                employeeId: 'HMG-2045',
                employeeName: 'Kamal Hossain',
                employeeAvatar: 'https://i.pravatar.cc/150?u=HMG-2045',
                type: 'Safety',
                severity: 'High',
                status: 'Show-Cause',
                incidentDate: '2025-01-10',
                description: 'Observed operating cutting machine without protective gear despite previous warnings.',
                reportedBy: 'Safety Officer Rahim',
                actionsTaken: ['Verbal Warning (Jan 05)', 'Show Cause Notice Issued (Jan 12)']
            },
            {
                id: 'CASE-2025-092',
                employeeId: 'HMG-3112',
                employeeName: 'Fatima Begum',
                employeeAvatar: 'https://i.pravatar.cc/150?u=HMG-3112',
                type: 'Attendance',
                severity: 'Medium',
                status: 'Under Investigation',
                incidentDate: '2025-01-12',
                description: 'Unauthorized absence for 3 consecutive days.',
                reportedBy: 'Supervisor Nasreen',
                actionsTaken: ['Attempted Contact (Jan 13)']
            },
            {
                id: 'CASE-2025-075',
                employeeId: 'HMG-1022',
                employeeName: 'Rashid Khan',
                employeeAvatar: 'https://i.pravatar.cc/150?u=HMG-1022',
                type: 'Behavioral',
                severity: 'Low',
                status: 'Resolved',
                incidentDate: '2024-12-28',
                description: 'Argument with line supervisor regarding break times.',
                reportedBy: 'Manager Sajid',
                actionsTaken: ['Counseling Session', 'Case Closed']
            }
        ];
    }

    async reportIncident(data: Partial<DisciplinaryCase>) {
        await this.delay(800);
        console.log('Reported incident:', data);
        return { success: true };
    }
    async getTasks(status?: string, priority?: string) {
        await this.delay(200);
        let data = this.tasks;

        if (status) {
            data = data.filter(t => t.status === status);
        }
        if (priority) {
            data = data.filter(t => t.priority === priority);
        }
        return data;
    }

    async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        await this.delay(200);
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            task.updatedAt = new Date();
            return task;
        }
        return null; 
    }

    async getNotifications(userId: string = 'user-123') {
        // Return notifications for specific user or 'all'
        await this.delay(100);
        return this.notifications
            .filter(n => n.userId === userId || n.userId === 'all')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    async markNotificationAsRead(id: string) {
        await this.delay(50);
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            this.notifications[index].isRead = true;
            return true;
        }
        if (id === 'all') {
             this.notifications.forEach(n => n.isRead = true);
             return true;
        }
        return false;
    }

    async createNotification(data: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) {
        const newNotification: Notification = {
            id: `NOTIF-${faker.string.alphanumeric(8)}`,
            ...data,
            isRead: false,
            createdAt: new Date().toISOString()
        };
        this.notifications.unshift(newNotification);
        // Keep only last 100 notifications
        if (this.notifications.length > 100) {
            this.notifications = this.notifications.slice(0, 100);
        }
        return newNotification;
    }

    async getEmployeeTasks(employeeId: string) {
        await this.delay(300);
        const employee = this.employees.find(e => e.id === employeeId);
        if (!employee) return [];
        
        return this.tasks.filter(t => t.assignee?.name === employee.name);
    }

    async getEmployeePerformance(employeeId: string) {
        await this.delay(300);
        return this.kpiScorecards.filter(k => k.employeeId === employeeId).sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
    }
}

export const db = MockDatabase.getInstance();
