"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { InventoryItem } from "@/lib/data/generators"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Box, Activity, ShieldCheck, History, BarChart3 } from "lucide-react"

interface ItemDetailDrawerProps {
  item: InventoryItem | null
  open: boolean
  onClose: () => void
}

export function ItemDetailDrawer({ item, open, onClose }: ItemDetailDrawerProps) {
  if (!item) return null

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] border-l border-border/40 bg-background/95 backdrop-blur-xl flex flex-col h-full">
        <SheetHeader className="space-y-4 px-6 pt-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-2xl font-mono uppercase tracking-tight text-primary">
                {item.name}
              </SheetTitle>
              <SheetDescription className="flex items-center gap-2 font-mono text-xs">
                <span>SKU: {item.sku}</span>
                <span className="text-muted-foreground">•</span>
                <span>ID: {item.id}</span>
              </SheetDescription>
            </div>
            <Badge variant={item.status === 'In Stock' ? 'default' : item.status === 'Low Stock' ? 'secondary' : 'destructive'} className="uppercase">
              {item.status}
            </Badge>
          </div>
          <Separator className="bg-border/50" />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-24">
          <div className="space-y-8 py-6">
            
            {/* 3D Model Placeholder */}
            <div className="aspect-video w-full rounded-lg border border-border/50 bg-secondary/20 relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <Box className="h-16 w-16 text-primary/40 animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%] animate-[shimmer_3s_infinite]" />
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-muted-foreground">
                3D VISUALIZATION // WIREFRAME_MODE
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-lg border border-border/40 bg-card/30 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase">
                     <BarChart3 className="h-3 w-3" /> Total Value
                  </div>
                  <div className="text-xl font-bold font-mono">
                     ${(item.value * item.quantity).toLocaleString()}
                  </div>
               </div>
               <div className="p-4 rounded-lg border border-border/40 bg-card/30 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase">
                     <Activity className="h-3 w-3" /> Unit Price
                  </div>
                  <div className="text-xl font-bold font-mono">
                     ${item.value.toLocaleString()}
                  </div>
               </div>
               <div className="p-4 rounded-lg border border-border/40 bg-card/30 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase">
                     <Box className="h-3 w-3" /> Quantity
                  </div>
                  <div className="text-xl font-bold font-mono">
                     {item.quantity} <span className="text-sm text-muted-foreground">{item.unit}</span>
                  </div>
               </div>
               <div className="p-4 rounded-lg border border-border/40 bg-card/30 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase">
                     <ShieldCheck className="h-3 w-3" /> Location
                  </div>
                  <div className="text-lg font-bold font-mono truncate">
                     {item.warehouse}
                  </div>
               </div>
            </div>

            {/* History Log */}
            <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <History className="h-4 w-4 text-primary" />
                    Transaction Log
                </h4>
                <div className="space-y-4 border-l border-border/40 ml-2 pl-4">
                     {[1, 2, 3].map((_, i) => (
                        <div key={i} className="relative space-y-1">
                             <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border border-primary bg-background" />
                             <p className="text-xs text-muted-foreground font-mono">
                                {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                             </p>
                             <p className="text-sm">
                                {i === 0 ? 'Stock Level check completed' : i === 1 ? 'Incoming shipment received (Qty: 50)' : 'Quality audit passed'}
                             </p>
                        </div>
                     ))}
                </div>
            </div>
          </div>
          </div>


        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur border-t border-border/40">
           <Button className="w-full neon-glow-cyan" onClick={() => {}}>Requisition Restock</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
