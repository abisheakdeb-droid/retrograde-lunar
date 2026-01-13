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
import { Plus, Loader2, Search, ArrowRight, Package } from "lucide-react"
import { toast } from "sonner"
import { createRequisition, searchInventory } from "@/app/actions/requisition-actions"
import { useDebounce } from "use-debounce"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export function RequisitionWizard() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'search' | 'form'>('search')
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)
  const [results, setResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  
  // Form State
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function search() {
      if (debouncedQuery.length < 2) {
        setResults([])
        return
      }
      setSearching(true)
      try {
        const data = await searchInventory(debouncedQuery)
        setResults(data)
      } catch (e) {
        console.error(e)
      } finally {
        setSearching(false)
      }
    }
    search()
  }, [debouncedQuery])

  function handleSelectItem(item: any) {
    setSelectedItem(item)
    setStep('form')
  }

  function handleNewItem() {
    setSelectedItem(null)
    setStep('form')
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const result = await createRequisition(formData)
      
      if (result.success) {
        toast.success("Requisition Created", {
          description: "Your request has been submitted for approval.",
        })
        setOpen(false)
        setStep('search')
        setSearchQuery("")
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
      <DialogContent className="sm:max-w-[500px] tactical-card border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-primary tracking-widest uppercase">
            {step === 'search' ? 'Item Lookup' : 'Requisition Form'}
          </DialogTitle>
          <DialogDescription>
            {step === 'search' 
                ? 'Search inventory to request an existing item, or create a new request.' 
                : 'Submit your material request details.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'search' && (
            <div className="py-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search for items..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-background/50 border-primary/20 focus:border-primary/50"
                        autoFocus
                    />
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {searching && (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    )}
                    
                    {!searching && results.length > 0 && results.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => handleSelectItem(item)}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                    <Package className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                                </div>
                            </div>
                            <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    {!searching && searchQuery.length > 1 && results.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                            <p>No inventory items found.</p>
                            <Button variant="link" onClick={handleNewItem} className="mt-2 text-primary">
                                Request New Item "{searchQuery}"
                            </Button>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t flex justify-end">
                     <Button variant="ghost" onClick={handleNewItem} className="text-xs text-muted-foreground hover:text-foreground">
                        Skip Search & Create Custom Request
                    </Button>
                </div>
            </div>
        )}

        {step === 'form' && (
            <form action={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item" className="text-right text-xs uppercase tracking-wider text-muted-foreground">
                Item
                </Label>
                <Input
                id="item"
                name="item"
                defaultValue={selectedItem ? selectedItem.name : searchQuery}
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
            <DialogFooter className="flex justify-between sm:justify-between">
                <Button type="button" variant="ghost" onClick={() => setStep('search')}>
                    Back
                </Button>
                <Button type="submit" className="neon-glow-cyan" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
                </Button>
            </DialogFooter>
            </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
