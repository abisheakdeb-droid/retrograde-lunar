export const ChartTheme = {
  background: "#0E1218",
  card: "#151A21",
  textPrimary: "#E5E7EB",
  textSecondary: "#8B909A",
  grid: "#2A2F38",
  accentGreen: "#7CFF6B",
  accentRed: "#FF5B5B",
  accentYellow: "#FFE066",
  positiveFill: ["#1C3B2A", "#2FFF9A"], // Gradient start/end
  negativeFill: ["#3B1C1C", "#FF4D4D"], // Gradient start/end
} as const;

export const ChartLayout = {
  height: {
    sm: 250,
    md: 350,
    lg: 450,
  },
  margin: { top: 10, right: 30, left: 0, bottom: 0 },
};
