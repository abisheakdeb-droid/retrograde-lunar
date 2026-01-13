"use client"

import { useState } from "react"
import { CalendarIcon, CheckCircle2, FileText, X } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function LeaveRequestDialog() {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setLoading(false)
    setOpen(false)
    toast.success("Leave Request Transmitted", {
        description: "Your application has been logged in the central command queue.",
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground neon-glow-cyan uppercase font-mono text-[10px] tracking-widest rounded-none hover:bg-primary/80">
            <FileText className="mr-2 h-3 w-3" />
            Register Leave Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] tactical-card border-primary/20 bg-card/95 backdrop-blur-xl p-0 gap-0">
        <div className="p-6 border-b border-border/50">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary tracking-wider uppercase font-mono">
                <FileText className="h-5 w-5" />
                New Leave Application
            </DialogTitle>
            <DialogDescription className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                Submit absence request for operational approval.
            </DialogDescription>
            </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type" className="text-[10px] uppercase font-mono text-muted-foreground">Leave Category</Label>
                    <Select required>
                        <SelectTrigger className="bg-background/50 border-input/50 rounded-none focus:ring-primary/50 font-mono text-xs">
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="tactical-card border-primary/20 bg-card/95 backdrop-blur-3xl">
                            <SelectItem value="casual">Casual Leave (CL)</SelectItem>
                            <SelectItem value="sick">Sick Leave (SL)</SelectItem>
                            <SelectItem value="annual">Earned Annual (EL)</SelectItem>
                            <SelectItem value="site-duty">Site Duty</SelectItem>
                            <SelectItem value="unpaid">Loss of Pay (LWP)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-mono text-muted-foreground">Duration Unit</Label>
                    <Input disabled value="1 Day (Default)" className="bg-muted/20 border-border/50 rounded-none font-mono text-xs text-muted-foreground" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-mono text-muted-foreground">Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal rounded-none border-input/50 bg-background/50 hover:bg-accent/50",
                                    !startDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                {startDate ? <span className="font-mono text-xs">{format(startDate, "PPP")}</span> : <span className="font-mono text-xs">Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 tactical-card border-primary/20" align="start">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                className="bg-card/95"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-mono text-muted-foreground">End Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                             <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal rounded-none border-input/50 bg-background/50 hover:bg-accent/50",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                {endDate ? <span className="font-mono text-xs">{format(endDate, "PPP")}</span> : <span className="font-mono text-xs">Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 tactical-card border-primary/20" align="start">
                             <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                className="bg-card/95"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="reason" className="text-[10px] uppercase font-mono text-muted-foreground">Justification / Reason</Label>
                <Textarea 
                    id="reason" 
                    placeholder="Enter detailed reason for absence..." 
                    className="min-h-[80px] bg-background/50 border-input/50 rounded-none focus:ring-primary/50 font-mono text-xs resize-none"
                    required
                />
            </div>

            <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-none hover:bg-destructive/10 hover:text-destructive">Cancel</Button>
                <Button 
                    type="submit" 
                    className="bg-primary text-primary-foreground neon-glow-cyan uppercase font-mono text-xs tracking-widest rounded-none w-32"
                    disabled={loading}
                >
                    {loading ? "Transmitting..." : "Submit Req"}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
