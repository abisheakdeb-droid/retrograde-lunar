"use server";

import { revalidatePath } from "next/cache";
import { createSupplier } from "@/lib/db/queries";
import { auditService } from "@/lib/services/audit-service";
import { Supplier } from "@/lib/data/generators";

export async function addSupplier(formData: FormData) {
    console.log("addSupplier action started");
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const location = formData.get('location') as string; // Note: Schema doesn't have location yet, might need update or mapping
    // Mapping location to contactPerson or just ignoring for now as per schema
    // Schema has: name, contactPerson, email, phone, category, status, rating, speed

    if (!name || !category) {
        throw new Error("Name and Category are required");
    }

    try {
        await createSupplier({
            name,
            category,
            contactPerson: location, // Temporary mapping to persist the location input
            email: 'admin@supplier.com', // Default
            phone: 'N/A'
        });

        await auditService.log({
            action: 'CREATE',
            entity: 'Supplier',
            entityId: 'SPL-NEW', 
            actorId: 'admin',
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
                await createSupplier({
                    name: s.name,
                    category: s.category || 'General',
                    contactPerson: s.contactPerson || 'N/A',
                    email: s.email,
                    phone: 'N/A'
                });
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
