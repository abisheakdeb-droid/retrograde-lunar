"use client";

import { GovernXDualAreaLineChart } from "@/components/charts/governx-dual-area-line-chart";

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
  
  // Transform dataKeys to series format expected by GovernXDualAreaLineChart
  const series = dataKeys.map(k => ({
    name: k.key.charAt(0).toUpperCase() + k.key.slice(1), // Capitalize key as name
    field: k.key,
    color: k.color,
    fillType: (k.fill ? "gradient" : "none") as "gradient" | "none",
    gradientColors: k.fill ? [k.color, "transparent"] as [string, string] : undefined,
    // By default, assuming all on left axis effectively unless we want to split them? 
    // The original component didn't split axes, so default to left is fine.
    yAxisId: "left"
  }));

  return (
    <GovernXDualAreaLineChart
      title={title}
      data={data}
      series={series}
      xAxisKey={xAxisKey}
      height={height}
      className={className}
      yLeft={{ 
        label: yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fill: '#888' }} : undefined 
      }}
    />
  );
}
