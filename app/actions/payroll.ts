'use server'

import { db } from "@/lib/data/mock-db"
import { revalidatePath } from "next/cache"

export async function executePayrollAction(month: string) {
    try {
        const result = await db.executePayroll(month)
        revalidatePath('/dashboard/payroll')
        return result
    } catch (error) {
        return {
            success: false,
            message: 'Failed to execute payroll run'
        }
    }
}
