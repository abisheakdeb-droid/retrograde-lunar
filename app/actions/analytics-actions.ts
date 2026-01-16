"use server"

import { reportService } from "@/lib/services/report-service"

export async function fetchAnalyticsSummary() {
    try {
        const data = await reportService.getChartData();
        return { success: true, data };
    } catch (error) {
        console.error("Analytics Fetch Error:", error);
        return { success: false, error: "Failed to generate analytics data" };
    }
}
