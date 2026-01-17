"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    Activity, 
    AlertTriangle, 
    ArrowUpRight, 
    CheckCircle2, 
    ChevronDown, 
    DollarSign, 
    Download, 
    Droplets, 
    Factory, 
    FileText, 
    Filter, 
    LayoutDashboard, 
    Layers, 
    MoreHorizontal, 
    Play, 
    Search, 
    Settings, 
    Shirt, 
    SlidersHorizontal, 
    TrendingUp, 
    Users, 
    MoreVertical,
    ExternalLink,
    Box,
    ShoppingCart
} from "lucide-react";
import Link from "next/link"
import { cn } from "@/lib/utils"
// import { ProductionCostChart } from "@/components/charts/production-cost-chart" (Removed)
// import { HourlyOutputChart } from "@/components/charts/mis-charts" (Removed)
// import { GovernXProductionChart } from "@/components/charts/governx-production-chart" (Removed)
import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart";
import { GovernXCandlestickChart } from "@/components/charts/governx-candlestick-chart";
import { FactoryTicker } from "@/components/dashboard/factory-ticker";
import { FactoryUnitCard } from "@/components/dashboard/factory-unit-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardClientWidgets } from "@/components/dashboard/dashboard-client-widgets"
import { DashboardCustomization } from "@/components/dashboard/dashboard-customization"

const productionCandleData = [
  { date: "08:00", open: 120, high: 145, low: 115, close: 140 },
  { date: "09:00", open: 140, high: 155, low: 135, close: 150 },
  { date: "10:00", open: 150, high: 165, low: 145, close: 155 },
  { date: "11:00", open: 155, high: 180, low: 150, close: 175 },
  { date: "12:00", open: 175, high: 185, low: 160, close: 165 }, // Lunch dip
  { date: "13:00", open: 165, high: 170, low: 155, close: 160 },
  { date: "14:00", open: 160, high: 190, low: 158, close: 185 }, // Post-lunch productivity
  { date: "15:00", open: 185, high: 200, low: 180, close: 195 },
  { date: "16:00", open: 195, high: 210, low: 190, close: 205 }, // Peak
  { date: "17:00", open: 205, high: 215, low: 195, close: 198 }, // Wind down
];

export function ExecutiveDashboard({ data, role }: { data: any, role: string }) {
    const { stats, productionStats, factoryUnits } = data

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300 max-w-full overflow-x-hidden">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight uppercase">
                        {role === 'md' ? 'Managing Director Command' : 
                         role === 'dmd' ? 'Deputy MD Ops Center' : 
                         role === 'ed' ? 'Executive Director View' : 
                         'System Admin Console'}
                    </h2>
                    <p className="text-muted-foreground">Strategic Overview & Global KPIs.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <DashboardCustomization />
                    <span className="text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                        <Activity className="h-4 w-4" /> Live Production
                    </span>
                </div>
            </div>

            {/* Core Metrics Row (FinSight Design) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/dashboard/hrm">
                    <Card className="bg-card/40 border-primary/20 hover:border-primary/50 cursor-pointer group transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="technical-label text-xs font-mono text-muted-foreground">TOTAL OPERATIVES</CardTitle>
                            <Users className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono tracking-tighter text-primary neon-glow-cyan">
                                {stats.totalEmployees.toLocaleString()}
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center uppercase tracking-widest font-mono">
                                Active Personnel <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/requisition">
                    <Card className="bg-card/40 border-chart-2/20 hover:border-chart-2/50 cursor-pointer group transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="technical-label text-xs font-mono text-muted-foreground">PENDING REQUESTS</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-chart-2/50 group-hover:text-chart-2 transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono tracking-tighter text-chart-2 neon-glow-yellow">
                                {stats.pendingRequisitions.toLocaleString()}
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center uppercase tracking-widest font-mono">
                                Awaiting Approval <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/erp">
                    <Card className="bg-card/40 border-chart-3/20 hover:border-chart-3/50 cursor-pointer group transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="technical-label text-xs font-mono text-muted-foreground">INVENTORY VALUE</CardTitle>
                            <Box className="h-4 w-4 text-chart-3/50 group-hover:text-chart-3 transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono tracking-tighter text-chart-3 neon-glow-green">
                                ${(stats.totalInventoryValue / 1000000).toFixed(2)}M
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center uppercase tracking-widest font-mono">
                                Warehouse Assets <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Card className="bg-card/40 border-chart-5/20 group relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-20 h-20 bg-chart-5/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
                     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="technical-label text-xs font-mono text-muted-foreground">SYSTEM HEALTH</CardTitle>
                        <Activity className="h-4 w-4 text-chart-5 animate-pulse" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono tracking-tighter text-chart-5/90">
                            99.9%
                        </div>
                        <div className="mt-2 h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                            <div className="h-full bg-chart-5 w-[99.9%] neon-glow-amber"></div>
                        </div>
                         <p className="text-[10px] text-muted-foreground mt-1 flex items-center uppercase tracking-widest font-mono">
                            Compliance Pulse
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Real-time Production Widget */}
            <DashboardClientWidgets />

            {/* Main Production Chart */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                     <GovernXStackedBarChart 
                        title="Production vs Cost"
                        data={productionStats} 
                        xAxisKey="month"
                        layout="horizontal"
                        type="grouped"
                        height={350}
                        barWidth={10}
                        stacks={[
                            { 
                                name: "Production Units", 
                                field: "production", 
                                color: "#FFE066", // Solid Yellow (accentYellow)
                                radius: [2, 2, 0, 0]
                            },
                            { 
                                name: "Cost (USD)", 
                                field: "cost", 
                                color: "#7CFF6B", // Solid Green (accentGreen)
                                radius: [2, 2, 0, 0]
                            }
                        ]}
                        className="border-0! bg-transparent!"
                     />
                </div>

                <Card className="col-span-3 bg-card/40 border-primary/20">
                    <CardHeader>
                        <CardTitle className="technical-label text-sm">LIVE RUNS STREAM</CardTitle>
                        <CardDescription className="text-xs font-mono">
                            Real-time factory floor events.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center group cursor-pointer p-2 -mx-2 rounded-md hover:bg-primary/5 transition-colors border-b border-border/20 last:border-0">
                                    <div className={cn(
                                        "h-2 w-2 rounded-full mr-3 shadow-[0_0_8px]",
                                        i === 1 ? "bg-chart-3 shadow-chart-3/50" : "bg-chart-2 shadow-chart-2/50"
                                    )} />
                                    
                                    <div className="w-12 text-[10px] font-mono text-muted-foreground shrink-0 tabular-nums text-right mr-4 border-r border-border/40 pr-4">
                                        {i * 15}m
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs font-medium leading-none text-foreground/90 group-hover:text-primary transition-colors font-mono">
                                            {i === 1 ? 'TARGET_ACHIEVED :: H&M_ORDER_#442' : 'BATCH_QC_PASSED :: LINE_14'}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[9px] h-4 px-1 rounded-none border-primary/20 text-primary/70">
                                                L{12 + i}
                                            </Badge>
                                            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Creative Collections</span>
                                        </div>
                                    </div>
                                    
                                    <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Deep MIS Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Factory className="h-6 w-6" /> Factory Command Center
                    </h3>
                    <div className="text-sm text-muted-foreground">
                        Last Updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full min-w-0">
                    {factoryUnits.map((unit: any) => (
                        <div key={unit.id} className="min-w-0 w-full">
                            <FactoryUnitCard unit={unit} candleData={productionCandleData} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
