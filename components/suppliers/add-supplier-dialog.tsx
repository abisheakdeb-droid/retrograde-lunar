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
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { addSupplier } from "@/app/actions/supplier-actions"

export function AddSupplierDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      await addSupplier(formData)
      toast.success("Supplier added to registry")
      setOpen(false)
    } catch (error) {
      toast.error("Failed to add supplier.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="neon-glow-cyan bg-cyan-500/10 text-cyan-500 border border-cyan-500/50 hover:bg-cyan-500/20 font-mono uppercase tracking-wider">
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary/20 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono uppercase tracking-wider text-primary">New Tactical Partner</DialogTitle>
          <DialogDescription className="font-mono text-xs uppercase text-muted-foreground">
            Register a new authorized supplier in the network.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="name" className="font-mono text-xs uppercase text-muted-foreground w-full text-left">
                Supplier Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="E.g., Global Textiles Ltd."
                className="col-span-3 bg-card/50 border-primary/20 font-mono"
                required
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="category" className="font-mono text-xs uppercase text-muted-foreground w-full text-left">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                placeholder="E.g., Fabrics"
                className="col-span-3 bg-card/50 border-primary/20 font-mono"
                required
              />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="location" className="font-mono text-xs uppercase text-muted-foreground w-full text-left">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="E.g., Dhaka, Bangladesh"
                className="col-span-3 bg-card/50 border-primary/20 font-mono"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground font-mono uppercase tracking-widest hover:bg-primary/90">
              {isLoading ? "Registering..." : "Confirm Entry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
