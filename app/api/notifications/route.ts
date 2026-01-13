import { NextRequest, NextResponse } from "next/server"
import { notificationDb } from "@/lib/data/notifications"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 })
  }

  const notifications = await notificationDb.getNotificationsByUserId(userId)
  const unreadCount = await notificationDb.getUnreadCount(userId)

  return NextResponse.json({ notifications, unreadCount })
}
