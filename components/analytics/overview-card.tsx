"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface OverviewCardProps {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'neutral'
  unit?: string
  className?: string
}

export function OverviewCard({ title, value, change, trend, unit, className }: OverviewCardProps) {
  return (
    <Card className={cn("tactical-card backdrop-blur-md bg-card/50", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium technical-label text-muted-foreground">{title}</CardTitle>
        {trend === 'up' && <ArrowUp className="h-4 w-4 text-green-500" />}
        {trend === 'down' && <ArrowDown className="h-4 w-4 text-red-500" />}
        {trend === 'neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono tracking-tight">
          {typeof value === 'number' && !unit ? value.toLocaleString() : value}
          {unit && <span className="text-sm ml-1 text-muted-foreground">{unit}</span>}
        </div>
        <p className={cn(
          "text-xs flex items-center mt-1",
          trend === 'up' ? "text-green-500" : trend === 'down' ? "text-red-500" : "text-muted-foreground"
        )}>
          {change > 0 ? '+' : ''}{change}%
          <span className="text-muted-foreground ml-1">last hour</span>
        </p>
      </CardContent>
    </Card>
  )
}
