"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface GovernXLineChartProps {
  data: any[];
  dataKeys: { key: string; color: string; fill?: boolean }[];
  xAxisKey?: string;
  height?: number;
  className?: string;
}

export function GovernXLineChart({ 
  data, 
  dataKeys, 
  xAxisKey = "time", 
  height = 300,
  className 
}: GovernXLineChartProps) {
  
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {/* Gradients */}
            {dataKeys.map((k) => (
              <linearGradient key={k.key} id={`grad-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={k.color} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={k.color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid 
            strokeDasharray="4 4" 
            stroke="#1F2228" 
            vertical={false} 
            horizontal={false} 
          />
          
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fill: '#8B909A', fontSize: 10, fontFamily: 'var(--font-sans)' }} 
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            interval="preserveStartEnd"
          />
          
          <YAxis 
            tick={{ fill: '#8B909A', fontSize: 10, fontFamily: 'var(--font-sans)' }} 
            axisLine={false}
            tickLine={false}
            tickCount={5}
            domain={['auto', 'auto']}
          />
          
          <Tooltip 
            cursor={{ stroke: '#FFFFFF', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.5 }}
            contentStyle={{ 
                backgroundColor: '#15181E', 
                border: 'none', 
                borderRadius: '8px',
                boxShadow: '0 4px 20px -8px rgba(0, 0, 0, 0.5)',
                padding: '8px 12px'
            }}
            itemStyle={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: '#FFFFFF' }}
            labelStyle={{ color: '#8B909A', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}
          />

          {dataKeys.map((k) => (
             <Area 
               key={k.key}
               type="monotone" 
               dataKey={k.key} 
               stroke={k.color} 
               strokeWidth={2}
               fill={`url(#grad-${k.key})`} 
               fillOpacity={1}
               isAnimationActive={true}
               animationDuration={1500}
             />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
