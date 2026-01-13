import { prisma } from "@/lib/db"
import { JobPosting, Candidate } from "@/lib/data/mock-db"
import { KanbanBoard } from "@/components/hrm/recruitment/kanban-board"
import { JobPostingDialog } from "@/components/hrm/recruitment/job-posting-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, TrendingUp } from "lucide-react"

export default async function RecruitmentPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawJobs = await (prisma as any).jobPosting.findMany();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawCandidates = await (prisma as any).candidate.findMany();

    const jobs = rawJobs as unknown as JobPosting[];
    const candidates = rawCandidates as unknown as Candidate[];

    // Quick check to simulate loading state or ensure data
    const totalCandidates = candidates.length;
    const activeJobs = jobs.filter(j => j.status === 'Open').length;

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Recruitment Pipeline</h2>
                    <p className="text-muted-foreground">Manage job postings and candidate lifecycle.</p>
                </div>
                <JobPostingDialog />
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                 <Card className="tactical-card border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Openings</CardTitle>
                        <Briefcase className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeJobs}</div>
                        <p className="text-xs text-muted-foreground">Across 4 departments</p>
                    </CardContent>
                </Card>
                 <Card className="tactical-card border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Applications</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{candidates.filter(c => c.stage === 'Applied').length}</div>
                        <p className="text-xs text-muted-foreground">Needs Screening</p>
                    </CardContent>
                </Card>
                 <Card className="tactical-card border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Positions filled on time</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Kanban Board */}
            <div className="flex-1 min-h-0">
                <KanbanBoard candidates={candidates} jobs={jobs} />
            </div>
        </div>
    )
}
