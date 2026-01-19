"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTrainingOverview, TrainingProgram, TrainingSession } from "@/services/training-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Calendar, ArrowRight, PlayCircle, BookOpen } from "lucide-react";
import { GovernXRadarChart } from "@/components/charts/governx-radar-chart";
import { EnrollmentDialog } from "./enrollment-dialog";

export function TrainingOverview() {
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [data, setData] = useState<{
    programs: TrainingProgram[];
    sessions: TrainingSession[];
    stats: any;
  } | null>(null);

  useEffect(() => {
    getTrainingOverview().then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading Training Modules...</div>;

  const skillData = [
    { subject: 'Tactical Ops', A: 120, B: 110, fullMark: 150 },
    { subject: 'Cyber Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Leadership', A: 86, B: 130, fullMark: 150 },
    { subject: 'Machinery', A: 99, B: 100, fullMark: 150 },
    { subject: 'Compliance', A: 85, B: 90, fullMark: 150 },
    { subject: 'Logistics', A: 65, B: 85, fullMark: 150 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Programs", value: data.stats.activePrograms, icon: BookOpen, color: "text-blue-500" },
          { label: "Upcoming Sessions", value: data.stats.upcomingSessions, icon: Calendar, color: "text-purple-500" },
          { label: "Trained Personnel", value: data.stats.trainedStaff, icon: Users, color: "text-green-500" },
          { label: "Completion Rate", value: `${data.stats.completionRate}%`, icon: GraduationCap, color: "text-amber-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-card border-border/50 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                <stat.icon className="w-16 h-16" />
             </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Content - Programs list */}
        <div className="md:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold uppercase tracking-tight text-primary">Active Curriculums</h3>
                <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="grid gap-4">
                {data.programs.map((program) => (
                    <motion.div 
                        key={program.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-lg border border-border/50 bg-card/50 p-4 hover:bg-card hover:border-primary/30 transition-all"
                    >
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {program.title}
                                </h4>
                                <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                                    {program.type}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">
                                {program.department} • {program.durationHours} Hours
                            </p>
                        </div>

                        <Button 
                            size="sm" 
                            className="w-full md:w-auto gap-2"
                            onClick={() => setSelectedProgram(program)}
                        >
                            <PlayCircle className="w-4 h-4" />
                            Enroll
                        </Button>
                    </motion.div>
                ))}
            </div>
            
             <h3 className="text-lg font-semibold uppercase tracking-tight text-primary mt-8">Recent Sessions</h3>
             <Card className="bg-card/50">
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Session ID</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Trainer</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {data.sessions.map((session) => (
                                    <tr key={session.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-mono text-xs text-primary">{session.id}</td>
                                        <td className="p-4 align-middle">{session.trainerName}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={session.status === 'Scheduled' ? 'outline' : session.status === 'In Progress' ? 'default' : 'secondary'} className="text-[10px]">
                                                {session.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground text-xs font-mono">
                                            {new Date(session.startDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
             </Card>
        </div>

        {/* Sidebar - Charts */}
        <div className="md:col-span-3 space-y-6">
             <div className="rounded-xl border border-border/50 bg-card p-1">
                 <GovernXRadarChart 
                    title="Department Skill Gap (Avg)" 
                    data={skillData} 
                    height={300}
                 />
                 <div className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground text-center">
                        Comparison of current workforce capability (Green) vs Strategic Targets (Yellow).
                    </p>
                 </div>
             </div>
             
             <Card className="bg-linear-to-br from-purple-900/20 to-blue-900/20 border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg">AI Recommendation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Based on recent tactical reviews, the <strong>Logistics</strong> department requires immediate upskilling in "Quantum Supply Chain" methodologies.
                    </p>
                    <Button variant="secondary" className="w-full">
                        Auto-Assign Training
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </CardContent>
             </Card>
        </div>
      </div>

      
      <EnrollmentDialog 
        open={!!selectedProgram} 
        onOpenChange={(open) => !open && setSelectedProgram(null)}
        program={selectedProgram}
      />
    </div>
  );
}
