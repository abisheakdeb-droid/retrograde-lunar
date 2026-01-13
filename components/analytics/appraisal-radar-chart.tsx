"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px]"
    >
      <RadarChart data={chartData}>
        <defs>
            <radialGradient id="appraisalFillScore" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/>
            </radialGradient>
        </defs>
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="tactical-card bg-popover/90 border-primary/50" />} />
        <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 'bold' }} />
        <PolarGrid className="stroke-primary/20" strokeWidth={1} />
        <Radar
          dataKey="score"
          name="Current Score"
          stroke="var(--color-primary)"
          strokeWidth={3}
          fill="url(#appraisalFillScore)"
          fillOpacity={0.5}
          className="drop-shadow-[0_0_10px_var(--color-primary)]"
        />
        <Radar
            dataKey="target"
            name="Target"
            stroke="var(--color-chart-2)" // Amber
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="transparent"
            fillOpacity={0}
        />
      </RadarChart>
    </ChartContainer>
  )
}
