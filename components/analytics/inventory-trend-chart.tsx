"use client"

import * as React from "react"
import { GovernXDualAreaLineChart } from "@/components/charts/governx-dual-area-line-chart"
import { ChartTheme } from "@/components/charts/chart-theme"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export function InventoryTrendChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  return (
    <Card className="tactical-card backdrop-blur-md bg-card/50 overflow-hidden">
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
      <CardContent className="p-0">
          {/* We strip the internal card styling of the chart component to fit into this Card */}
          <GovernXDualAreaLineChart
            data={chartData}
            series={[
                {
                    name: "Total Value",
                    field: "value",
                    color: ChartTheme.accentGreen,
                    yAxisId: "left",
                    fillType: "gradient",
                    gradientColors: ChartTheme.positiveFill as [string, string]
                },
                {
                    name: "Movement Vol",
                    field: "volume",
                    color: ChartTheme.accentYellow,
                    yAxisId: "right",
                    fillType: "gradient",
                    gradientColors: [ChartTheme.accentYellow, "#1A1A00"]
                }
            ]}
            xAxisKey="date"
            height={300}
            className="border-0! bg-transparent! p-0! rounded-none!"
            yLeft={{ label: { value: 'Value (k)', angle: -90, position: 'insideLeft', style: { fill: '#888' }} }}
            yRight={{ label: { value: 'Volume', angle: 90, position: 'insideRight', style: { fill: '#888' }} }}
          />
      </CardContent>
    </Card>
  )
}
