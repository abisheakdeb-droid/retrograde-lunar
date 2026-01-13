import { notFound } from "next/navigation"
import { db } from "@/lib/data/mock-db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ActionBar } from "@/components/action-bar"
import { Briefcase, Calendar, Clock, DollarSign, Mail, MapPin, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EditEmployeeDialog } from "@/components/hrm/edit-employee-dialog"
import { DeleteEmployeeDialog } from "@/components/hrm/delete-employee-dialog"
import { auth } from "@/auth"
import { hasPermission } from "@/lib/auth/permissions"
import { MyRequisitions } from "@/components/requisitions/my-requisitions"
import { getEmployeeRequisitions } from "@/lib/data/generators"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaveProfileTab } from "@/components/hrm/leave-profile-tab"
import { Umbrella } from "lucide-react"

interface ProfilePageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EmployeeProfilePage({ params }: ProfilePageProps) {
    const { id } = await params
    const employee = await db.getEmployeeById(id)
    const session = await auth()
    const userRole = (session?.user as any)?.role

    if (!employee) {
        notFound()
    }

    const requisitions = getEmployeeRequisitions(employee.id)
    const { data: allLeaveRequests } = await db.getLeaveRequests(1, 100)
    const employeeLeaveRequests = allLeaveRequests.filter(r => r.employeeId === employee.id)

    return (
        <div className="space-y-6 animate-in fade-in-0 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/hrm"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Employee Profile</h2>
                        <p className="text-muted-foreground">Detailed records for {employee.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ActionBar />
                    {hasPermission(userRole, "canEditEmployee") && (
                        <EditEmployeeDialog employee={employee} />
                    )}
                    {hasPermission(userRole, "canDeleteEmployee") && (
                        <DeleteEmployeeDialog employeeId={employee.id} employeeName={employee.name} />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Personal Info */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="text-center overflow-hidden">
                        <div className="bg-muted h-32 w-full absolute top-0 left-0 z-0 opacity-20" />
                        <CardHeader className="relative z-10 pt-12 pb-2">
                            <Avatar className="h-32 w-32 mx-auto ring-4 ring-background shadow-xl">
                                <AvatarImage src={employee.avatar} />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="mt-4">
                                <CardTitle className="text-2xl">{employee.name}</CardTitle>
                                <CardDescription className="text-lg font-medium text-primary mt-1">{employee.role}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10 pb-8">
                            <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'} className="mb-6 px-4 py-1 text-sm bg-green-500 hover:bg-green-600 text-white">
                                {employee.status}
                            </Badge>

                            <div className="grid gap-4 text-left p-4 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-3 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-mono">{employee.employeeId}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="truncate">{employee.email}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3 text-sm">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span>{employee.department}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Joined {employee.joinDate}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Performance Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between mb-2">
                                <span className="text-4xl font-bold">{employee.performance}%</span>
                                <span className="text-sm text-green-600 font-medium mb-1">+2% vs last review</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${employee.performance}%` }} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed Views with Tabs */}
                <div className="md:col-span-2 space-y-6">
                    <Tabs defaultValue="attendance" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="attendance">Attendance</TabsTrigger>
                            <TabsTrigger value="leave">Leave & Holidays</TabsTrigger>
                            <TabsTrigger value="requisitions">My Requisitions</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="attendance" className="mt-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-card">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Daily Punch In</CardTitle>
                                        <Clock className="h-4 w-4 text-green-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{employee.attendance[0]?.clockIn || '--:--'}</div>
                                        <p className="text-xs text-muted-foreground">On Time</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-card">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Daily Punch Out</CardTitle>
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{employee.attendance[0]?.clockOut || '--:--'}</div>
                                        <p className="text-xs text-muted-foreground">Scheduled</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-card">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Working Hours</CardTitle>
                                        <DollarSign className="h-4 w-4 text-blue-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{employee.attendance[0]?.totalHours || '0h'}</div>
                                        <p className="text-xs text-muted-foreground">Today's Log</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <AttendanceHistoryTable employeeId={employee.id} />
                        </TabsContent>

                        <TabsContent value="leave" className="mt-6">
                            <LeaveProfileTab 
                                balances={employee.leaveBalances} 
                                requests={employeeLeaveRequests} 
                            />
                        </TabsContent>

                        <TabsContent value="requisitions" className="mt-6">
                            <MyRequisitions requisitions={requisitions} />
                        </TabsContent>

                        <TabsContent value="projects" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project History</CardTitle>
                                    <CardDescription>Records of past and active project involvement.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {employee.projects.map((project, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
                                                <div className="space-y-1">
                                                    <h4 className="font-semibold">{project.name}</h4>
                                                    <p className="text-sm text-muted-foreground">Role: {project.role}</p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <Badge variant="outline" className={project.status === 'Completed' ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10' : 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/10'}>
                                                        {project.status}
                                                    </Badge>
                                                    <p className="text-xs text-muted-foreground">{project.period}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {employee.projects.length === 0 && (
                                            <p className="text-sm text-muted-foreground text-center py-4">No project records found.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

async function AttendanceHistoryTable({ employeeId }: { employeeId: string }) {
    const history = await db.getAttendanceHistory(employeeId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Attendance Sheet</CardTitle>
                <CardDescription>
                    Official record of work hours, overtime, and holidays.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Clock In</TableHead>
                            <TableHead>Clock Out</TableHead>
                            <TableHead>Total Hours</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((record: any, index: number) => (
                            <TableRow key={index} className={record.status === 'Absent' ? 'bg-red-50/50 dark:bg-red-900/10' : ''}>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {new Date(record.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{record.clockIn}</TableCell>
                                <TableCell>{record.clockOut}</TableCell>
                                <TableCell>{record.totalHours}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={
                                        record.status === 'Present' ? 'text-green-600 border-green-200' :
                                            record.status === 'Holiday' ? 'text-blue-600 border-blue-200' :
                                                'text-red-600 border-red-200'
                                    }>
                                        {record.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        {record.isOvertime && (
                                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400">
                                                Overtime (&gt;11PM)
                                            </Badge>
                                        )}
                                        {record.isHolidayWork && (
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
                                                Holiday Pay
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
