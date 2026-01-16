"use client"

import { Notification } from "@/components/providers/notification-provider" // Use provider's interface
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import Link from "next/link"

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

export function NotificationList({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
}: NotificationListProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
        <p>No notifications</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <h3 className="font-semibold text-sm">Notifications</h3>
        {notifications.some(n => !n.isRead) && (
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="h-auto px-2 text-xs">
            <CheckCheck className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[400px]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b border-border/50 hover:bg-muted/50 transition-colors ${
              !notification.isRead ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'
            }`}
            onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-sm ${!notification.isRead ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
                    {notification.title}
                  </h4>
                  {!notification.isRead && (
                    <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_5px_currentColor] shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-2 border-t border-border/50 bg-muted/20">
        <Link href="/dashboard/notifications" className="block">
          <Button variant="ghost" className="w-full text-xs h-8" size="sm">
            View All History
          </Button>
        </Link>
      </div>
    </div>
  )
}
