"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    <Card className="tactical-card backdrop-blur-md bg-card/50">
      <CardHeader>
        <CardTitle className="technical-label text-base flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
            Skill Velocity Vector
        </CardTitle>
        <CardDescription>
          Training hours vs. Composite Skill Index
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSkill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-5)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-5)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 10, fontFamily: 'monospace' }}
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={<ChartTooltipContent className="tactical-card bg-popover/90 border-primary/50" />}
            />
            <Area
              dataKey="skillIndex"
              type="monotone"
              fill="url(#fillSkill)"
              fillOpacity={0.4}
              stroke="var(--color-chart-5)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="hours"
              type="monotone"
              fill="url(#fillHours)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
