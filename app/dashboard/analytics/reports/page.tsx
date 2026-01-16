
import { ReportGenerator } from "@/components/analytics/report-generator";
import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports Center | Analytics",
  description: "Generate and export system reports",
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports Center</h1>
        <p className="text-muted-foreground">
            Generate detailed reports for payroll, attendance, and inventory management.
        </p>
      </div>

      <AnalyticsCharts />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ReportGenerator />
      </div>
    </div>
  );
}
