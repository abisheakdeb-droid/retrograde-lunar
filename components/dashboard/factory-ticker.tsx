"use client"

import React from "react"
import { ArrowUpRight, ArrowDownRight, AlertTriangle, AlertOctagon } from "lucide-react"

interface TickerItem {
  id: number;
  text: string;
  value: string;
  trend: "up" | "down" | "neutral";
  type: "success" | "danger" | "warning" | "info";
}

const TICKER_ITEMS: TickerItem[] = [
  { id: 1, text: "LINE 01 :: TARGET_HIT", value: "+105%", trend: "up", type: "success" },
  { id: 2, text: "LINE 04 :: MACHINE_DOWN", value: "CRITICAL", trend: "down", type: "danger" },
  { id: 3, text: "SHIPMENT :: H&M_BATCH_492", value: "DISPATCHED", trend: "neutral", type: "info" },
  { id: 4, text: "QC_ALERT :: DENIM_WASH", value: "DHU > 3%", trend: "down", type: "warning" },
  { id: 5, text: "LINE 12 :: EFFICIENCY", value: "+98.2%", trend: "up", type: "success" },
  { id: 6, text: "POWER_GRID :: STABLE", value: "50Hz", trend: "neutral", type: "info" },
  { id: 7, text: "LINE 08 :: MATERIAL_SHORTAGE", value: "DELAYED", trend: "down", type: "warning" },
  { id: 8, text: "SHIFT_B :: ATTENDANCE", value: "99.5%", trend: "up", type: "success" },
]

interface FactoryTickerProps {
  items?: TickerItem[];
  className?: string;
  speed?: number;
}

export function FactoryTicker({ items = TICKER_ITEMS, className, speed = 40 }: FactoryTickerProps) {
  return (
    <div className={`w-full bg-[#05070A] border-y border-[#2A2F38] h-8 flex items-center overflow-hidden relative select-none ${className}`}>
       {/* Gradient Masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#05070A] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#05070A] to-transparent z-10"></div>

      <div className="flex animate-infinite-scroll whitespace-nowrap hover:paused group" style={{ animationDuration: `${speed}s` }}>
        {/* Render twice for seamless loop */}
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 text-[10px] font-mono tracking-wider">
            <span className={`
                font-bold 
                ${item.type === 'success' ? 'text-[#7CFF6B]' : ''}
                ${item.type === 'danger' ? 'text-[#FF5B5B]' : ''}
                ${item.type === 'warning' ? 'text-[#FFE066]' : ''}
                ${item.type === 'info' ? 'text-[#E8EBF0]' : ''}
            `}>
                {item.id === 2 || item.id === 4 ? "⚠ " : ""}
                {item.text}
            </span>
            
            <span className={`
                flex items-center
                ${item.trend === 'up' ? 'text-[#7CFF6B]' : ''}
                ${item.trend === 'down' ? 'text-[#FF5B5B]' : ''}
                ${item.trend === 'neutral' ? 'text-[#9AA1AC]' : ''}
            `}>
                {item.value}
                {item.trend === 'up' && <ArrowUpRight className="w-3 h-3 ml-1" />}
                {item.trend === 'down' && <ArrowDownRight className="w-3 h-3 ml-1" />}
            </span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .animate-infinite-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:paused:hover {
            animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Moved 1/3rd because we triplified the list */
        }
      `}</style>
    </div>
  )
}
