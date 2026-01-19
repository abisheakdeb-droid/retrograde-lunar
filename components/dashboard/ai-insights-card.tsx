"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, RefreshCcw, AlertTriangle, CheckCircle, Info, Zap } from "lucide-react"
import { getSystemInsights, SystemInsight } from "@/app/actions/ai-actions"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

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
        <Card className="border-indigo-500/20 shadow-indigo-500/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain className="h-24 w-24 text-indigo-500" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                            <Sparkles className="h-5 w-5 fill-indigo-100 dark:fill-indigo-900" />
                            AI Insights Engine
                        </CardTitle>
                        <CardDescription>
                            Real-time anomaly detection & recommendations
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={loadInsights} disabled={loading}>
                        <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-16 w-full rounded-lg" />
                        <Skeleton className="h-16 w-full rounded-lg" />
                        <Skeleton className="h-16 w-full rounded-lg" />
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {insights.map((insight) => (
                            <div 
                                key={insight.id}
                                className={cn(
                                    "flex items-start gap-3 p-3 rounded-lg border text-sm transition-all hover:shadow-sm",
                                    insight.type === 'critical' && "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-800",
                                    insight.type === 'warning' && "bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-800",
                                    insight.type === 'success' && "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-800",
                                    insight.type === 'info' && "bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800",
                                )}
                            >
                                <div className="mt-0.5 shrink-0">
                                    {insight.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                                    {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600" />}
                                    {insight.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                                    {insight.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium text-slate-900 dark:text-slate-100">
                                        {insight.message}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className={cn(
                                            "text-[10px] px-1.5 py-0 h-5",
                                            insight.impact === 'High' && "border-red-200 text-red-700 bg-red-50",
                                            insight.impact === 'Medium' && "border-amber-200 text-amber-700 bg-amber-50",
                                            insight.impact === 'Low' && "border-slate-200 text-slate-700 bg-slate-50",
                                        )}>
                                            {insight.impact} Impact
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">
                                            {new Date(insight.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                                {insight.actionable && (
                                    <Button size="sm" variant="outline" className="h-7 text-xs ml-auto">
                                        <Zap className="h-3 w-3 mr-1" /> Act
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
