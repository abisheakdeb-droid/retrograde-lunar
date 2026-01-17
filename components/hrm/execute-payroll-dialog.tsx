"use client"

import { useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DollarSign, Loader2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { executePayrollAction } from "@/app/actions/payroll"

export function ExecutePayrollDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState<string>("")

  // Mock list of months for now - in real app would come from config or current date
  const months = [
    "October 2025",
    "November 2025",
    "December 2025",
    "January 2026"
  ]

  async function handleExecute() {
    if (!month) {
      toast.error("Please select a disbursement cycle (month)")
      return
    }

    setLoading(true)
    try {
      const result = await executePayrollAction(month)
      if (result.success) {
        toast.success("Payroll Execution Successful", {
            description: `Payroll processed for ${'count' in result ? result.count : 'all'} employees`
        })
        setOpen(false)
      } else {
        toast.error("Execution Failed", {
            description: 'message' in result ? result.message : "Unexpected error occurred"
        })
      }
    } catch (error) {
      toast.error("System Error", {
        description: "Communication with fiscal core failed."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground neon-glow-cyan uppercase font-mono text-[10px] tracking-widest rounded-none">
            <DollarSign className="mr-2 h-3 w-3" />
            Execute Payroll Run
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 uppercase tracking-widest text-primary">
            <DollarSign className="h-5 w-5" />
            Execute Disbursement
          </DialogTitle>
          <DialogDescription className="font-mono text-xs">
            Initiate fiscal transfer for the selected cycle. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="month" className="text-xs uppercase font-bold text-muted-foreground">Target Cycle</Label>
            <Select onValueChange={setMonth} value={month}>
              <SelectTrigger className="border-primary/20 font-mono text-xs">
                <SelectValue placeholder="SELECT CYCLE MONTH..." />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m} className="font-mono text-xs">
                    {m.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-amber-500">Warning: Fiscal Irreversibility</p>
                    <p className="text-[10px] text-muted-foreground">
                        Executing this command will finalize all &quot;Processing&quot; slips for the selected month and mark them as &quot;Paid&quot;. Ensure audit checks are complete.
                    </p>
                </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading} className="font-mono text-xs uppercase" size="sm">
            Abort
          </Button>
          <Button onClick={handleExecute} disabled={loading} className="bg-primary text-primary-foreground font-mono text-xs uppercase" size="sm">
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Executing...
                </>
            ) : (
                "Confirm & Execute"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
