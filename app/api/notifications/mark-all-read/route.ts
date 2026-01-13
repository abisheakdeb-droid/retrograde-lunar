import { NextRequest, NextResponse } from "next/server"
import { notificationDb } from "@/lib/data/notifications"

export async function POST(request: NextRequest) {
  const { userId } = await request.json()
  
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 })
  }

  await notificationDb.markAllAsRead(userId)
  return NextResponse.json({ success: true })
}
