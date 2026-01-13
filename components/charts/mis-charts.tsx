"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, AreaChart } from "recharts"
import { HourlyProduction } from "@/lib/data/generators"
import { useEffect, useState } from "react"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const hourlyChartConfig = {
    target: {
      label: "Target",
      color: "var(--color-muted-foreground)",
    },
    achieved: {
      label: "Actual",
      color: "var(--color-primary)",
    },
  } satisfies ChartConfig

export function HourlyOutputChart({ data }: { data: HourlyProduction[] }) {
    if (!data) return <div className="h-[300px] w-full flex items-center justify-center bg-muted/10 rounded-xl animate-pulse">Initializing Tactical Feed...</div>

    return (
        <ChartContainer config={hourlyChartConfig} className="max-h-[300px] w-full">
            <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                <defs>
                    <linearGradient id="fillTargetHourly" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity={0.1} />
                    </linearGradient>
                     <linearGradient id="fillAchievedHourly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="hour" stroke="hsl(var(--foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <ChartTooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={<ChartTooltipContent indicator="dashed" className="tactical-card bg-popover/90 border-primary/50" />}
                />
                <Bar 
                    dataKey="target" 
                    fill="url(#fillTargetHourly)" 
                    radius={[4, 4, 0, 0]} 
                    className="stroke-muted-foreground stroke-[1px]"
                />
                <Bar 
                    dataKey="achieved" 
                    fill="url(#fillAchievedHourly)" 
                    radius={[4, 4, 0, 0]} 
                    className="stroke-primary stroke-[1px]"
                    onClick={(data) => console.log('Drill-down:', data)}
                />
            </BarChart>
        </ChartContainer>
    )
}

export function EfficiencyTrendChart({ data }: { data: HourlyProduction[] }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return <div className="h-[300px] w-full flex items-center justify-center bg-muted/10 rounded-xl">Loading...</div>

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorEfficiencyHourly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis dataKey="hour" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="efficiency" stroke="#f59e0b" fillOpacity={1} fill="url(#colorEfficiencyHourly)" name="Efficiency %" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
