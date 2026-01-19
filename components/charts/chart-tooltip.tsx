"use client";

import { ChartTheme } from "./chart-theme";
import { cn } from "@/lib/utils";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
  showTotal?: boolean;
}

export function ChartTooltip({ active, payload, label, className, showTotal = false }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const total = payload.reduce((sum, entry) => sum + (typeof entry.value === 'number' ? entry.value : 0), 0);

  return (
    <div className={cn(
      "rounded-lg border border-border/50 bg-card/90 backdrop-blur-md p-3 shadow-xl",
      "animate-in fade-in zoom-in-95 duration-200",
      className
    )}>
      <div className="mb-2 border-b border-border/50 pb-1">
        <p className="font-mono text-xs font-semibold uppercase text-muted-foreground tracking-widest">
          {label}
        </p>
      </div>
      <div className="space-y-1.5">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="h-2 w-2 rounded-full shadow-[0_0_8px]"
                style={{ 
                  backgroundColor: entry.color,
                  boxShadow: `0 0 8px ${entry.color}` 
                }} 
              />
              <span className="text-xs font-medium text-foreground">
                {entry.name}
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-foreground">
              {entry.value?.toLocaleString()}
            </span>
          </div>
        ))}
        {showTotal && payload.length > 1 && (
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-border/50 pt-2">
            <span className="text-xs font-bold text-muted-foreground uppercase">Total</span>
            <span className="font-mono text-xs font-bold text-primary">
              {total.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
