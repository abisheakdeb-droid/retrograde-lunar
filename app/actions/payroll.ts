'use server'

import { executePayroll } from "@/lib/db/queries"
import { revalidatePath } from "next/cache"

export async function executePayrollAction(month: string) {
    try {
        const result = await executePayroll(month)
        revalidatePath('/dashboard/payroll')
        return result
    } catch (error) {
        return {
            success: false,
            message: 'Failed to execute payroll run'
        }
    }
}
