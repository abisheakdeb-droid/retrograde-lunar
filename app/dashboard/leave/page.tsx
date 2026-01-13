import * as React from "react"
import { cn } from "@/lib/utils"
import { LeaveRequestDialog } from "@/components/hrm/leave-request-dialog"
export const dynamic = 'force-dynamic';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  Search, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  Users
} from "lucide-react"
import { prisma } from "@/lib/db"

export default async function LeaveManagementPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = searchParams?.q || '';

    // Fetch Leave Requests with Search
    const leaveRequests = await prisma.leaveRequest.findMany({
        where: search ? {
            OR: [
                { employeeName: { contains: search } },
                { type: { contains: search } }
            ]
        } : {},
        take: 100,
        orderBy: { appliedDate: 'desc' }
    });

    // Holidays are static for now, or could be in DB. Let's keep them static or mock them if not in DB. 
    // Wait, I saw holidays usage. Let's check if I added a Holiday model. 
    // I did NOT add a Holiday model in the schema update. 
    // I will use a static list or keep the mock-db call for holidays ONLY if strictly necessary, 
    // but better to just mock it inline to remove db dependency.
    const holidays = [
        { id: '1', date: '2026-02-21', name: 'International Mother Language Day', type: 'Public Holiday' },
        { id: '2', date: '2026-03-26', name: 'Independence Day', type: 'Public Holiday' },
        { id: '3', date: '2026-04-14', name: 'Bengali New Year', type: 'Public Holiday' },
        { id: '4', date: '2026-05-01', name: 'May Day', type: 'Public Holiday' },
    ];

    const stats = {
      pending: leaveRequests.filter(r => r.status === 'Pending').length,
      approved: leaveRequests.filter(r => r.status === 'Approved').length,
      upcomingHolidays: holidays.filter(h => new Date(h.date) >= new Date()).length
    };

    return (
        <div className="space-y-6 tactical-grid min-h-screen p-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                        <h2 className="text-3xl font-bold tracking-tighter uppercase">Leave & Holiday Matrix</h2>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-8">Operational Attendance & Deployment Control</p>
                </div>



                <div className="flex items-center gap-2">
                    <LeaveRequestDialog />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Personnel on Leave", value: stats.approved, icon: Users, color: "text-emerald-500", glow: "0_0_10px_rgba(16,185,129,0.3)" },
                  { label: "Await Authorization", value: stats.pending, icon: Clock, color: "text-amber-500", glow: "0_0_10px_rgba(245,158,11,0.3)" },
                  { label: "Cycle Holidays", value: stats.upcomingHolidays, icon: Calendar, color: "text-primary", glow: "0_0_10px_rgba(6,182,212,0.3)" },
                ].map((stat, i) => (
                  <Card key={i} className="tactical-card border-l-4 border-l-primary/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="technical-label">{stat.label}</CardTitle>
                      <stat.icon className={cn("h-4 w-4", stat.color)} />
                    </CardHeader>
                    <CardContent>
                      <div className={cn("text-2xl font-bold font-mono tracking-tighter", stat.color)} style={{ textShadow: stat.glow }}>{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <Tabs defaultValue="requests" className="w-full">
                <TabsList className="bg-card/50 border border-border/50 rounded-none h-10 p-1">
                    <TabsTrigger value="requests" className="technical-label rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6">Leave Requests</TabsTrigger>
                    <TabsTrigger value="calendar" className="technical-label rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6">Holiday Calendar</TabsTrigger>
                </TabsList>

                <TabsContent value="requests" className="mt-6">
                    <Card className="tactical-card bg-card/40 backdrop-blur-sm border-t-0">
                        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
                            <CardTitle className="technical-label">Request Queue</CardTitle>
                            <div className="flex items-center gap-2 border border-border/50 px-3 py-1 bg-background/50">
                                <Search className="h-3 w-3 text-muted-foreground" />
                                <input 
                                    placeholder="Search Personnel..." 
                                    className="bg-transparent border-none text-[10px] font-mono focus:ring-0 w-48 uppercase tracking-widest"
                                />
                            </div>
                        </div>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow className="hover:bg-transparent border-border/30">
                                        <TableHead className="pl-6 technical-label">Personnel</TableHead>
                                        <TableHead className="technical-label">Type</TableHead>
                                        <TableHead className="technical-label">Duration</TableHead>
                                        <TableHead className="technical-label">Status</TableHead>
                                        <TableHead className="technical-label">Applied Date</TableHead>
                                        <TableHead className="text-right pr-6 technical-label">Execution</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leaveRequests.map((req) => (
                                        <TableRow key={req.id} className="border-border/20 hover:bg-primary/5 transition-colors group">
                                            <TableCell className="pl-6">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8 rounded-none border border-border/50">
                                                        <AvatarImage src={req.employeeAvatar || undefined} />
                                                        <AvatarFallback className="rounded-none font-mono text-[10px]">{req.employeeName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-semibold uppercase">{req.employeeName}</span>
                                                        <span className="text-[9px] text-muted-foreground font-mono">{req.employeeId}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-[9px] uppercase font-mono rounded-none border-border/50">{req.type}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-mono">{req.startDate} ➟ {req.endDate}</span>
                                                    <span className="text-[9px] text-muted-foreground uppercase">{req.days} Units</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase">
                                                    <div className={cn(
                                                        "h-1.5 w-1.5 rounded-full",
                                                        req.status === 'Approved' ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" :
                                                        req.status === 'Pending' ? "bg-amber-500 animate-pulse" :
                                                        req.status === 'Rejected' ? "bg-red-500" : "bg-slate-500"
                                                    )} />
                                                    {req.status}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{req.appliedDate}</TableCell>
                                            <TableCell className="text-right pr-6 text-[9px]">
                                                {req.status === 'Pending' ? (
                                                  <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-500 hover:bg-emerald-500/20"><CheckCircle2 className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:bg-red-500/20"><XCircle className="h-4 w-4" /></Button>
                                                  </div>
                                                ) : (
                                                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-20"><FileText className="h-4 w-4" /></Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="calendar" className="mt-6">
                    <Card className="tactical-card bg-card/40 backdrop-blur-sm border-t-0 p-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {holidays.map((holiday) => (
                                <div key={holiday.id} className="border border-border/50 bg-background/30 p-4 space-y-3 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-100 transition-opacity">
                                      <Badge variant="outline" className="text-[8px] rounded-none border-primary/30 uppercase">{holiday.type}</Badge>
                                    </div>
                                    <div className="text-2xl font-bold font-mono text-primary italic">
                                      {new Date(holiday.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="technical-label text-foreground text-[11px] leading-tight">{holiday.name}</span>
                                      <span className="text-[9px] text-muted-foreground uppercase font-mono mt-1">Status: Operational Shutdown</span>
                                    </div>
                                    <div className="h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
