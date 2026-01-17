"use client";

import { GovernXLineChart } from "@/components/charts/governx-line-chart";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

// Mock Data for the chart
const data = [
  { time: "Feb", value: 45000 },
  { time: "Mar", value: 52000 },
  { time: "Apr", value: 48000 },
  { time: "May", value: 61000 },
  { time: "Jun", value: 55000 },
  { time: "Jul", value: 67000 },
  { time: "Aug", value: 72000 },
  { time: "Sep", value: 69000 },
  { time: "Oct", value: 85000 },
  { time: "Nov", value: 96658 },
];

export default function GovernXDemoPage() {
  return (
    <div className="p-8 min-h-screen bg-[#0A0D11] text-foreground font-sans flex items-center justify-center">
      
      {/* Portfolio Card Container */}
      <div className="w-full max-w-4xl bg-[#15181E] rounded-2xl p-6 shadow-2xl border border-[#2A2D35] relative overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          <div className="space-y-1">
            <h2 className="text-sm text-[#8B909A] font-medium">Portfolio Balance</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white tracking-tight">$96,658</span>
              <span className="text-2xl font-medium text-[#8B909A]">.56</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-[#1F2E23] text-[#99EC72] hover:bg-[#1F2E23] border-none rounded-md px-2 py-0.5 text-xs font-semibold flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                11.2%
              </Badge>
              <span className="text-xs text-[#8B909A]">this month</span>
            </div>
          </div>

          {/* Debit Card Selector */}
          <div className="bg-[#99EC72] rounded-xl p-4 w-full md:w-64 text-black relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
               <span className="font-semibold text-sm">Debit Card</span>
               <Switch className="data-[state=checked]:bg-black/20 data-[state=unchecked]:bg-black/10" />
            </div>
            <div className="flex justify-between items-end">
                <div className="text-2xl font-bold tracking-tight">$12,658<span className="text-lg opacity-60">.24</span></div>
                 {/* Decorative circle */}
                 <div className="absolute -right-4 -bottom-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
        </div>

        {/* Chart Section */}
        <div className="h-[300px] w-full mt-4">
             <GovernXLineChart 
                data={data}
                dataKeys={[
                    { key: "value", color: "#FFF478", fill: true } 
                ]}
                className="w-full"
                height={300}
             />
        </div>

        <div className="flex justify-between mt-4 px-2">
            {data.map(d => (
                <span key={d.time} className="text-xs text-[#5E6470] font-medium">{d.time}</span>
            ))}
        </div>

      </div>
    </div>
  );
}
