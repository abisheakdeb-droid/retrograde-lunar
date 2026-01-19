"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Types for our real-time data
export interface LiveCandle {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface LiveProductionStat {
    month: string;
    production: number;
    cost: number;
}

export interface RealTimeContextType {
    isConnected: boolean;
    candles: LiveCandle[];
    productionStats: LiveProductionStat[];
    activeAlerts: number;
    lastUpdated: Date;
    // Widget Metrics
    hourlyOutput: number;
    efficiency: number;
    activeLines: number;
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined);

// Initial Mock Data
const initialCandles: LiveCandle[] = [
    { date: "08:00", open: 120, high: 145, low: 115, close: 140 },
    { date: "09:00", open: 140, high: 155, low: 135, close: 150 },
    { date: "10:00", open: 150, high: 165, low: 145, close: 155 },
    { date: "11:00", open: 155, high: 180, low: 150, close: 175 },
    { date: "12:00", open: 175, high: 185, low: 160, close: 165 },
    { date: "13:00", open: 165, high: 170, low: 155, close: 160 },
    { date: "14:00", open: 160, high: 190, low: 158, close: 185 },
    { date: "15:00", open: 185, high: 200, low: 180, close: 195 },
    { date: "16:00", open: 195, high: 210, low: 190, close: 205 },
    { date: "17:00", open: 205, high: 215, low: 195, close: 198 },
];

const initialProductionStats: LiveProductionStat[] = [
    { month: "Jan", production: 4000, cost: 2400 },
    { month: "Feb", production: 3000, cost: 1398 },
    { month: "Mar", production: 2000, cost: 9800 },
    { month: "Apr", production: 2780, cost: 3908 },
    { month: "May", production: 1890, cost: 4800 },
    { month: "Jun", production: 2390, cost: 3800 },
    { month: "Jul", production: 3490, cost: 4300 },
];

export function RealTimeProvider({ children }: { children: ReactNode }) {
    const [candles, setCandles] = useState<LiveCandle[]>(initialCandles);
    const [productionStats, setProductionStats] = useState<LiveProductionStat[]>(initialProductionStats);
    const [isConnected, setIsConnected] = useState(false);
    const [activeAlerts, setActiveAlerts] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Widget Metrics State
    const [hourlyOutput, setHourlyOutput] = useState(850);
    const [efficiency, setEfficiency] = useState(87);
    const [activeLines, setActiveLines] = useState(12);

    useEffect(() => {
        // Simulate connection
        const timeout = setTimeout(() => setIsConnected(true), 1000);

        const interval = setInterval(() => {
            setLastUpdated(new Date());

            // 1. Update Candles (Simulate Market/Production Pulse)
            setCandles(prev => {
                const newData = [...prev];
                const last = { ...newData[newData.length - 1] };
                
                // Random walk
                const change = Math.random() * 8 - 4; 
                last.close = Math.max(100, last.close + change);
                last.high = Math.max(last.high, last.close);
                last.low = Math.min(last.low, last.close);

                newData[newData.length - 1] = last;
                return newData;
            });

            // 2. Update Production Stats (Simulate small deviations)
            setProductionStats(prev => prev.map(item => ({
                ...item,
                production: Math.max(0, item.production + Math.floor(Math.random() * 40 - 20)),
                cost: Math.max(0, item.cost + Math.floor(Math.random() * 60 - 30))
            })));

            // 3. Widget Metrics Updates
            setHourlyOutput(prev => prev + Math.floor(Math.random() * 20 - 10));
            setEfficiency(prev => Math.min(100, Math.max(70, prev + Math.random() * 4 - 2)));
            setActiveLines(prev => {
                const rand = Math.random();
                if (rand > 0.9) return Math.min(15, prev + 1);
                if (rand < 0.1) return Math.max(10, prev - 1);
                return prev;
            });

            // 4. Random Alerts
            if (Math.random() > 0.9) {
                setActiveAlerts(prev => prev + 1);
            }

        }, 2000); // 2 second heartbeat

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <RealTimeContext.Provider value={{ 
            isConnected, 
            candles, 
            productionStats, 
            activeAlerts, 
            lastUpdated,
            hourlyOutput,
            efficiency,
            activeLines
        }}>
            {children}
        </RealTimeContext.Provider>
    );
}

export function useRealTimeData() {
    const context = useContext(RealTimeContext);
    if (context === undefined) {
        throw new Error('useRealTimeData must be used within a RealTimeProvider');
    }
    return context;
}
