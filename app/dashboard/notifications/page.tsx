"use client"

import { useNotifications } from "@/components/providers/notification-provider"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NotificationList } from "@/components/notifications/notification-list"
import { Bell, CheckCheck } from "lucide-react"

export default function NotificationsPage() {
  const { data: session } = useSession()
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    isLoading 
  } = useNotifications()

  if (!session) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Manage your alerts and requisition updates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Recent Updates</CardTitle>
            </div>
            {notifications.length > 0 && (
              <span className="text-sm font-medium text-muted-foreground">
                {unreadCount} unread
              </span>
            )}
            {isLoading && (
               <span className="text-xs text-muted-foreground animate-pulse">Syncing...</span>
            )}
          </div>
          <CardDescription>
            You have received {notifications.length} notifications in the last 30 days.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
          />
        </CardContent>
      </Card>
    </div>
  )
}
