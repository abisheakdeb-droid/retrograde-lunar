"use client"

import * as React from "react"
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
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadDocument } from "@/app/actions/document-actions"
import { DocType } from "@/lib/data/generators"
import { toast } from "sonner"

export function UploadDocumentDialog() {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    
    try {
        const result = await uploadDocument(formData)
        
        if (result.success) {
            toast.success("Document Uploaded", {
                description: "The document has been securely archived.",
                className: "border-primary/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            })
            setOpen(false)
        } else {
            toast.error("Upload Failed", {
                description: result.message,
            })
        }
    } catch {
        toast.error("Error", {
            description: "Something went wrong. Please try again.",
        })
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary text-primary-foreground neon-glow-cyan uppercase font-mono text-[10px] tracking-widest rounded-none hover:bg-primary/90">
            <Upload className="mr-2 h-3 w-3" />
            Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] tactical-card border-primary/20 bg-background/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 uppercase tracking-wide text-primary">
            <FileText className="h-5 w-5" />
            Upload Document
          </DialogTitle>
          <DialogDescription className="font-mono text-xs uppercase text-muted-foreground">
            Securely upload personnel records to the encrypted archive.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeName" className="text-right text-xs uppercase font-mono text-muted-foreground">
                Employee
              </Label>
              <Input
                id="employeeName"
                name="employeeName"
                placeholder="John Doe"
                className="col-span-3 h-8 font-mono text-xs bg-muted/20 border-primary/20 focus-visible:ring-primary/30"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeId" className="text-right text-xs uppercase font-mono text-muted-foreground">
                ID (Optional)
              </Label>
              <Input
                id="employeeId"
                name="employeeId"
                placeholder="EMP-XXXX"
                className="col-span-3 h-8 font-mono text-xs bg-muted/20 border-primary/20 focus-visible:ring-primary/30"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right text-xs uppercase font-mono text-muted-foreground">
                Type
              </Label>
              <Select name="type" required>
                <SelectTrigger className="col-span-3 h-8 font-mono text-xs bg-muted/20 border-primary/20 focus:ring-primary/30">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover/95 backdrop-blur border-primary/20">
                  <SelectItem value="NID">NID & Identity</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Join Letter">Join Letter</SelectItem>
                  <SelectItem value="Certificate">Certificate</SelectItem>
                  <SelectItem value="Training Record">Training Record</SelectItem>
                  <SelectItem value="ID Card">ID Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right text-xs uppercase font-mono text-muted-foreground">
                File
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                className="col-span-3 h-8 font-mono text-[10px] py-1.5 bg-muted/20 border-primary/20 file:bg-primary/20 file:text-primary file:border-0 file:rounded-none file:text-[10px] file:uppercase file:font-mono hover:file:bg-primary/30 cursor-pointer"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase font-mono text-xs tracking-wider rounded-none neon-glow-cyan">
              {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Encrypting & Uploading...
                </>
              ) : (
                <>
                    <Upload className="mr-2 h-3 w-3" />
                    Upload to Archive
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
