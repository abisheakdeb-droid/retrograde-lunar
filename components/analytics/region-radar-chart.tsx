"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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

export const description = "A tactical radar chart showing regional efficiency"

const chartData = [
  { region: "North Sector", efficiency: 186, security: 80, logistics: 150 },
  { region: "South Outpost", efficiency: 305, security: 200, logistics: 250 },
  { region: "Lunar Base", efficiency: 237, security: 120, logistics: 180 },
  { region: "Orbital Stn", efficiency: 73, security: 190, logistics: 100 },
  { region: "Deep Storage", efficiency: 209, security: 130, logistics: 160 },
  { region: "Command HQ", efficiency: 214, security: 140, logistics: 170 },
]

const chartConfig = {
  efficiency: {
    label: "Efficiency",
    color: "hsl(var(--chart-1))",
  },
  security: {
    label: "Security",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function RegionRadarChart() {
  return (
    <Card className="tactical-card backdrop-blur-md bg-card/50">
      <CardHeader className="items-center pb-4">
        <CardTitle className="technical-label text-base">Regional Performance Vector</CardTitle>
        <CardDescription>
          Real-time analysis of operating sectors
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
            <defs>
                <radialGradient id="radarFillEfficiency" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </radialGradient>
                 <radialGradient id="radarFillSecurity" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0}/>
                </radialGradient>
            </defs>
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="tactical-card bg-popover/90 border-primary/50" />} />
            <PolarAngleAxis dataKey="region" tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 'bold' }} />
            <PolarGrid className="stroke-primary/20" strokeWidth={0.5} />
            <Radar
              dataKey="efficiency"
              name="Efficiency"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#radarFillEfficiency)"
              fillOpacity={0.6}
              className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            />
            <Radar
                dataKey="security"
                name="Security"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                fill="url(#radarFillSecurity)"
                fillOpacity={0.4}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center pt-4">
        <div className="flex items-center gap-2 font-medium leading-none text-green-500">
          Sector 7 Efficiency up by 15.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground text-xs font-mono">
          Last Scan: {new Date().toLocaleTimeString()}
        </div>
      </CardFooter>
    </Card>
  )
}
