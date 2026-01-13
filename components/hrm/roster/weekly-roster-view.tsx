"use client"

import { useState } from "react"
import { ShiftAssignment } from "@/lib/data/mock-db"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { ShiftAssignmentDialog } from "./shift-assignment-dialog"

interface WeeklyRosterViewProps {
    initialRoster: ShiftAssignment[]
}

export function WeeklyRosterView({ initialRoster }: WeeklyRosterViewProps) {
    const [roster, setRoster] = useState(initialRoster)
    const [selectedAssignment, setSelectedAssignment] = useState<ShiftAssignment | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Helper to group by line
    const lines = Array.from(new Set(roster.map(r => r.lineName))).sort()
    
    // Helper to get unique dates
    const dates = Array.from(new Set(roster.map(r => r.date))).sort()

    const getShift = (line: string, date: string) => {
        return roster.find(r => r.lineName === line && r.date === date)
    }

    const handleCellClick = (assignment: ShiftAssignment) => {
        setSelectedAssignment(assignment)
        setDialogOpen(true)
    }

    const handleSave = (updated: ShiftAssignment) => {
        setRoster(prev => prev.map(r => r.id === updated.id ? updated : r))
    }

    const getStatusColor = (status: ShiftAssignment['status']) => {
        switch(status) {
            case 'Scheduled': return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case 'Completed': return "bg-green-500/10 text-green-500 border-green-500/20"
            case 'Shortage': return "bg-red-500/10 text-red-500 border-red-500/20"
            default: return "bg-muted text-muted-foreground"
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-md border font-mono text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {dates[0]} — {dates[dates.length - 1]}
                    </div>
                    <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span> Morning (A)
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span> Evening (B)
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span> Night (C)
                   </div>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px] bg-muted/30">Production Line</TableHead>
                            {dates.map(date => (
                                <TableHead key={date} className="text-center min-w-[140px] bg-muted/30">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground font-normal">
                                            {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </span>
                                        <span className="font-bold">
                                            {new Date(date).getDate()}
                                        </span>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lines.map(line => (
                            <TableRow key={line}>
                                <TableCell className="font-medium font-mono">{line}</TableCell>
                                {dates.map(date => {
                                    const shift = getShift(line, date)
                                    if (!shift) return <TableCell key={date} className="bg-muted/10" />

                                    return (
                                        <TableCell 
                                            key={date} 
                                            className="p-1 h-[100px] align-top hover:bg-muted/50 cursor-pointer transition-colors border-l border-dashed"
                                            onClick={() => handleCellClick(shift)}
                                        >
                                            <div className="h-full flex flex-col gap-1.5 p-2 rounded-md border border-transparent hover:border-primary/20">
                                                <div className="flex items-center justify-between">
                                                    <Badge 
                                                        variant="outline" 
                                                        className={cn(
                                                            "text-[10px] w-5 h-5 flex items-center justify-center p-0",
                                                            shift.shiftType === 'A' ? "border-blue-500 text-blue-500" :
                                                            shift.shiftType === 'B' ? "border-amber-500 text-amber-500" :
                                                            "border-purple-500 text-purple-500"
                                                        )}
                                                    >
                                                        {shift.shiftType}
                                                    </Badge>
                                                    <span className={cn(
                                                        "text-[10px] px-1.5 py-0.5 rounded-full border",
                                                        getStatusColor(shift.status)
                                                    )}>
                                                        {shift.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <p className="text-xs font-medium line-clamp-1">{shift.supervisorName}</p>
                                                    <p className="text-[10px] text-muted-foreground">{shift.operatorCount} Operators</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <ShiftAssignmentDialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen} 
                assignment={selectedAssignment}
                onSave={handleSave}
            />
        </div>
    )
}
