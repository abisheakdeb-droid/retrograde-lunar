"use server"

import { revalidatePath } from "next/cache"
import { createTadaClaim as createTadaClaimDAL } from "@/lib/db/queries"

export async function createTadaClaim(formData: FormData) {
    const purpose = formData.get('purpose') as string;
    const amount = formData.get('amount') as string;
    const date = formData.get('date') as string;

    if (!purpose || !amount || !date) {
        throw new Error("All fields (Purpose, Amount, Date) are required");
    }

    try {
        await  createTadaClaimDAL({
            purpose,
            amount: Number(amount),
            date,
            status: 'Pending'
        });
        
        revalidatePath("/dashboard/projects");
        return { success: true };
    } catch (error) {
        console.error("Error creating TADA claim:", error);
        throw error;
    }
}
