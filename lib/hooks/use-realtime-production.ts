"use client"

import { useState, useEffect } from "react"

interface ProductionData {
    hourlyOutput: number
    efficiency: number
    activeLines: number
    timestamp: string
}

export function useRealTimeProduction() {
    const [data, setData] = useState<ProductionData>({
        hourlyOutput: 850,
        efficiency: 87,
        activeLines: 12,
        timestamp: new Date().toISOString(),
    })

    useEffect(() => {
        // Simulate real-time updates every 5 seconds
        const interval = setInterval(() => {
            setData(prev => ({
                hourlyOutput: prev.hourlyOutput + Math.floor(Math.random() * 20 - 10),
                efficiency: Math.min(100, Math.max(70, prev.efficiency + Math.random() * 4 - 2)),
                activeLines: Math.floor(Math.random() * 3) + 11,
                timestamp: new Date().toISOString(),
            }))
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return data
}
