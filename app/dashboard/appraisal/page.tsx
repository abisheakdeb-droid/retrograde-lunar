import { db } from "@/lib/data/mock-db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Award, Clock, Users, BarChart3 } from "lucide-react"
// Reusing the radar chart logic but adapted for this page
import { AppraisalRadarChart } from "@/components/analytics/appraisal-radar-chart" // Will create this next

export default async function AppraisalPage() {
  const { data: employees } = await db.getEmployees(1, 100)
  
  // Calculate Stats
  const avgScore = Math.round(employees.reduce((acc, curr) => acc + (curr.performance || 0), 0) / employees.length)
  const topPerformer = [...employees].sort((a, b) => (b.performance || 0) - (a.performance || 0))[0]
  const pendingReviews = employees.filter(e => !e.performance || e.performance < 50).length // Arbitrary logic for pending
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Appraisal</h1>
          <p className="text-muted-foreground">Monitor and evaluate workforce performance metrics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary neon-glow-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last quarter</p>
          </CardContent>
        </Card>
        <Card className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Award className="h-4 w-4 text-amber-500 neon-glow-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{topPerformer?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Score: {topPerformer?.performance}%</p>
          </CardContent>
        </Card>
        <Card className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Due within 7 days</p>
          </CardContent>
        </Card>
        <Card className="tactical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff Evaluated</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">100% participation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Radar Chart Section */}
        <Card className="col-span-3 tactical-card">
          <CardHeader>
            <CardTitle>Departmental Skill Matrix</CardTitle>
            <CardDescription>Aggregate skill proficiency across departments</CardDescription>
          </CardHeader>
          <CardContent>
             <AppraisalRadarChart />
          </CardContent>
        </Card>

        {/* Employee Table Section */}
        <Card className="col-span-4 tactical-card overflow-hidden">
          <CardHeader>
             <CardTitle>Employee Performance List</CardTitle>
             <CardDescription>Recent evaluations and scores</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.slice(0, 8).map((employee) => (
                  <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-xs">{employee.employeeId}</TableCell>
                    <TableCell>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.department}</div>
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell className="text-right font-mono table-cell-tabular">
                        <span className={employee.performance > 90 ? "text-green-500" : employee.performance > 75 ? "text-blue-500" : "text-yellow-500"}>
                            {employee.performance}%
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                        <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                            {employee.status}
                        </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
