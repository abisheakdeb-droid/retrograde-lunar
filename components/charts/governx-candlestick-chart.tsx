"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";
import { ChartTheme, ChartLayout } from "./chart-theme";

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  [key: string]: any;
}

interface GovernXCandlestickChartProps {
  data: CandleData[];
  symbol?: string;
  title?: string;
  height?: number;
  className?: string;
  currentPrice?: number;
  priceChange?: number;
  priceChangePercent?: number;
}

// Custom Candle Shape
const CandleShape = (props: any) => {
  const {
    fill,
    x,
    y,
    width,
    height,
    payload, // This contains the actual data point (O, H, L, C)
  } = props;

  // Safety check
  if (!payload) return null;

  const { open, close, high, low } = payload;
  const isUp = close >= open;

  // Improve visuals for thin candles
  const bodyWidth = width * 0.65;
  const wickWidth = 2;
  const xCenter = x + width / 2;

  // Calculate coordinates
  // Recharts passes y and height based on the Bar's dataKey range [low, high]
  // So y is the top (high value), and y + height is the bottom (low value)
  
  // We need to map price to pixels.
  // The Bar spans from 'high' (y) to 'low' (y + height).
  // Range = high - low.
  // Pixels = height.
  // Ratio = height / Range.
  
  const range = high - low;
  const ratio = range === 0 ? 0 : height / range;

  // Calculate pixel positions for Open and Close relative to Y (High)
  // High is at 'y'.
  // Open is 'y' + (high - open) * ratio
  // Close is 'y' + (high - close) * ratio
  
  const yOpen = y + (high - open) * ratio;
  const yClose = y + (high - close) * ratio;
  
  const bodyTop = Math.min(yOpen, yClose);
  const bodyHeight = Math.max(Math.abs(yOpen - yClose), 2); // Min height 2px

  const color = isUp ? ChartTheme.accentGreen : ChartTheme.accentRed;
  const wickColor = isUp ? "#9AFFA0" : "#FF8A8A"; // Lighter for wick per spec
  
  // Glow filter URL
  const filterUrl = isUp ? "url(#glow-green)" : undefined;

  return (
    <g filter={filterUrl}>
      {/* Wick (High to Low) */}
      <line
        x1={xCenter}
        y1={y}
        x2={xCenter}
        y2={y + height}
        stroke={wickColor}
        strokeWidth={wickWidth}
      />
      {/* Body (Open to Close) */}
      <rect
        x={xCenter - bodyWidth / 2}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        fill={color}
        rx={3} // Rounded corners per spec
        ry={3}
      />
    </g>
  );
};

export function GovernXCandlestickChart({
  data,
  symbol = "NVDA",
  title, // Added title
  height = 400,
  className,
  currentPrice,
  priceChange,
  priceChangePercent,
}: GovernXCandlestickChartProps) {
  
  // Calculate visual cues
  const lastPrice = currentPrice ?? data[data.length - 1]?.close ?? 0;
  const change = priceChange ?? (data.length > 1 ? data[data.length - 1].close - data[data.length - 2].close : 0);
  const percent = priceChangePercent ?? (data.length > 1 ? (change / data[data.length - 2].close) * 100 : 0);
  const isPositive = change >= 0;
  
  // Prepare data for the Bar component: [low, high] tuple for range
  const processingData = useMemo(() => {
    return data.map(d => ({
        ...d,
        range: [d.low, d.high] as [number, number]
    }));
  }, [data]);

  const minLow = Math.min(...data.map((d) => d.low));
  const maxHigh = Math.max(...data.map((d) => d.high));
  const domainPadding = (maxHigh - minLow) * 0.1;

  return (
    <div
      className={`relative w-full rounded-[18px] border border-[${ChartTheme.grid}] bg-[${ChartTheme.background}] p-6 ${className}`}
      style={{
        background: ChartTheme.background,
        borderColor: ChartTheme.grid,
      }}
    >
        {/* Header Overlay */}
        <div className="flex items-center justify-between mb-4">
            <div>
                 <h3 className="text-sm font-bold text-muted-foreground tracking-widest">{title || `${symbol} CANDLESTICK`}</h3>
                 <div className="flex items-baseline gap-3 mt-1">
                     <span className="text-3xl font-mono text-[#E8EBF0] font-medium">
                         {lastPrice.toFixed(2)}
                     </span>
                     <span 
                        className={`px-2 py-1 rounded-lg text-xs font-bold font-mono flex items-center gap-1`}
                        style={{
                            background: isPositive ? "#1F3A2A" : "#3B1C1C",
                            color: isPositive ? ChartTheme.accentGreen : ChartTheme.accentRed
                        }}
                     >
                         {change > 0 ? "+" : ""}{change.toFixed(2)} ({percent.toFixed(2)}%)
                     </span>
                 </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
                 <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#7CFF6B] text-[#0E1218] hover:bg-[#6AE05B] transition-colors">
                     Buy
                 </button>
                 <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#FF5B5B] text-[#0E1218] hover:bg-[#E04F4F] transition-colors">
                     Sell
                 </button>
            </div>
        </div>

      <div style={{ height: height - 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {/* Definitions for Glow Filter */}
            <defs>
              <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke={ChartTheme.grid}
              horizontal={true}
              vertical={true}
              opacity={0.1}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#9AA1AC", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              minTickGap={30}
            />

            <YAxis
              orientation="right"
              domain={[minLow - domainPadding, maxHigh + domainPadding]}
              tick={{ fill: "#9AA1AC", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              width={50}
              tickCount={6}
              tickFormatter={(val) => val.toFixed(1)}
            />

            <Tooltip
              cursor={{ stroke: "#FFFFFF", strokeDasharray: "4 4", opacity: 0.35 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-[#151A21] border border-[#2A2F38] p-3 rounded-lg shadow-xl">
                      <p className="text-[#9AA1AC] text-xs mb-2 font-mono">{d.date}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
                        <span className="text-[#9AA1AC]">Open:</span>
                        <span className="text-[#E8EBF0] text-right">{d.open.toFixed(2)}</span>
                        <span className="text-[#9AA1AC]">High:</span>
                        <span className="text-[#E8EBF0] text-right">{d.high.toFixed(2)}</span>
                        <span className="text-[#9AA1AC]">Low:</span>
                        <span className="text-[#E8EBF0] text-right">{d.low.toFixed(2)}</span>
                        <span className="text-[#9AA1AC]">Close:</span>
                        <span className="text-[#E8EBF0] text-right">{d.close.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* The Candle implementation using Bar with range [low, high] and custom shape */}
            <Bar 
                dataKey="range" 
                shape={<CandleShape />} 
                isAnimationActive={false}
            >
                {/* 
                  Note: Custom shape handles coloring, but we can technically put Cells here if needed.
                  But the shape has all the logic.
                */}
            </Bar>
            
            {/* Current Price Line */}
             <ReferenceLine 
                y={lastPrice} 
                stroke="#FFFFFF" 
                strokeDasharray="3 3" 
                opacity={0.5} 
                label={{ 
                    position: 'right', 
                    value: lastPrice.toFixed(2), 
                    fill: '#111', 
                    fontSize: 10,
                    fontWeight: 'bold',
                    className: 'bg-white px-1 rounded' // Recharts text doesn't support className like that, usually specific rendering needed
                }}
             />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
