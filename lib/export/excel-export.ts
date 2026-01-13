"use client"

import { Employee } from "@/lib/data/generators"
import * as XLSX from 'xlsx'

export function exportEmployeesToExcel(employees: Employee[]) {
    const data = employees.map(emp => ({
        'Employee ID': emp.employeeId,
        'Name': emp.name,
        'Email': emp.email,
        'Role': emp.role,
        'Department': emp.department,
        'Status': emp.status,
        'Join Date': emp.joinDate,
        'Phone': emp.phone,
        'Performance': `${emp.performance}%`
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Employees")

    XLSX.writeFile(wb, `employees_${new Date().toISOString().split('T')[0]}.xlsx`)
}

export function exportInventoryToExcel(inventory: any[]) {
    const data = inventory.map(item => ({
        'ID': item.id,
        'Name': item.name,
        'SKU': item.sku,
        'Category': item.category,
        'Quantity': item.quantity,
        'Unit': item.unit,
        'Warehouse': item.warehouse,
        'Status': item.status,
        'Value': item.value
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Inventory")

    XLSX.writeFile(wb, `inventory_${new Date().toISOString().split('T')[0]}.xlsx`)
}

export function exportRequisitionsToExcel(requisitions: any[]) {
    const data = requisitions.map(req => ({
        'ID': req.id,
        'Requester': req.requesterName,
        'Department': req.department,
        'Item': req.item,
        'Cost': req.cost,
        'Status': req.status,
        'Priority': req.priority,
        'Date': req.date
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Requisitions")

    XLSX.writeFile(wb, `requisitions_${new Date().toISOString().split('T')[0]}.xlsx`)
}
