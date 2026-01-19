"use client"

import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet } from "lucide-react"
import { exportEmployeesToExcel, exportInventoryToExcel, exportRequisitionsToExcel } from "@/lib/export/excel-export"

interface ExportButtonProps {
    data: any[]
    type: "employees" | "inventory" | "requisitions"
    variant?: "default" | "outline"
}

export function ExportButton({ data, type, variant = "outline" }: ExportButtonProps) {
    const handleExport = () => {
        switch (type) {
            case "employees":
                exportEmployeesToExcel(data)
                break
            case "inventory":
                exportInventoryToExcel(data)
                break
            case "requisitions":
                exportRequisitionsToExcel(data)
                break
        }
    }

    return (
        <Button variant={variant} size="sm" onClick={handleExport}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export to Excel
        </Button>
    )
}
