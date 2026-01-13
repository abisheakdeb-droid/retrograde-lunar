"use client"

import { AdvancedFilter } from "@/components/filters/advanced-filter"

const inventoryFilters = [
  {
    name: "category",
    label: "Category",
    type: "select" as const,
    options: [
      { label: "Raw Materials", value: "Raw Materials" },
      { label: "Finished Goods", value: "Finished Goods" },
      { label: "Machinery", value: "Machinery" },
      { label: "Supplies", value: "Supplies" },
    ],
  },
  {
    name: "warehouse",
    label: "Warehouse",
    type: "select" as const,
    options: [
      { label: "Main Warehouse", value: "Main Warehouse" },
      { label: "Factory A", value: "Factory A" },
      { label: "Factory B", value: "Factory B" },
    ],
  },
  {
    name: "status",
    label: "Stock Status",
    type: "select" as const,
    options: [
      { label: "In Stock", value: "In Stock" },
      { label: "Low Stock", value: "Low Stock" },
      { label: "Out of Stock", value: "Out of Stock" },
    ],
  },
]

export function InventoryFilters() {
  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Inventory filters applied:", filters)
  }

  return <AdvancedFilter filters={inventoryFilters} onFilterChange={handleFilterChange} />
}
