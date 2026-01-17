import { getDisciplinaryCases } from "@/lib/db/queries"
import { DisciplinaryView } from "@/components/hrm/disciplinary/disciplinary-view"

export default async function DisciplinaryPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = (searchParams?.q || '').toString().trim();
    
    // Fetch Disciplinary Cases with Search
    const allCases = await getDisciplinaryCases(100);
    const cases = allCases.filter((c: any) => 
        search ? c.employeeName.toLowerCase().includes(search.toLowerCase()) : true
    ).map((c: any) => ({
        ...c,
        date: c.date ? new Date(c.date).toISOString() : '', // Ensure date string
        createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : undefined, // Serialize dates
        actionsTaken: c.actionTaken ? [c.actionTaken] : [],
        incidentDate: c.date ? new Date(c.date).toLocaleDateString() : 'Unknown',
        reportedBy: c.witness || 'HR Dept'
    }));

    return (
        <DisciplinaryView cases={cases} />
    )
}
