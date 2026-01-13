"use client"

import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useIntercom } from "./intercom-context"

export function IntercomLauncher() {
  const { isOpen, setIsOpen } = useIntercom()

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-9999"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 relative",
          isOpen 
            ? "bg-muted text-muted-foreground rotate-90" 
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {/* Pulse effect for unread messages (simulated) */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-background"></span>
            </span>
          </>
        )}
      </Button>
    </motion.div>
  )
}
