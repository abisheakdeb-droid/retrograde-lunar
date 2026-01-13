"use client"

import { useState } from "react"
import { CalendarIcon, DollarSign, FileText, Loader2, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { createTadaClaim } from "@/app/actions/tada-actions"

interface CreateTadaClaimDialogProps {
    children?: React.ReactNode
}

export function CreateTadaClaimDialog({ children }: CreateTadaClaimDialogProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState<Date>()

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        
        if (date) {
            formData.set('date', date.toISOString().split('T')[0])
        }

        try {
            await createTadaClaim(formData)
            toast.success("TADA Claim submitted successfully")
            setOpen(false)
            // Reset form if needed, but dialog close handles most of it
        } catch (error) {
            toast.error("Failed to submit claim. Please try again.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button size="sm" className="bg-primary text-primary-foreground neon-glow-cyan uppercase font-mono text-[10px] tracking-widest rounded-none">
                        <DollarSign className="mr-2 h-3 w-3" />
                        New TADA Claim
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-primary/20 bg-background/95 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="text-xl font-mono uppercase tracking-wider text-primary flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        New Expenditure Claim
                    </DialogTitle>
                    <DialogDescription className="font-mono text-[10px] uppercase text-muted-foreground">
                        Submit a new TADA claim for approval. All fields are required.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="purpose" className="font-mono text-[10px] uppercase">Purpose / Description</Label>
                        <Input
                            id="purpose"
                            name="purpose"
                            placeholder="Reason for expenditure..."
                            className="font-mono text-xs bg-card/50 border-primary/20 focus:border-primary/50 rounded-none uppercase"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="amount" className="font-mono text-[10px] uppercase">Amount (BDT)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    placeholder="0.00"
                                    className="pl-8 font-mono text-xs bg-card/50 border-primary/20 focus:border-primary/50 rounded-none"
                                    required
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label className="font-mono text-[10px] uppercase">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal font-mono text-xs rounded-none border-primary/20 bg-card/50",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        className="rounded-md border-primary/20"
                                    />
                                </PopoverContent>
                            </Popover>
                            <input type="hidden" name="date" value={date?.toISOString() || ''} required />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={isLoading} className="w-full bg-cyan-500 text-white hover:bg-cyan-600 rounded-none font-mono uppercase tracking-widest text-xs">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Claim"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
