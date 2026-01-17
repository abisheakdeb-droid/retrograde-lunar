"use client";

import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine } from 'recharts';

/***
 * GovernX Candlestick Chart
 * Refactored to use "Two-Bar" method for stability (Wick + Body).
 */

interface GovernXCandlestickChartProps {
  data: {
      time: string;
      open: number;
      high: number;
      low: number;
      close: number;
  }[];
  height?: number;
  title?: string;
  currentPrice?: number;
  change?: string;
}

export function GovernXCandlestickChart({ data, height = 300, title, currentPrice, change }: GovernXCandlestickChartProps) {
    const minValue = Math.min(...data.map(d => d.low)) * 0.99;
    const maxValue = Math.max(...data.map(d => d.high)) * 1.01;

    // Pre-process data for Recharts Range Bars
    const processedData = data.map(d => ({
        ...d,
        // Range for Body: [Min(Open, Close), Max(Open, Close)]
        body: [Math.min(d.open, d.close), Math.max(d.open, d.close)],
        // Range for Wick: [Low, High]
        wick: [d.low, d.high],
        isUp: d.close >= d.open
    }));

    return (
    <div className="flex flex-col p-4 bg-[#15181E] rounded-2xl border border-[#2A2D35] shadow-lg w-full">
       <div className="flex justify-between items-center mb-4">
           {title && <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">{title}</h3>}
           <div className="flex items-center gap-3">
               <span className="text-2xl font-bold text-white tracking-tight">{currentPrice?.toFixed(2)}</span>
               {change && <span className="bg-[#1F2E23] text-[#99EC72] text-xs font-bold px-2 py-1 rounded-md border border-[#99EC72]/20">
                   {change}
               </span>}
           </div>
       </div>

      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <ComposedChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" stroke="#1F2228" vertical={false} />
             <XAxis dataKey="time" tick={{ fill: '#8B909A', fontSize: 10 }} axisLine={false} tickLine={false} />
             <YAxis domain={[minValue, maxValue]} orientation="right" tick={{ fill: '#8B909A', fontSize: 10 }} axisLine={false} tickLine={false} />
             <Tooltip 
                contentStyle={{ backgroundColor: '#15181E', border: '1px solid #2A2D35' }}
                cursor={{ stroke: '#8B909A', strokeWidth: 1, strokeDasharray: '4 4' }}
                labelStyle={{ color: '#8B909A' }}
             />
             
             {/* Wick Bar (Thin) - Rendered first to be behind body */}
             <Bar dataKey="wick" barSize={1}>
                {processedData.map((d, i) => (
                    <Cell key={`wick-${i}`} fill={d.isUp ? "#99EC72" : "#FF3C46"} />
                ))}
             </Bar>
             
             {/* Body Bar (Thick) */}
             <Bar dataKey="body" barSize={12}>
                {processedData.map((d, i) => (
                    <Cell key={`body-${i}`} fill={d.isUp ? "#99EC72" : "#FF3C46"} />
                ))}
             </Bar>
             
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
    )
}
