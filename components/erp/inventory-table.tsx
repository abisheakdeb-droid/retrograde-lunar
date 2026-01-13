"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InventoryItem } from "@/lib/data/generators"
import { cn } from "@/lib/utils"
import { ItemDetailDrawer } from "./item-detail-drawer"
import { ChevronRight } from "lucide-react"

interface InventoryTableProps {
  data: InventoryItem[]
}

export function InventoryTable({ data }: InventoryTableProps) {
  const [selectedItem, setSelectedItem] = React.useState<InventoryItem | null>(null)

  return (
    <>
      <div className="rounded-md border border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/5">
            <TableRow className="hover:bg-transparent border-b border-border/40">
              <TableHead className="w-[100px] font-mono text-xs uppercase text-muted-foreground">ID</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">SKU</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Name</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Category</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Qty</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Location</TableHead>
              <TableHead className="font-mono text-xs uppercase text-muted-foreground">Status</TableHead>
              <TableHead className="text-right font-mono text-xs uppercase text-muted-foreground">Value</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow 
                key={item.id} 
                className="cursor-pointer hover:bg-muted/10 group transition-colors border-b border-border/40"
                onClick={() => setSelectedItem(item)}
              >
                <TableCell className="font-mono text-xs font-medium text-primary/80 group-hover:text-primary transition-colors">
                    {item.id}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.sku}
                </TableCell>
                <TableCell className="font-medium">
                    {item.name}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                    {item.category}
                </TableCell>
                <TableCell className="font-mono text-sm">
                    {item.quantity} <span className="text-xs text-muted-foreground">{item.unit}</span>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                    {item.warehouse}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ring-1 ring-inset",
                    item.status === "In Stock" && "bg-green-500/10 text-green-500 ring-green-500/20",
                    item.status === "Low Stock" && "bg-yellow-500/10 text-yellow-500 ring-yellow-500/20",
                    item.status === "Out of Stock" && "bg-red-500/10 text-red-500 ring-red-500/20",
                  )}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  ${(item.value * item.quantity).toLocaleString()}
                </TableCell>
                <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ItemDetailDrawer 
        item={selectedItem} 
        open={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  )
}
