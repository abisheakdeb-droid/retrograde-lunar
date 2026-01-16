"use server";

import { revalidatePath } from "next/cache";
import { createDocument } from "@/lib/db/queries";

export async function uploadDocumentAction(formData: FormData) {
    const employeeId = formData.get('employeeId') as string;
    const type = formData.get('type') as string;
    const file = formData.get('file'); 

    // In a real app, handle file upload to blob storage here.
    // For now, mocking the URL.

    await createDocument({
        employeeId,
        employeeName: "Current User", // Stub
        type,
        name: type,
        url: "https://example.com/mock-doc.pdf",
        fileSize: "1.2 MB"
    });
    revalidatePath("/dashboard/documents");
}
