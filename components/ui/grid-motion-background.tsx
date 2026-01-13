"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function GridMotionBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Static Grid Base */}
      <div className="absolute inset-0 bg-background tactical-grid opacity-20" />

      {/* Moving Scanline */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.5
        }}
        className="absolute left-0 w-full h-[20vh] bg-linear-to-b from-transparent via-primary/5 to-transparent blur-sm"
      />

      {/* Radial Gradient overlay for depth */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-background/50 to-background" />
    </div>
  )
}
