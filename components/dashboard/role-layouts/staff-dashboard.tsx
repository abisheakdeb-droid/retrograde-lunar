"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle2, AlertCircle, FileText, Shirt } from "lucide-react"
import { PendingTasksSheet } from "./pending-tasks-sheet"
import Link from "next/link"

export function StaffDashboard() {
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Staff Workspace</h2>
                    <p className="text-muted-foreground">Welcome back, Operator.</p>
                </div>
                <Badge variant="outline" className="border-primary text-primary neon-glow-cyan">
                    Status: ACTIVE
                </Badge>
            </div>

            {/* Personal Vitals */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="tactical-card md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Shift Status</CardTitle>
                        <Clock className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">On Duty</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Shift B (14:00 - 22:00) • Line 14
                        </p>
                        <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[65%]" />
                        </div>
                        <p className="text-[10px] text-right mt-1 text-muted-foreground">65% Complete</p>
                    </CardContent>
                </Card>

                <Card className="tactical-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98%</div>
                        <p className="text-xs text-muted-foreground mt-1">Rank: Gold Tier</p>
                    </CardContent>
                </Card>

                <PendingTasksSheet>
                    <Card className="tactical-card md:col-span-1 cursor-pointer hover:border-amber-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground mt-1">2 Training, 1 Survey</p>
                        </CardContent>
                    </Card>
                </PendingTasksSheet>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Link href="/dashboard/requisition" className="block h-full group">
                    <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                                My Requisitions
                                <FileText className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </CardTitle>
                            <CardDescription>Click to manage requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { item: "Sewing Needles (Pack of 50)", status: "Approved", date: "Today" },
                                    { item: "Safety Gloves", status: "Pending", date: "Yesterday" },
                                ].map((req, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-muted/20 group-hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{req.item}</p>
                                                <p className="text-xs text-muted-foreground">{req.date}</p>
                                            </div>
                                        </div>
                                        <Badge variant={req.status === 'Approved' ? 'default' : 'secondary'}>
                                            {req.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Production Feed</CardTitle>
                        <CardDescription>Updates relevant to your line</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                           <div className="flex gap-4">
                                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm text-foreground">Style #4458 Target Increased</p>
                                    <p className="text-xs text-muted-foreground">Supervisor updated daily target to 1200 pcs.</p>
                                </div>
                           </div>
                           <div className="flex gap-4">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm text-foreground">Quality Check Passed</p>
                                    <p className="text-xs text-muted-foreground">Batch #992 cleared with 0 Defects.</p>
                                </div>
                           </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
