export const ChartTheme = {
  background: "#0E1218", // Dark Trader Pro Bg
  card: "#151A21",       // Panel
  textPrimary: "#E8EBF0",
  textSecondary: "#9AA1AC",
  grid: "#2A2F38",
  accentGreen: "#7CFF6B", // "Up" Candle
  accentRed: "#FF5B5B",   // "Down" Candle
  accentYellow: "#FFE066",
  positiveFill: ["#7CFF6B", "#7CFF6B"], // Solid for now (gradients removed per request)
  negativeFill: ["#FF5B5B", "#FF5B5B"],
} as const;

export const ChartLayout = {
  height: {
    sm: 250,
    md: 350,
    lg: 450,
  },
  margin: { top: 10, right: 30, left: 0, bottom: 0 },
};
