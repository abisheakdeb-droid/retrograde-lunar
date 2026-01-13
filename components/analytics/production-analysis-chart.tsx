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
    <Card className="tactical-card backdrop-blur-md bg-card/50 lg:col-span-2">
      <CardHeader>
        <CardTitle className="technical-label text-base flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
            Real-time Monthly Production
        </CardTitle>
        <CardDescription>
          Year-to-date output performance analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
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
              <linearGradient id="fillTarget" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-2)"
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
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }}
            />
            <ChartTooltip
              cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={<ChartTooltipContent indicator="line" className="tactical-card bg-popover/90 border-primary/50" />}
            />
            <Area
              dataKey="target"
              type="natural"
              fill="url(#fillTarget)"
              fillOpacity={0.4}
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              stackId="a"
              animationDuration={2000}
            />
            <Area
              dataKey="actual"
              type="natural"
              fill="url(#fillActual)"
              fillOpacity={0.4}
              stroke="var(--color-primary)"
              strokeWidth={2}
              stackId="a"
              animationDuration={2000}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
