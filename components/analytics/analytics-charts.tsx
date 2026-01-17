"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAnalyticsSummary } from "@/app/actions/analytics-actions"
import { Loader2, TrendingUp, AlertCircle, Package } from "lucide-react"
import { GovernXDualAreaLineChart } from "@/components/charts/governx-dual-area-line-chart"
import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart"
import { ChartTheme } from "@/components/charts/chart-theme"

export function AnalyticsCharts() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const res = await fetchAnalyticsSummary()
            if (res.success) {
                setData(res.data)
            }
            setLoading(false)
        }
        load()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    if (!data) return null

    // Transform attendance data for Stacked Bar
    const attendanceData = [{
        name: "Attendance",
        present: data.attendance.find((d: any) => d.name === "Present")?.value || 0,
        absent: data.attendance.find((d: any) => d.name === "Absent")?.value || 0,
        leave: data.attendance.find((d: any) => d.name === "Leave")?.value || 0,
    }]

    const totalStaff = attendanceData[0].present + attendanceData[0].absent + attendanceData[0].leave

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Payroll Trend */}
            <Card className="col-span-1 lg:col-span-2 tactical-panel">
                <CardHeader className="tactical-header">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <CardTitle className="technical-label text-base tracking-widest">Payroll Trend</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-[350px] p-4 bg-background">
                    <GovernXDualAreaLineChart
                        data={data.payroll}
                        series={[
                            {
                                name: "Total Payroll",
                                field: "total",
                                color: "#5794f2",
                                fillType: "gradient",
                                gradientColors: ["#5794f2", "transparent"],
                                yAxisId: "left"
                            }
                        ]}
                        xAxisKey="name"
                        height={320}
                        className="border-0! bg-transparent! p-0!"
                    />
                </CardContent>
            </Card>

            {/* Attendance Overview */}
            <Card className="tactical-panel">
                <CardHeader className="tactical-header">
                     <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-green-500" />
                        <CardTitle className="technical-label text-base tracking-widest">Attendance</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-[350px] relative p-4 flex flex-col items-center justify-center bg-background">
                    <div className="w-full space-y-4">
                        <GovernXStackedBarChart
                            data={attendanceData}
                            xAxisKey="name"
                            layout="horizontal"
                            type="stacked"
                            stacks={[
                                { name: "Present", field: "present", color: "#73bf69" }, // Green
                                { name: "Absent", field: "absent", color: "#f2495c" }, // Red
                                { name: "Leave", field: "leave", color: "#ff9830" } // Orange
                            ]}
                            height={100}
                            barWidth={40}
                            className="border-0! bg-transparent! p-0!"
                        />
                         <div className="text-center">
                            <span className="text-4xl font-mono font-bold text-foreground block">
                                {totalStaff}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Staff</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* Inventory Value */}
             <Card className="col-span-1 lg:col-span-3 tactical-panel">
                <CardHeader className="tactical-header">
                    <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-amber-500" />
                        <CardTitle className="technical-label text-base tracking-widest">Top Inventory Categories</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px] p-4 bg-background">
                    <GovernXStackedBarChart
                        data={data.inventory}
                        xAxisKey="name"
                        layout="vertical"
                        type="grouped"
                        stacks={[
                            { name: "Value", field: "value", color: "#ff9830" }
                        ]}
                        height={280}
                        barWidth={20}
                        className="border-0! bg-transparent! p-0!"
                    />
                </CardContent>
            </Card>
        </div>
    )
}
