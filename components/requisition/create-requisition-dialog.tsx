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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createRequisition } from "@/app/actions/requisition-actions"

export function CreateRequisitionDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const result = await createRequisition(formData)
      
      if (result.success) {
        toast.success("Requisition Created", {
          description: "Your request has been submitted for approval.",
        })
        setOpen(false)
      } else {
        toast.error("Error", {
          description: result.message || "Failed to create request.",
        })
      }
    } catch (error) {
      toast.error("Err", { description: "Something went wrong." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="neon-glow-cyan gap-2">
            <Plus className="h-4 w-4" />
            New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] tactical-card border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-primary tracking-widest uppercase">New Requisition</DialogTitle>
          <DialogDescription>
            Submit a new material or asset request for approval.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item" className="text-right text-xs uppercase tracking-wider text-muted-foreground">
              Item
            </Label>
            <Input
              id="item"
              name="item"
              placeholder="e.g. Sewing Machine Needles"
              className="col-span-3 bg-background/50 border-primary/20 focus:border-primary/50"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right text-xs uppercase tracking-wider text-muted-foreground">
              Qty
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              defaultValue="1"
              min="1"
              className="col-span-3 bg-background/50 border-primary/20 focus:border-primary/50"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right text-xs uppercase tracking-wider text-muted-foreground">
              Dept
            </Label>
            <Select name="department" defaultValue="Production">
              <SelectTrigger className="col-span-3 bg-background/50 border-primary/20 focus:border-primary/50">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="IT">IT Support</SelectItem>
                <SelectItem value="HR">HR & Admin</SelectItem>
                <SelectItem value="Logistics">Logistics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right text-xs uppercase tracking-wider text-muted-foreground">
              Priority
            </Label>
            <Select name="priority" defaultValue="Medium">
              <SelectTrigger className="col-span-3 bg-background/50 border-primary/20 focus:border-primary/50">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="neon-glow-cyan w-full mt-4" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
