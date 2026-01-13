"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type DataPoint = {
    month: string
    production: number
    cost: number
}

const chartConfig = {
  production: {
    label: "Production Units",
    color: "var(--color-primary)", 
  },
  cost: {
    label: "Cost (USD)",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

export function ProductionCostChart({ data }: { data: DataPoint[] }) {
    if (!data) return <div className="h-[350px] w-full flex items-center justify-center bg-muted/10 rounded-xl animate-pulse">Initializing Tactical Feed...</div>

    return (
        <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
            <BarChart data={data}>
                <defs>
                    <linearGradient id="fillProduction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.2} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis
                    dataKey="month"
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={<ChartTooltipContent indicator="dashed" className="tactical-card bg-popover/90 border-primary/50" />}
                />
                <Bar 
                    dataKey="production" 
                    fill="url(#fillProduction)" 
                    radius={[4, 4, 0, 0]} 
                    className="stroke-primary stroke-[1px]"
                />
                <Bar 
                    dataKey="cost" 
                    fill="url(#fillCost)" 
                    radius={[4, 4, 0, 0]} 
                    className="stroke-[hsl(var(--chart-2))] stroke-[1px]"
                />
            </BarChart>
        </ChartContainer>
    )
}
