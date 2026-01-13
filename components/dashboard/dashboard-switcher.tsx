"use client"

import { useDemoRole } from "@/components/providers/demo-role-provider"
import { StaffDashboard } from "./role-layouts/staff-dashboard"
import { HRDashboard } from "./role-layouts/hr-dashboard"
import { ExecutiveDashboard } from "./role-layouts/executive-dashboard"

interface DashboardData {
    stats: any
    productionStats: any
    factoryUnits: any
    upcomingReviews: any
}

export function DashboardSwitcher({ data }: { data: DashboardData }) {
    const { role } = useDemoRole()

    if (role === 'staff') {
        return <StaffDashboard />
    }

    if (role === 'hr') {
        return <HRDashboard data={data} />
    }

    // Default to Executive view for MD, DMD, ED, Admin
    return <ExecutiveDashboard data={data} role={role} />
}
