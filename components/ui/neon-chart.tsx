"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'

interface NeonChartProps {
  data: any[]
  title?: string
  subtitle?: string
  dataKeys: {
    key: string
    color: string
    name: string
    yAxisId?: 'left' | 'right'
    inactive?: boolean // For the diagonal stripe pattern
  }[]
  leftAxisLabel?: string
  rightAxisLabel?: string
  height?: number
}

export function NeonChart({ data, title, subtitle, dataKeys, leftAxisLabel, rightAxisLabel, height = 240 }: NeonChartProps) {
  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-lg p-4">
      {title && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 15, left: -15, bottom: 0 }}>
          <defs>
            {/* Ultra-fine diagonal stripe pattern - PIXEL PERFECT */}
            <pattern 
              id="dash-pattern" 
              patternUnits="userSpaceOnUse" 
              width="2" 
              height="2"
              patternTransform="rotate(45)"
            >
              <line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="2" 
                stroke="#2a2a2a" 
                strokeWidth="1"
              />
            </pattern>
            
            {/* Gradient for active areas */}
            {dataKeys.filter(dk => !dk.inactive).map(dk => (
              <linearGradient key={dk.key} id={`gradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dk.color} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={dk.color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          
          {/* Nearly invisible grid - PIXEL PERFECT */}
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#1a1a1a" 
            vertical={false}
            strokeWidth={0.25}
            opacity={0.4}
          />
          
          {/* X-Axis with time labels - PIXEL PERFECT */}
          <XAxis 
            dataKey="time" 
            stroke="#2a2a2a"
            tick={{ fill: '#666666', fontSize: 10, fontFamily: 'system-ui, -apple-system' }}
            tickLine={false}
            axisLine={{ stroke: '#1a1a1a', strokeWidth: 0.5 }}
            tickMargin={6}
            interval="preserveStartEnd"
          />
          
          {/* Left Y-Axis - PIXEL PERFECT */}
          <YAxis 
            yAxisId="left"
            stroke="#2a2a2a"
            tick={{ fill: '#666666', fontSize: 10, fontFamily: 'system-ui, -apple-system' }}
            tickLine={false}
            axisLine={{ stroke: '#1a1a1a', strokeWidth: 0.5 }}
            width={30}
            domain={[0, 0.5]}
            ticks={[0, 0.25, 0.5]}
            label={{ 
              value: leftAxisLabel || '', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10,
              style: { fill: '#666666', fontSize: 10, textAnchor: 'middle' }
            }}
          />
          
          {/* Right Y-Axis (if needed) - PIXEL PERFECT */}
          {rightAxisLabel && (
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#2a2a2a"
              tick={{ fill: '#666666', fontSize: 10, fontFamily: 'system-ui, -apple-system' }}
              tickLine={false}
              axisLine={{ stroke: '#1a1a1a', strokeWidth: 0.5 }}
              width={50}
              domain={[0, 2]}
              ticks={[0, 1, 2]}
              label={{ 
                value: rightAxisLabel, 
                angle: 90, 
                position: 'insideRight',
                offset: 10,
                style: { fill: '#666666', fontSize: 10, textAnchor: 'middle' }
              }}
            />
          )}
          
          {/* Render areas - PIXEL PERFECT */}
          {dataKeys.map((dk) => (
            <Area
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              stroke={dk.inactive ? 'none' : dk.color}
              strokeWidth={dk.inactive ? 0 : 0.8}
              fill={dk.inactive ? 'url(#dash-pattern)' : `url(#gradient-${dk.key})`}
              fillOpacity={dk.inactive ? 0.65 : 1}
              yAxisId={dk.yAxisId || 'left'}
              name={dk.name}
              isAnimationActive={false}
              dot={false}
              activeDot={false}
              connectNulls={true}
            />
          ))}
          
          {/* Legend - EXACT Neon styling */}
          <Legend 
            verticalAlign="bottom"
            height={30}
            iconType="square"
            iconSize={8}
            wrapperStyle={{
              paddingTop: '16px',
              fontSize: '10px',
              color: '#7a7a7a',
              fontFamily: 'system-ui, -apple-system'
            }}
            formatter={(value) => (
              <span style={{ 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px',
                fontSize: '10px',
                fontWeight: 500
              }}>
                {value}
              </span>
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
