"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import { 
    Banknote, 
    Download, 
    FileText, 
    TrendingUp, 
    CreditCard,
    Lock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PayslipDialog } from "@/components/hrm/payslip-dialog"
import { SearchInput } from "@/components/search-input"
import { ExecutePayrollDialog } from "@/components/hrm/execute-payroll-dialog"
import { useDemoRole } from "@/components/providers/demo-role-provider"
import { useMemo } from "react"

interface Payslip {
    id: string
    employeeId: string
    employeeName: string
    month: string
    year: number
    netSalary: number
    status: 'Paid' | 'Processing' | 'Hold'
    earnings: { name: string; amount: number }[]
    deductions: { name: string; amount: number }[]
}

interface PayrollViewProps {
    payslips: Payslip[]
}

export function PayrollView({ payslips }: PayrollViewProps) {
    const { role } = useDemoRole()

    // Filter Logic:
    // If Staff: Show specific user data (simulated by picking 'HMG-1004' or similar, or just the first user in the list for consistency)
    // If Admin/HR/MD: Show all
    
    // We'll pick a "Demo Staff Identity" - let's say "Kathy Kohler" (HMG-1004) if she exists, or just filter by the ID of the 4th item to be safe.
    // For reliability, let's find a user with ID 'HMG-1004' or just use the first 'Paid' one.
    
    const DEMO_STAFF_ID = "HMG-1004" // Kathy Kohler from chat

    const filteredPayslips = useMemo(() => {
        if (role === 'staff') {
            // Try to find Kathy, if not, pick the first available ID to simulate "Me"
            const targetId = payslips.find(p => p.employeeId === DEMO_STAFF_ID)?.employeeId || payslips[0]?.employeeId;
            return payslips.filter(p => p.employeeId === targetId);
        }
        return payslips;
    }, [payslips, role]);

    const stats = {
        totalDisbursed: filteredPayslips.reduce((acc, p) => acc + (p.netSalary || 0), 0),
        pendingCycles: filteredPayslips.filter(p => p.status === 'Processing').length,
        averageSalary: filteredPayslips.length > 0 ? Math.floor(filteredPayslips.reduce((acc, p) => acc + (p.netSalary || 0), 0) / filteredPayslips.length) : 0,
        paidCount: filteredPayslips.filter(p => p.status === 'Paid').length
    };

    return (
        <div className="space-y-6 tactical-grid min-h-screen p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Banknote className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                        <h2 className="text-3xl font-bold tracking-tighter uppercase">
                            {role === 'staff' ? "My Compensation" : "Payroll Control Center"}
                        </h2>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-8">
                        {role === 'staff' ? "Personal Fiscal & Disbursement Logs" : "Fiscal Disbursement & Compensation Audit"}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {role !== 'staff' && (
                        <>
                             <SearchInput placeholder="SEARCH DISBURSEMENT ID..." />
                             <ExecutePayrollDialog />
                        </>
                    )}
                    {role === 'staff' && (
                        <Badge variant="outline" className="font-mono text-emerald-500 border-emerald-500/50 bg-emerald-500/10 gap-1 px-3 py-1">
                            <Lock className="w-3 h-3" />
                            PRIVATE ACCESS
                        </Badge>
                    )}
                </div>
            </div>

            {/* Tactical Stats Bento */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: role === 'staff' ? "Total Received" : "Total Disbursement", value: `৳${stats.totalDisbursed.toLocaleString()}`, icon: Banknote, color: "text-primary", glow: "0_0_15px_rgba(6,182,212,0.3)" },
                    { label: "Execution Cycles", value: stats.paidCount, icon: CreditCard, color: "text-emerald-500", glow: "0_0_15px_rgba(16,185,129,0.3)" },
                    { label: role === 'staff' ? "Avg Monthly" : "Avg Compensation", value: `৳${stats.averageSalary.toLocaleString()}`, icon: TrendingUp, color: "text-amber-500", glow: "0_0_15px_rgba(245,158,11,0.3)" },
                    { label: "Pending Auth", value: stats.pendingCycles, icon: FileText, color: "text-red-500", glow: "0_0_15px_rgba(239,68,68,0.3)" },
                ].map((stat, i) => (
                    <Card key={i} className="tactical-card border-l-4 border-l-primary/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 transition-transform group-hover:scale-175">
                            <stat.icon className="h-12 w-12" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                            <CardTitle className="technical-label">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={cn("text-xl font-bold font-mono tracking-tighter", stat.color)} style={{ textShadow: stat.glow }}>{stat.value}</div>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-[8px] font-mono text-muted-foreground uppercase">Stability Level: 100%</span>
                                <div className="h-1 w-12 bg-muted/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '100%' }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Execution Roll */}
            <Card className="tactical-card overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between py-4">
                    <div>
                        <CardTitle className="technical-label">
                            {role === 'staff' ? "My Payment History" : "Disbursement Execution Roll"}
                        </CardTitle>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">
                            {role === 'staff' ? "Confidential personal records" : "Authorized personnel compensation logs"}
                        </p>
                    </div>
                    {role !== 'staff' && (
                        <Button variant="outline" size="xs" className="h-7 font-mono text-[9px] uppercase border-primary/30 hover:bg-primary/10">
                            <Download className="mr-1.5 h-3 w-3" />
                            Export Master Roll
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent border-primary/10">
                                <TableHead className="pl-6 technical-label">Reference ID</TableHead>
                                {role !== 'staff' && <TableHead className="technical-label">Personnel Unit</TableHead>}
                                <TableHead className="technical-label">Cycle Month</TableHead>
                                <TableHead className="technical-label">Net Disbursement</TableHead>
                                <TableHead className="technical-label">Status</TableHead>
                                <TableHead className="text-right pr-6 technical-label">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayslips.length === 0 ? (
                               <TableRow>
                                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-mono">
                                       No records found.
                                   </TableCell>
                               </TableRow>
                            ) : (
                            filteredPayslips.map((slip) => (
                                <TableRow key={slip.id} className="border-primary/5 hover:bg-primary/5 transition-all">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded bg-primary/10">
                                                <FileText className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <span className="font-mono text-xs text-primary">{slip.id}</span>
                                        </div>
                                    </TableCell>
                                    {role !== 'staff' && (
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold uppercase tracking-tight">{slip.employeeName}</span>
                                                <span className="text-[9px] font-mono text-muted-foreground">{slip.employeeId}</span>
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-mono uppercase bg-muted/50">
                                            {slip.month}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-mono text-xs font-bold text-primary">
                                            ৳{slip.netSalary.toLocaleString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full shadow-[0_0_5px]",
                                                slip.status === 'Paid' ? "bg-emerald-500 shadow-emerald-500/50" : 
                                                slip.status === 'Processing' ? "bg-amber-500 animate-pulse shadow-amber-500/50" : "bg-red-500"
                                            )} />
                                            <span className="text-[9px] font-mono uppercase">{slip.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <PayslipDialog payslip={slip as any} />
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
