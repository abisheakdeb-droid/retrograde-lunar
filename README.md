# Retrograde Lunar - Enterprise Resource Planning System

**A futuristic, high-performance HRM & ERP platform designed for the Space Age. Now with "Prom Ex" Tactical Telemetry.**

![Retrograde Lunar Dashboard](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop)

## 🚀 System Overview

Retrograde Lunar is a comprehensive enterprise management dashboard built with **Next.js 15**, **Drizzle ORM**, and **Tailwind CSS v4**. It unifies HR, Payroll, Supply Chain, and Project Management into a single "tactical" interface designed for maximum data visibility and operational speed.

The system features a **Tactical UI Overhaul** inspired by Grafana/PromEx, providing deep dark mode aesthetics (`#0b0c0e`), high-contrast neon accents, and dense data visualization for critical decision-making.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions, TurboPack)
- **Database:** PostgreSQL (via [Drizzle ORM](https://orm.drizzle.team/))
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, "Tactical" Design System (Prom Ex Style)
- **UI Components:** Shadcn UI, Recharts (with Custom Hatch Patterns), Lucide Icons

## 📦 Core Modules

### 1. 👥 Human Resources (HRM)

- **Employee Directory:** Searchable profiles with "Tactical Panel" cards.
- **Recruitment:** Kanban board for candidate pipelines.
- **Incidents:** Disciplinary case tracking with severity levels.
- **Organogram:** Interactive visualization of organizational structure.

### 2. 💳 Payroll & Finance

- **Automated Payroll:** One-click payroll execution with real-time tax calculation.
- **Payslips:** JSON-based persistent payslip generation.
- **Analytics:** Area charts showing salary trends and net distribution.

### 3. 📦 Supply Chain & Operations

- **Inventory Control:** Real-time tracking of material units (e.g., Fabric, Buttons).
- **Supplier Database:** Vendor risk assessment and performance metrics.
- **Factory Performance:** Live telemetry of production line output and efficiency.

### 4. 🚀 Mission Control (Tactical)

- **Global Dashboard:** Unified view of all critical metrics (Attendance, Inventory Value, Payroll).
- **Tactical Telemetry:** Dedicated page for system health and high-density data monitoring.

## ⚡ Setup & Installation

### 1. Clone & Install

```bash
git clone https://github.com/abisheakdeb-droid/retrograde-lunar.git
cd retrograde-lunar
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your PostgreSQL connection string:

```bash
POSTGRES_URL="postgres://user:password@host:port/dbname?sslmode=require"
```

### 3. Database Setup (Drizzle)

Push the schema to your PostgreSQL database:

```bash
npx drizzle-kit push
```

Seed the database with realistic tactical mock data:

```bash
npx tsx lib/db/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to launch the command center.

## 🔒 Verification

The system includes verify scripts to ensure data persistence:

- **`scripts/verify-persistence.ts`**: Tests Create/Read operations for Suppliers, Job Postings, and Documents directly against the DB.

## 🎨 Design Philosophy

"Retrograde Lunar" embraces a **Tactical Science Fiction** aesthetic (Prom Ex):

- **Deep Space Theme**: Background `#0b0c0e`, Panels `#111217`.
- **High Contrast**: Neon Cyan (`#5794f2`), Green (`#73bf69`), Alert Red (`#f2495c`).
- **Data Density**: Monospace fonts for metrics, clear borders, and hatched patterns for charting.

---

_Transmission End._
