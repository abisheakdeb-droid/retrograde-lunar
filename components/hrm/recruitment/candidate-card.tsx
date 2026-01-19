"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Star, Phone, Mail, MapPin } from "lucide-react"

export interface Candidate {
    id: string
    name: string
    role: string
    stage: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFERED' | 'HIRED'
    matchScore: number
    email: string
    location: string
    appliedDate: string
}

interface CandidateCardProps {
    candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
    return (
        <Card className="mb-3 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border-l-4 border-l-indigo-500">
            <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.id}`} />
                            <AvatarFallback>{candidate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-semibold leading-none">{candidate.name}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">{candidate.role}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
                
                <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {candidate.matchScore}% Match
                        </span>
                        <span>{new Date(candidate.appliedDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                         <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                            Senior
                        </Badge>
                         <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">
                            Full-time
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
