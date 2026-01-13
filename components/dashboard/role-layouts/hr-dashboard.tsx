"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, UserPlus, Clock, CalendarDays, TrendingUp, TrendingDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function HRDashboard({ data }: { data: any }) {
    const { stats, upcomingReviews } = data
    
    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Personnel Command</h2>
                    <p className="text-muted-foreground">Human Resources Overview</p>
                </div>
            </div>

            {/* HR Core Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="tactical-card border-l-4 border-l-pink-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Headcount</CardTitle>
                        <Users className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalEmployees}</div>
                        <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
                    </CardContent>
                </Card>

                <Card className="tactical-card border-l-4 border-l-amber-500">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
                        <CalendarDays className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground mt-1">Requires Approval</p>
                    </CardContent>
                </Card>

                 <Card className="tactical-card border-l-4 border-l-blue-500">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.2%</div>
                        <p className="text-xs text-muted-foreground mt-1">Daily Average</p>
                    </CardContent>
                </Card>

                 <Card className="tactical-card border-l-4 border-l-green-500">
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hiring Pipeline</CardTitle>
                        <UserPlus className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground mt-1">Open Positions</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Departmental Distribution</CardTitle>
                        <CardDescription>Employee count by department</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            {[
                                { dept: "Production", count: 342, pct: 70 },
                                { dept: "Qualtity Control", count: 45, pct: 12 },
                                { dept: "Merchandising", count: 28, pct: 8 },
                                { dept: "Maintenance", count: 20, pct: 5 },
                                { dept: "HR & Admin", count: 15, pct: 3 },
                            ].map((d) => (
                                <div key={d.dept} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{d.dept}</span>
                                        <span className="text-muted-foreground">{d.count} Staff</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${d.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                         </div>
                    </CardContent>
                </Card>

                 <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Reviews</CardTitle>
                        <CardDescription>KPI Appraisals due this week</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                            {upcomingReviews?.map((employee: any) => (
                                <div key={employee.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <Avatar className="h-10 w-10 border-2 border-border">
                                        <AvatarImage src={employee.avatar} />
                                        <AvatarFallback>{employee.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{employee.name}</p>
                                        <p className="text-xs text-muted-foreground">{employee.role}</p>
                                    </div>
                                    {employee.kpiTrend === 'up' ? (
                                         <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                         <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
