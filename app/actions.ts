"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/data/mock-db"
import { auth } from "@/auth"
import { auditService } from "@/lib/services/audit-service"

async function checkAuth(allowedRoles: string[]) {
    const session = await auth()
    const userRole = (session?.user as any)?.role
    if (!userRole || !allowedRoles.includes(userRole)) {
        throw new Error("Unauthorized: Insufficient permissions")
    }
    return session
}

export async function updateRequisitionStatus(id: string, status: 'Approved' | 'Rejected') {
    await checkAuth(['Admin', 'Manager'])
    await db.updateRequisitionStatus(id, status);
    await auditService.log({
        action: status === 'Approved' ? 'APPROVE' : 'REJECT',
        entity: 'Requisition',
        entityId: id,
        actorId: 'admin', // TODO: Get from session
        actorName: 'Admin/Manager',
        details: `Requisition ${id} was ${status}`,
    });
    revalidatePath("/dashboard/requisition");
}

export async function createEmployee(formData: FormData) {
    await checkAuth(['Admin'])
    console.log("createEmployee action started");
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const department = formData.get('department') as string;

    console.log("Form Data:", { name, email, role, department });

    if (!name || !role) {
        console.error("Validation failed: Name or Role missing");
        throw new Error("Name and Role are required");
    }

    try {
        const newEmp = await db.addEmployee({ name, email, role, department });
        await auditService.log({
            action: 'CREATE',
            entity: 'Employee',
            entityId: newEmp.id, 
            actorId: 'admin', 
            actorName: 'Admin',
            details: `Created employee: ${name} (${role})`,
        });
        console.log("Employee added successfully to DB");
        revalidatePath("/dashboard/hrm");
    } catch (error) {
        console.error("Error adding employee to DB:", error);
        throw error;
    }
}

export async function updateEmployee(formData: FormData) {
    await checkAuth(['Admin', 'Manager'])
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const department = formData.get('department') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const status = formData.get('status') as any;

    console.log("updateEmployee action started", { id, name });

    if (!id || !name) {
        throw new Error("ID and Name are required");
    }

    try {
        await db.updateEmployee(id, { name, email, role, department, phone, address, status });
        await auditService.log({
            action: 'UPDATE',
            entity: 'Employee',
            entityId: id,
            actorId: 'admin', 
            actorName: 'Admin',
            details: `Updated profile for ${name}`,
        });
        console.log("Employee updated successfully");
        revalidatePath(`/dashboard/hrm/${id}`);
        revalidatePath("/dashboard/hrm");
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}

export async function deleteEmployee(id: string) {
    await checkAuth(['Admin'])
    console.log("deleteEmployee action started", { id });

    if (!id) {
        throw new Error("Employee ID is required");
    }

    try {
        const success = await db.deleteEmployee(id);
        if (success) {
            await auditService.log({
                action: 'DELETE',
                entity: 'Employee',
                entityId: id,
                actorId: 'admin', 
                actorName: 'Admin',
                details: `Deleted employee ${id}`,
            });
            console.log("Employee deleted successfully");
            revalidatePath("/dashboard/hrm");
            return { success: true };
        } else {
            throw new Error("Employee not found");
        }
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
}
