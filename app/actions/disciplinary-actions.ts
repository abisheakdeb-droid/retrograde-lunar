"use server";

import { revalidatePath } from "next/cache";
import { createDisciplinaryCase } from "@/lib/db/queries";

export async function submitIncidentReport(formData: FormData) {
    const employeeId = formData.get('employeeId') as string;
    const type = formData.get('type') as string;
    const severity = formData.get('severity') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;

    // Stub employee name for now
    const employeeName = "John Doe"; 

    await createDisciplinaryCase({
        employeeId,
        employeeName,
        type,
        severity,
        description,
        date: date || new Date().toISOString()
    });
    revalidatePath("/dashboard/hrm/disciplinary");
}
