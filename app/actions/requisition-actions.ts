"use server"

import { MockDatabase } from "@/lib/data/mock-db"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { auditService } from "@/lib/services/audit-service"

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
  const requesterId = session.user.id || "UNKNOWN_ID" 

  if (!item || !quantity || !department) {
    return { success: false, message: "Missing required fields" }
  }

  // Mock DB interaction
  await MockDatabase.getInstance().addRequisition({
    item,
    quantity,
    priority,
    department,
    requesterName,
    requesterId
  });

  await auditService.log({
    action: 'CREATE',
    entity: 'Requisition',
    entityId: 'REQ-NEW', // In a real app we'd get the ID from the DB response
    actorId: requesterId,
    actorName: requesterName,
    details: `Created requisition for ${quantity}x ${item}`,
  });

  revalidatePath("/dashboard/requisition")
  return { success: true }
}

export async function searchInventory(query: string) {
  if (!query || query.length < 2) return []
  
  // Use MockDatabase for search
  const result = await MockDatabase.getInstance().getInventory(1, 10, query);
  
  // Map InventoryItem to the format expected by the frontend if needed, 
  // or return as is if it matches. 
  // InventoryItem usually has name/sku.
  return result.data;
}
