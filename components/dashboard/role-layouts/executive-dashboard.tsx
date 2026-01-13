"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShoppingCart, Box, Activity, ExternalLink, TrendingUp, AlertTriangle, Play, Factory, Shirt, Layers, Droplets } from "lucide-react"
import Link from "next/link"
import { ProductionCostChart } from "@/components/charts/production-cost-chart"
import { HourlyOutputChart } from "@/components/charts/mis-charts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardClientWidgets } from "@/components/dashboard/dashboard-client-widgets"
import { DashboardCustomization } from "@/components/dashboard/dashboard-customization"

export function ExecutiveDashboard({ data, role }: { data: any, role: string }) {
    const { stats, productionStats, factoryUnits } = data

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
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

            {/* Core Metrics Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/dashboard/hrm">
                    <Card className="hover:border-primary/50 cursor-pointer group transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold group-hover:text-primary transition-colors">
                                {stats.totalEmployees.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center">
                                View Directory <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/requisition">
                    <Card className="hover:border-primary/50 cursor-pointer group transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold group-hover:text-primary transition-colors">
                                {stats.pendingRequisitions.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center">
                                Review Now <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/erp">
                    <Card className="hover:border-primary/50 cursor-pointer group transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                            <Box className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold group-hover:text-primary transition-colors">
                                ${(stats.totalInventoryValue / 1000000).toFixed(2)}M
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center">
                                Manage Stock <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Status</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All systems nominal
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Real-time Production Widget */}
            <DashboardClientWidgets />

            {/* Main Production Chart */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Production vs Cost</CardTitle>
                        <CardDescription>
                            Real-time monthly production analysis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ProductionCostChart data={productionStats} />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Live Updates</CardTitle>
                        <CardDescription>
                            Latest factory floor events.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">
                                        L{12 + i}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                                            {i === 1 ? 'Target Achieved for H&M Order' : 'Batch QC Passed'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Line {12 + i} • Creative Collections</p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground">{i * 15}m ago</div>
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

                <Tabs defaultValue={factoryUnits[0].id} className="space-y-4">
                    <TabsList>
                        {factoryUnits.map((unit: any) => (
                            <TabsTrigger key={unit.id} value={unit.id} className="gap-2">
                                {unit.type === 'Denim' && <Shirt className="w-4 h-4" />}
                                {unit.type === 'Woven' && <Layers className="w-4 h-4" />}
                                {unit.type === 'Washing' && <Droplets className="w-4 h-4" />}
                                {unit.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {factoryUnits.map((unit: any) => {
                        const sampleHourlyData = unit.lines[0].hourlyData;
                        const totalDailyTarget = unit.lines.reduce((acc: any, line: any) => acc + line.dailyTarget, 0);
                        const totalDailyAchieved = unit.lines.reduce((acc: any, line: any) => acc + line.totalProduced, 0);

                        return (
                            <TabsContent key={unit.id} value={unit.id} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Daily Output</CardTitle>
                                            <Shirt className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{totalDailyAchieved.toLocaleString()} pcs</div>
                                            <p className="text-xs text-muted-foreground">Target: {totalDailyTarget.toLocaleString()}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Line Efficiency</CardTitle>
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{unit.overallEfficiency}%</div>
                                            <p className="text-xs text-muted-foreground">Manager: {unit.manager}</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Active Lines</CardTitle>
                                            <Play className="h-4 w-4 text-blue-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{unit.lines.filter((l: any) => l.status === 'Running').length} / {unit.lines.length}</div>
                                            <p className="text-xs text-muted-foreground">2 Customizing</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Avg DHU</CardTitle>
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">1.8%</div>
                                            <p className="text-xs text-muted-foreground">Quality Control Pass</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid gap-4 md:grid-cols-7">
                                    <Card className="col-span-4">
                                        <CardHeader>
                                            <CardTitle>Hourly Production (Target vs Actual)</CardTitle>
                                            <CardDescription>Line 14 Detailed Breakdown</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pl-2">
                                            <HourlyOutputChart data={sampleHourlyData} />
                                        </CardContent>
                                    </Card>
                                    <Card className="col-span-3">
                                        <CardHeader>
                                            <CardTitle>Efficiency Heatmap</CardTitle>
                                            <CardDescription>Real-time line performance.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {unit.lines.slice(0, 6).map((line: any) => (
                                                    <div key={line.id} className="flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <p className="text-sm font-medium leading-none">{line.name}</p>
                                                            <p className="text-xs text-muted-foreground">{line.buyer} • {line.style}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm font-bold">{line.dhu}% DHU</div>
                                                            <Badge variant={line.dhu < 2 ? "default" : "destructive"} className="text-[10px] h-5">
                                                                {line.dhu < 2 ? 'Excellent' : 'Needs Check'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </div>
    )
}
