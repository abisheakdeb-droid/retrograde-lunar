"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



interface SupplierPerformanceCardProps {
    name: string
    category: string
    score: number // 0-100
    speed: number // 0-100
    status: "Active" | "Vetted" | "Risk"
}

export function SupplierPerformanceCard({ name, category, score, speed, status }: SupplierPerformanceCardProps) {
  // Determine color based on status/score - using brighter 400 shades for dark mode contrast
  const color = status === "Risk" ? "#f87171" : status === "Vetted" ? "#22d3ee" : "#fbbf24" // red-400, cyan-400, amber-400
  const statusColor = status === "Risk" ? "text-red-400" : status === "Vetted" ? "text-cyan-400 neon-text-cyan" : "text-amber-400"
  const glowClass = status === "Vetted" ? "neon-glow-cyan" : ""

  const chartData = [{ name: "score", value: score, fill: color }]

  const chartConfig = {
    score: {
        label: "Reliability",
        color: color,
    },
  } satisfies ChartConfig

  return (
    <Card className={`tactical-card flex flex-col ${glowClass} border-opacity-50`}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm font-medium text-center uppercase tracking-wider">{name}</CardTitle>
        <CardDescription className="text-xs font-mono uppercase text-muted-foreground/70">{category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[150px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={score * 3.6 + 90}
            innerRadius={50}
            outerRadius={70}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: 'rgba(255,255,255,0.05)' }}
              dataKey="value"
              cornerRadius={5}
              fill="var(--color-score)"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-2xl font-bold font-mono"
            >
              {score}%
            </text>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground/80 text-[9px] uppercase font-bold tracking-widest"
            >
              Reliability
            </text>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs border-t border-primary/10 pt-3">
        <div className="flex items-center gap-1 font-medium leading-none font-mono uppercase">
          Speed Rating: <span className={statusColor}>{speed}/100</span> <TrendingUp className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="leading-none text-muted-foreground font-mono uppercase text-[10px]">
          Status: <span className={statusColor}>{status}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
