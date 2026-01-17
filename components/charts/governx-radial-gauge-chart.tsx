"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { ChartTheme } from "./chart-theme";

interface LabelConfig {
  primary: string;
  secondary: string;
  tertiary?: string;
}

interface GovernXRadialGaugeChartProps {
  title?: string;
  value: number;
  max: number;
  config?: {
    color?: string;
    background?: string;
    thickness?: number;
    startAngle?: number;
    endAngle?: number;
  };
  centerLabel?: LabelConfig;
  className?: string;
}

export function GovernXRadialGaugeChart({
  title,
  value,
  max,
  config = {},
  centerLabel,
  className,
}: GovernXRadialGaugeChartProps) {
  const {
    color = ChartTheme.accentYellow,
    background = "#2B2B2B",
    thickness = 18,
    startAngle = 180 + 30, // Starts at bottom leftish
    endAngle = -30, // Ends at bottom rightish
  } = config;

  const data = [{ name: "value", value: value, fill: color }];

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl border border-[${ChartTheme.grid}] bg-[${ChartTheme.card}] p-6 ${className}`}
      style={{
        background: ChartTheme.card,
        borderColor: ChartTheme.grid,
      }}
    >
      {title && (
        <h3
          className="absolute left-6 top-6 text-lg font-medium"
          style={{ color: ChartTheme.textPrimary }}
        >
          {title}
        </h3>
      )}

      <div className="relative h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            barSize={thickness}
            data={data}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            {/* Background Track - simulated by a full circle Axis or another bar? 
                Recharts RadialBar background prop usually works for the track
            */}
            <PolarAngleAxis
              type="number"
              domain={[0, max]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: background }}
              dataKey="value"
              cornerRadius={thickness / 2}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Label */}
        {centerLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className="text-4xl font-bold tracking-tight"
              style={{ color: ChartTheme.textPrimary }}
            >
              {centerLabel.primary}
            </span>
            <span
              className="mt-1 text-sm font-medium"
              style={{ color: ChartTheme.textSecondary }}
            >
              {centerLabel.secondary}
            </span>
            {centerLabel.tertiary && (
              <span
                className="mt-1 text-xs"
                style={{ color: ChartTheme.accentGreen }}
              >
                {centerLabel.tertiary}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
