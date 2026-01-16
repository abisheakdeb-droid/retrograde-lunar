'use server'

import { getNotifications, markNotificationAsRead, createNotification } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

export async function fetchNotifications() {
    try {
        const notifications = await getNotifications('user-123'); // Fixed user ID for now to match seeded data behavior
        const safeNotifications = notifications.map(n => ({
            ...n,
            createdAt: n.createdAt ? n.createdAt.toISOString() : new Date().toISOString(),
            isRead: n.isRead || false,
            link: n.link || undefined, 
            type: n.type as 'info' | 'success' | 'warning' | 'error' 
        }));
        const unreadCount = safeNotifications.filter(n => !n.isRead).length;
        return { success: true, data: safeNotifications, unreadCount };
    } catch (error) {
        return { success: false, error: 'Failed to fetch notifications' };
    }
}

export async function markNotificationRead(id: string) {
    try {
        await markNotificationAsRead(id);
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to mark read' };
    }
}

export async function markAllRead() {
    try {
        await markNotificationAsRead('all');
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to mark all read' };
    }
}

export async function triggerTestNotification() {
    // Helper to simulate incoming notifications
    await createNotification({
        userId: 'user-123',
        title: 'New System Alert',
        message: 'This is a test notification from the server.',
        type: 'info',
        link: '/dashboard'
    });
    revalidatePath('/dashboard');
    return { success: true };
}
