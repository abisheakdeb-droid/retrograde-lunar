import { NextRequest, NextResponse } from "next/server"
import { notificationDb } from "@/lib/data/notifications"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  await notificationDb.markAsRead(id)
  return NextResponse.json({ success: true })
}
