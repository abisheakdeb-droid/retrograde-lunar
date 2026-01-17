"use client"

import { TrendingUp } from "lucide-react"
import { GovernXRadialGaugeChart } from "@/components/charts/governx-radial-gauge-chart"

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
      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        <div className="w-full max-w-[150px]">
            <GovernXRadialGaugeChart
                value={score}
                max={100}
                config={{
                    color: color,
                    background: 'rgba(255,255,255,0.05)',
                    thickness: 10,
                    startAngle: 225, // 180 + 45
                    endAngle: -45
                }}
                centerLabel={{
                    primary: `${score}%`,
                    secondary: "Reliability"
                }}
                className="border-0! bg-transparent! p-0! min-h-0!"
            />
        </div>
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
