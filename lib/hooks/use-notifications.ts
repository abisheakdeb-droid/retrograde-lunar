"use client"

import { useState, useEffect } from "react"
import { Notification } from "@/lib/data/notifications"

export function useNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    // Initial fetch
    fetchNotifications()

    // Poll every 10 seconds for new notifications
    const interval = setInterval(fetchNotifications, 10000)

    return () => clearInterval(interval)
  }, [userId])

  async function fetchNotifications() {
    if (!userId) return

    try {
      const response = await fetch(`/api/notifications?userId=${userId}`)
      const data = await response.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.unreadCount || 0)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: "POST",
      })
      await fetchNotifications()
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  async function markAllAsRead() {
    if (!userId) return

    try {
      await fetch(`/api/notifications/mark-all-read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })
      await fetchNotifications()
    } catch (error) {
      console.error("Failed to mark all as read:", error)
    }
  }

  async function deleteNotification(notificationId: string) {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      })
      await fetchNotifications()
    } catch (error) {
      console.error("Failed to delete notification:", error)
    }
  }

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh: fetchNotifications,
  }
}
