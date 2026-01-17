"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  YAxisProps,
} from "recharts";
import { ChartTheme, ChartLayout } from "./chart-theme";

interface SeriesConfig {
  name: string;
  field: string;
  color: string;
  yAxisId?: string; // default "left"
  fillType?: "gradient" | "solid" | "none";
  gradientColors?: [string, string];
}

interface GovernXDualAreaLineChartProps {
  title?: string;
  data: any[];
  series: SeriesConfig[];
  xAxisKey?: string;
  height?: number;
  yLeft?: YAxisProps;
  yRight?: YAxisProps;
  className?: string;
}

export function GovernXDualAreaLineChart({
  title,
  data,
  series,
  xAxisKey = "date",
  height = ChartLayout.height.md,
  yLeft,
  yRight,
  className,
}: GovernXDualAreaLineChartProps) {
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
          <AreaChart data={data} margin={ChartLayout.margin}>
            <defs>
              {series.map((s) => {
                if (s.fillType === "gradient" && s.gradientColors) {
                  return (
                    <linearGradient
                      key={s.field}
                      id={`grad-${s.field}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={s.gradientColors[1]}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={s.gradientColors[0]}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  );
                }
                return null;
              })}
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke={ChartTheme.grid}
              vertical={false}
              opacity={0.3}
            />

            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />

            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              {...yLeft}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              {...yRight}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: ChartTheme.card,
                borderColor: ChartTheme.grid,
                color: ChartTheme.textPrimary,
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px" }}
              cursor={{ stroke: ChartTheme.textSecondary, strokeDasharray: "4 4" }}
            />

            {series.map((s) => (
              <Area
                key={s.field}
                yAxisId={s.yAxisId || "left"}
                type="monotone"
                dataKey={s.field}
                stroke={s.color}
                fill={
                  s.fillType === "gradient"
                    ? `url(#grad-${s.field})`
                    : s.fillType === "solid"
                    ? s.color
                    : "none"
                }
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
