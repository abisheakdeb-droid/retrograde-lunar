"use server"

import { MockDatabase } from "@/lib/data/mock-db"
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
  const requesterId = session.user.id || "UNKNOWN_ID" 

  if (!item || !quantity || !department) {
    return { success: false, message: "Missing required fields" }
  }

  // Mock DB interaction
  // await MockDatabase.getInstance().addRequisition(...)
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
