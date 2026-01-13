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
import { AlertOctagon } from "lucide-react"

export function ReportIncidentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="neon-glow-red bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border-red-500/50 border">
            <AlertOctagon className="h-4 w-4 mr-2" />
            Report Incident
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] tactical-card border-red-500/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertOctagon className="h-5 w-5" />
            Log Safety Incident
          </DialogTitle>
          <DialogDescription>
            Report a new safety or compliance incident. This will trigger an immediate alert to the safety officer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <div className="col-span-3">
                <Select>
                    <SelectTrigger className="w-full bg-background/50 border-input/50">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="safety">Safety Hazard</SelectItem>
                        <SelectItem value="compliance">Compliance Violation</SelectItem>
                        <SelectItem value="environmental">Environmental Spill</SelectItem>
                        <SelectItem value="injury">Workplace Injury</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="severity" className="text-right">
              Severity
            </Label>
            <div className="col-span-3">
                <Select>
                    <SelectTrigger className="w-full bg-background/50 border-input/50">
                        <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low - Observation</SelectItem>
                        <SelectItem value="medium">Medium - Action Required</SelectItem>
                        <SelectItem value="high">High - Immediate Risk</SelectItem>
                        <SelectItem value="critical">Critical - Production Stop</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input id="location" placeholder="e.g. Unit 2, Line 4" className="col-span-3 bg-background/50 border-input/50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Details
            </Label>
             <Textarea id="description" placeholder="Describe the incident..." className="col-span-3 bg-background/50 border-input/50" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost">Cancel</Button>
          <Button type="submit" className="bg-red-500 text-white hover:bg-red-600 neon-glow-red">Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
