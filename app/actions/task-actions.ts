"use server"

import { updateTaskStatus as updateDbTaskStatus } from "@/lib/db/queries"
import { TaskStatus } from "@/types/task-types"
import { revalidatePath } from "next/cache"

export async function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    try {
        await updateDbTaskStatus(taskId, newStatus);
        revalidatePath('/dashboard/projects');
        return { success: true };
    } catch (error) {
        console.error("Failed to update task status:", error);
        return { success: false, error: "Failed to update status" };
    }
}
