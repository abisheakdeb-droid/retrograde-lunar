import { RealTimeProductionWidget } from "./realtime-production-widget"
import { AIInsightPanel } from "@/components/shared/ai-insight-panel"

export function DashboardClientWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <RealTimeProductionWidget />
      <div className="md:col-span-2">
        <AIInsightPanel context="production" className="h-full" />
      </div>
    </div>
  )
}
