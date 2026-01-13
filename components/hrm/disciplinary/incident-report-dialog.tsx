"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function IncidentReportDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    toast.success("Incident reported successfully")
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
            <AlertTriangle className="h-4 w-4" /> Report Incident
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-red-500/20 shadow-red-500/10">
        <DialogHeader>
          <DialogTitle className="text-red-600">Report Violation</DialogTitle>
          <DialogDescription>
            File a formal complaint or incident report. This will initiate an internal investigation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="id">Employee ID</Label>
            <Input id="id" placeholder="e.g. HMG-XXXX" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="type">Violation Type</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="safety">Safety Protocol Breach</SelectItem>
                        <SelectItem value="behavior">Behavioral / Misconduct</SelectItem>
                        <SelectItem value="attendance">Attendance / Absenteeism</SelectItem>
                        <SelectItem value="theft">Theft / Fraud</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="sev">Severity</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low (Verbal Warning)</SelectItem>
                        <SelectItem value="med">Medium (Written Warning)</SelectItem>
                        <SelectItem value="high">High (Immediate Action)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Incident Details</Label>
            <Textarea id="desc" placeholder="Describe exactly what happened, including time and location..." rows={4} required />
          </div>
          <div className="bg-red-50 p-3 rounded-md text-xs text-red-600 border border-red-100">
            <strong>Disclaimer:</strong> False reporting is a punishable offense. Ensure all details are accurate.
          </div>
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={loading}>
                {loading ? "Filing..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
