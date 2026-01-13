"use client"

import * as React from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface FilterOption {
    label: string
    value: string
}

interface FilterConfig {
    name: string
    label: string
    type: "select" | "text"
    options?: FilterOption[]
}

interface AdvancedFilterProps {
    filters: FilterConfig[]
    onFilterChange: (filters: Record<string, string>) => void
}

export function AdvancedFilter({ filters, onFilterChange }: AdvancedFilterProps) {
    const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({})

    const handleSelect = (name: string, value: string) => {
        const newFilters = { ...activeFilters, [name]: value }
        setActiveFilters(newFilters)
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        setActiveFilters({})
        onFilterChange({})
    }

    const removeFilter = (name: string) => {
        const newFilters = { ...activeFilters }
        delete newFilters[name]
        setActiveFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className="space-y-3 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex items-center gap-2 h-8 min-w-max">
                    <Filter className="h-4 w-4 text-primary" />
                    <span className="technical-label">Tactical Filter</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 flex-1">
                    {filters.map((filter) => (
                        <div key={filter.name} className="flex items-center">
                            <Select
                                onValueChange={(value) => handleSelect(filter.name, value)}
                                value={activeFilters[filter.name] || ""}
                            >
                                <SelectTrigger className="h-8 w-[140px] bg-card/50 border-primary/20 font-mono text-[10px] uppercase rounded-none focus:ring-1 focus:ring-primary/50">
                                    <SelectValue placeholder={filter.label} />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-primary/20 rounded-none">
                                    {filter.options?.map((opt) => (
                                        <SelectItem 
                                            key={opt.value} 
                                            value={opt.value}
                                            className="font-mono text-[10px] uppercase hover:bg-primary/10"
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}

                    {Object.keys(activeFilters).length > 0 && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearFilters}
                            className="h-8 px-2 text-[10px] font-mono uppercase text-muted-foreground hover:text-primary hover:bg-transparent"
                        >
                            <X className="mr-1 h-3 w-3" />
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            {Object.keys(activeFilters).length > 0 && (
                <div className="flex flex-wrap gap-1 pl-0 sm:pl-[calc(--spacing(4)+110px)]">
                    {Object.entries(activeFilters).map(([key, val]) => (
                        <Badge 
                            key={key} 
                            variant="secondary" 
                            className="bg-primary/10 text-primary border-primary/20 rounded-none h-5 text-[8px] font-mono uppercase"
                        >
                            {key}: {val}
                            <button onClick={() => removeFilter(key)} className="ml-1 hover:text-white transition-colors">
                                <X className="h-2 w-2" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
