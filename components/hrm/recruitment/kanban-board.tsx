"use client"

import { useState } from "react"
import { Candidate, CandidateCard } from "./candidate-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialCandidates: Candidate[] = [
    { id: '1', name: 'Alice Freeman', role: 'Senior Designer', stage: 'APPLIED', matchScore: 92, email: 'alice@example.com', location: 'New York', appliedDate: '2024-01-15' },
    { id: '2', name: 'Bob Smith', role: 'Product Manager', stage: 'SCREENING', matchScore: 85, email: 'bob@example.com', location: 'London', appliedDate: '2024-01-12' },
    { id: '3', name: 'Charlie Kim', role: 'Frontend Dev', stage: 'INTERVIEW', matchScore: 98, email: 'charlie@example.com', location: 'Remote', appliedDate: '2024-01-10' },
    { id: '4', name: 'Diana Prince', role: 'UX Researcher', stage: 'OFFERED', matchScore: 88, email: 'diana@example.com', location: 'Berlin', appliedDate: '2024-01-05' },
]

interface KanbanBoardProps {
    candidates?: Candidate[]
    jobs?: any[]
}

export function KanbanBoard({ candidates = initialCandidates, jobs }: KanbanBoardProps) {
    // If real data is passed, use it, otherwise fall back to initial mock data for demo
    const displayCandidates = candidates.length > 0 ? candidates : initialCandidates

    const columns: { id: Candidate['stage'], label: string, color: string }[] = [
        { id: 'APPLIED', label: 'Applied', color: 'bg-slate-100 dark:bg-slate-900/50' },
        { id: 'SCREENING', label: 'Screening', color: 'bg-blue-50 dark:bg-blue-900/20' },
        { id: 'INTERVIEW', label: 'Interview', color: 'bg-purple-50 dark:bg-purple-900/20' },
        { id: 'OFFERED', label: 'Offered', color: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { id: 'HIRED', label: 'Hired', color: 'bg-indigo-50 dark:bg-indigo-900/20' },
    ]

    return (
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {columns.map(col => {
                const colCandidates = displayCandidates.filter(c => c.stage === col.id)
                
                return (
                    <div key={col.id} className={`shrink-0 w-80 rounded-xl border ${col.color} flex flex-col h-[calc(100vh-220px)]`}>
                        <div className="p-3 border-b flex items-center justify-between bg-white/50 dark:bg-black/20 backdrop-blur-sm sticky top-0 rounded-t-xl z-10">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-foreground/80">{col.label}</span>
                                <Badge variant="secondary" className="h-5 px-1.5 min-w-[20px] justify-center">{colCandidates.length}</Badge>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                        
                        <ScrollArea className="flex-1 p-3">
                            <div className="space-y-3">
                                {colCandidates.map(candidate => (
                                    <CandidateCard key={candidate.id} candidate={candidate} />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )
            })}
        </div>
    )
}
