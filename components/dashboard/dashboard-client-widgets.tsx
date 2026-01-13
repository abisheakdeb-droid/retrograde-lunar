"use client"

import { RealTimeProductionWidget } from "./realtime-production-widget"

export function DashboardClientWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <RealTimeProductionWidget />
    </div>
  )
}
