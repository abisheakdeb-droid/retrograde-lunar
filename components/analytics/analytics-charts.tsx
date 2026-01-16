"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts"
import { fetchAnalyticsSummary } from "@/app/actions/analytics-actions"
import { Loader2, TrendingUp, AlertCircle, Package } from "lucide-react"

export function AnalyticsCharts() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const res = await fetchAnalyticsSummary()
            if (res.success) {
                setData(res.data)
            }
            setLoading(false)
        }
        load()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    if (!data) return null

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card/95 backdrop-blur-md border border-primary/50 p-3 rounded shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <p className="technical-label mb-1 text-primary">{label}</p>
                    <p className="text-sm font-bold text-foreground">
                        {payload[0].value.toLocaleString()} 
                        <span className="text-xs font-normal text-muted-foreground ml-1">
                            {payload[0].name === 'netSalary' ? 'BDT' : ''}
                        </span>
                    </p>
                </div>
            )
        }
        return null
    }

    // Chart Colors
    const COLOR_PRESENT = "hsl(142, 71%, 45%)" // Green
    const COLOR_ABSENT = "hsl(0, 84%, 60%)"    // Red
    const COLOR_LEAVE = "hsl(48, 96%, 53%)"    // Yellow
    const COLOR_INVENTORY = "hsl(35, 100%, 50%)" // Amber

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Payroll Trend */}
            {/* Payroll Trend */}
            <Card className="col-span-1 lg:col-span-2 tactical-panel">
                <CardHeader className="tactical-header">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <CardTitle className="technical-label text-base tracking-widest">Payroll Trend</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-[350px] p-4 bg-[#0b0c0e]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.payroll} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                            <defs>
                                <pattern id="hatchPat" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                                    <rect width="2" height="4" transform="translate(0,0)" fill="#22252b" opacity={0.3} />
                                </pattern>
                                <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5794f2" stopOpacity={0.5}/>
                                    <stop offset="95%" stopColor="#5794f2" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#22252b" opacity={0.5} />
                            <XAxis 
                                dataKey="name" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={{ stroke: '#22252b' }}
                                tick={{ fill: '#7b808a', fontFamily: 'monospace' }} 
                                dy={10}
                            />
                            <YAxis 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `${value}k`} 
                                tick={{ fill: '#7b808a', fontFamily: 'monospace' }}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111217', borderColor: '#22252b' }}
                                itemStyle={{ color: '#d0d0d0', fontFamily: 'monospace' }}
                                labelStyle={{ color: '#7b808a', fontSize: '10px' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="total" 
                                stroke="#5794f2" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill="url(#colorPayroll)" 
                                activeDot={{ r: 4, strokeWidth: 0, fill: '#5794f2' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Attendance Overview */}
            <Card className="tactical-panel">
                <CardHeader className="tactical-header">
                     <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-green-500" />
                        <CardTitle className="technical-label text-base tracking-widest">Attendance</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-[350px] relative p-4 flex flex-col items-center justify-center bg-[#0b0c0e]">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data.attendance}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={90}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.attendance.map((entry: any, index: number) => {
                                    let fill = '#73bf69'; // Green
                                    if (entry.name === 'Absent') fill = '#f2495c'; // Red
                                    if (entry.name === 'Leave') fill = '#ff9830'; // Orange/Yellow
                                    return <Cell key={`cell-${index}`} fill={fill} />
                                })}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111217', borderColor: '#22252b' }}
                                itemStyle={{ color: '#d0d0d0', fontFamily: 'monospace' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Center Text */}
                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="text-4xl font-mono font-bold text-foreground block">
                            {data.attendance[0]?.value + data.attendance[1]?.value + data.attendance[2]?.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Staff</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mt-4 w-full">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-sm bg-[#73bf69]"></span>
                            <span className="text-xs font-mono font-bold text-muted-foreground uppercase">Present</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-sm bg-[#f2495c]"></span>
                            <span className="text-xs font-mono font-bold text-muted-foreground uppercase">Absent</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-sm bg-[#ff9830]"></span>
                            <span className="text-xs font-mono font-bold text-muted-foreground uppercase">Leave</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* Inventory Value */}
             <Card className="col-span-1 lg:col-span-3 tactical-panel">
                <CardHeader className="tactical-header">
                    <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-amber-500" />
                        <CardTitle className="technical-label text-base tracking-widest">Top Inventory Categories</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-[300px] p-4 bg-[#0b0c0e]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.inventory} layout="vertical" barSize={12} margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                             <defs>
                                <linearGradient id="colorInventory" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#ff9830" stopOpacity={0.6}/>
                                    <stop offset="100%" stopColor="#ff9830" stopOpacity={1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#22252b" opacity={0.5} />
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                width={140} 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false}
                                tick={{ fill: '#7b808a', fontFamily: 'monospace', fontWeight: 500 }}
                            />
                            <Tooltip 
                                cursor={{ fill: '#22252b', opacity: 0.3 }} 
                                contentStyle={{ backgroundColor: '#111217', borderColor: '#22252b' }}
                                itemStyle={{ color: '#d0d0d0', fontFamily: 'monospace' }}
                            />
                            <Bar 
                                dataKey="value" 
                                fill="url(#colorInventory)" 
                                radius={[0, 2, 2, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
