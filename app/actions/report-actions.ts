"use server"

import { reportService, ReportType } from "@/lib/services/report-service"

export async function fetchReportData(type: ReportType) {
    try {
        const data = await reportService.generateReportData(type);
        return { success: true, data };
    } catch (error) {
        console.error("Report Fetch Error:", error);
        return { success: false, error: "Failed to generate report data" };
    }
}
