"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { ChartTheme, ChartLayout } from "./chart-theme";
import { ChartTooltip } from "./chart-tooltip";

interface RadarDataPoint {
  subject: string;
  A: number;
  B?: number;
  fullMark: number;
}

interface GovernXRadarChartProps {
  title?: string;
  data: RadarDataPoint[];
  height?: number;
  className?: string;
  colors?: string[];
}

export function GovernXRadarChart({
  title,
  data,
  height = ChartLayout.height.md,
  className,
  colors = [ChartTheme.accentGreen, ChartTheme.accentYellow]
}: GovernXRadarChartProps) {
  return (
    <div
      className={`w-full rounded-xl border border-[${ChartTheme.grid}] bg-[${ChartTheme.card}] p-6 ${className}`}
      style={{
        background: ChartTheme.card,
        borderColor: ChartTheme.grid,
      }}
    >
      {title && (
        <h3
          className="mb-6 text-lg font-medium"
          style={{ color: ChartTheme.textPrimary }}
        >
          {title}
        </h3>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke={ChartTheme.grid} />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }} 
            />
            <PolarRadiusAxis 
                angle={30} 
                domain={[0, 150]} 
                tick={false} 
                axisLine={false} 
            />
            
            <Radar
              name="Current Skill"
              dataKey="A"
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.3}
            />
            {data[0].B !== undefined && (
                 <Radar
                 name="Target Skill"
                 dataKey="B"
                 stroke={colors[1]}
                 fill={colors[1]}
                 fillOpacity={0.3}
               />
            )}

            <Tooltip content={<ChartTooltip />} cursor={false}/>
            <Legend iconType="circle" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
