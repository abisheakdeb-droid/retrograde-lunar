"use client";

import { TacticalChart } from "@/components/ui/tactical-chart";

// Mock Data Generators matching the image style
const generateTimeSeries = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        time: new Date(Date.now() - (count - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cpu: 10 + Math.random() * 5,
        ram_used: 0.2 + Math.random() * 0.1,
        ram_allocated: 0.5,
        rows_inserted: Math.floor(Math.random() * 200),
        rows_updated: Math.floor(Math.random() * 50),
        cache_hit: 98 + Math.random() * 2
    }));
};

const data = generateTimeSeries(30);

export default function TacticalDashboardPage() {
    return (
        <div className="p-6 bg-[#050505] min-h-screen text-foreground font-sans">
            <h1 className="text-xl font-bold uppercase tracking-widest text-muted-foreground mb-6">System Telemetry</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                
                {/* RAM Chart matching reference */}
                <TacticalChart 
                    title="RAM"
                    subtitle="GIGABYTES ▧ ENDPOINT INACTIVE ■ ALLOCATED ■ USED"
                    data={data}
                    dataKeys={[
                        { key: "ram_allocated", color: "#2E8B57", fill: true }, // Greenish
                        { key: "ram_used", color: "#00BFFF", fill: true }       // Cyan
                    ]}
                    yAxisLabel="GB"
                />

                {/* CPU Chart */}
                <TacticalChart 
                    title="CPU"
                    subtitle="COMPUTE UNITS ▧ ENDPOINT INACTIVE ■ ALLOCATED ■ USED"
                    data={data}
                    dataKeys={[
                        { key: "cpu", color: "#00BFFF", fill: false }
                    ]}
                    yAxisLabel="CU"
                />

                 {/* Rows Chart */}
                 <TacticalChart 
                    title="Rows"
                    subtitle="COUNT ■ INSERTED ■ UPDATED ■ DELETED"
                    data={data}
                    dataKeys={[
                        { key: "rows_inserted", color: "#00ff9d", fill: false },
                        { key: "rows_updated", color: "#00BFFF", fill: false }
                    ]}
                />

                {/* Local Cache Chart */}
                <TacticalChart 
                    title="Local file cache hit rate"
                    subtitle="PERCENTAGE"
                    data={data}
                    dataKeys={[
                        { key: "cache_hit", color: "#00BFFF", fill: false }
                    ]}
                    yAxisLabel="%"
                />

            </div>
        </div>
    )
}
