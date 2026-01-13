"use server";

import { db } from "@/lib/data/mock-db";
import { revalidatePath } from "next/cache";
import { DocType } from "@/lib/data/generators";

export async function uploadDocument(formData: FormData) {
    try {
        const employeeName = formData.get("employeeName") as string;
        const employeeId = formData.get("employeeId") as string;
        const type = formData.get("type") as DocType;
        // In a real app, we would handle the file upload here
        // const file = formData.get("file") as File;

        if (!employeeName || !type) {
             return { success: false, message: "Missing required fields" };
        }

        await db.addDocument({
            employeeName,
            employeeId: employeeId || `EMP-${Math.floor(Math.random() * 1000)}`,
            type,
            status: 'Pending'
        });

        revalidatePath("/dashboard/documents");
        return { success: true, message: "Document uploaded successfully" };
    } catch (error) {
        console.error("Failed to upload document:", error);
        return { success: false, message: "Failed to upload document" };
    }
}
