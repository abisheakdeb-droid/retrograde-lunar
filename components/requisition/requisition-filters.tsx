"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export function RequisitionFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const status = searchParams.get("status") || "All"
  const priority = searchParams.get("priority") || "All"

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === "All") {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
          {(status !== "All" || priority !== "All") && (
             <span className="ml-1 flex h-2 w-2 rounded-full bg-primary" /> 
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={status === "All"}
          onCheckedChange={() => updateFilter("status", "All")}
        >
          All Statuses
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={status === "Pending"}
            onCheckedChange={() => updateFilter("status", "Pending")}
        >
            Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={status === "Approved"}
            onCheckedChange={() => updateFilter("status", "Approved")}
        >
            Approved
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={status === "Rejected"}
            onCheckedChange={() => updateFilter("status", "Rejected")}
        >
            Rejected
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Priority</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={priority === "All"}
          onCheckedChange={() => updateFilter("priority", "All")}
        >
          All Priorities
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={priority === "High"}
            onCheckedChange={() => updateFilter("priority", "High")}
        >
            High
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={priority === "Medium"}
            onCheckedChange={() => updateFilter("priority", "Medium")}
        >
            Medium
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={priority === "Low"}
            onCheckedChange={() => updateFilter("priority", "Low")}
        >
            Low
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
