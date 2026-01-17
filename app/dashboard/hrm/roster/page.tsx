import { db } from "@/lib/data/mock-db"
import { WeeklyRosterView } from "@/components/hrm/roster/weekly-roster-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, AlertTriangle } from "lucide-react"

export default async function RosterPage() {
    const roster = await db.getWeeklyRoster();

    // Stats
    const totalShifts = roster.length;
    const shortages = roster.filter(r => r.status === 'Shortage').length;
    const nightShifts = roster.filter(r => r.shiftType === 'C').length;

    return (
        <div className="h-full flex flex-col space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Shift Roster Management</h2>
                <p className="text-muted-foreground">Weekly production line assignments and supervisor rotation.</p>
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                 <Card className="tactical-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Scheduled</CardTitle>
                        <Clock className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalShifts}</div>
                        <p className="text-xs text-muted-foreground">Shifts this week</p>
                    </CardContent>
                </Card>
                 <Card className="tactical-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manpower Shortage</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{shortages}</div>
                        <p className="text-xs text-muted-foreground">Lines reporting absent operators</p>
                    </CardContent>
                </Card>
                 <Card className="tactical-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Night Ops</CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{nightShifts}</div>
                        <p className="text-xs text-muted-foreground">Active &apos;C&apos; Shifts</p>
                    </CardContent>
                </Card>
            </div>

            <WeeklyRosterView initialRoster={roster} />
        </div>
    )
}
