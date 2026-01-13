# Retrograde Lunar - Enterprise Resource Planning System

**A futuristic, high-performance HRM & ERP platform designed for the Space Age.**

![Retrograde Lunar Dashboard](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop)

## 🚀 System Overview

Retrograde Lunar is a comprehensive enterprise management dashboard built with **Next.js 15**, **Prisma**, and **Tailwind CSS**. It unifies HR, Payroll, Supply Chain, and Project Management into a single "tactical" interface designed for maximum data visibility and operational speed.

The system has been recently re-architected to move from a mock data simulation to a fully persistent **SQLite** database using **Prisma ORM**, ensuring data integrity, type safety, and scalability.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Database:** SQLite (via [Prisma ORM](https://www.prisma.io/))
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion, "Tactical" Design System (Neon/Glassmorphism)
- **UI Components:** Shadcn UI, Lucide Icons, Recharts

## 📦 Core Modules

### 1. 👥 Human Resources (HRM)

- **Employee Directory:** Manage detailed employee profiles with searchable metadata.
- **Recruitment Pipeline:** Kanban-style board for tracking job applications and candidate stages.
- **Disciplinary:** Track disciplinary cases, severity, and action history.
- **Organogram:** Visual hierarchy of organization structure.
- **Leave Management:** Request tracking, balance monitoring, and calendar view.

### 2. 💳 Payroll & Finance

- **Automated Payslips:** Generate comprehensive payslips with broken-down earnings and deductions.
- **Dynamic Calculation:** JSON-based storage for flexible salary structures.
- **Status Tracking:** Monitor payment statuses (Paid, Processing, Hold).

### 3. 📦 Supply Chain & Logistics

- **Supplier Database:** Track vendors with performance metrics (Rating, Speed, Risk Status).
- **Global Network:** Visual indicators for supplier locations and critical risk alerts.
- **Requisitions:** Internal procurement system with "Cart" functionality and approval workflows.

### 4. 🏗 Projects & Operations

- **Mission Control:** Real-time visibility into project budgets, utilization, and timelines.
- **TADA Claims:** Travel Allowance & Daily Allowance claim management with audit logs.
- **Asset Management:** Hardware and resource tracking with lifecycle monitoring.

### 5. 📂 Document Management

- **Personnel Archive:** Secure storage for employee contracts, IDs, and certifications.
- **Status Monitoring:** Track document expiry and verification status.

## ⚡ Setup & Installation

### 1. Clone & Install

```bash
git clone https://github.com/your-username/retrograde-lunar.git
cd retrograde-lunar
npm install
```

### 2. Database Setup

The project uses SQLite + Prisma. You need to push the schema and seed the database.

```bash
# Apply schema to local SQLite db
npx prisma db push

# Seed database with mock data (Employees, Projects, Suppliers, etc.)
npx tsx prisma/seed.ts
```

> **Note:** The seed script generates realistic, voluminous data using `@faker-js/faker` to simulate a live enterprise environment.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to launch the command center.

## 🔒 Verification

The system includes robust type-checking and verification scripts:

- **`check-prisma.ts`**: Verifies that the Prisma Client is correctly generated and models are accessible.
- **`npm run build`**: Ensures strict type safety across all Server Components and pages.

## 🎨 Design Philosophy

"Retrograde Lunar" embraces a **Tactical Science Fiction** aesthetic:

- **High Contrast**: Dark mode default with neon cyan/amber accents.
- **Data Density**: Information-rich cards and tables for rapid scanning.
- **Motion**: Subtle animations to indicate system status and interactivity.

---

_Transmission End._
