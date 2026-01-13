import { faker } from '@faker-js/faker';

export type Employee = {
    id: string;
    name: string;
    role: string;
    department: string;
    status: 'Active' | 'On Leave' | 'Terminated';
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    avatar: string;
    performance: number; // 0-100
    employeeId: string;
    attendance: AttendanceRecord[];
    projects: {
        name: string;
        role: string;
        status: 'Completed' | 'In Progress';
        period: string;
    }[];
    leaveBalances: LeaveBalance[];
    salary: SalaryStructure;
};

export interface SalaryStructure {
  basic: number;
  houseRent: number;
  medical: number;
  conveyance: number;
  others: number;
  totalGross: number;
  bankAccount: string;
  bankName: string;
}

export interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string; // e.g., "January 2026"
  year: number;
  earnings: { name: string; amount: number }[];
  deductions: { name: string; amount: number }[];
  netSalary: number;
  status: 'Paid' | 'Processing' | 'Hold';
  paymentDate?: string;
}

export type DocType = 'NID' | 'Contract' | 'Join Letter' | 'Certificate' | 'Training Record' | 'ID Card';
export type DocStatus = 'Verified' | 'Pending' | 'Expired';
 
export type PerformanceCategory = 'Technical' | 'Productivity' | 'Quality' | 'Punctuality' | 'Teamwork';

export interface KpiScorecard {
    id: string;
    employeeId: string;
    employeeName: string;
    department: string;
    reviewDate: string;
    scores: {
        category: PerformanceCategory;
        score: number; // 0-100
        weight: number; // weightage in %
    }[];
    overallScore: number;
    supervisorId: string;
    supervisorName: string;
    feedback: string;
    trend: 'Up' | 'Steady' | 'Down';
}

export interface EmployeeDocument {
    id: string;
    employeeId: string;
    employeeName: string;
    type: DocType;
    status: DocStatus;
    uploadDate: string;
    expiryDate?: string;
    fileUrl: string;
    fileSize: string; // e.g. "2.4 MB"
}

export type ProjectStatus = 'Active' | 'On Hold' | 'Completed' | 'Planning';

export interface Project {
    id: string;
    name: string;
    managerId: string;
    managerName: string;
    budget: number;
    spent: number;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    teamSize: number;
    description: string;
}

export type TadaStatus = 'Draft' | 'Pending' | 'Approved' | 'Disbursed' | 'Rejected';

export interface TadaClaim {
    id: string;
    employeeId: string;
    employeeName: string;
    date: string;
    purpose: string;
    amount: number;
    status: TadaStatus;
    approvedBy?: string;
    attachments: string[];
}

export type LeaveType = 'Annual' | 'Sick' | 'Earned' | 'Maternity' | 'Paternity' | 'LWP' | 'Special';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'Public' | 'Company' | 'Festival';
  isRecurring: boolean;
}

export interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
  available: number;
}

export type InventoryItem = {
    id: string;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    unit: string;
    warehouse: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    value: number;
    lastUpdated: string;
};

export type Requisition = {
    id: string;
    requesterId: string;
    requesterName: string;
    department: string;
    item: string;
    quantity: number;
    cost: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
    priority: 'Low' | 'Medium' | 'High';
};

export type AssetCondition = 'Excellent' | 'Good' | 'Fair' | 'Maintenance Required' | 'Decommissioned';

export interface Asset {
  id: string;
  name: string;
  category: 'Machinery' | 'IT Equipment' | 'Vehicles' | 'Furniture' | 'Facilities';
  sku: string;
  serialNumber: string;
  location: string;
  purchaseDate: string;
  purchaseValue: number;
  condition: AssetCondition;
  lastMaintenance: string | null;
  assignedTo?: string; // Employee ID
  assignedToName?: string;
  status: 'In Use' | 'Storage' | 'Being Repaired' | 'Retired';
}

export interface EmployeeRequisition extends Requisition {
    location?: string;
    approvedBy?: string;
    approvedDate?: Date;
    arrivedDate?: Date;
    collectedDate?: Date;
    itemStatus?: 'Ordered' | 'In Transit' | 'In Store' | 'Collected';
}

export function generateEmployees(count: number): Employee[] {
    return Array.from({ length: count }).map((_, index) => ({
        id: faker.string.alphanumeric(6).toUpperCase(),
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        department: faker.helpers.arrayElement(['Production', 'HR', 'Logistics', 'QA', 'Design', 'Management', 'IT']),
        status: faker.helpers.arrayElement(['Active', 'Active', 'Active', 'On Leave']),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(true),
        joinDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
        avatar: faker.image.avatar(),
        performance: faker.number.int({ min: 60, max: 100 }),
        employeeId: `HMG-${1000 + index}`,
        attendance: generateMonthlyAttendance(),
        projects: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => ({
            name: `${faker.commerce.productAdjective()} Project`,
            role: faker.person.jobTitle(),
            status: faker.helpers.arrayElement(['Completed', 'In Progress']) as 'Completed' | 'In Progress',
            period: '2025-2026'
        })),
        leaveBalances: [
          { type: 'Annual' as LeaveType, total: 15, used: faker.number.int({ min: 0, max: 10 }), available: 0 },
          { type: 'Sick' as LeaveType, total: 10, used: faker.number.int({ min: 0, max: 5 }), available: 0 },
          { type: 'Earned' as LeaveType, total: 20, used: faker.number.int({ min: 0, max: 5 }), available: 0 }
        ].map(lb => ({ ...lb, available: lb.total - lb.used })),
        salary: (() => {
          const basic = faker.number.int({ min: 20000, max: 150000 });
          const houseRent = Math.floor(basic * 0.4);
          const medical = Math.floor(basic * 0.1);
          const conveyance = 5000;
          const others = 2000;
          return {
            basic,
            houseRent,
            medical,
            conveyance,
            others,
            totalGross: basic + houseRent + medical + conveyance + others,
            bankAccount: faker.finance.accountNumber(12),
            bankName: faker.helpers.arrayElement(['Dutch-Bangla Bank', 'City Bank', 'Brac Bank', 'Islami Bank'])
          };
        })()
    }));
}

export type AttendanceRecord = {
    date: string;
    clockIn: string;
    clockOut: string;
    status: 'Present' | 'Absent' | 'Leave' | 'Holiday';
    isOvertime: boolean;
    isHolidayWork: boolean;
    totalHours: string;
};

export function generateMonthlyAttendance(): AttendanceRecord[] {
    const records: AttendanceRecord[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayOfWeek = date.getDay(); // 0 is Sunday, 5 is Friday

        // Logic: Friday (5) is Holiday in this region (common in some regions, user didn't specify but implied holiday logic). 
        // Let's assume standard weekend is Friday for this mock.
        const isFriday = dayOfWeek === 5;

        // Random status
        let status: 'Present' | 'Absent' | 'Leave' | 'Holiday' = 'Present';
        if (isFriday) status = 'Holiday';
        else if (faker.number.int({ min: 1, max: 20 }) === 1) status = 'Absent';
        else if (faker.number.int({ min: 1, max: 30 }) === 1) status = 'Leave';

        // Override: Work on holiday sometimes
        let isHolidayWork = false;
        if (status === 'Holiday' && faker.number.int({ min: 1, max: 5 }) === 1) {
            status = 'Present';
            isHolidayWork = true;
        }

        let clockIn = '-';
        let clockOut = '-';
        let totalHours = '-';
        let isOvertime = false;

        if (status === 'Present') {
            // Standard: 10:00 AM. Random variation +/- 15 mins
            const inHour = 10;
            const inMin = faker.number.int({ min: 0, max: 30 });

            // Standard Out: 6:00 PM (18:00). 
            // Overtime logic: Some days go past 11:00 PM (23:00)
            let outHour = 18;
            // 20% chance of overtime, and 5% chance of LATE overtime (>11pm)
            const rand = faker.number.int({ min: 1, max: 100 });

            if (rand > 90) {
                // Late Overtime (> 11 PM) -> e.g. 23:15, 23:45, 00:15
                outHour = 23;
                isOvertime = true;
            } else if (rand > 70) {
                // Normal Overtime (e.g. 8 PM)
                outHour = 20;
            }

            const outMin = faker.number.int({ min: 0, max: 50 });

            clockIn = `${inHour}:${inMin.toString().padStart(2, '0')} AM`;

            // Format Clock Out
            const ampm = outHour >= 12 ? 'PM' : 'AM';
            const displayHour = outHour > 12 ? outHour - 12 : outHour;
            clockOut = `${displayHour}:${outMin.toString().padStart(2, '0')} ${ampm}`;

            // Calculate rough hours
            const start = inHour + (inMin / 60);
            const end = outHour + (outMin / 60);
            const hours = Math.floor(end - start);
            const mins = Math.floor((end - start - hours) * 60);
            totalHours = `${hours}h ${mins}m`;
        }

        records.push({
            date: date.toISOString().split('T')[0],
            clockIn,
            clockOut,
            status,
            isOvertime,
            isHolidayWork,
            totalHours
        });
    }
    return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function generateAssets(count: number = 100, employees: Employee[]): Asset[] {
    const categories: Asset['category'][] = ['Machinery', 'IT Equipment', 'Vehicles', 'Furniture', 'Facilities'];
    const statusOptions: Asset['status'][] = ['In Use', 'Storage', 'Being Repaired', 'Retired'];
    const conditions: AssetCondition[] = ['Excellent', 'Good', 'Fair', 'Maintenance Required', 'Decommissioned'];
    const locations = [
        'Unit 1 - Floor A', 'Unit 1 - Floor B', 'Unit 2 - Packing', 
        'Main Office', 'IT Server Room', 'Logistics Bay 4', 'Storage Yard'
    ];

    return Array.from({ length: count }, (_, i) => {
        const idNum = 5000 + i;
        const category = faker.helpers.arrayElement(categories);
        const hasAssignee = faker.datatype.boolean() && employees.length > 0;
        const employee = hasAssignee ? faker.helpers.arrayElement(employees) : null;

        let name = '';
        if (category === 'Machinery') name = faker.helpers.arrayElement(['Auto Cutter', 'Sewing Robot', 'Folding Machine', 'Steam Iron Station']);
        else if (category === 'IT Equipment') name = faker.helpers.arrayElement(['Laptop - Dell XPS', 'MacBook Pro', 'Server Rack', 'Cisco Switch']);
        else if (category === 'Vehicles') name = faker.helpers.arrayElement(['Forklift', 'Delivery Van', 'Cargo Truck']);
        else if (category === 'Furniture') name = faker.helpers.arrayElement(['Ergonomic Chair', 'Conference Table', 'Executive Desk']);
        else name = faker.helpers.arrayElement(['HVAC Unit', 'Power Generator', 'Fire Suppression System']);

        return {
            id: `AST-${idNum}`,
            name: name,
            category: category,
            sku: faker.string.alphanumeric(10).toUpperCase(),
            serialNumber: faker.string.uuid().slice(0, 8).toUpperCase(),
            location: faker.helpers.arrayElement(locations),
            purchaseDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
            purchaseValue: faker.number.int({ min: 500, max: 25000 }),
            condition: faker.helpers.arrayElement(conditions),
            lastMaintenance: faker.datatype.boolean() ? faker.date.recent({ days: 180 }).toISOString().split('T')[0] : null,
            assignedTo: employee?.id,
            assignedToName: employee?.name,
            status: faker.helpers.arrayElement(statusOptions),
        };
    });
}

export function generateInventory(count: number): InventoryItem[] {
    return Array.from({ length: count }).map((_, index) => {
        const quantity = faker.number.int({ min: 0, max: 10000 });
        const status = quantity === 0 ? 'Out of Stock' : quantity < 500 ? 'Low Stock' : 'In Stock';

        return {
            id: `INV-${2000 + index}`,
            name: faker.commerce.productName(),
            sku: faker.string.alphanumeric(8).toUpperCase(),
            category: faker.commerce.department(),
            quantity,
            unit: faker.helpers.arrayElement(['kg', 'm', 'pcs', 'liters', 'boxes']),
            warehouse: faker.helpers.arrayElement(['Dhaka Depot', 'Chittagong Port', 'Gazipur Factory', 'Head Office']),
            status,
            value: Number(faker.commerce.price({ min: 100, max: 5000 })),
            lastUpdated: faker.date.recent().toISOString(),
        };
    });
}

export function generateRequisitions(count: number, employees: Employee[]): Requisition[] {
    return Array.from({ length: count }).map((_, index) => {
        const employee = faker.helpers.arrayElement(employees);
        return {
            id: `REQ-${new Date().getFullYear()}-${1000 + index}`,
            requesterId: employee.id,
            requesterName: employee.name,
            department: employee.department,
            item: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 50 }),
            cost: Number(faker.commerce.price({ min: 50, max: 5000 })),
            status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected']),
            date: faker.date.recent({ days: 30 }).toISOString(),
            priority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
        };
    });
}

export type ProductionStat = {
    month: string;
    production: number; // in units
    cost: number; // in USD
};

export function generateProductionStats(): ProductionStat[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
        month,
        production: faker.number.int({ min: 5000, max: 12000 }),
        cost: faker.number.int({ min: 20000, max: 50000 }),
    }));
}

export type HourlyProduction = {
    hour: string; // e.g. "09:00"
    target: number;
    achieved: number;
    efficiency: number;
};

export type ProductionLine = {
    id: string;
    name: string; // e.g. "Line 14"
    buyer: string; // e.g. "H&M"
    style: string; // e.g. "Slim Fit Chino"
    sam: number; // Standard Allowed Minute, e.g. 12.5
    operators: number;
    hourlyData: HourlyProduction[];
    dailyTarget: number;
    totalProduced: number;
    dhu: number; // Defects per Hundred Units
    status: 'Running' | 'Maintenance' | 'Changeover';
};

export type FactoryUnit = {
    id: string;
    name: string; // e.g. "Creative Collections Ltd"
    type: 'Denim' | 'Woven' | 'Washing';
    manager: string;
    lines: ProductionLine[];
    overallEfficiency: number;
};

export function generateHaMeemFactoryData(): FactoryUnit[] {
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    // Helper to generate hourly curve
    const generateHourlyData = (baseTarget: number): HourlyProduction[] => {
        return hours.map((hour, index) => {
            // Efficiency curve: Low start, peak middle, dip post-lunch (13:00), recover, dip end
            let efficiencyFactor = 0.8;
            if (index === 0) efficiencyFactor = 0.6; // Start-up
            else if (index >= 2 && index <= 4) efficiencyFactor = 0.95; // Peak
            else if (index === 5) efficiencyFactor = 0.5; // Lunch hour impact (if not staggered)
            else if (index > 5 && index < 9) efficiencyFactor = 0.9;
            else efficiencyFactor = 0.75; // Fatigue

            // Random variance
            const variance = faker.number.float({ min: -0.1, max: 0.1 });
            const finalEfficiency = Math.min(efficiencyFactor + variance, 1.0);

            const target = Math.floor(baseTarget);
            const achieved = Math.floor(baseTarget * finalEfficiency);

            return {
                hour,
                target,
                achieved,
                efficiency: finalEfficiency * 100
            };
        });
    };

    const units: FactoryUnit[] = [
        {
            id: 'UNIT-01',
            name: 'Creative Collections Ltd',
            type: 'Denim',
            manager: 'Mr. Rafiqul Islam',
            lines: Array.from({ length: 12 }).map((_, i) => {
                const hourlyData = generateHourlyData(150); // High output for denim basic
                const totalProduced = hourlyData.reduce((sum, h) => sum + h.achieved, 0);
                const dailyTarget = hourlyData.reduce((sum, h) => sum + h.target, 0);

                return {
                    id: `L-${10 + i}`,
                    name: `Line ${10 + i} - Denim`,
                    buyer: faker.helpers.arrayElement(['H&M', 'Gap', 'American Eagle', 'Zara']),
                    style: faker.helpers.arrayElement(['5-Pocket Jean', 'Skinny High', 'Mom Fit', 'Jacket']),
                    sam: faker.number.float({ min: 12, max: 25, fractionDigits: 1 }),
                    operators: 45,
                    hourlyData,
                    dailyTarget,
                    totalProduced,
                    dhu: faker.number.float({ min: 0.5, max: 4.5, fractionDigits: 1 }),
                    status: faker.helpers.arrayElement(['Running', 'Running', 'Running', 'Changeover'])
                };
            }),
            overallEfficiency: 0 // Calculated later
        },
        {
            id: 'UNIT-02',
            name: 'Refat Garments Ltd',
            type: 'Woven',
            manager: 'Ms. Nasreen Akter',
            lines: Array.from({ length: 8 }).map((_, i) => {
                const hourlyData = generateHourlyData(100); // Lower output for complex woven
                const totalProduced = hourlyData.reduce((sum, h) => sum + h.achieved, 0);
                const dailyTarget = hourlyData.reduce((sum, h) => sum + h.target, 0);

                return {
                    id: `L-${20 + i}`,
                    name: `Line ${20 + i} - Woven`,
                    buyer: faker.helpers.arrayElement(['Abercrombie', 'Tommy Hilfiger', 'Next']),
                    style: faker.helpers.arrayElement(['Formal Shirt', 'Chino Pant', 'Blazer']),
                    sam: faker.number.float({ min: 20, max: 40, fractionDigits: 1 }),
                    operators: 35,
                    hourlyData,
                    dailyTarget,
                    totalProduced,
                    dhu: faker.number.float({ min: 0.2, max: 2.5, fractionDigits: 1 }),
                    status: 'Running'
                };
            }),
            overallEfficiency: 0
        },
        {
            id: 'UNIT-03',
            name: 'Modern Washing Plant',
            type: 'Washing',
            manager: 'Mr. Abdul Malek',
            lines: Array.from({ length: 5 }).map((_, i) => {
                const hourlyData = generateHourlyData(500); // Bulk washing
                const totalProduced = hourlyData.reduce((sum, h) => sum + h.achieved, 0);
                const dailyTarget = hourlyData.reduce((sum, h) => sum + h.target, 0);

                return {
                    id: `W-${i + 1}`,
                    name: `Wash Unit ${i + 1}`,
                    buyer: 'Internal',
                    style: faker.helpers.arrayElement(['Enzyme Wash', 'Bleach', 'Ozone', 'Laser']),
                    sam: 5,
                    operators: 15,
                    hourlyData,
                    dailyTarget,
                    totalProduced,
                    dhu: faker.number.float({ min: 0.1, max: 1.0, fractionDigits: 1 }),
                    status: 'Running'
                };
            }),
            overallEfficiency: 0
        }
    ];

    // Calculate aggregated efficiency
    units.forEach(unit => {
        const totalTarget = unit.lines.reduce((sum, l) => sum + l.dailyTarget, 0);
        const totalAchieved = unit.lines.reduce((sum, l) => sum + l.totalProduced, 0);
        unit.overallEfficiency = Number(((totalAchieved / totalTarget) * 100).toFixed(1));
    });

    return units;
}

// Get requisitions for a specific employee
export function getEmployeeRequisitions(employeeId: string): EmployeeRequisition[] {
    return [
        {
            id: 'REQ-2025-001',
            requesterId: employeeId,
            requesterName: 'Current Employee',
            department: 'IT',
            item: 'Laptop - Dell XPS 15',
            quantity: 1,
            cost: 1500,
            status: 'Approved',
            priority: 'High',
            date: '2025-01-05',
            location: 'Main Store - Shelf A3',
            approvedBy: 'John Manager',
            approvedDate: new Date('2025-01-06'),
            arrivedDate: new Date('2025-01-10'),
            itemStatus: 'In Store',
        },
        {
            id: 'REQ-2025-002',
            requesterId: employeeId,
            requesterName: 'Current Employee',
            department: 'IT',
            item: 'Office Chair - Ergonomic',
            quantity: 3,
            cost: 350,
            status: 'Approved',
            priority: 'Medium',
            date: '2025-01-08',
            approvedBy: 'John Manager',
            approvedDate: new Date('2025-01-09'),
            itemStatus: 'Ordered',
        },
        {
            id: 'REQ-2024-089',
            requesterId: employeeId,
            requesterName: 'Current Employee',
            department: 'IT',
            item: 'Monitor - 27" Dell',
            quantity: 2,
            cost: 400,
            status: 'Approved',
            priority: 'Medium',
            date: '2024-12-15',
            location: 'Employee Desk',
            approvedBy: 'Sarah Admin',
            approvedDate: new Date('2024-12-16'),
            arrivedDate: new Date('2024-12-20'),
            collectedDate: new Date('2024-12-21'),
            itemStatus: 'Collected',
        },
        {
            id: 'REQ-2024-078',
            requesterId: employeeId,
            requesterName: 'Current Employee',
            department: 'IT',
            item: 'Keyboard - Mechanical',
            quantity: 5,
            cost: 120,
            status: 'Rejected',
            priority: 'Low',
            date: '2024-12-10',
        },
        {
            id: 'REQ-2025-003',
            requesterId: employeeId,
            requesterName: 'Current Employee',
            department: 'IT',
            item: 'Mouse - Wireless Logitech',
            quantity: 10,
            cost: 45,
            status: 'Pending',
            priority: 'Low',
            date: '2025-01-11',
        },
    ];
}

export function generateHolidays(): Holiday[] {
    const year = new Date().getFullYear();
    return [
        { id: 'H1', name: 'New Year Day', date: `${year}-01-01`, type: 'Public', isRecurring: true },
        { id: 'H2', name: 'International Mother Language Day', date: `${year}-02-21`, type: 'Public', isRecurring: true },
        { id: 'H3', name: 'Shab-e-Barat', date: `${year}-02-14`, type: 'Festival', isRecurring: false },
        { id: 'H4', name: 'Independence Day', date: `${year}-03-26`, type: 'Public', isRecurring: true },
        { id: 'H5', name: 'Eid-ul-Fitr', date: `${year}-03-31`, type: 'Festival', isRecurring: false },
        { id: 'H6', name: 'Bengali New Year', date: `${year}-04-14`, type: 'Public', isRecurring: true },
        { id: 'H7', name: 'May Day', date: `${year}-05-01`, type: 'Public', isRecurring: true },
        { id: 'H8', name: 'Buddha Purnima', date: `${year}-05-12`, type: 'Festival', isRecurring: false }, // Approximate date
        { id: 'H9', name: 'Eid-ul-Adha', date: `${year}-06-07`, type: 'Festival', isRecurring: false },
        { id: 'H10', name: 'Ashura', date: `${year}-07-06`, type: 'Festival', isRecurring: false }, // Approximate date
        { id: 'H11', name: 'Janmashtami', date: `${year}-08-16`, type: 'Festival', isRecurring: false }, // Approximate date
        { id: 'H12', name: 'Eid-e-Miladunnabi', date: `${year}-09-05`, type: 'Festival', isRecurring: false }, // Approximate date
        { id: 'H13', name: 'Durga Puja (Dashami)', date: `${year}-10-02`, type: 'Festival', isRecurring: false }, // Approximate date
        { id: 'H14', name: 'Victory Day', date: `${year}-12-16`, type: 'Public', isRecurring: true },
        { id: 'H15', name: 'Christmas Day', date: `${year}-12-25`, type: 'Festival', isRecurring: true },
    ];
}

export function generateLeaveRequests(count: number, employees: Employee[]): LeaveRequest[] {
    return Array.from({ length: count }).map((_, i) => {
        const employee = faker.helpers.arrayElement(employees);
        const startDate = faker.date.between({ from: '2025-01-01', to: '2025-12-31' });
        const days = faker.number.int({ min: 1, max: 10 });
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + days);

        return {
            id: `LR-${1000 + i}`,
            employeeId: employee.id,
            employeeName: employee.name,
            employeeAvatar: employee.avatar,
            type: faker.helpers.arrayElement(['Annual', 'Sick', 'Earned', 'LWP', 'Special'] as LeaveType[]),
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            days,
            reason: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected', 'Cancelled'] as LeaveStatus[]),
            appliedDate: faker.date.past({ years: 0.5 }).toISOString().split('T')[0],
            approvedBy: faker.person.fullName(),
            approvedDate: faker.date.recent().toISOString().split('T')[0]
        };
    });
}

export function generatePayslips(employees: Employee[], countPerEmployee: number = 3): Payslip[] {
    const months = ['November 2025', 'December 2025', 'January 2026'];
    const payslips: Payslip[] = [];

    // Use a subset of employees for mock payslips
    employees.slice(0, 100).forEach(emp => {
      months.slice(0, countPerEmployee).forEach((month, idx) => {
        const s = emp.salary;
        const tax = Math.floor(s.totalGross * 0.05);
        const pf = Math.floor(s.basic * 0.1);
        
        payslips.push({
          id: `PSL-${faker.string.alphanumeric(8).toUpperCase()}`,
          employeeId: emp.id,
          employeeName: emp.name,
          month,
          year: 2026,
          earnings: [
            { name: 'Basic Salary', amount: s.basic },
            { name: 'House Rent', amount: s.houseRent },
            { name: 'Medical Allowance', amount: s.medical },
            { name: 'Conveyance', amount: s.conveyance }
          ],
          deductions: [
            { name: 'Income Tax', amount: tax },
            { name: 'Provident Fund', amount: pf },
            { name: 'Professional Tax', amount: 200 }
          ],
          netSalary: s.totalGross - tax - pf - 200,
          status: 'Paid',
          paymentDate: faker.date.recent({ days: 10 + idx * 30 }).toISOString().split('T')[0]
        });
      });
    });

    return payslips;
}

export function generateDocuments(employees: Employee[], count: number = 200): EmployeeDocument[] {
    const docTypes: DocType[] = ['NID', 'Contract', 'Join Letter', 'Certificate', 'Training Record', 'ID Card'];
    const statuses: DocStatus[] = ['Verified', 'Pending', 'Expired'];

    return Array.from({ length: count }).map((_, i) => {
        const emp = faker.helpers.arrayElement(employees);
        const type = faker.helpers.arrayElement(docTypes);
        const uploadDate = faker.date.past({ years: 1 }).toISOString().split('T')[0];
        const status = faker.helpers.arrayElement(statuses);

        return {
            id: `DOC-${faker.string.alphanumeric(6).toUpperCase()}`,
            employeeId: emp.id,
            employeeName: emp.name,
            type,
            status,
            uploadDate,
            expiryDate: status === 'Expired' ? faker.date.recent().toISOString().split('T')[0] : 
                        faker.helpers.maybe(() => faker.date.future({ years: 2 }).toISOString().split('T')[0]),
            fileUrl: '#', // Mock link
            fileSize: `${(Math.random() * 5 + 0.1).toFixed(1)} MB`
        };
    });
}

export function generateProjects(count: number, employees: Employee[]): Project[] {
    const statuses: ProjectStatus[] = ['Active', 'On Hold', 'Completed', 'Planning'];
    const projectNames = [
        'Operation Clean Slate', 'Project Phoenix', 'Supply Chain Overhaul',
        'Digital Transformation 2.0', 'Factory Auto-Line', 'Retail Expansion',
        'Next-Gen Logistics', 'Market Research Alpha', 'Green Energy Initiative'
    ];

    return Array.from({ length: count }).map((_, i) => {
        const managers = employees.filter(e => e.role === 'Manager');
        const manager = managers.length > 0 ? faker.helpers.arrayElement(managers) : employees[0];
        const budget = faker.number.int({ min: 500000, max: 5000000 });
        const spent = faker.number.int({ min: 100000, max: budget + 200000 });
        const startDate = faker.date.past({ years: 1 }).toISOString().split('T')[0];
        
        return {
            id: `PRJ-${faker.string.alphanumeric(5).toUpperCase()}`,
            name: faker.helpers.arrayElement(projectNames) + ' ' + (i + 1),
            managerId: manager.id,
            managerName: manager.name,
            budget,
            spent,
            status: faker.helpers.arrayElement(statuses),
            startDate,
            endDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
            teamSize: faker.number.int({ min: 3, max: 25 }),
            description: faker.lorem.paragraph()
        };
    });
}

export function generateTadaClaims(count: number, employees: Employee[]): TadaClaim[] {
    const statuses: TadaStatus[] = ['Draft', 'Pending', 'Approved', 'Disbursed', 'Rejected'];
    const purposes = [
        'Site Visit - Gazipur', 'Client Meeting - Chittagong', 'Equipment Inspection',
        'Regional Training', 'Supplier Audit', 'Emergency Repair Commute'
    ];

    return Array.from({ length: count }).map((_, i) => {
        const emp = faker.helpers.arrayElement(employees);
        const amount = faker.number.int({ min: 1500, max: 25000 });
        const status = faker.helpers.arrayElement(statuses);

        return {
            id: `TADA-${10000 + i}`,
            employeeId: emp.id,
            employeeName: emp.name,
            date: faker.date.recent({ days: 60 }).toISOString().split('T')[0],
            purpose: faker.helpers.arrayElement(purposes),
            amount,
            status,
            approvedBy: status === 'Approved' || status === 'Disbursed' ? faker.person.fullName() : undefined,
            attachments: ['receipt_01.jpg', 'travel_log.pdf']
        };
    });
}

export function generateKpiScorecards(employees: Employee[]): KpiScorecard[] {
    const categories: PerformanceCategory[] = ['Technical', 'Productivity', 'Quality', 'Punctuality', 'Teamwork'];
    
    return employees.map(emp => {
        const scores = categories.map(cat => ({
            category: cat,
            score: faker.number.int({ min: 65, max: 98 }),
            weight: 20 // Equal weight for now
        }));

        const overallScore = Math.floor(scores.reduce((acc, s) => acc + s.score, 0) / scores.length);
        const supervisors = employees.filter(e => e.role === 'Manager' || e.role === 'Senior Manager');
        const supervisor = supervisors.length > 0 ? faker.helpers.arrayElement(supervisors) : emp;

        return {
            id: `KPI-${faker.string.alphanumeric(6).toUpperCase()}`,
            employeeId: emp.id,
            employeeName: emp.name,
            department: emp.department,
            reviewDate: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
            scores,
            overallScore,
            supervisorId: supervisor.id,
            supervisorName: supervisor.name,
            feedback: faker.helpers.arrayElement([
                'Excellent throughput this cycle. Technical skills are top-notch.',
                'Good performance, but needs to focus on punctuality.',
                'Productivity is high, quality is consistent. Keep it up.',
                'Teamwork and collaboration have improved significantly.',
                'Maintains high standards in technical execution.'
            ]),
            trend: faker.helpers.arrayElement(['Up', 'Steady', 'Down'])
        };
    });
}

export interface Supplier {
    id: string;
    name: string;
    category: string;
    status: 'Active' | 'Vetted' | 'Risk';
    location: string;
    rating: number; // 0-100
    speed: number; // 0-100
    contactPerson?: string;
    email?: string;
}

export function generateSuppliers(count: number): Supplier[] {
    const categories = ['Textiles', 'Chemicals', 'Trims', 'Machinery', 'Raw Materials', 'Packaging'];
    const statuses: Supplier['status'][] = ['Active', 'Vetted', 'Risk'];
    
    // Seed with the specific ones from the design first if needed, but for generator rely on faker
    return Array.from({ length: count }).map((_, i) => ({
        id: `SPL-${1000 + i}`,
        name: faker.company.name(),
        category: faker.helpers.arrayElement(categories),
        status: faker.helpers.arrayElement(statuses),
        location: faker.location.country(),
        rating: faker.number.int({ min: 60, max: 99 }),
        speed: faker.number.int({ min: 60, max: 99 }),
        contactPerson: faker.person.fullName(),
        email: faker.internet.email()
    }));
}
