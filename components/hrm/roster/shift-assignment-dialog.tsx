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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShiftAssignment } from "@/lib/data/mock-db"
import { useState } from "react"
import { toast } from "sonner"

interface ShiftAssignmentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    assignment: ShiftAssignment | null
    onSave: (updated: ShiftAssignment) => void
}

export function ShiftAssignmentDialog({ open, onOpenChange, assignment, onSave }: ShiftAssignmentDialogProps) {
  const [loading, setLoading] = useState(false)

  if (!assignment) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    onSave({
        ...assignment,
        status: 'Scheduled' // auto-fix status
    })
    
    toast.success("Shift assignment updated")
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] tactical-card">
        <DialogHeader>
          <DialogTitle>Assign Supervisor</DialogTitle>
          <DialogDescription>
            {assignment.lineName} • {assignment.date} • Shift {assignment.shiftType}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sup">Supervisor</Label>
            <Select defaultValue={assignment.supervisorId !== 'SUP-000' ? assignment.supervisorId : undefined}>
                <SelectTrigger><SelectValue placeholder="Select Supervisor" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="SUP-001">Rafiqul Islam</SelectItem>
                    <SelectItem value="SUP-002">Nasreen Akter</SelectItem>
                    <SelectItem value="SUP-003">Abdul Malek</SelectItem>
                    <SelectItem value="SUP-004">Karim Uddin</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
             <Label htmlFor="type">Shift Type</Label>
             <Select defaultValue={assignment.shiftType} disabled>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="A">Shift A (Morning 06:00 - 14:00)</SelectItem>
                    <SelectItem value="B">Shift B (Evening 14:00 - 22:00)</SelectItem>
                    <SelectItem value="C">Shift C (Night 22:00 - 06:00)</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="count">Operator Headcount</Label>
            <Input id="count" type="number" defaultValue={assignment.operatorCount} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Confirm Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
