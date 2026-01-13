"use client"

import dynamic from "next/dynamic"

const SkillVelocityChart = dynamic(
  () => import("./skill-velocity-chart").then((mod) => mod.SkillVelocityChart),
  { 
    ssr: false, 
    loading: () => <div className="h-[300px] w-full bg-muted/10 animate-pulse rounded-lg" />
  }
)

export function SkillVelocityChartWrapper() {
  return <SkillVelocityChart />
}
