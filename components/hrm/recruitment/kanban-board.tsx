"use client"

import { useState, useEffect } from "react"
import { Candidate, JobPosting } from "@/lib/data/mock-db"
import { CandidateCard } from "./candidate-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface KanbanBoardProps {
    candidates: Candidate[]
    jobs: JobPosting[]
}

const STAGES: Candidate['stage'][] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected']

export function KanbanBoard({ candidates: initialCandidates, jobs }: KanbanBoardProps) {
    const [candidates, setCandidates] = useState(initialCandidates)
    // Filter locally for demo
    const [activeJob, setActiveJob] = useState<string>('All')

    const filteredCandidates = activeJob === 'All' 
        ? candidates 
        : candidates.filter(c => c.jobId === activeJob)
    
    // Group by stage
    const columns = STAGES.reduce((acc, stage) => {
        acc[stage] = filteredCandidates.filter(c => c.stage === stage)
        return acc
    }, {} as Record<string, Candidate[]>)

    const handleMove = (id: string, newStage: Candidate['stage']) => {
        setCandidates(prev => prev.map(c => 
            c.id === id ? { ...c, stage: newStage } : c
        ))
        // In real app, call server action here
    }

    return (
        <div className="h-full flex flex-col gap-4">
             {/* Job Filter Tabs */}
             <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveJob('All')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        activeJob === 'All' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                    All Jobs
                </button>
                {jobs.map(job => (
                    <button
                        key={job.id}
                        onClick={() => setActiveJob(job.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                            activeJob === job.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                    >
                        {job.title}
                        <Badge variant="secondary" className="px-1.5 py-0 h-5 text-[10px]">
                            {candidates.filter(c => c.jobId === job.id).length}
                        </Badge>
                    </button>
                ))}
            </div>

            {/* Board Columns */}
            <div className="flex-1 flex gap-4 overflow-x-auto min-h-[500px] mb-6">
                {STAGES.map(stage => (
                    <div key={stage} className="shrink-0 w-80 flex flex-col bg-muted/30 rounded-lg border border-border/50">
                        <div className="p-3 border-b border-border/50 flex items-center justify-between sticky top-0 bg-muted/30 backdrop-blur-sm z-10 rounded-t-lg">
                            <h3 className="font-medium text-sm">{stage}</h3>
                            <Badge variant="outline" className="text-xs bg-background">
                                {columns[stage]?.length || 0}
                            </Badge>
                        </div>
                        
                        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                            {columns[stage]?.map(candidate => (
                                <CandidateCard 
                                    key={candidate.id} 
                                    candidate={candidate} 
                                    onMove={handleMove}
                                />
                            ))}
                            {columns[stage]?.length === 0 && (
                                <div className="h-24 border-2 border-dashed border-muted-foreground/10 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                                    No Candidates
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
