"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createRequisition(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    return { success: false, message: "Unauthorized" }
  }

  const item = formData.get("item") as string
  const quantity = Number(formData.get("quantity"))
  const priority = formData.get("priority") as "Low" | "Medium" | "High"
  const department = formData.get("department") as string
  const requesterName = session.user.name || "Unknown User"
  const requesterId = session.user.id || "UNKNOWN_ID" // Critical for RBAC

  if (!item || !quantity || !department) {
    return { success: false, message: "Missing required fields" }
  }

  try {
    const newReq = await prisma.requisition.create({
      data: {
        id: `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        item,
        quantity,
        priority: priority || "Medium",
        department,
        requesterName,
        requesterId,
        cost: 0, // Default cost
        status: 'Pending',
        date: new Date().toISOString(),
      }
    })

    revalidatePath("/dashboard/requisition")
    return { success: true, requisition: newReq }
  } catch (error) {
    console.error("Failed to create requisition:", error)
    return { success: false, message: "Failed to create request" }
  }
}

export async function searchInventory(query: string) {
  if (!query || query.length < 2) return []
  
  const items = await prisma.inventoryItem.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { sku: { contains: query } }
      ]
    },
    take: 10
  })
  
  return items
}
