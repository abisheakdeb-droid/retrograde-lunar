export type NotificationType = 
  | 'requisition_submitted'
  | 'requisition_approved' 
  | 'requisition_rejected'
  | 'item_arrived'
  | 'item_ready'
  | 'reminder'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  requisitionId?: string
  read: boolean
  createdAt: Date
}

// Mock notifications database
class NotificationDatabase {
  private notifications: Notification[] = []

  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    // Sample notifications for different users
    // Admin, Manager, etc. - we use email prefix as ID (ADMIN, MANAGER, STAFF)
    this.notifications = [
      {
        id: 'notif-001',
        userId: 'ADMIN',
        type: 'item_arrived',
        title: 'Item Arrived',
        message: 'আপনার Laptop (Dell XPS 15) অফিস স্টোরে চলে আসছে। গিয়ে কালেক্ট করুন।',
        requisitionId: 'REQ-2025-001',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: 'notif-004',
        userId: 'MANAGER',
        type: 'item_arrived',
        title: 'Item Arrived',
        message: 'আপনার Office Chair - Ergonomic অফিস স্টোরে চলে আসছে। গিয়ে কালেক্ট করুন।',
        requisitionId: 'REQ-2025-002',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
      {
        id: 'notif-002',
        userId: 'ADMIN',
        type: 'requisition_approved',
        title: 'Requisition Approved',
        message: 'Your requisition for Office Chair has been approved by Storage Team.',
        requisitionId: 'REQ-2025-002',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: 'notif-003',
        userId: 'STAFF',
        type: 'item_ready',
        title: 'Item Ready for Collection',
        message: 'আপনার Monitor (27" Dell) অফিস স্টোরে চলে আসছে। গিয়ে কালেক্ট করুন।',
        requisitionId: 'REQ-2025-003',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
    ]
  }

  async getNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.notifications
      .filter(n => n.userId.toUpperCase() === userId.toUpperCase())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.filter(n => n.userId.toUpperCase() === userId.toUpperCase() && !n.read).length
  }

  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    this.notifications
      .filter(n => n.userId.toUpperCase() === userId.toUpperCase())
      .forEach(n => n.read = true)
  }

  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date(),
    }
    this.notifications.unshift(newNotification)
    return newNotification
  }

  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.id !== notificationId)
  }
}

export const notificationDb = new NotificationDatabase()
