"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

/***
 * GovernX Radial Chart
 * Based on "NVIDIA Ownership Breakdown" image.
 * - Semicircle (startAngle 180, endAngle 0)
 * - Thick stroke
 * - Center Label
 */

interface GovernXRadialChartProps {
  data: { name: string; value: number }[];
  title?: string;
  subtitle?: string;
  centerValue?: string;
  centerLabel?: string;
  height?: number;
  colors?: string[];
}

export function GovernXRadialChart({
  data,
  title,
  subtitle,
  centerValue,
  centerLabel,
  height = 300,
  colors = ["#FFF478", "#1A1D24"] // Default Yellow + Dark Track
}: GovernXRadialChartProps) {

  // Calculate total to ensure track is correct if data is partial
  // Actually, for a progress semi-circle, we usually want Value vs Remainder
  
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#15181E] rounded-2xl border border-[#2A2D35] shadow-lg">
      <div className="w-full flex items-center justify-between mb-2">
         {title && <h3 className="text-sm font-medium text-white flex items-center gap-2">
             {/* Optional Icon could go here */}
             {title}
         </h3>}
      </div>
      
      <div style={{ width: '100%', height: height }} className="relative">
        <ResponsiveContainer>
          <PieChart>
             <Pie
               data={data}
               cx="50%"
               cy="80%" // Move down for semicircle
               startAngle={180}
               endAngle={0}
               innerRadius="70%"
               outerRadius="90%"
               paddingAngle={0}
               dataKey="value"
               stroke="none"
               cornerRadius={10} // Rounded ends for the active part
             >
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
               ))}
               <Label
                 content={({ viewBox }) => {
                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                     return (
                       <text x={viewBox.cx} y={viewBox.cy! - 20} textAnchor="middle" dominantBaseline="middle">
                         <tspan x={viewBox.cx} dy="0" fontSize="36" fontWeight="bold" fill="#FFF478" fontFamily="var(--font-sans)">
                           {centerValue}
                         </tspan>
                         <tspan x={viewBox.cx} dy="24" fontSize="12" fill="#8B909A" fontFamily="var(--font-sans)">
                           {centerLabel}
                         </tspan>
                         <tspan x={viewBox.cx} dy="16" fontSize="10" fill="#5E6470" fontFamily="var(--font-sans)">
                           {subtitle}
                         </tspan>
                       </text>
                     );
                   }
                   return null;
                 }}
               />
             </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
