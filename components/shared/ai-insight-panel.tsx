"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Brain, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AIInsightPanelProps {
  context: "production" | "hrm" | "compliance"
  className?: string
}

const INSIGHTS = {
  production: {
    analysis: [
      "Efficiency variance detected in Line 14.",
      "Material bottleneck predicted for tomorrow 10:00 AM.",
      "Energy consumption trending 5% above baseline."
    ],
    actions: [
      "Reallocate sewing operators to Unit 3.",
      "Approve automatic re-order for fabric batch #442.",
      "Schedule maintenance for HVAC loop 2."
    ]
  },
  hrm: {
    analysis: [
      "Turnover risk elevated in Finishing department.",
      "Overtime threshold exceeded for 12 employees.",
      "Skill gap identified in new machinery operation."
    ],
    actions: [
      "Initiate retention talks with team leads.",
      "Review shift rosters to balance workload.",
      "Enroll potentially affected staff in 'Adv. Machining' module."
    ]
  },
  compliance: {
    analysis: [
      "Audit score lagging in Fire Safety.",
      "New regulation 2024-B pending review.",
      "Document expiration approaching for 5 vendors."
    ],
    actions: [
      "Trigger mock fire drill sequence.",
      "Assign legal team to review 2024-B.",
      "Send automated reminders to vendors."
    ]
  }
}

export function AIInsightPanel({ context, className }: AIInsightPanelProps) {
  const [step, setStep] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  
  // Reset for demo purposes
  const handleRefresh = () => {
    setStep(0)
    setAnalyzing(true)
  }

  useEffect(() => {
    if (analyzing) {
      const timer = setTimeout(() => {
        setAnalyzing(false)
        setStep(1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [analyzing])

  // Auto-start on mount
  useEffect(() => {
    handleRefresh()
  }, [])

  const currentData = INSIGHTS[context]

  return (
    <Card className={cn("relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-xl", className)}>
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40">
        <CardTitle className="technical-label text-sm flex items-center gap-2 text-primary">
          <Brain className="h-4 w-4 animate-pulse" />
          AI STRATEGIC INSIGHTS
        </CardTitle>
        <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-muted-foreground hover:text-primary"
            onClick={handleRefresh}
            disabled={analyzing}
        >
            <RefreshCw className={cn("h-3 w-3", analyzing && "animate-spin")} />
        </Button>
      </CardHeader>

      <CardContent className="pt-4 min-h-[180px]">
        <AnimatePresence mode="wait">
          {analyzing ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-3 py-6"
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-primary animate-pulse" />
              </div>
              <p className="text-xs font-mono text-muted-foreground animate-pulse">Running neural analysis on {context.toUpperCase()} vector...</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {/* Analysis Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" /> Detected Patterns
                </h4>
                <ul className="space-y-1">
                  {currentData.analysis.map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="text-xs font-medium text-foreground/90 pl-2 border-l-2 border-primary/20"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Actions Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-2 border-t border-dashed border-border/40"
              >
                <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Recommended Protocol
                </h4>
                 <ul className="space-y-2">
                  {currentData.actions.map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (i * 0.1) }}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                       <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <ArrowRight className="h-3 w-3 text-primary" />
                       </div>
                       <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors decoration-dotted underline-offset-4 group-hover:underline">
                         {item}
                       </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
