"use client"

import { Contact, Attachment } from "./intercom-context"
import { FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MessageBubbleProps {
  message: string
  isMe: boolean
  timestamp: string
  avatar?: string
  attachments?: Attachment[]
}

export function MessageBubble({ message, isMe, timestamp, attachments }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn("flex flex-col max-w-[70%]", isMe ? "items-end" : "items-start")}>
        
        {/* Attachments */}
        {attachments && attachments.length > 0 && (
            <div className={cn("grid gap-2 mb-2", attachments.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
                {attachments.map(att => (
                    <div key={att.id} className="rounded-lg overflow-hidden border border-background/20 bg-background/10">
                        {att.type === 'image' ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={att.url} alt={att.name} className="max-w-full h-auto object-cover max-h-[200px]" />
                        ) : (
                            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                                <FileIcon className="h-5 w-5 opacity-70" />
                                <div className="flex flex-col overflow-hidden text-left">
                                    <span className="text-xs font-medium truncate max-w-[120px]">{att.name}</span>
                                    <span className="text-[10px] opacity-70">{att.size}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}

        {/* Text Message */}
        {message && (
          <div
            className={cn(
              "px-4 py-2 rounded-2xl text-sm relative group transition-all duration-200",
              isMe
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm border border-border/50"
            )}
          >
            <p>{message}</p>
          </div>
        )}

      {/* Timestamp & Read Receipt */}
      <div className="flex items-center justify-end gap-1 mt-1">
        <span className="text-[10px] text-muted-foreground opacity-70">
          {timestamp}
        </span>
        {isMe && (
          <span className="text-primary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-check-check"
            >
              <path d="M18 6 7 17l-5-5"/>
              <path d="m22 10-7.5 7.5L13 16"/>
            </svg>
          </span>
        )}
      </div>
      </div>
    </motion.div>
  )
}
