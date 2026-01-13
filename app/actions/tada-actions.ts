"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/data/mock-db"

export async function createTadaClaim(formData: FormData) {
    console.log("createTadaClaim action started");
    const purpose = formData.get('purpose') as string;
    const amount = formData.get('amount') as string;
    const date = formData.get('date') as string;

    console.log("TADA Claim Data:", { purpose, amount, date });

    if (!purpose || !amount || !date) {
        throw new Error("All fields (Purpose, Amount, Date) are required");
    }

    try {
        await db.addTadaClaim({
            purpose,
            amount: Number(amount),
            date,
            status: 'Pending'
        });
        console.log("TADA Claim created successfully");
        revalidatePath("/dashboard/projects");
        return { success: true };
    } catch (error) {
        console.error("Error creating TADA claim:", error);
        throw error;
    }
}
