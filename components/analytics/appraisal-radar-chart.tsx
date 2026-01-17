"use client"

import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart"
import { ChartTheme } from "@/components/charts/chart-theme"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { metric: "Technical", score: 85, target: 90 },
  { metric: "Communication", score: 78, target: 80 },
  { metric: "Leadership", score: 92, target: 85 },
  { metric: "Punctuality", score: 88, target: 95 },
  { metric: "Innovation", score: 70, target: 75 },
  { metric: "Safety", score: 95, target: 100 },
]

const chartConfig = {
  score: {
    label: "Current Score",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function AppraisalRadarChart() {
  return (
    <div className="w-full">
        <GovernXStackedBarChart
          data={chartData}
          xAxisKey="metric"
          layout="horizontal"
          type="grouped"
          stacks={[
            { name: "Current Score", field: "score", color: ChartTheme.accentGreen },
            { name: "Target", field: "target", color: ChartTheme.accentYellow }
          ]}
          height={350}
          className="border-0! bg-transparent! p-0!"
          barWidth={20}
        />
    </div>
  )
}
