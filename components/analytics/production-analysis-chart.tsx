"use client"

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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", actual: 186, target: 160 },
  { month: "February", actual: 305, target: 280 },
  { month: "March", actual: 237, target: 200 },
  { month: "April", actual: 73, target: 90 },
  { month: "May", actual: 209, target: 220 },
  { month: "June", actual: 214, target: 200 },
  { month: "July", actual: 250, target: 240 },
  { month: "August", actual: 320, target: 300 },
  { month: "September", actual: 280, target: 260 },
  { month: "October", actual: 290, target: 280 },
  { month: "November", actual: 330, target: 310 },
  { month: "December", actual: 360, target: 340 },
]

const chartConfig = {
  actual: {
    label: "Actual Output",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target Goals",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ProductionAnalysisChart() {
  return (
    <Card className="tactical-card backdrop-blur-md bg-card/50 lg:col-span-2 overflow-hidden">
      <CardHeader>
        <CardTitle className="technical-label text-base flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
            Real-time Monthly Production
        </CardTitle>
        <CardDescription>
          Year-to-date output performance analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <GovernXDualAreaLineChart
          data={chartData}
          series={[
            {
              name: "Actual Output",
              field: "actual",
              color: ChartTheme.accentGreen,
              yAxisId: "left",
              fillType: "gradient",
              gradientColors: ChartTheme.positiveFill as [string, string]
            },
            {
              name: "Target Goals",
              field: "target",
              color: ChartTheme.accentYellow,
              yAxisId: "left", // Both on same axis for comparison usually, or standard? 
              // Original code didn't specify axisId so both were on default (left).
              fillType: "gradient",
              gradientColors: [ChartTheme.accentYellow, "#1A1A00"]
            }
          ]}
          xAxisKey="month"
          height={350}
          className="!border-0 !bg-transparent !p-0 !rounded-none"
          yLeft={{ 
             tick: { fill: '#888', fontSize: 10 },
             tickFormatter: (value: number) => `${value}` 
          }}
        />
      </CardContent>
    </Card>
  )
}
