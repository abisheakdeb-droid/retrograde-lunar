"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartTheme, ChartLayout } from "./chart-theme";

interface StackConfig {
  name: string;
  field: string;
  color: string;
  fillType?: "solid" | "gradient";
  gradientColors?: [string, string];
  radius?: [number, number, number, number];
  stroke?: string;
  strokeWidth?: number;
  stackId?: string;
}

interface GovernXStackedBarChartProps {
  title?: string;
  data: any[];
  stacks: StackConfig[];
  xAxisKey: string;
  height?: number;
  barWidth?: number;
  className?: string;
}

export function GovernXStackedBarChart({
  title,
  data,
  stacks,
  xAxisKey,
  height = ChartLayout.height.md,
  barWidth = 30,
  className,
  layout = "vertical",
  type = "stacked",
}: GovernXStackedBarChartProps & { layout?: "horizontal" | "vertical"; type?: "stacked" | "grouped" }) {
  const isVertical = layout === "vertical";
  
  // Helper to generate gradient ID
  const getGradientId = (field: string) => `gradient-${field}`;
  
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
          <BarChart
            data={data}
            margin={ChartLayout.margin}
            barGap={type === 'grouped' ? 4 : 8}
            layout={layout}
          >
             <defs>
              {stacks.filter(s => s.fillType === 'gradient' && s.gradientColors).map((stack) => (
                <linearGradient key={stack.field} id={getGradientId(stack.field)} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stack.gradientColors![0]} stopOpacity={1} />
                  <stop offset="100%" stopColor={stack.gradientColors![1]} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke={ChartTheme.grid}
              horizontal={!isVertical}
              vertical={isVertical}
              opacity={0.2}
            />

            {isVertical ? (
              <>
                <XAxis type="number" hide />
                <YAxis
                  dataKey={xAxisKey}
                  type="category"
                  tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={xAxisKey}
                  tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                   tick={{ fill: ChartTheme.textSecondary, fontSize: 12 }}
                   axisLine={false}
                   tickLine={false}
                />
              </>
            )}

            <Tooltip
              cursor={{ fill: ChartTheme.grid, opacity: 0.1 }}
              contentStyle={{
                backgroundColor: ChartTheme.card,
                borderColor: ChartTheme.grid,
                color: ChartTheme.textPrimary,
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px" }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px" }}
            />

            {stacks.map((stack, index) => {
              // Radius logic
              let radius: [number, number, number, number] = [0, 0, 0, 0];
              
              if (stack.radius) {
                  radius = stack.radius; // Use custom override if provided
              } else if (type === "stacked") {
                 // Convert to array index logic
                 if (index === stacks.length - 1) {
                    if (isVertical) radius = [0, 4, 4, 0]; // Top-right, Bottom-right
                    else radius = [4, 4, 0, 0]; // Top-left, Top-right
                 }
              } else {
                 // Grouped: all have radius at the top/end
                 if (isVertical) radius = [0, 4, 4, 0];
                 else radius = [4, 4, 0, 0];
              }

              const fill = stack.fillType === 'gradient' ? `url(#${getGradientId(stack.field)})` : stack.color;

              return (
                <Bar
                  key={stack.field}
                  dataKey={stack.field}
                  stackId={stack.stackId || (type === "stacked" ? "a" : undefined)}
                  fill={fill}
                  name={stack.name}
                  barSize={barWidth}
                  radius={radius}
                  stroke={stack.stroke}
                  strokeWidth={stack.strokeWidth}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
