"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "A tactical area chart for inventory value"

const chartData = [
  { date: "2025-01-01", value: 450, volume: 300 },
  { date: "2025-01-02", value: 500, volume: 320 },
  { date: "2025-01-03", value: 520, volume: 280 },
  { date: "2025-01-04", value: 480, volume: 290 },
  { date: "2025-01-05", value: 600, volume: 450 },
  { date: "2025-01-06", value: 580, volume: 420 },
  { date: "2025-01-07", value: 650, volume: 480 },
  { date: "2025-01-08", value: 620, volume: 460 },
  { date: "2025-01-09", value: 700, volume: 550 },
  { date: "2025-01-10", value: 750, volume: 600 },
  { date: "2025-01-11", value: 720, volume: 580 },
  { date: "2025-01-12", value: 800, volume: 650 },
]

const chartConfig = {
  value: {
    label: "Total Value (k)",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Movement Vol",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function InventoryTrendChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  return (
    <Card className="tactical-card backdrop-blur-md bg-card/50">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border/40 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="technical-label text-base">Asset Valuation Timeline</CardTitle>
          <CardDescription>
            Historical analysis of inventory worth and movement volume.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              tick={{ fontSize: 10, fill: 'hsl(var(--foreground))', fontFamily: 'monospace' }}
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={
                <ChartTooltipContent
                  className="tactical-card bg-popover/90 border-primary/50"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="volume"
              type="natural"
              fill="url(#fillVolume)"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              stackId="a"
              animationDuration={1500}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="var(--color-primary)"
              strokeWidth={2}
              stackId="a"
              animationDuration={1500}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
