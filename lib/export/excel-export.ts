"use client"

import { Employee } from "@/lib/data/generators"
import ExcelJS from 'exceljs';

async function saveWorkbook(workbook: ExcelJS.Workbook, filename: string) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.URL.revokeObjectURL(url);
}

export async function exportEmployeesToExcel(employees: Employee[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    // Define columns
    worksheet.columns = [
        { header: 'Employee ID', key: 'employeeId', width: 15 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Role', key: 'role', width: 20 },
        { header: 'Department', key: 'department', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Join Date', key: 'joinDate', width: 15 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Performance', key: 'performance', width: 15 }
    ];

    // Add rows
    employees.forEach(emp => {
        worksheet.addRow({
            employeeId: emp.employeeId,
            name: emp.name,
            email: emp.email,
            role: emp.role,
            department: emp.department,
            status: emp.status,
            joinDate: emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : '',
            phone: emp.phone,
            performance: `${emp.performance}%`
        });
    });

    await saveWorkbook(workbook, `employees_${new Date().toISOString().split('T')[0]}.xlsx`);
}

export async function exportInventoryToExcel(inventory: any[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'SKU', key: 'sku', width: 15 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Quantity', key: 'quantity', width: 15 },
        { header: 'Unit', key: 'unit', width: 10 },
        { header: 'Warehouse', key: 'warehouse', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Value', key: 'value', width: 15 }
    ];

    inventory.forEach(item => {
        worksheet.addRow({
            id: item.id,
            name: item.name,
            sku: item.sku,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            warehouse: item.warehouse,
            status: item.status,
            value: item.value
        });
    });

    await saveWorkbook(workbook, `inventory_${new Date().toISOString().split('T')[0]}.xlsx`);
}

export async function exportRequisitionsToExcel(requisitions: any[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Requisitions');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Requester', key: 'requesterName', width: 25 },
        { header: 'Department', key: 'department', width: 20 },
        { header: 'Item', key: 'item', width: 25 },
        { header: 'Cost', key: 'cost', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Priority', key: 'priority', width: 15 },
        { header: 'Date', key: 'date', width: 15 }
    ];

    requisitions.forEach(req => {
        worksheet.addRow({
            id: req.id,
            requesterName: req.requesterName,
            department: req.department,
            item: req.item,
            cost: req.cost,
            status: req.status,
            priority: req.priority,
            date: req.date ? new Date(req.date).toLocaleDateString() : ''
        });
    });

    await saveWorkbook(workbook, `requisitions_${new Date().toISOString().split('T')[0]}.xlsx`);
}
