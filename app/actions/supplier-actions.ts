"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/data/mock-db";
import { Supplier } from "@/lib/data/generators";
import { auditService } from "@/lib/services/audit-service";

export async function addSupplier(formData: FormData) {
    // ... existing code ...
    console.log("addSupplier action started");
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string;

    if (!name || !category || !location) {
        throw new Error("Name, Category, and Location are required");
    }

    try {
        await db.addSupplier({
            name,
            category,
            location
        });

        await auditService.log({
            action: 'CREATE',
            entity: 'Supplier',
            entityId: 'SPL-NEW', 
            actorId: 'admin', // Placeholder until auth is fully piped through here
            actorName: 'Admin User',
            details: `Added new supplier: ${name}`,
        });
        revalidatePath("/dashboard/suppliers");
        return { success: true };
    } catch (error) {
        console.error("Error adding supplier:", error);
        throw error;
    }
}

export async function importBatchSuppliers(suppliers: Partial<Supplier>[]) {
    console.log(`Importing batch of ${suppliers.length} suppliers`);
    
    try {
        let count = 0;
        for (const s of suppliers) {
            if (s.name) {
                await db.addSupplier(s);
                count++;
            }
        }
        revalidatePath("/dashboard/suppliers");
        return { success: true, count };
    } catch (error) {
        console.error("Error importing batch:", error);
        throw error;
    }
}
