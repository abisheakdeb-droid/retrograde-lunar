"use client";

import { GovernXDualAreaLineChart } from "@/components/charts/governx-dual-area-line-chart";
import { GovernXRadialGaugeChart } from "@/components/charts/governx-radial-gauge-chart";
import { GovernXStackedBarChart } from "@/components/charts/governx-stacked-bar-chart";
import { GovernXCandlestickChart } from "@/components/charts/governx-candlestick-chart";
import { ChartTheme } from "@/components/charts/chart-theme";

// --- Dummy Data ---

// 1. Dual Area Line Data
const areaData = [
  { date: "01 Jan", long: 60, ratio: 95 },
  { date: "05 Jan", long: 75, ratio: 105 },
  { date: "10 Jan", long: 55, ratio: 92 },
  { date: "15 Jan", long: 80, ratio: 110 },
  { date: "20 Jan", long: 95, ratio: 115 },
  { date: "25 Jan", long: 70, ratio: 98 },
  { date: "30 Jan", long: 85, ratio: 108 },
];

const areaSeries = [
  {
    name: "Long",
    field: "long",
    color: "#7CFF6B",
    yAxisId: "left",
    fillType: "gradient" as const,
    gradientColors: ["#1C3B2A", "#2FFF9A"] as [string, string],
  },
  {
    name: "Ratio",
    field: "ratio",
    color: "#FF5B5B",
    yAxisId: "right",
    fillType: "gradient" as const,
    gradientColors: ["#3B1C1C", "#FF4D4D"] as [string, string],
  },
];

// 2. Radial Gauge
const gaugeValue = 69;

// 3. Stacked Bar
const stackedData = [
  { month: "Jan", buy: 400, hold: 240, sell: 240 },
  { month: "Feb", buy: 300, hold: 139, sell: 221 },
  { month: "Mar", buy: 200, hold: 980, sell: 229 },
  { month: "Apr", buy: 278, hold: 390, sell: 200 },
  { month: "May", buy: 189, hold: 480, sell: 218 },
];

const stackConfig = [
  { name: "Buy", field: "buy", color: "#7CFF6B" },
  { name: "Hold", field: "hold", color: "#FFE066" },
  { name: "Sell", field: "sell", color: "#FF5B5B" },
];

// 4. Candlestick
const candleData = [
  { date: "2024-01-01", open: 450, high: 460, low: 440, close: 455 },
  { date: "2024-01-02", open: 455, high: 470, low: 450, close: 465 },
  { date: "2024-01-03", open: 465, high: 468, low: 445, close: 448 }, // Down
  { date: "2024-01-04", open: 448, high: 455, low: 440, close: 452 },
  { date: "2024-01-05", open: 452, high: 480, low: 450, close: 475 },
  { date: "2024-01-06", open: 475, high: 485, low: 470, close: 482 },
  { date: "2024-01-07", open: 482, high: 490, low: 475, close: 470 }, // Down
];

export default function ChartsDemoPage() {
  return (
    <div
      className="scrollbar-none min-h-screen overflow-y-auto p-8"
      style={{ backgroundColor: ChartTheme.background }}
    >
      <h1 className="mb-8 text-3xl font-bold text-white">
        GovernX Chart System
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 1. Dual Area Line */}
        <div className="col-span-1 lg:col-span-2">
          <GovernXDualAreaLineChart
            title="System Performance (Long) vs Error Rate (Ratio)"
            data={areaData}
            series={areaSeries}
            yLeft={{ label: { value: "Perf", angle: -90, position: 'insideLeft' } }}
            yRight={{ domain: [80, 120] }}
          />
        </div>

        {/* 2. Radial Gauge */}
        <div className="col-span-1">
          <GovernXRadialGaugeChart
            title="System Health Score"
            value={gaugeValue}
            max={100}
            centerLabel={{
              primary: `${gaugeValue}%`,
              secondary: "Operational Status",
              tertiary: "Optimal Range",
            }}
          />
        </div>

        {/* 3. Stacked Bar */}
        <div className="col-span-1">
          <GovernXStackedBarChart
            title="Task Distribution by Status"
            data={stackedData}
            stacks={stackConfig}
            xAxisKey="month"
            barWidth={40}
          />
        </div>
        
        {/* 4. Candlestick */}
        <div className="col-span-1 lg:col-span-2">
            <GovernXCandlestickChart
                title="Transaction Volume / Latency Candles"
                data={candleData}
                height={400}
            />
        </div>
      </div>
    </div>
  );
}
