"use client";

import { GovernXCandlestickChart } from "@/components/charts/governx-candlestick-chart";

// Mock Data for the trading chart (OHLC)
const candleData = [
  { date: "Feb", open: 180, high: 195, low: 175, close: 188 },
  { date: "Mar", open: 188, high: 205, low: 185, close: 192 },
  { date: "Apr", open: 192, high: 198, low: 182, close: 185 }, // Down
  { date: "May", open: 185, high: 210, low: 180, close: 205 }, // Bull run
  { date: "Jun", open: 205, high: 220, low: 200, close: 215 },
  { date: "Jul", open: 215, high: 225, low: 205, close: 210 }, // Correction
  { date: "Aug", open: 210, high: 215, low: 195, close: 198 }, // Dip
  { date: "Sep", open: 198, high: 205, low: 190, close: 202 },
  { date: "Oct", open: 202, high: 210, low: 198, close: 190 }, // Volatility
  { date: "Nov", open: 190, high: 195, low: 188, close: 190.53 }, // Current
];

export default function GovernXDemoPage() {
  return (
    <div className="p-8 min-h-screen bg-[#0A0D11] text-foreground font-sans flex items-center justify-center">
      
      {/* Trading Terminal Container */}
      <div className="w-full max-w-5xl">
        <GovernXCandlestickChart 
            symbol="NVDA"
            title="NVDA Institutional Trading"
            data={candleData}
            currentPrice={190.53}
            priceChange={1.92}
            priceChangePercent={1.02}
            height={500}
            className="shadow-2xl shadow-green-900/10"
        />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#151A21] border border-[#2A2F38]">
                <h3 className="text-[#9AFFA0] font-mono text-sm mb-2">ORDER BOOK</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#9AA1AC] font-mono">
                        <span>190.55</span>
                        <span>1.2k</span>
                    </div>
                     <div className="flex justify-between text-xs text-[#9AA1AC] font-mono">
                        <span>190.54</span>
                        <span>800</span>
                    </div>
                     <div className="flex justify-between text-xs text-[#7CFF6B] font-mono border-t border-[#2A2F38] pt-2 mt-2">
                        <span>190.53</span>
                        <span>Market</span>
                    </div>
                </div>
            </div>
             <div className="p-6 rounded-2xl bg-[#151A21] border border-[#2A2F38]">
                <h3 className="text-[#9AFFA0] font-mono text-sm mb-2">RECENT TRADES</h3>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#E8EBF0]">14:32:01</span>
                        <span className="text-[#FF5B5B]">190.52</span>
                        <span className="text-[#9AA1AC]">100</span>
                    </div>
                     <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#E8EBF0]">14:31:58</span>
                        <span className="text-[#7CFF6B]">190.53</span>
                        <span className="text-[#9AA1AC]">500</span>
                    </div>
                </div>
            </div>
             <div className="p-6 rounded-2xl bg-[#151A21] border border-[#2A2F38]">
                <h3 className="text-[#9AFFA0] font-mono text-sm mb-2">ALGO STATUS</h3>
                 <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-[#7CFF6B] animate-pulse"></div>
                     <span className="text-xs text-[#E8EBF0] font-mono">Dark Pool Execution: ACTIVE</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
