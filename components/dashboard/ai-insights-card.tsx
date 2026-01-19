"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, RefreshCcw, AlertTriangle, CheckCircle, Info, Zap } from "lucide-react"
import { getSystemInsights, SystemInsight } from "@/app/actions/ai-actions"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

export function AiInsightsCard() {
    const [insights, setInsights] = useState<SystemInsight[]>([])
    const [loading, setLoading] = useState(true)

    const loadInsights = async () => {
        setLoading(true)
        try {
            const res = await getSystemInsights()
            if (res.success && res.data) {
                setInsights(res.data)
            }
        } catch (error) {
            console.error("Failed to load insights", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadInsights()
    }, [])

    return (
        <Card className="border-indigo-500/20 shadow-indigo-500/5 overflow-hidden relative bg-[#0f111a] text-white border-0">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain className="h-24 w-24 text-indigo-500" />
            </div>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-indigo-400">
                            <Sparkles className="h-5 w-5 fill-indigo-400" />
                            AI Insights Engine
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Real-time anomaly detection & recommendations
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={loadInsights} disabled={loading} className="text-slate-400 hover:text-white hover:bg-white/10">
                        <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-16 w-full rounded-full bg-white/5" />
                        <Skeleton className="h-16 w-full rounded-full bg-white/5" />
                        <Skeleton className="h-16 w-full rounded-full bg-white/5" />
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {insights.map((insight) => (
                            <div 
                                key={insight.id}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-full border-0 transition-all hover:scale-[1.01] shadow-lg",
                                    insight.type === 'critical' && "bg-[#fff0f0] text-slate-900",
                                    insight.type === 'warning' && "bg-[#fff9e6] text-slate-900",
                                    insight.type === 'success' && "bg-[#e6fffa] text-slate-900",
                                    insight.type === 'info' && "bg-[#f0f4ff] text-slate-900",
                                )}
                            >
                                <div className="shrink-0 pl-2">
                                    {insight.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                                    {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                                    {insight.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                                    {insight.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                                </div>
                                <div className="flex-1 min-w-0 grid gap-1">
                                    <p className="font-semibold text-sm truncate pr-4">
                                        {insight.message}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className={cn(
                                            "text-[10px] px-2 py-0.5 h-auto rounded-full font-medium border-0",
                                            insight.impact === 'High' && "bg-red-100 text-red-600",
                                            insight.impact === 'Medium' && "bg-amber-100 text-amber-600",
                                            insight.impact === 'Low' && "bg-blue-100 text-blue-600",
                                        )}>
                                            {insight.impact} Impact
                                        </Badge>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            {new Date(insight.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                                {insight.actionable && (
                                    <Button size="sm" className="h-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 border-0 px-4 text-xs font-medium shrink-0">
                                        <Zap className="h-3 w-3 mr-1.5" /> Act
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
