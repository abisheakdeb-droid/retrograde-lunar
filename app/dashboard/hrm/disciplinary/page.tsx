import { DisciplinaryList } from "@/components/hrm/disciplinary/disciplinary-list"
import { IncidentReportDialog } from "@/components/hrm/disciplinary/incident-report-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/search-input"
import { AlertTriangle, FileText, Gavel, ShieldAlert, Siren, Scale } from "lucide-react"
import { MockDatabase } from "@/lib/data/mock-db"
import { DisciplinaryCase } from "@/lib/data/mock-db"

export default async function DisciplinaryPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = (searchParams?.q || '').toString().trim();
    
    // Fetch Disciplinary Cases with Search
    const cases = (await MockDatabase.getInstance().getDisciplinaryCases?.() || []).filter(c => 
        search ? c.employeeName.toLowerCase().includes(search.toLowerCase()) : true
    );

    const openCases = cases.filter(c => c.status !== 'Resolved' && c.status !== 'Terminated').length;
    const critical = cases.filter(c => c.severity === 'High' || c.severity === 'Critical').length;

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-red-600/80">Disciplinary Board</h2>
                    <p className="text-muted-foreground">Compliance enforcement, violation tracking, and legal proceedings.</p>
                </div>
                <IncidentReportDialog />
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                 <Card className="tactical-card border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Investigations</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openCases}</div>
                        <p className="text-xs text-muted-foreground">Require immediate attention</p>
                    </CardContent>
                </Card>
                 <Card className="tactical-card border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Critical Violations</CardTitle>
                        <Gavel className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{critical}</div>
                        <p className="text-xs text-muted-foreground">Safety or Gross Misconduct</p>
                    </CardContent>
                </Card>
                 <Card className="tactical-card border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                        <Scale className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">98.2%</div>
                        <p className="text-xs text-muted-foreground">Workforce adhering to policy</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex-1 min-h-0 container mx-auto p-0">
                <DisciplinaryList cases={cases} />
            </div>
        </div>
    )
}
