"use server";

import { revalidatePath } from "next/cache";
import { createJobPosting, createCandidate } from "@/lib/db/queries";

export async function createJobAction(formData: FormData) {
    const title = formData.get('title') as string;
    const department = formData.get('department') as string;
    const type = formData.get('type') as string;
    const salaryRange = formData.get('salaryRange') as string;

    await createJobPosting({
        title,
        department,
        type,
        location: 'Dhaka HQ',
        salaryRange
    });
    revalidatePath("/dashboard/hrm/recruitment");
}

export async function applyCandidateAction(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobId = formData.get('jobId') as string;

    await createCandidate({
        name,
        email,
        phone,
        jobId,
        experience: 'N/A'
    });
    revalidatePath("/dashboard/hrm/recruitment");
}
