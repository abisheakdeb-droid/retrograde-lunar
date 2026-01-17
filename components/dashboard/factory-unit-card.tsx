"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertTriangle, TrendingUp, Shirt, Layers, Droplets, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { GovernXCandlestickChart } from "@/components/charts/governx-candlestick-chart"
import { FactoryTicker } from "@/components/dashboard/factory-ticker"

export function FactoryUnitCard({ unit, candleData }: { unit: any, candleData: any[] }) {
    const totalDailyTarget = unit.lines.reduce((acc: any, line: any) => acc + line.dailyTarget, 0);
    const totalDailyAchieved = unit.lines.reduce((acc: any, line: any) => acc + line.totalProduced, 0);

    // Generate Unit-Specific Ticker Items
    const tickerItems = unit.lines.map((line: any, i: number) => ({
        id: line.id,
        text: `LINE ${line.name.split(' ')[1]} :: ${line.status === 'Running' ? 'TARGET_ON_TRACK' : 'MAINTENANCE_REQ'}`,
        value: `${line.efficiency}%`,
        trend: line.efficiency > 60 ? 'up' : 'down',
        type: line.efficiency > 60 ? 'success' : 'warning'
    }))

    return (
        <Card className="bg-[#0E1218] border border-[#2A2F38] overflow-hidden shadow-2xl">
            {/* Compact Header */}
            {/* Compact Header - Responsive Wrapper */}
            <div className="bg-[#151A21] px-4 py-3 flex flex-wrap gap-y-2 items-center justify-between border-b border-[#2A2F38]">
                <div className="flex items-center gap-2 min-w-0">
                    {unit.type === 'Denim' && <Shirt className="w-4 h-4 text-blue-400 shrink-0" />}
                    {unit.type === 'Woven' && <Layers className="w-4 h-4 text-amber-400 shrink-0" />}
                    {unit.type === 'Washing' && <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />}
                    <h3 className="font-bold text-[#E8EBF0] tracking-tight uppercase text-sm truncate">{unit.name}</h3>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-auto">
                    <Badge variant="outline" className="text-[10px] h-5 border-[#2A2F38] text-muted-foreground font-mono whitespace-nowrap hidden sm:flex">
                        MGR: {unit.manager.split(' ').map((n:any) => n[0]).join('')}
                    </Badge>
                     {/* Status Dot */}
                    <div className="flex items-center gap-1.5 bg-[#0E1218] px-2 py-0.5 rounded-full border border-[#2A2F38]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] text-green-500 font-mono font-bold tracking-wider">LIVE</span>
                    </div>
                </div>
            </div>

            {/* KPI Strip - Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#2A2F38] border-b border-[#2A2F38] bg-[#0E1218]">
                <div className="p-3 text-center">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Output</div>
                    <div className="text-sm font-bold text-[#E8EBF0] font-mono">{totalDailyAchieved.toLocaleString()}</div>
                </div>
                <div className="p-3 text-center border-l-0">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Efficiency</div>
                    <div className="text-sm font-bold text-[#7CFF6B] font-mono">{unit.overallEfficiency}%</div>
                </div>
                 <div className="p-3 text-center">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Active</div>
                    <div className="text-sm font-bold text-blue-400 font-mono">{unit.lines.filter((l: any) => l.status === 'Running').length}/{unit.lines.length}</div>
                </div>
                 <div className="p-3 text-center">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">DHU</div>
                    <div className="text-sm font-bold text-[#FF5B5B] font-mono">1.8%</div>
                </div>
            </div>

            <CardContent className="p-0 min-w-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 max-w-full min-w-0">
                    {/* Chart Area */}
                    <div className="lg:col-span-2 p-4 border-b lg:border-b-0 lg:border-r border-[#2A2F38] bg-[#0E1218] overflow-hidden min-w-0">
                        <GovernXCandlestickChart 
                            data={candleData} 
                            height={220} 
                            className="!border-0 !p-0 !bg-transparent w-full max-w-full"
                            title="VOLATILITY INDEX"
                        />
                    </div>
                    
                    {/* Mini List / Stats */}
                    <div className="p-4 space-y-3 bg-[#151A21]/20">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">TOP PERFORMERS</div>
                        {unit.lines.slice(0, 3).map((line: any, idx: number) => (
                             <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="font-mono text-[#9AA1AC]">{line.name}</span>
                                <Badge variant="outline" className="h-4 text-[9px] border-[#7CFF6B]/20 text-[#7CFF6B]">
                                    {line.efficiency}%
                                </Badge>
                            </div>
                        ))}
                         <div className="h-px bg-[#2A2F38] my-3"></div>
                         <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">CRITICAL ISSUES</div>
                         <div className="flex items-center gap-2 text-xs text-[#FF5B5B]">
                            <AlertTriangle className="w-3 h-3" />
                            <span className="font-mono">LINE 04 :: STOPPED</span>
                         </div>
                    </div>
                </div>
                
                {/* Static Ticker List (Visualized Individually) */}
                <div className="border-t border-[#2A2F38] divide-y divide-[#2A2F38] bg-[#0A0C10]">
                    {tickerItems.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-2 text-[10px] font-mono hover:bg-[#151A21] transition-colors">
                            <span className={`
                                font-bold tracking-wider
                                ${item.type === 'success' ? 'text-[#7CFF6B]' : ''}
                                ${item.type === 'danger' ? 'text-[#FF5B5B]' : ''}
                                ${item.type === 'warning' ? 'text-[#FFE066]' : ''}
                                ${item.type === 'info' ? 'text-[#E8EBF0]' : ''}
                            `}>
                                {item.id === 2 || item.id === 4 ? "⚠ " : ""}
                                {item.text}
                            </span>
                            
                            <span className={`
                                flex items-center
                                ${item.trend === 'up' ? 'text-[#7CFF6B]' : ''}
                                ${item.trend === 'down' ? 'text-[#FF5B5B]' : ''}
                                ${item.trend === 'neutral' ? 'text-[#9AA1AC]' : ''}
                            `}>
                                {item.value}
                                {item.trend === 'up' && <ArrowUpRight className="w-3 h-3 ml-1" />}
                                {item.trend === 'down' && <ArrowDownRight className="w-3 h-3 ml-1" />}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
