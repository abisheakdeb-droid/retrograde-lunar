"use client";

import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart";
import { ChartTheme } from "@/components/charts/chart-theme";

interface GovernXProductionChartProps {
  data: {
      month: string;
      production: number;
      cost: number;
  }[];
  height?: number;
  className?: string;
}

export function GovernXProductionChart({ data, height = 350, className }: GovernXProductionChartProps) {
  return (
    <GovernXStackedBarChart
        title="Production vs Cost"
        data={data}
        xAxisKey="month"
        layout="horizontal"
        type="grouped"
        height={height}
        className={className}
        barWidth={10}
        stacks={[
            { name: "Production Units", field: "production", color: "#FFF478" },
            { name: "Cost (USD)", field: "cost", color: "#99EC72" }
        ]}
    />
  );
}
