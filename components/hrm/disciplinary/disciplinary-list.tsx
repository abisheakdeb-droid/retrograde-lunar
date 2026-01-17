"use client"

import { DisciplinaryCase } from "@/lib/data/mock-db"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AlertCircle, User, Calendar, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface DisciplinaryListProps {
    cases: DisciplinaryCase[]
}

export function DisciplinaryList({ cases }: DisciplinaryListProps) {
    const getSeverityColor = (severity: DisciplinaryCase['severity']) => {
        switch(severity) {
            case 'Critical': return "text-red-600 bg-red-100 border-red-200"
            case 'High': return "text-orange-600 bg-orange-100 border-orange-200"
            case 'Medium': return "text-amber-600 bg-amber-100 border-amber-200"
            default: return "text-blue-600 bg-blue-100 border-blue-200"
        }
    }

    const getStatusColor = (status: DisciplinaryCase['status']) => {
        switch(status) {
            case 'Show-Cause': return "text-purple-600 border-purple-200"
            case 'Terminated': return "text-red-600 border-red-200"
            case 'Resolved': return "text-green-600 border-green-200"
            default: return "text-muted-foreground border-border"
        }
    }

    return (
        <div className="space-y-4">
            {cases.map((record) => (
                <Card key={record.id} className="tactical-card group hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-start">
                        {/* Avatar & Severity */}
                        <div className="flex flex-col items-center gap-2 min-w-[80px]">
                            <Avatar className="h-12 w-12 border-2 border-muted">
                                <AvatarImage src={record.employeeAvatar} />
                                <AvatarFallback>{record.employeeName[0]}</AvatarFallback>
                            </Avatar>
                            <Badge variant="outline" className={cn("text-[10px] uppercase font-bold px-2", getSeverityColor(record.severity))}>
                                {record.severity}
                            </Badge>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-2">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                    <h3 className="font-semibold text-lg">{record.employeeName}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-mono text-xs bg-muted px-1 rounded">{record.employeeId}</span>
                                        <span>•</span>
                                        <span>{record.type} Violation</span>
                                    </div>
                                </div>
                                <Badge variant="outline" className={cn("w-fit", getStatusColor(record.status))}>
                                    {record.status}
                                </Badge>
                             </div>

                             <div className="bg-muted/30 p-3 rounded-md text-sm italic border-l-2 border-border">
                                &quot;{record.description}&quot;
                             </div>

                             <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {record.incidentDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" /> Reported by {record.reportedBy}
                                </span>
                             </div>
                        </div>

                        {/* Actions List (Mini Timeline) */}
                        <div className="md:w-64 min-w-[200px] border-l md:pl-4 pl-0 pt-4 md:pt-0 space-y-2">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                                <FileText className="h-3 w-3" /> Case Activity
                            </h4>
                            <div className="space-y-2 relative">
                                {record.actionsTaken.map((action, idx) => (
                                    <div key={idx} className="text-xs relative pl-3 border-l text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground absolute -left-[3.5px] top-1.5" />
                                        {action}
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" size="sm" className="w-full text-xs mt-2 h-7" disabled={record.status === 'Resolved'}>
                                Manage Case
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
