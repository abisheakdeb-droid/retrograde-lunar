import { getPayslips } from "@/lib/db/queries"
import { PayrollView } from "@/components/hrm/payroll-view"

export default async function PayrollPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    // const search = searchParams?.q || ''; // Search is handled client-side or if needed can be passed

    // Fetch Payslips 
    const { data: payslips } = await getPayslips(1, 100);

    return (
        <PayrollView payslips={payslips} />
    )
}
