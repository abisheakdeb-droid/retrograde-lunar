
import { pgTable, text, timestamp, uuid, jsonb, integer, serial, boolean, doublePrecision } from "drizzle-orm/pg-core";

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: text("employee_id").notNull().unique(), // HMG-2001
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(), // Operator, Manager
  department: text("department").notNull(),
  status: text("status").default("Active"), // Active, On Leave, Terminated
  phone: text("phone"),
  address: text("address"),
  joinDate: timestamp("join_date").notNull(),
  avatar: text("avatar"),
  performanceScore: integer("performance_score").default(0),
  salaryStructure: jsonb("salary_structure"), // Store complex object as JSONB
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(), // PENDING, IN_PROGRESS, COMPLETED
  priority: text("priority").default("NORMAL"),
  assigneeId: text("assignee_id"), // Ideally FK to employees.id, but using text for flexibility initially
  dueDate: timestamp("due_date"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(), // 'all' or specific user ID
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // info, success, warning, error
  link: text("link"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: text("action").notNull(), // CREATE, UPDATE, DELETE, etc.
  entity: text("entity").notNull(), // Employee, Requisition, etc.
  entityId: text("entity_id").notNull(),
  actorId: text("actor_id"),
  actorName: text("actor_name"),
  details: text("details"),
  metadata: jsonb("metadata"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: text("employee_id").notNull(), // FK
  date: timestamp("date").notNull(),
  clockIn: text("clock_in"), // "09:00 AM" or ISO
  clockOut: text("clock_out"),
  status: text("status").default("Present"), // Present, Late, Absent
  totalHours: text("total_hours"),
  isOvertime: boolean("is_overtime").default(false),
});

export const leaveRequests = pgTable("leave_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: text("employee_id").notNull(),
  type: text("type").notNull(), // Sick, Casual, Annual
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  reason: text("reason"),
  status: text("status").default("Pending"), // Pending, Approved, Rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  category: text("category").notNull(),
  quantity: integer("quantity").default(0),
  unit: text("unit").default("pcs"),
  warehouse: text("warehouse"),
  status: text("status").default("In Stock"), // In Stock, Low Stock, Out of Stock
  value: doublePrecision("value").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  sku: text("sku"),
  serialNumber: text("serial_number"),
  location: text("location"),
  purchaseDate: timestamp("purchase_date"),
  purchaseValue: doublePrecision("purchase_value").default(0),
  condition: text("condition").default("Good"), // Excellent, Good, Fair, Maintenance Required
  lastMaintenance: timestamp("last_maintenance"),
  assignedTo: text("assigned_to"), // Employee ID
  status: text("status").default("In Use"), // In Use, Storage, Being Repaired
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  managerId: text("manager_id"),
  managerName: text("manager_name"),
  status: text("status").default("Active"), // Active, On Hold, Completed, Planning
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  budget: doublePrecision("budget").default(0),
  spent: doublePrecision("spent").default(0),
  teamSize: integer("team_size").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tadaClaims = pgTable("tada_claims", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: text("employee_id").notNull(),
  employeeName: text("employee_name"),
  date: timestamp("date").notNull(),
  purpose: text("purpose"),
  amount: doublePrecision("amount").default(0),
  status: text("status").default("Pending"), // Draft, Pending, Approved, Disbursed, Rejected
  approvedBy: text("approved_by"),
  attachments: text("attachments").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productionStats = pgTable("production_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  month: text("month").notNull(),
  production: integer("production").notNull(),
  cost: doublePrecision("cost").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const factoryUnits = pgTable("factory_units", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  manager: text("manager"),
  lines: jsonb("lines"), // Stores ProductionLine[]
  overallEfficiency: doublePrecision("overall_efficiency").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payslips = pgTable("payslips", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: text("employee_id").notNull(),
  employeeName: text("employee_name").notNull(),
  month: text("month").notNull(), // e.g. "January 2026"
  year: integer("year").notNull(),
  earnings: jsonb("earnings"), // { name: string, amount: number }[]
  deductions: jsonb("deductions"), // { name: string, amount: number }[]
  netSalary: doublePrecision("net_salary").notNull(),
  status: text("status").default("Processing"), // Paid, Processing, Hold
  paymentDate: timestamp("payment_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const requisitions = pgTable("requisitions", {
  id: text("id").primaryKey(), // Using text ID like "REQ-2026-1001" to match current format, or could switch to UUID
  requesterId: text("requester_id").notNull(),
  requesterName: text("requester_name").notNull(),
  department: text("department").notNull(),
  item: text("item").notNull(),
  quantity: integer("quantity").notNull().default(1),
  cost: doublePrecision("cost").notNull(),
  status: text("status").notNull(), // Pending, Approved, Rejected
  date: timestamp("date").notNull(),
  priority: text("priority").notNull(), // Low, Medium, High
  createdAt: timestamp("created_at").defaultNow(),
});

export const suppliers = pgTable("suppliers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  category: text("category").notNull(),
  status: text("status").notNull(),
  rating: integer("rating").default(0),
  speed: integer("speed").default(0),
  lastOrderDate: timestamp("last_order_date"),
  totalSpent: doublePrecision("total_spent").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobPostings = pgTable("job_postings", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  type: text("type").notNull(), // Full-time, Contract, Internship
  location: text("location").notNull(),
  salaryRange: text("salary_range").notNull(),
  status: text("status").notNull(), // Open, Closed, Draft
  postedDate: timestamp("posted_date").notNull(),
  candidatesCount: integer("candidates_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const candidates = pgTable("candidates", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull(), // Foreign key logically
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  stage: text("stage").notNull(), // Applied, Screening, Interview, Offer, Hired, Rejected
  matchScore: integer("match_score").default(0),
  appliedDate: timestamp("applied_date").notNull(),
  avatar: text("avatar"),
  experience: text("experience"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const disciplinaryCases = pgTable("disciplinary_cases", {
  id: text("id").primaryKey(),
  employeeId: text("employee_id").notNull(),
  employeeName: text("employee_name").notNull(),
  type: text("type").notNull(), // Warning, Suspension, Termination
  date: timestamp("date").notNull(),
  severity: text("severity").notNull(), // Low, Medium, High, Critical
  description: text("description").notNull(),
  status: text("status").notNull(), // Open, In Progress, Resolved
  actionTaken: text("action_taken"),
  witness: text("witness"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: text("id").primaryKey(),
  employeeId: text("employee_id").notNull(),
  employeeName: text("employee_name").notNull(),
  type: text("type").notNull(), // Contract, NID, etc.
  name: text("name").notNull(),
  url: text("url").notNull(), // Mock URL
  uploadDate: timestamp("upload_date").notNull(),
  status: text("status").notNull(), // Pending, Verified, Rejected
  fileSize: text("file_size"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reusing existing 'users' table for auth if needed, or deprecating in favor of 'employees' for this ERP context
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").default("Staff"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});
