"use client"

import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart";
import { ChartTheme } from "@/components/charts/chart-theme";

type DataPoint = {
    month: string
    production: number
    cost: number
}

export function ProductionCostChart({ data }: { data: DataPoint[] }) {
    if (!data) return <div className="h-[350px] w-full flex items-center justify-center bg-muted/10 rounded-xl animate-pulse">Initializing Tactical Feed...</div>

    return (
        <GovernXStackedBarChart
            data={data}
            xAxisKey="month"
            layout="horizontal"
            type="grouped"
            height={350}
            className="border-0! bg-transparent! p-0!"
            barWidth={20}
            stacks={[
                { name: "Production Units", field: "production", color: ChartTheme.accentGreen },
                { name: "Cost (USD)", field: "cost", color: ChartTheme.accentRed } // Using theme red for cost
            ]}
         />
    )
}
