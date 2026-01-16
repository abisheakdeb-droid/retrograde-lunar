"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/components/providers/notification-provider"
import { NotificationList } from "./notification-list"
import { Badge } from "@/components/ui/badge"

interface NotificationBellProps {
  userId: string | undefined
}

export function NotificationBell({ userId }: NotificationBellProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
      return (
        <Button variant="ghost" size="icon" className="relative">
             <Bell className="h-5 w-5" />
        </Button>
      )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <NotificationList
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
