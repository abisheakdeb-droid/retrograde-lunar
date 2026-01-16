"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';

interface TacticalChartProps {
  title: string;
  subtitle?: string;
  data: any[];
  dataKeys: { key: string; color: string; fill?: boolean }[];
  yAxisLabel?: string;
  xAxisKey?: string;
  height?: number;
  className?: string;
}

export function TacticalChart({ 
  title, 
  subtitle, 
  data, 
  dataKeys, 
  yAxisLabel, 
  xAxisKey = "time", 
  height = 250,
  className 
}: TacticalChartProps) {
  
  return (
    <div className={`flex flex-col rounded-lg border border-white/10 bg-[#0a0a0a] p-4 shadow-lg ${className}`}>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
        {subtitle && (
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase text-muted-foreground/70">
            {subtitle}
          </div>
        )}
      </div>

      {/* Chart Area */}
      <div style={{ height }} className="relative w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              {/* Define Hatch Patterns */}
              <pattern id="hatchPat" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                <rect width="2" height="4" transform="translate(0,0)" fill="#1a1a1a" opacity={0.5} />
              </pattern>
              
              {/* Gradients */}
              {dataKeys.map((k, i) => (
                <linearGradient key={k.key} id={`grad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={k.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={k.color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={true} horizontal={true} />
            
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fill: '#444', fontSize: 10, fontFamily: 'monospace' }} 
              axisLine={{ stroke: '#333' }}
              tickLine={{ stroke: '#333' }}
            />
            
            <YAxis 
              tick={{ fill: '#444', fontSize: 10, fontFamily: 'monospace' }} 
              axisLine={false}
              tickLine={false}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#444', fontSize: 10 } : undefined}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px' }}
              itemStyle={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase' }}
              labelStyle={{ color: '#666', fontSize: '10px', marginBottom: '4px' }}
            />

            {/* Background pattern area (Mocking inactive zone if any) */}
            {/* Ideally passed as prop, hardcoding a visual demo for now */}
            
            {dataKeys.map((k) => (
               <Area 
                 key={k.key}
                 type="monotone" 
                 dataKey={k.key} 
                 stroke={k.color} 
                 strokeWidth={1.5}
                 fill={k.fill ? `url(#grad-${k.key})` : "none"} 
                 fillOpacity={1}
                 isAnimationActive={true}
               />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
