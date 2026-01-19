"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { CommandPalette } from "@/components/shared/command-palette"

interface TacticalLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  headerTitle?: string
  headerSubtitle?: string
  actions?: React.ReactNode
}

export function TacticalLayout({
  children,
  headerTitle,
  headerSubtitle,
  actions,
  className,
  ...props
}: TacticalLayoutProps) {
  return (
    <div className={cn("min-h-full flex flex-col space-y-6", className)} {...props}>
      {/* Tactical Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/40 pb-6"
      >
        <div>
          {headerTitle && (
            <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent uppercase font-mono">
              {headerTitle}
            </h2>
          )}
          {headerSubtitle && (
            <p className="text-muted-foreground technical-label mt-1 text-xs">
              {headerSubtitle}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1"
      >
        {children}
      </motion.div>


      <CommandPalette />
    </div>
  )
}
