"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/***
 * GovernX Production Cost Chart
 * Based on "Ha-Meem ERP Production vs Cost" image.
 * - Thin "Needle" Bars
 * - Dual Series (Production vs Cost)
 * - Custom Tooltip (Dark, specific formatting)
 */

interface GovernXProductionChartProps {
  data: {
      month: string;
      production: number;
      cost: number;
  }[];
  height?: number;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#15181E]/95 border border-[#2A2D35] p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px]">
          <p className="text-[#E1E7EF] text-sm font-semibold mb-3">{label}</p>
          <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                       <div className="w-1 h-3 rounded-full bg-[#FFF478]" />
                       <span className="text-[#8B909A] text-xs font-medium">Production Units</span>
                  </div>
                  <span className="text-white text-xs font-mono font-bold">{payload[0].value.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                       <div className="w-1 h-3 rounded-full bg-[#99EC72]" />
                       <span className="text-[#8B909A] text-xs font-medium">Cost (USD)</span>
                  </div>
                  <span className="text-white text-xs font-mono font-bold">${payload[1].value.toLocaleString()}</span>
              </div>
          </div>
        </div>
      );
    }
    return null;
};

export function GovernXProductionChart({ data, height = 350, className }: GovernXProductionChartProps) {
  return (
    <div className={`flex flex-col p-6 bg-[#15181E] rounded-2xl border border-[#2A2D35] shadow-lg w-full ${className}`}>
       <div className="mb-6">
           <h3 className="text-lg font-bold text-white tracking-tight">Production vs Cost</h3>
           <p className="text-sm text-[#8B909A] mt-1">Real-time monthly production analysis.</p>
       </div>

      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <BarChart data={data} barGap={2} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2228" />
             <XAxis 
                dataKey="month" 
                tick={{ fill: '#8B909A', fontSize: 11, fontFamily: 'var(--font-sans)' }} 
                axisLine={false} 
                tickLine={false}
                dy={10}
             />
             <YAxis 
                tick={{ fill: '#8B909A', fontSize: 11, fontFamily: 'var(--font-sans)' }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
             />
             <Tooltip cursor={{ fill: '#ffffff', opacity: 0.05 }} content={<CustomTooltip />} />
             
             {/* Production Bars (Yellow) */}
             <Bar 
                dataKey="production" 
                fill="#FFF478" 
                radius={[2, 2, 0, 0]} 
                barSize={4} 
             />
             
             {/* Cost Bars (Green) */}
             <Bar 
                dataKey="cost" 
                fill="#99EC72" 
                radius={[2, 2, 0, 0]} 
                barSize={4} 
             />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
