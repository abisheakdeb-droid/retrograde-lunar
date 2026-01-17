"use client"

import { TrendingUp } from "lucide-react"
import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart"
import { ChartTheme } from "@/components/charts/chart-theme"

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
    <Card className="tactical-card backdrop-blur-md bg-card/50 overflow-hidden">
      <CardHeader className="items-center pb-4">
        <CardTitle className="technical-label text-base">Regional Performance Vector</CardTitle>
        <CardDescription>
          Real-time analysis of operating sectors
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <GovernXStackedBarChart
          data={chartData}
          xAxisKey="region"
          layout="vertical"
          type="grouped"
          stacks={[
            { name: "Efficiency", field: "efficiency", color: ChartTheme.accentGreen },
            { name: "Security", field: "security", color: ChartTheme.accentRed }
          ]}
          height={300}
          className="border-0! bg-transparent! p-0!"
          barWidth={15}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center pt-4 border-t border-border/10">
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
