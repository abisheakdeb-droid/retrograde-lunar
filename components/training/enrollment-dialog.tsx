"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrainingProgram } from "@/services/training-service"
import { CheckCircle2, BookOpen, Clock, Users } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface EnrollmentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    program: TrainingProgram | null
}

export function EnrollmentDialog({ open, onOpenChange, program }: EnrollmentDialogProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!program) return null

    const handleConfirm = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            onOpenChange(false)
            toast.success(`Successfully enrolled in ${program.title}`, {
                description: "You will receive a calendar invite shortly."
            })
        }, 1500)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] border-primary/20 bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Badge variant="outline" className="border-primary/50 text-primary uppercase text-[10px] tracking-wider">
                            {program.type}
                        </Badge>
                        <span className="truncate">{program.title}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Review the course details below before confirming your enrollment.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-3">
                        <div className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h4 className="text-sm font-medium">Curriculum Focus</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {program.description || "Comprehensive training module designed to enhance core competencies in this domain."}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{program.durationHours} Hours</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5" />
                                <span>Limited Seats</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between flex-row items-center gap-4">
                     <p className="text-[10px] text-muted-foreground text-center sm:text-left">
                        * Manager approval may be required
                    </p>
                    <Button onClick={handleConfirm} disabled={isLoading} className="gap-2">
                        {isLoading ? (
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <CheckCircle2 className="h-4 w-4" />
                        )}
                        Confirm Enrollment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
