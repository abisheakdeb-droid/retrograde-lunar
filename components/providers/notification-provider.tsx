"use strict";
"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { fetchNotifications, markNotificationRead, markAllRead } from '@/app/actions/notification-actions';
import { usePathname } from 'next/navigation';
import { toast } from "sonner";

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    link?: string;
    isRead: boolean;
    createdAt: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    refresh: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    // Use useRef to track last refreshed time without triggering re-renders
    const lastRefreshedRef = React.useRef<Date>(new Date());
    const pathname = usePathname();

    const refresh = useCallback(async () => {
        try {
            const res = await fetchNotifications();
            if (res.success && res.data) {
                const newItems = res.data as Notification[];
                
                // Check for new items since last refresh (only if not first load)
                if (!isLoading) {
                    const latest = newItems[0];
                    if (latest && latest.createdAt > lastRefreshedRef.current.toISOString() && !latest.isRead) {
                        toast(latest.title, {
                            description: latest.message,
                            action: {
                                label: "View",
                                onClick: () => window.location.href = latest.link || '/dashboard/notifications'
                            }
                        })
                    }
                }

                setNotifications(newItems);
                setUnreadCount(res.unreadCount || 0);
                lastRefreshedRef.current = new Date();
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]); // Removed lastRefreshed from dependency

    // Initial load and polling
    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [refresh]);

    // Refresh on route change
    useEffect(() => {
        refresh();
    }, [pathname, refresh]);

    const markAsRead = async (id: string) => {
        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
        
        await markNotificationRead(id);
        refresh();
    };

    const markAllAsRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
        
        await markAllRead();
        refresh();
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, isLoading, markAsRead, markAllAsRead, refresh }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
