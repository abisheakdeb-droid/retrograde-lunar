"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { DisciplinaryList } from "@/components/hrm/disciplinary/disciplinary-list"
import { IncidentReportDialog } from "@/components/hrm/disciplinary/incident-report-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, FileText, Gavel, ShieldAlert, Siren, Scale, Lock } from "lucide-react"
import { useDemoRole } from "@/components/providers/demo-role-provider"
import { useMemo } from "react"

interface DisciplinaryCase {
    id: string
    employeeId: string
    employeeName: string
    type: string
    severity: string
    description: string
    status: string
    date: string
    actionTaken?: string
    witness?: string
}

interface DisciplinaryViewProps {
    cases: DisciplinaryCase[]
}

export function DisciplinaryView({ cases: allCases }: DisciplinaryViewProps) {
    const { role } = useDemoRole()
    
    // Using HMG-1004 as the demo staff ID, matching other views
    const DEMO_STAFF_ID = "HMG-1004"

    const filteredCases = useMemo(() => {
        if (role === 'staff') {
            // Filter where employeeId matches
            // Fallback: If no matches for 1004, maybe show empty or find *some* case for demo?
            // For strict privacy, show empty if no match. 
            // But for demo purposes, if 1004 has no cases, it's fine (Clean Record).
            // If we really want to show a case, we could look for 'HMG-1004'.
            return allCases.filter(c => c.employeeId === DEMO_STAFF_ID);
        }
        return allCases;
    }, [allCases, role]);

    const openCases = filteredCases.filter(c => c.status !== 'Resolved' && c.status !== 'Terminated').length;
    const critical = filteredCases.filter(c => c.severity === 'High' || c.severity === 'Critical').length;
    // For staff, compliance rate is binary (100% or 0% usually), simpler to show "My Compliance Status"

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                         <h2 className={cn("text-3xl font-bold tracking-tight", role === 'staff' ? "text-primary/80" : "text-red-600/80")}>
                            {role === 'staff' ? "My Conduct Record" : "Disciplinary Board"}
                        </h2>
                        {role === 'staff' && (
                            <Badge variant="outline" className="font-mono text-emerald-500 border-emerald-500/50 bg-emerald-500/10 gap-1 px-3 py-1">
                                <Lock className="w-3 h-3" />
                                CONFIDENTIAL
                            </Badge>
                        )}
                    </div>
                   
                    <p className="text-muted-foreground">
                        {role === 'staff' ? "Personal Compliance & Incident Policy Log" : "Compliance enforcement, violation tracking, and legal proceedings."}
                    </p>
                </div>
                {role !== 'staff' && <IncidentReportDialog />}
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                 <Card className={cn("tactical-card border-l-4", role === 'staff' ? "border-l-primary" : "border-l-red-500")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {role === 'staff' ? "Active Alerts" : "Active Investigations"}
                        </CardTitle>
                        <ShieldAlert className={cn("h-4 w-4", role === 'staff' ? "text-primary" : "text-red-500")} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openCases}</div>
                        <p className="text-xs text-muted-foreground">
                            {role === 'staff' ? "Pending resolution" : "Require immediate attention"}
                        </p>
                    </CardContent>
                </Card>
                 <Card className={cn("tactical-card border-l-4", role === 'staff' ? "border-l-amber-500" : "border-l-orange-500")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {role === 'staff' ? "Recorded Violations" : "Critical Violations"}
                        </CardTitle>
                        <Gavel className={cn("h-4 w-4", role === 'staff' ? "text-amber-500" : "text-orange-500")} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{critical}</div>
                        <p className="text-xs text-muted-foreground">
                            {role === 'staff' ? "Severity: High/Critical" : "Safety or Gross Misconduct"}
                        </p>
                    </CardContent>
                </Card>
                 <Card className={cn("tactical-card border-l-4", role === 'staff' ? "border-l-emerald-500" : "border-l-green-500")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Compliance Standing</CardTitle>
                        <Scale className={cn("h-4 w-4", role === 'staff' ? "text-emerald-500" : "text-green-500")} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {role === 'staff' ? (openCases === 0 ? "Good" : "Under Review") : "98.2%"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                             {role === 'staff' ? "Policy Adherence Status" : "Workforce adhering to policy"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex-1 min-h-0 container mx-auto p-0">
                <DisciplinaryList cases={filteredCases as any[]} />
            </div>
        </div>
    )
}
