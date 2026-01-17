"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

/***
 * GovernX Bar Chart
 * Generic component for Bar Charts in the GovernX design system.
 * Supports Stacked (default) or Grouped bars.
 */

interface GovernXBarChartProps {
  data: any[];
  keys: string[]; // e.g., ["buy", "hold", "sell"]
  colors: string[]; // e.g., ["#99EC72", "#FFF478", "#FF3C46"]
  xAxisKey?: string; // Key for X-axis labels, default "name"
  stacked?: boolean; // Default true
  height?: number;
  title?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#15181E] border border-[#2A2D35] p-3 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-[#8B909A] text-xs mb-2 uppercase font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
             <div key={index} className="flex items-center gap-2 text-xs mb-1">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                 <span className="text-white font-mono">{entry.name}: {entry.value}</span>
             </div>
          ))}
        </div>
      );
    }
    return null;
};

export function GovernXBarChart({ 
    data, 
    keys, 
    colors, 
    xAxisKey = "name", 
    stacked = true, 
    height = 300, 
    title, 
    className 
}: GovernXBarChartProps) {
  return (
    <div className={`flex flex-col p-4 bg-[#15181E] rounded-2xl border border-[#2A2D35] shadow-lg ${className}`}>
      {title && <div className="flex justify-between items-center mb-4">
         <h3 className="text-sm font-medium text-white flex items-center gap-2">
            {title}
         </h3>
         <div className="p-1.5 rounded-md border border-[#2A2D35] text-[#8B909A]">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
         </div>
      </div>}

      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <BarChart data={data} barSize={stacked ? 20 : 12} barGap={4} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2228" />
             <XAxis 
                dataKey={xAxisKey} 
                tick={{ fill: '#8B909A', fontSize: 10, fontFamily: 'var(--font-sans)' }} 
                axisLine={false} 
                tickLine={false} 
                dy={10}
             />
             <YAxis hide />
             <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 4 }} content={<CustomTooltip />} />
             
             {keys.map((key, index) => (
                 <Bar 
                    key={key} 
                    dataKey={key} 
                    stackId={stacked ? "a" : undefined} 
                    fill={colors[index]} 
                    radius={[4, 4, 4, 4]} 
                    stroke="#15181E" 
                    strokeWidth={stacked ? 2 : 0}
                 />
             ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4">
          {keys.map((key, index) => (
              <div key={key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[index] }} />
                  <span className="text-white text-xs font-medium capitalize">{key}</span>
              </div>
          ))}
      </div>
    </div>
  );
}
