"use client"

import { useState, useEffect } from "react"

export interface WidgetConfig {
    id: string
    name: string
    enabled: boolean
    order: number
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
    { id: "stats", name: "Core Metrics", enabled: true, order: 0 },
    { id: "production", name: "Production Overview", enabled: true, order: 1 },
    { id: "factory", name: "Factory Performance", enabled: true, order: 2 },
    { id: "mis", name: "MIS Charts", enabled: true, order: 3 },
]

export function useWidgetConfig() {
    const [widgets, setWidgets] = useState<WidgetConfig[]>(DEFAULT_WIDGETS)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const saved = localStorage.getItem("dashboard-widgets")
        if (saved) {
            try {
                setWidgets(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse widget config", e)
            }
        }
    }, [])

    const saveWidgets = (newWidgets: WidgetConfig[]) => {
        setWidgets(newWidgets)
        localStorage.setItem("dashboard-widgets", JSON.stringify(newWidgets))
    }

    const toggleWidget = (id: string) => {
        const newWidgets = widgets.map(w =>
            w.id === id ? { ...w, enabled: !w.enabled } : w
        )
        saveWidgets(newWidgets)
    }

    const resetWidgets = () => {
        saveWidgets(DEFAULT_WIDGETS)
    }

    return {
        widgets,
        toggleWidget,
        resetWidgets,
    }
}
