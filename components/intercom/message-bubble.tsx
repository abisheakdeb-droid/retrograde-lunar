"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MessageBubbleProps {
  message: string
  isMe: boolean
  timestamp: string
  avatar?: string
}

export function MessageBubble({ message, isMe, timestamp }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] px-4 py-2 rounded-2xl text-sm relative group transition-all duration-200",
          isMe
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm border border-border/50"
        )}
      >
        <p>{message}</p>
        <div
          className={cn(
            "text-[10px] opacity-0 group-hover:opacity-70 absolute bottom-0 transition-opacity duration-200 whitespace-nowrap mb-[-1.2rem]",
            isMe ? "right-0" : "left-0"
          )}
        >
          {timestamp}
        </div>
      </div>
    </motion.div>
  )
}
