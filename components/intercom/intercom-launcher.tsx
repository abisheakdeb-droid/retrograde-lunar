"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useIntercom } from "./intercom-context"

export function IntercomLauncher() {
  const { isOpen, setIsOpen } = useIntercom()

  return (
    <Button
      variant="ghost" 
      size="icon"
      className={cn(
        "relative text-muted-foreground hover:text-foreground", 
        isOpen && "text-primary bg-primary/10"
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <MessageCircle className="h-5 w-5" />
      {/* Pulse effect for unread messages (simulated) */}
      <span className="absolute top-2 right-2 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
    </Button>
  )
}
