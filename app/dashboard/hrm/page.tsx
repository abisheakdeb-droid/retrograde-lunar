import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BadgeCheck, UserPlus, FileText, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { getEmployees } from "@/lib/db/queries"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/components/search-input"
import { ActionBar } from "@/components/action-bar"

import { AddEmployeeDialog } from "@/components/hrm/add-employee-dialog"
import { ExportButton } from "@/components/export-button"
import { HRMFilters } from "@/components/hrm/hrm-filters"

import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart"

export default async function HRMPage(props: { searchParams: Promise<{ page?: string, q?: string }> }) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;
    const search = searchParams?.q || '';
    const { data: employees, total, totalPages } = await getEmployees(page, 10, search);

    // Mock Data for HRM Chart
    const attendanceData = [
       { name: 'Week 1', present: 85, late: 10, absent: 5 },
       { name: 'Week 2', present: 88, late: 8, absent: 4 },
       { name: 'Week 3', present: 92, late: 5, absent: 3 },
       { name: 'Week 4', present: 90, late: 6, absent: 4 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Human Resource Management</h2>
                    <p className="text-muted-foreground">Manage employee records and attendance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <ActionBar />
                    <HRMFilters />
                    <ExportButton data={employees} type="employees" />
                    <AddEmployeeDialog />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Staff Count</CardTitle>
                        <BadgeCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{total.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Active employees currently</p>
                    </CardContent>
                </Card>
                <Card className="col-span-2">
                     <div className="p-2">
                         <GovernXStackedBarChart 
                            data={attendanceData} 
                            xAxisKey="name"
                            layout="horizontal"
                            type="stacked" // Assuming stacked based on usage (efficiency usually adds up)
                            stacks={[
                                { name: "Present", field: "present", color: "#99EC72" },
                                { name: "Late", field: "late", color: "#FFF478" },
                                { name: "Absent", field: "absent", color: "#FF3C46" }
                            ]}
                            height={180}
                            className="border-0! shadow-none! bg-transparent!"
                            barWidth={40}
                         />
                     </div>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle>Employee Directory</CardTitle>
                            <CardDescription>
                                Real-time database of all personnel.
                            </CardDescription>
                        </div>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <SearchInput placeholder="Search employees by name..." />
                        </React.Suspense>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Employee Name</TableHead>
                                <TableHead>Job Role</TableHead>
                                <TableHead>Department Name</TableHead>
                                <TableHead>Current Status</TableHead>
                                <TableHead className="text-right">Performance Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow key={employee.id} className="group cursor-pointer">
                                    <TableCell className="font-mono text-xs">{employee.employeeId}</TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={employee.avatar || undefined} />
                                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="group-hover:text-primary transition-colors">{employee.name}</span>
                                                <span className="text-xs text-muted-foreground">{employee.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{employee.role}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                                            {employee.department}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                            employee.status === "Active" ? "bg-green-100 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        )}>
                                            {employee.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${employee.performance}%` }} />
                                            </div>
                                            <span className="text-xs text-muted-foreground font-mono">{employee.performance}%</span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" asChild>
                                                <a href={`/dashboard/hrm/${employee.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                    <span className="sr-only">View Profile</span>
                                                </a>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="text-xs text-muted-foreground">
                            Page {page} of {totalPages}
                        </div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page <= 1} asChild>
                                <a href={`?page=${page - 1}&q=${search}`}><ChevronLeft className="h-4 w-4" /></a>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page >= totalPages} asChild>
                                <a href={`?page=${page + 1}&q=${search}`}><ChevronRight className="h-4 w-4" /></a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
