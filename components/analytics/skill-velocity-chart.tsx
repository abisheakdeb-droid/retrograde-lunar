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
  { month: "Jan", hours: 45, skillIndex: 65 },
  { month: "Feb", hours: 52, skillIndex: 68 },
  { month: "Mar", hours: 48, skillIndex: 72 },
  { month: "Apr", hours: 61, skillIndex: 75 },
  { month: "May", hours: 55, skillIndex: 78 },
  { month: "Jun", hours: 67, skillIndex: 82 },
]

const chartConfig = {
  hours: {
    label: "Learning Hours",
    color: "hsl(var(--chart-1))",
  },
  skillIndex: {
    label: "Skill Index",
    color: "hsl(var(--chart-5))", // Neon Purple/Pinkish typically
  },
} satisfies ChartConfig

export function SkillVelocityChart() {
  return (
    <Card className="tactical-card backdrop-blur-md bg-card/50 overflow-hidden">
      <CardHeader>
        <CardTitle className="technical-label text-base flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
            Skill Velocity Vector
        </CardTitle>
        <CardDescription>
          Training hours vs. Composite Skill Index
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <GovernXDualAreaLineChart
          data={chartData}
          series={[
            {
              name: "Skill Index",
              field: "skillIndex",
              color: "#D946EF", // Magenta/Pinkish (Chart-5)
              yAxisId: "left",
              fillType: "gradient",
              gradientColors: ["#86198F", "#F0ABFC"]
            },
            {
              name: "Learning Hours",
              field: "hours",
              color: ChartTheme.accentGreen, // Primary
              yAxisId: "right", // Different scales likely needed
              fillType: "gradient",
              gradientColors: ChartTheme.positiveFill as [string, string]
            }
          ]}
          xAxisKey="month"
          height={300}
          className="border-0! bg-transparent! p-0! rounded-none!"
          yLeft={{ label: { value: 'Skill Index', angle: -90, position: 'insideLeft', style: { fill: '#888' }} }}
          yRight={{ label: { value: 'Hours', angle: 90, position: 'insideRight', style: { fill: '#888' }} }}
        />
      </CardContent>
    </Card>
  )
}
