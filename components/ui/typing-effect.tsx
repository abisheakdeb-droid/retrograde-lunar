"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface TypingEffectProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export function TypingEffect({ text, className, speed = 0.05, delay = 0 }: TypingEffectProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest))
  const [isDone, setIsDone] = React.useState(false)

  React.useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * speed,
      delay: delay,
      ease: "linear",
      onComplete: () => setIsDone(true)
    })
    return controls.stop
  }, [text.length, speed, delay, count])

  return (
    <motion.span className={className}>
      <motion.span>{displayText}</motion.span>
      {!isDone && <span className="animate-pulse cursor-block">_</span>}
    </motion.span>
  )
}
