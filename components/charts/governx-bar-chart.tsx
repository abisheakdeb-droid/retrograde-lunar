"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

/***
 * GovernX Bar Chart
 * Based on "NVDA Analyst Ratings" image.
 * - Stacked Bars (Buy, Hold, Sell)
 * - Highly Rounded Ends (both top and bottom segments?) - Recharts radius prop usually does top
 * - Minimal Axis
 * - Custom Tooltip
 */

interface GovernXBarChartProps {
  data: any[];
  keys: string[]; // e.g., ["buy", "hold", "sell"]
  colors: string[]; // e.g., ["#99EC72", "#FFF478", "#FF3C46"]
  height?: number;
  title?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#15181E] border border-[#2A2D35] p-3 rounded-lg shadow-xl">
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

export function GovernXBarChart({ data, keys, colors, height = 300, title, className }: GovernXBarChartProps) {
  return (
    <div className={`flex flex-col p-4 bg-[#15181E] rounded-2xl border border-[#2A2D35] shadow-lg ${className}`}>
      {title && <div className="flex justify-between items-center mb-4">
         <h3 className="text-sm font-medium text-white flex items-center gap-2">
            {title}
         </h3>
         {/* Optional "Calendar" icon from image */}
         <div className="p-1.5 rounded-md border border-[#2A2D35] text-[#8B909A]">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
         </div>
      </div>}

      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <BarChart data={data} barSize={20} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2228" />
             <XAxis 
                dataKey="name" 
                tick={{ fill: '#8B909A', fontSize: 10, fontFamily: 'var(--font-sans)' }} 
                axisLine={false} 
                tickLine={false} 
                dy={10}
             />
             <YAxis hide />
             <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
             
             {keys.map((key, index) => {
                 // Logic for rounded corners:
                 // Bottom stack needs bottom radius, Top stack needs top radius
                 // Middle stacks need small radius?
                 // Recharts doesn't handle individual corner radius in Stacked well without CustomShape
                 // We will simply confirm a global radius or top radius for now to mimic the style
                 // To get the "segmented" look with gaps, we might need a custom shape or just simple borders?
                 return (
                     <Bar 
                        key={key} 
                        dataKey={key} 
                        stackId="a" 
                        fill={colors[index]} 
                        radius={[4, 4, 4, 4]} // Give small radius to all to mimic "separate blocks" look
                        stroke="#15181E" // Simulate gap with background color border
                        strokeWidth={2}
                     />
                 )
             })}
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
          <div className="ml-auto flex items-center">
               <button className="bg-[#1F2E23] text-[#99EC72] border border-[#2A2D35] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#1F2E23]/80 transition-colors">
                   Strong Buy
               </button>
          </div>
      </div>
    </div>
  );
}
