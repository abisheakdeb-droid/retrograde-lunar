"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ShieldCheck, AlertTriangle, FileText, Activity, AlertOctagon, CheckCircle2 } from "lucide-react"
import { GovernXDualAreaLineChart } from "@/components/charts/governx-dual-area-line-chart"
import { ReportIncidentDialog } from "@/components/compliance/report-incident-dialog"

const riskData = [
  { month: "Jan", incidents: 2, riskScore: 12 },
  { month: "Feb", incidents: 0, riskScore: 5 },
  { month: "Mar", incidents: 1, riskScore: 8 },
  { month: "Apr", incidents: 3, riskScore: 25 },
  { month: "May", incidents: 0, riskScore: 10 },
  { month: "Jun", incidents: 1, riskScore: 15 },
]

const recentIncidents = [
  { id: "INC-2026-042", type: "Safety", severity: "Low", description: "Minor spill in chemical storage", date: "2026-06-12", status: "Resolved" },
  { id: "INC-2026-041", type: "Compliance", severity: "Medium", description: "Fire extinguisher expiry check overdue", date: "2026-06-10", status: "Pending" },
  { id: "INC-2026-039", type: "Safety", severity: "High", description: "Machinery guard malfunction on Line 4", date: "2026-06-05", status: "Resolved" },
]

export default function CompliancePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary neon-glow-cyan" />
            Safety & Compliance
          </h1>
          <p className="text-muted-foreground">Incident monitoring and regulatory audit readiness.</p>
        </div>
        <ReportIncidentDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="tactical-card bg-green-500/5 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-500">Audit Readiness</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500 neon-text-green">98.5%</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for ISO 9001</p>
          </CardContent>
        </Card>
        <Card className="tactical-card bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Safety Days</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary neon-text-cyan">142</div>
            <p className="text-xs text-muted-foreground mt-1">Days without lost time injury</p>
          </CardContent>
        </Card>
        <Card className="tactical-card bg-amber-500/5 border-amber-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-500">Open Actions</CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">8</div>
            <p className="text-xs text-muted-foreground mt-1">Corrective actions pending</p>
          </CardContent>
        </Card>
        <Card className="tactical-card bg-red-500/5 border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-500">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">Low</div>
            <p className="text-xs text-muted-foreground mt-1">Score: 15/100</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 tactical-card">
          <CardHeader>
            <CardTitle className="text-base">Risk Velocity Vector</CardTitle>
            <CardDescription>6-Month incident volume vs risk impact score</CardDescription>
          </CardHeader>
          <CardContent>
             <GovernXDualAreaLineChart
                data={riskData}
                series={[
                  {
                    name: "Risk Score",
                    field: "riskScore",
                    color: "hsl(var(--primary))",
                    fillType: "gradient",
                    gradientColors: ["hsl(var(--primary))", "transparent"],
                    yAxisId: "left"
                  }
                ]}
                xAxisKey="month"
                height={300}
                className="border-0! bg-transparent! p-0!"
                yLeft={{ domain: [0, 40] }}
             />
          </CardContent>
        </Card>

        <Card className="col-span-3 tactical-card">
          <CardHeader>
            <CardTitle className="text-base">Recent Incident Log</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex flex-col gap-2 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className={
                            incident.severity === 'High' ? 'border-red-500 text-red-500' :
                            incident.severity === 'Medium' ? 'border-amber-500 text-amber-500' :
                            'border-blue-500 text-blue-500'
                        }>{incident.severity}</Badge>
                        <span className="text-xs text-muted-foreground font-mono">{incident.date}</span>
                    </div>
                    <p className="text-sm font-medium leading-none">{incident.description}</p>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{incident.id} • {incident.type}</span>
                        <Badge className={
                            incident.status === 'Resolved' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 
                            'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                        }>{incident.status}</Badge>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-3">
            <Card className="tactical-card">
                <CardHeader>
                    <CardTitle className="text-sm">Compliance Targets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>ISO 14001 (Environmental)</span>
                            <span className="text-primary">92%</span>
                        </div>
                        <Progress value={92} className="h-1" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>SA 8000 (Social)</span>
                            <span className="text-green-500">100%</span>
                        </div>
                        <Progress value={100} className="h-1" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>RSC / Accord</span>
                            <span className="text-amber-500">88%</span>
                        </div>
                        <Progress value={88} className="h-1" />
                    </div>
                </CardContent>
            </Card>
      </div>
    </div>
  )
}
