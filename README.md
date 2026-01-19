# Retrograde Lunar 🌑

**Tactical Enterprise Resource Planning (ERP) & Human Resource Management (HRM) System**

![Retrograde Lunar System](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop)

> _"The Future of Corporate Management. Unified, Secured, and Lag-free."_

## 🛸 System Overview

**Retrograde Lunar** is a next-generation enterprise platform engineered for high-velocity organizations. It reimagines traditional ERPs by fusing **military-grade data visibility** with **consumer-grade UX**.

Built on the bleeding edge of the React ecosystem using **Next.js 15**, **Taxonomy-based Architecture**, and **Drizzle ORM**, it delivers a "Tactical Command Center" experience. Operators don't just "manage" resources—they command them via real-time telemetry, AI-driven insights, and immersive data visualization.

### Core Capabilities

- **🧠 AI Insights Engine**: An integrated neural layer that continuously scans production data, attendance records, and inventory levels to detect anomalies (e.g., "Efficiency dropping in Line 4") and recommend immediate actions.
- **🛡️ Role-Based Access Control (RBAC)**: Middleware-protected routes ensure strict data governance. `Admins` command the platform, `Managers` oversee operations, and `Staff` access self-service portals.
- **⚡ Real-Time Telemetry**: Live dashboards that pulse with the heartbeat of the factory floor—tracking hourly output, energy consumption, and active personnel in real-time.
- **🎨 Dark Glass Aesthetic**: A "Prom Ex" inspired UI featuring dark mode defaults, glassmorphism, and neon data accents designed to reduce eye strain during extended command sessions.

---

## 🏗️ Technical Architecture

The system is built as a monolithic Next.js application with a clear separation of concerns, ensuring scalability and maintainability.

### The Stack

| Layer             | Technology          | Description                                                    |
| :---------------- | :------------------ | :------------------------------------------------------------- |
| **Framework**     | **Next.js 15**      | App Router, Server Actions, TurboPack.                         |
| **Language**      | **TypeScript**      | Strict type safety across the entire codebase.                 |
| **Database**      | **PostgreSQL**      | Relational data persistence.                                   |
| **ORM**           | **Drizzle ORM**     | Type-safe SQL builder and schema management.                   |
| **Styling**       | **Tailwind CSS v4** | Utility-first styling with custom "Tactical" theme extensions. |
| **UI Library**    | **Shadcn UI**       | Re-usable components customized for the "Dark Glass" look.     |
| **Visualization** | **Recharts**        | High-performance charting with custom hatch patterns.          |
| **Motion**        | **Framer Motion**   | Fluid interface transitions and micro-interactions.            |

---

## 📦 Modules & Features

The platform is divided into specialized command modules:

### 1. 🏭 Production ERP (`/dashboard/erp`)

- **Inventory Control**: Real-time tracking of raw materials (Fabric, Buttons, Thread) with automated re-order triggers.
- **Supplier Intelligence**: Vendor performance scoring based on delivery speed and quality.
- **Factory Telemetry**: Monitoring active lines, hourly output efficiency, and machine status.

### 2. 👥 Human Resources (`/dashboard/hrm`)

- **Smart Directory**: Searchable employee database with "Tactical Cards".
- **Dynamic Organogram**: Interactive tree visualization of the corporate hierarchy.
- **Recruitment Pipeline**: Kanban-style board for tracking candidates from application to onboarding.
- **Disciplinary Tracking**: Case management system for workplace incidents with severity levels.

### 3. 🧠 Command Dashboard (`/dashboard`)

- **AI Strategic Insights**: A dedicated panel providing high-level recommendations based on cross-module data analysis.
- **Global KPIs**: Top-level metrics for "Managing Director" view—total inventory value, active personnel, system health.
- **Anomaly Detection**: Color-coded alerts (Critical, Warning, Info) for immediate attention.

### 4. ⚖️ Compliance & Audit (`/dashboard/compliance`)

- **Audit Logging**: Immutable records of critical system actions.
- **Regulatory Tracking**: Monitoring adherence to local and international labor/safety standards.

---

## 🔒 Security & Access

Access is strictly governed by a custom implementation of **NextAuth (Auth.js)** and Next.js **Middleware**.

- **Middleware Barriers**: Routes are protected at the edge.
  - `/dashboard/settings` → **Admin Only**
  - `/dashboard/hrm` → **Admin & Manager**
  - `/dashboard` → **Authenticated Users**
- **Data Isolation**: Server Actions validate user roles before executing mutations, ensuring API security beyond just the UI.

---

## 🚀 Getting Started

Follow these instructions to deploy the command center on your local machine.

### Prerequisites

- Node.js 18+
- PostgreSQL Database

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/abisheakdeb-droid/retrograde-lunar.git
    cd retrograde-lunar
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    # or
    bun install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory:

    ```env
    # Database Connection
    POSTGRES_URL="postgres://user:password@host:port/dbname?sslmode=require"

    # Auth Secret (Generate one with `openssl rand -base64 32`)
    AUTH_SECRET="your-super-secret-key"
    ```

4.  **Initialize Database**
    Push the Drizzle schema to your database and seed it with tactical data.

    ```bash
    npx drizzle-kit push
    npx tsx lib/db/seed.ts  # Populates the DB with mock employees, products, etc.
    ```

5.  **Launch Mission Control**
    ```bash
    npm run dev
    ```
    Access the system at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Deployment

This project includes a **Simplified Deployment Workflow** powered by GitHub Actions and the `gh` CLI.

To deploy updates:

1.  Make your changes.
2.  Run the custom deploy command (or just say "deploy" to the AI agent).
    ```bash
    # The agent handles:
    # 1. Formatting & Linting
    # 2. Creating a Feature Branch
    # 3. Opening a PR
    # 4. Auto-merging to 'main'
    ```
3.  Vercel/Netlify will automatically detect the push to `main` and build the production environment.

---

## 🎨 Design Philosophy: "Tactical Glass"

"Retrograde Lunar" avoids the flat, sterile look of modern SaaS for a specialized "Command & Control" aesthetic.

- **Backgrounds**: Deep void colors (`#0b0c0e`) to minimize distinct edges on OLED screens.
- **Glassmorphism**: Panels use `bg-opacity-10` with backdrop blurs to establish hierarchy without solid barriers.
- **Semantic Color**:
  - 🔴 **Critical**: `#ef4444` (Immediate action required)
  - 🟡 **Warning**: `#f59e0b` (Observation required)
  - 🟢 **Optimal**: `#10b981` (System nominal)
  - 🔵 **Info**: `#3b82f6` (System status)

---

_System Status: ONLINE_
_Transmission End._
