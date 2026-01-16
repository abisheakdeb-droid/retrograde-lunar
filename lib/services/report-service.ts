
import { MockDatabase } from "@/lib/data/mock-db";

const db = MockDatabase.getInstance();

export type ReportType = 'PAYROLL' | 'ATTENDANCE' | 'INVENTORY';

export const reportService = {
  async generateReportData(type: ReportType) {
    if (type === 'PAYROLL') {
      const payslips = await db.getPayslips(1, 1000); // Fetch all
      return payslips.data.map(p => ({
        ID: p.id,
        Employee: p.employeeName,
        Month: p.month,
        Basic: p.earnings.find(e => e.name === 'Basic Salary')?.amount || 0,
        NetPay: p.netSalary,
        Status: p.status
      }));
    }

    if (type === 'ATTENDANCE') {
      const records = await db.getAllAttendanceRecords();
      return records.map(r => {
        const stats = r.attendance.reduce((acc, Day) => {
            if (Day.status === 'Present') acc.present++;
            if (Day.status === 'Absent') acc.absent++;
            if (Day.status === 'Leave') acc.leave++;
            return acc;
        }, { present: 0, absent: 0, leave: 0 });

        return {
            ID: r.employeeId,
            Employee: r.employeeName,
            Dept: r.department,
            Present: stats.present,
            Absent: stats.absent,
            Leave: stats.leave
        };
      });
    }

    if (type === 'INVENTORY') {
      const inventory = await db.getInventory(1, 1000);
      return inventory.data.map(i => ({
        SKU: i.sku,
        Item: i.name,
        Category: i.category,
        Qty: i.quantity,
        Value: i.value,
        Status: i.status
      }));
    }

    return [];
  },

  async getChartData() {
    // 1. Payroll Trend (Mock distribution for now as we have limited months in mock)
    // We'll aggregate by Department for a bar chart
    const payslips = await db.getPayslips(1, 1000);
    const payrollByDept = payslips.data.reduce((acc, curr) => {
        // Need to find department from employee ID or name mock... 
        // For simplicity in mock, let's use a random distribution or fetch employee
        // Since we don't have dept in payslip, let's aggregate total NetPay by Month
        const key = curr.month;
        if (!acc[key]) acc[key] = 0;
        acc[key] += curr.netSalary;
        return acc;
    }, {} as Record<string, number>);

    const payrollChart = Object.entries(payrollByDept).map(([month, total]) => ({
        name: month.split(' ')[0], // Jan, Feb
        total: Math.floor(total / 1000) // in k
    }));

    // 2. Attendance Overview
    const attendance = await db.getAllAttendanceRecords();
    let totalPresent = 0, totalAbsent = 0, totalLeave = 0;
    attendance.forEach(record => {
        record.attendance.forEach(day => {
            if (day.status === 'Present') totalPresent++;
            if (day.status === 'Absent') totalAbsent++;
            if (day.status === 'Leave') totalLeave++;
        });
    });
    const attendanceChart = [
        { name: 'Present', value: totalPresent, fill: '#22c55e' }, // green-500
        { name: 'Absent', value: totalAbsent, fill: '#ef4444' }, // red-500
        { name: 'Leave', value: totalLeave, fill: '#eab308' }, // yellow-500
    ];

    // 3. Inventory Status (Value by Category)
    const inventory = await db.getInventory(1, 2000);
    const valueByCategory = inventory.data.reduce((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = 0;
        acc[curr.category] += curr.value * curr.quantity;
        return acc;
    }, {} as Record<string, number>);

    const inventoryChart = Object.entries(valueByCategory)
        .slice(0, 5) // Top 5 categories
        .map(([category, value]) => ({
            name: category,
            value: Math.floor(value / 1000) // in k
        }));

    return {
        payroll: payrollChart,
        attendance: attendanceChart,
        inventory: inventoryChart
    };
  }
};
