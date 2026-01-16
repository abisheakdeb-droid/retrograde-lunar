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
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { createJobAction } from "@/app/actions/recruitment-actions"

export function JobPostingDialog() {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createJobAction(formData)
    toast.success("Job posted successfully")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 neon-glow">
            <Plus className="h-4 w-4" /> Create Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] tactical-card">
        <DialogHeader>
          <DialogTitle>New Job Posting</DialogTitle>
          <DialogDescription>
            Create a new position in the recruitment pipeline.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g. Senior Merchandiser" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="grid gap-2">
                <Label htmlFor="dept">Department</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="merch">Merchandising</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue="full">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full">Full-time</SelectItem>
                        <SelectItem value="part">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid gap-2">
             <Label htmlFor="salary">Salary Range</Label>
             <Input id="salary" placeholder="e.g. 80k - 100k BDT" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reqs">Key Requirements</Label>
            <Textarea id="reqs" placeholder="- 5+ years experience&#10;- Knowledge of textile ERP" />
          </div>
          <DialogFooter>
            <Button type="submit">Publish Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
