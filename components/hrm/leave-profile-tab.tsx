import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Umbrella, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { LeaveBalance, LeaveRequest } from "@/lib/data/generators"

interface LeaveProfileTabProps {
    balances: LeaveBalance[];
    requests: LeaveRequest[];
}

export function LeaveProfileTab({ balances, requests }: LeaveProfileTabProps) {
    return (
        <div className="space-y-6">
            {/* Balances Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {balances.map((balance) => (
                    <Card key={balance.type} className="tactical-card border-l-4 border-l-primary/50 bg-card/40">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="technical-label">{balance.type} Leave</CardTitle>
                            <Umbrella className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-2xl font-bold font-mono text-primary">{balance.available}</div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Days Available</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-mono text-muted-foreground">{balance.used} / {balance.total}</div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Usage Cycle</p>
                                </div>
                            </div>
                            <div className="mt-3 h-1 w-full bg-muted/30 overflow-hidden">
                                <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${(balance.used / balance.total) * 100}%` }} 
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Application History */}
            <Card className="tactical-card overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20">
                    <CardTitle className="technical-label">Leave Application History</CardTitle>
                    <CardDescription className="text-[10px] uppercase font-mono">Detailed log of all absence authorizations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/30">
                                <TableHead className="pl-6 technical-label">Type</TableHead>
                                <TableHead className="technical-label">Duration</TableHead>
                                <TableHead className="technical-label">Status</TableHead>
                                <TableHead className="technical-label">Request Date</TableHead>
                                <TableHead className="text-right pr-6 technical-label">Approved By</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id} className="border-border/20 hover:bg-primary/5 transition-colors">
                                    <TableCell className="pl-6 font-mono text-xs uppercase text-primary">{request.type}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono">{request.startDate} ➟ {request.endDate}</span>
                                            <span className="text-[9px] text-muted-foreground uppercase">{request.days} Units</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full",
                                                request.status === 'Approved' ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" :
                                                request.status === 'Pending' ? "bg-amber-500 animate-pulse" :
                                                request.status === 'Rejected' ? "bg-red-500" : "bg-slate-500"
                                            )} />
                                            {request.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs font-mono text-muted-foreground">{request.appliedDate}</TableCell>
                                    <TableCell className="text-right pr-6 text-[10px] uppercase font-mono text-muted-foreground">
                                        {request.approvedBy || "—"}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {requests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-xs text-muted-foreground uppercase font-mono">
                                        No historical records found for this unit.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
