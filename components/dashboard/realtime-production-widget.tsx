"use client"

import { useState, useEffect } from "react"
import { useRealTimeProduction } from "@/lib/hooks/use-realtime-production"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Factory } from "lucide-react"

export function RealTimeProductionWidget() {
  const { hourlyOutput, efficiency, activeLines, timestamp } = useRealTimeProduction()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering time-sensitive data
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card className="tactical-card border-l-4 border-l-primary/50 overflow-hidden relative group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="technical-label">Live Production</CardTitle>
        <Badge variant="outline" className="gap-1 border-primary/30 text-primary rounded-none bg-primary/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Live
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Hourly Output</span>
            </div>
            <span className="text-2xl font-bold font-mono text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">{hourlyOutput}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Efficiency</span>
            </div>
            <span className="text-2xl font-bold font-mono text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">{efficiency.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Factory className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Active Lines</span>
            </div>
            <span className="text-2xl font-bold font-mono text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">{activeLines}</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mt-4">
            Updated {mounted ? new Date(timestamp).toLocaleTimeString() : "--:--:--"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
