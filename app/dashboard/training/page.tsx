import { SkillVelocityChartWrapper } from "@/components/analytics/skill-velocity-chart-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, BookOpen, UserCheck, Zap, MonitorPlay, ShieldCheck } from "lucide-react"

export default function TrainingPage() {
  const activeModules = [
    { name: "Advanced Fabric Analysis", progress: 65, total: "12h", icon: MonitorPlay },
    { name: "Industrial Safety Protocols", progress: 32, total: "8h", icon: ShieldCheck },
    { name: "Leadership in Supply Chain", progress: 88, total: "20h", icon: UserCheck },
  ]

  const certifications = [
    { name: "ISO 9001:2015 Lead Auditor", date: "Jan 12, 2026", type: "Quality" },
    { name: "Six Sigma Green Belt", date: "Dec 05, 2025", type: "Process" },
    { name: "Certified Safety Manager", date: "Nov 20, 2025", type: "Safety" },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary neon-glow-cyan" />
            Personnel Training Command
          </h1>
          <p className="text-muted-foreground">Skill development and certification tracking matrix.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <div className="col-span-4">
             <SkillVelocityChartWrapper />
        </div>

        {/* Stats and Quick Actions */}
        <div className="col-span-3 grid gap-4">
             <Card className="tactical-card">
                 <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium">Total Training Hours</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <div className="text-3xl font-bold text-primary neon-text-cyan">1,248h</div>
                     <p className="text-xs text-muted-foreground mt-1">+12% from last cycle</p>
                 </CardContent>
             </Card>
             <Card className="tactical-card">
                 <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-medium">Certified Personnel</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <div className="text-3xl font-bold text-amber-500 neon-text-amber">86%</div>
                     <p className="text-xs text-muted-foreground mt-1">42 pending assessments</p>
                 </CardContent>
             </Card>
             <Card className="tactical-card row-span-2">
                <CardHeader>
                    <CardTitle className="text-sm">Active Assignments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activeModules.map((module) => (
                        <div key={module.name} className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <module.icon className="h-3 w-3 text-primary" />
                                    <span>{module.name}</span>
                                </div>
                                <span className="font-mono text-muted-foreground">{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-1" />
                        </div>
                    ))}
                </CardContent>
             </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((cert) => (
              <Card key={cert.name} className="tactical-card border-l-4 border-l-primary hover:border-l-amber-500 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{cert.type}</CardTitle>
                      <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-lg font-bold">{cert.name}</div>
                      <p className="text-xs text-muted-foreground mt-1">Issued: {cert.date}</p>
                      <Badge variant="outline" className="mt-3 bg-primary/10 border-primary/20 text-primary">Verified</Badge>
                  </CardContent>
              </Card>
          ))}
      </div>
    </div>
  )
}
