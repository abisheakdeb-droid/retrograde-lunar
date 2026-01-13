"use client"

import { Notification } from "@/lib/data/notifications"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { Bell, CheckCheck, Trash2, Package, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDelete: (id: string) => void
}

export function NotificationList({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onDelete 
}: NotificationListProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'item_arrived':
      case 'item_ready':
        return <Package className="h-4 w-4 text-blue-500" />
      case 'requisition_approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'requisition_rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'reminder':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
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
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-semibold">Notifications</h3>
        {notifications.some(n => !n.read) && (
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[400px]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 border-b hover:bg-accent cursor-pointer transition-colors ${
              !notification.read ? 'bg-primary/10 border-l-2 border-primary' : 'border-l-2 border-transparent'
            }`}
            onClick={() => !notification.read && onMarkAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary neon-glow-cyan shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(notification.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-3 border-t">
        <Link href="/dashboard/notifications">
          <Button variant="outline" className="w-full" size="sm">
            View All Notifications
          </Button>
        </Link>
      </div>
    </div>
  )
}
