"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Phone, Mail, Clock } from "lucide-react"
import { Candidate } from "@/lib/data/mock-db"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CandidateCardProps {
    candidate: Candidate
    onMove?: (id: string, stage: Candidate['stage']) => void
}

export function CandidateCard({ candidate, onMove }: CandidateCardProps) {
    const getMatchColor = (score: number) => {
        if (score >= 90) return "text-green-500"
        if (score >= 70) return "text-blue-500"
        return "text-amber-500"
    }

    return (
        <Card className="hover:border-primary/50 transition-colors cursor-move group">
            <CardContent className="p-3 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">{candidate.name}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{candidate.experience}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{candidate.appliedDate}</span>
                    </div>
                    <span className={cn("font-bold font-mono", getMatchColor(candidate.matchScore))}>
                        {candidate.matchScore}% Match
                    </span>
                </div>

                {/* Quick Actions (only visible on hover/focus could be better, but keeping simple) */}
                <div className="pt-2 border-t flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-6 w-full text-[10px]">
                        Resume
                    </Button>
                    {candidate.stage === 'Applied' && (
                        <Button
                            onClick={() => onMove?.(candidate.id, 'Screening')}
                            variant="secondary"
                            size="sm"
                            className="h-6 w-full text-[10px] bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                        >
                            Screen
                        </Button>
                    )}
                     {candidate.stage === 'Screening' && (
                        <Button
                             onClick={() => onMove?.(candidate.id, 'Interview')}
                            variant="secondary"
                            size="sm"
                            className="h-6 w-full text-[10px] bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                        >
                            Interview
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
