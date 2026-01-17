"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { ChartTheme, ChartLayout } from "./chart-theme";

interface OHLCData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  [key: string]: any;
}

interface GovernXCandlestickChartProps {
  title?: string;
  data: OHLCData[];
  height?: number;
  className?: string;
}

const CandlestickShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { open, close, high, low } = payload;
  const isUp = close > open;
  const color = isUp ? ChartTheme.accentGreen : ChartTheme.accentRed;

  // Recharts passes 'y' as the top of the bar (min(open, close) in visual coords)
  // But we need to use the scale to calculate precise positions if possible.
  // Actually, standard Recharts Bar can't get the scale easily in the shape.
  // WE HAVE TO PREPARE THE DATA.
  
  // Alternative: Use the passed props 'y' and 'height' if we map keys correctly.
  // But we have 4 values.
  
  // Better approach: We passed the whole payload. We interact with the chart instance? No.
  // Standard workaround:
  // Use a ComposedChart with ErrorBar?
  // Or just draw everything manually based on the passed `y` ONLY if we mapped the [min, max] range correctly.
  
  // Let's rely on Recharts to scale ONE value (e.g. High) and then we need the scale for others?
  // Actually, Custom Shape receives ALL props. But it needs the *scale function* to convert values to pixels.
  // Recharts doesn't pass the scale easily to CustomShape unless we wrap it.

  // SIMPLER HACK:
  // Data prep: Draw a Bar from Low to High (invisible-ish or background wicks?).
  // Actually, commonly people use `[low, high]` range bar.
  // Bar `dataKey` can be an array `[min, max]`.
  
  // Let's specify `dataKey={[low, high]}` for the bar.
  // Then the `y` and `height` props will correspond to the range from low to high!
  // Then we calculate where Open and Close fall relative to that range.
  
  const yBottom = y + height; // This is the 'low' pixel (usually larger value in pixel coords)
  const yTop = y; // This is the 'high' pixel
  
  // We need to know the ratio of (close - low) / (high - low)
  const range = high - low;
  const openRatio = (open - low) / range;
  const closeRatio = (close - low) / range;
  
  const yOpen = yBottom - (height * openRatio);
  const yClose = yBottom - (height * closeRatio);
  
  const bodyTop = Math.min(yOpen, yClose);
  const bodyHeight = Math.max(Math.abs(yOpen - yClose), 2); // Min 2px
  
  // Wick is drawn from yTop to yBottom (Low to High), centered at x + width/2
  const center = x + width / 2;
  const wickWidth = 1;

  return (
    <g>
      {/* Wick */}
      <line
        x1={center}
        y1={yTop}
        x2={center}
        y2={yBottom}
        stroke={color}
        strokeWidth={wickWidth}
      />
      {/* Body */}
      <rect
        x={x}
        y={bodyTop}
        width={width}
        height={bodyHeight}
        fill={color}
        stroke="none"
      />
    </g>
  );
};

export function GovernXCandlestickChart({
  title,
  data,
  height = ChartLayout.height.md,
  className,
}: GovernXCandlestickChartProps) {
  // Prepare data for the Range Bar: [low, high]
  const processedData = data.map((d) => ({
    ...d,
    range: [d.low, d.high] as [number, number],
  }));

  return (
    <div
      className={`w-full rounded-xl border border-[${ChartTheme.grid}] bg-[${ChartTheme.card}] p-6 ${className}`}
      style={{
        background: ChartTheme.card,
        borderColor: ChartTheme.grid,
      }}
    >
      {title && (
        <div className="mb-6 flex items-center justify-between">
            <h3
            className="text-lg font-medium"
            style={{ color: ChartTheme.textPrimary }}
            >
            {title}
            </h3>
            {/* Simple controls simulation */}
            <div className="flex gap-2">
                 <div className="h-3 w-3 rounded-full bg-[#7CFF6B] opacity-50"></div>
                 <div className="h-3 w-3 rounded-full bg-[#FF5B5B] opacity-50"></div>
            </div>
        </div>
        
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData} margin={ChartLayout.margin}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke={ChartTheme.grid}
              vertical={true}
              horizontal={true}
              opacity={0.1}
            />
            
            <XAxis
              dataKey="date"
              tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            
            <YAxis
              domain={['auto', 'auto']}
              orientation="right"
              tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip
               content={({ active, payload }) => {
                   if (active && payload && payload.length) {
                       const d = payload[0].payload;
                       return (
                           <div style={{
                                backgroundColor: ChartTheme.card,
                                border: `1px solid ${ChartTheme.grid}`,
                                color: ChartTheme.textPrimary,
                                padding: '8px',
                                borderRadius: '8px',
                                fontSize: '12px'
                           }}>
                               <div className="mb-2 font-bold">{d.date}</div>
                               <div>Open: {d.open}</div>
                               <div>High: {d.high}</div>
                               <div>Low: {d.low}</div>
                               <div>Close: {d.close}</div>
                           </div>
                       )
                   }
                   return null;
               }}
            />

            <Bar
              dataKey="range"
              shape={<CandlestickShape />}
              barSize={12} // Thin bars for candles
            >
                {/* We can map cells if we need specific colors, but Shape takes care of it */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
