"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MonitorPlay, FileText, ArrowRight } from "lucide-react"

export function PendingTasksSheet({ children }: { children: React.ReactNode }) {
    const tasks = [
        {
            id: 1,
            title: "Advanced Fabric Analysis",
            type: "Training",
            due: "Today",
            duration: "45 mins",
            priority: "High",
            icon: MonitorPlay
        },
        {
            id: 2,
            title: "Q1 Employee Satisfaction Survey",
            type: "Survey",
            due: "Tomorrow",
            duration: "10 mins",
            priority: "Medium",
            icon: FileText
        },
        {
            id: 3,
            title: "Industrial Safety Refresher",
            type: "Training",
            due: "Fri, Jan 16",
            duration: "30 mins",
            priority: "Medium",
            icon: MonitorPlay
        }
    ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                    {children}
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Pending Tasks</SheetTitle>
                    <SheetDescription>
                        You have {tasks.length} active assignments requiring attention.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex flex-col gap-3 p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded bg-primary/10 text-primary">
                                        <task.icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm">{task.title}</h4>
                                        <p className="text-xs text-muted-foreground">{task.type} • {task.duration}</p>
                                    </div>
                                </div>
                                <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
                                    {task.priority}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                                <span>Due: {task.due}</span>
                                <Button size="sm" variant="ghost" className="h-auto p-0 text-primary hover:text-primary/80">
                                    Start Now <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
