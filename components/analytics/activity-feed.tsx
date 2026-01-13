"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, ShieldAlert, CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card className="tactical-card col-span-1 lg:col-span-2 h-[400px] flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg font-semibold tracking-tight">Live Operations Feed</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[320px] px-6">
          <div className="space-y-4 pb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                <div className={cn(
                    "mt-1 p-1 rounded-full bg-background border",
                    item.status === 'success' && "border-green-500/50 text-green-500",
                    item.status === 'warning' && "border-yellow-500/50 text-yellow-500",
                    item.status === 'error' && "border-red-500/50 text-red-500",
                    item.status === 'info' && "border-blue-500/50 text-blue-500",
                )}>
                  {item.status === 'success' && <CheckCircle2 className="h-3 w-3" />}
                  {item.status === 'warning' && <AlertTriangle className="h-3 w-3" />}
                  {item.status === 'error' && <ShieldAlert className="h-3 w-3" />}
                  {item.status === 'info' && <Info className="h-3 w-3" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="text-primary">{item.user}</span> {item.action} <span className="text-muted-foreground">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
