"use client"

import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart"
import { GovernXDualAreaLineChart } from "@/components/charts/governx-dual-area-line-chart"
import { ChartTheme } from "@/components/charts/chart-theme"
import { HourlyProduction } from "@/lib/data/generators"
import { useEffect, useState } from "react"



export function HourlyOutputChart({ data }: { data: HourlyProduction[] }) {
    if (!data) return <div className="h-[300px] w-full flex items-center justify-center bg-muted/10 rounded-xl animate-pulse">Initializing Tactical Feed...</div>

    return (
        <GovernXStackedBarChart
            data={data}
            xAxisKey="hour"
            layout="horizontal"
            type="grouped"
            stacks={[
                { name: "Target", field: "target", color: "#888" },
                { name: "Actual", field: "achieved", color: ChartTheme.accentGreen }
            ]}
            height={300}
            className="border-0! bg-transparent! p-0!"
            barWidth={15}
        />
    )
}

export function EfficiencyTrendChart({ data }: { data: HourlyProduction[] }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return <div className="h-[300px] w-full flex items-center justify-center bg-muted/10 rounded-xl">Loading...</div>

    return (
        <GovernXDualAreaLineChart
            data={data}
            series={[
                {
                    name: "Efficiency %",
                    field: "efficiency",
                    color: "#f59e0b",
                    fillType: "gradient",
                    gradientColors: ["#f59e0b", "transparent"],
                    yAxisId: "left"
                }
            ]}
            xAxisKey="hour"
            height={300}
            className="border-0! bg-transparent! p-0!"
            yLeft={{ domain: [0, 100] }}
        />
    )
}
