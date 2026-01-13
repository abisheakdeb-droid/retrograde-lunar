"use client"

import { useState } from "react"
import { AdvancedFilter } from "@/components/filters/advanced-filter"

const hrmFilters = [
  {
    name: "department",
    label: "Department",
    type: "select" as const,
    options: [
      { label: "Production", value: "Production" },
      { label: "Quality Control", value: "Quality Control" },
      { label: "Logistics", value: "Logistics" },
      { label: "HR", value: "HR" },
      { label: "Finance", value: "Finance" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { label: "Active", value: "Active" },
      { label: "On Leave", value: "On Leave" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    name: "role",
    label: "Role",
    type: "select" as const,
    options: [
      { label: "Manager", value: "Manager" },
      { label: "Supervisor", value: "Supervisor" },
      { label: "Operator", value: "Operator" },
      { label: "Technician", value: "Technician" },
    ],
  },
]

export function HRMFilters() {
  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Filters applied:", filters)
    // In a real app, this would trigger a data refetch with filters
  }

  return <AdvancedFilter filters={hrmFilters} onFilterChange={handleFilterChange} />
}
