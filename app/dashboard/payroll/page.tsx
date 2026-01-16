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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PayslipDialog } from "@/components/hrm/payslip-dialog"
import { SearchInput } from "@/components/search-input"
import { Suspense } from "react"
import { ExecutePayrollDialog } from "@/components/hrm/execute-payroll-dialog"
import { getPayslips } from "@/lib/db/queries"

export default async function PayrollPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = searchParams?.q || '';

    // Fetch Payslips 
    const { data: payslips } = await getPayslips(1, 100);

    const stats = {
        totalDisbursed: payslips.reduce((acc, p) => acc + (p.netSalary || 0), 0),
        pendingCycles: payslips.filter(p => p.status === 'Processing').length,
        averageSalary: payslips.length > 0 ? Math.floor(payslips.reduce((acc, p) => acc + (p.netSalary || 0), 0) / payslips.length) : 0,
        paidCount: payslips.filter(p => p.status === 'Paid').length
    };

    return (
        <div className="space-y-6 tactical-grid min-h-screen p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Banknote className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                        <h2 className="text-3xl font-bold tracking-tighter uppercase">Payroll Control Center</h2>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-8">Fiscal Disbursement & Compensation Audit</p>
                </div>
                <div className="flex items-center gap-4">
                    <Suspense fallback={<div className="h-9 w-[300px] bg-card/20 animate-pulse border border-primary/10" />}>
                        <SearchInput placeholder="SEARCH DISBURSEMENT ID..." />
                    </Suspense>
                    <ExecutePayrollDialog />
                </div>
            </div>

            {/* Tactical Stats Bento */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { label: "Total Disbursement", value: `৳${stats.totalDisbursed.toLocaleString()}`, icon: Banknote, color: "text-primary", glow: "0_0_15px_rgba(6,182,212,0.3)" },
                    { label: "Execution Cycles", value: stats.paidCount, icon: CreditCard, color: "text-emerald-500", glow: "0_0_15px_rgba(16,185,129,0.3)" },
                    { label: "Avg Compensation", value: `৳${stats.averageSalary.toLocaleString()}`, icon: TrendingUp, color: "text-amber-500", glow: "0_0_15px_rgba(245,158,11,0.3)" },
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
                        <CardTitle className="technical-label">Disbursement Execution Roll</CardTitle>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">Authorized personnel compensation logs</p>
                    </div>
                    <Button variant="outline" size="xs" className="h-7 font-mono text-[9px] uppercase border-primary/30 hover:bg-primary/10">
                        <Download className="mr-1.5 h-3 w-3" />
                        Export Master Roll
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent border-primary/10">
                                <TableHead className="pl-6 technical-label">Reference ID</TableHead>
                                <TableHead className="technical-label">Personnel Unit</TableHead>
                                <TableHead className="technical-label">Cycle Month</TableHead>
                                <TableHead className="technical-label">Net Disbursement</TableHead>
                                <TableHead className="technical-label">Status</TableHead>
                                <TableHead className="text-right pr-6 technical-label">Execution</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payslips.map((slip) => (
                                <TableRow key={slip.id} className="border-primary/5 hover:bg-primary/5 transition-all">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded bg-primary/10">
                                                <FileText className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <span className="font-mono text-xs text-primary">{slip.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-tight">{slip.employeeName}</span>
                                            <span className="text-[9px] font-mono text-muted-foreground">{slip.employeeId}</span>
                                        </div>
                                    </TableCell>
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
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
