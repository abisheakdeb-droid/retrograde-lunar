import { RegionRadarChart } from "@/components/analytics/region-radar-chart"
import { ProductionAnalysisChart } from "@/components/analytics/production-analysis-chart"
import { InventoryTrendChart } from "@/components/analytics/inventory-trend-chart"
import { OverviewCard } from "@/components/analytics/overview-card"
import { ActivityFeed } from "@/components/analytics/activity-feed"
import { TypingEffect } from "@/components/ui/typing-effect"
import { db } from "@/lib/data/mock-db"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Download } from "lucide-react"

export default async function AnalyticsPage() {
  const { kpis, activity } = await db.getAnalytics()

  return (
    <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between w-full">
             <div>
                <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent uppercase font-mono flex items-center gap-2">
                  <TypingEffect text="Mission Control" />
                </h2>
                <div className="text-muted-foreground technical-label mt-1 text-xs">
                  <TypingEffect text="System Status & Operations" delay={0.5} />
                </div>
             </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCcw className="h-3 w-3" />
                    Sync
                </Button>
                <Button size="sm" className="gap-2 neon-glow-cyan">
                    <Download className="h-3 w-3" />
                    Report
                </Button>
             </div>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <OverviewCard
            key={kpi.id}
            title={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            unit={kpi.unit}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
             <ProductionAnalysisChart />
        </div>
        <div className="lg:col-span-1">
            <RegionRadarChart />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <ActivityFeed items={activity} />
        
        {/* Hardware Status Widget */}
        <div className="tactical-card rounded-xl border bg-card/50 text-card-foreground shadow p-6 lg:col-span-1">
           <h3 className="font-semibold leading-none tracking-tight mb-4 flex items-center gap-2 technical-label text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Hardware Status
           </h3>
           <div className="space-y-6">
               {['Mainframe Core', 'Database Shards', 'Network Uplink', 'Security Grid'].map((sys, idx) => (
                   <div key={sys} className="space-y-2">
                       <div className="flex items-center justify-between text-xs">
                           <span className="font-mono text-muted-foreground tracking-wider">{sys.toUpperCase()}</span>
                           <span className="text-green-500 font-bold crt-flicker">ONLINE</span>
                       </div>
                       <div className="h-1 w-full bg-secondary overflow-hidden rounded-full">
                           <div 
                            className="h-full bg-primary/50 w-full animate-pulse shadow-[0_0_10px_var(--color-primary)]" 
                            style={{ 
                                width: `${Math.random() * 20 + 80}%`,
                                animationDuration: `${Math.random() * 2 + 1}s` 
                            }} 
                           />
                       </div>
                   </div>
               ))}
           </div>
        </div>
      </div>
    </div>
  )
}
