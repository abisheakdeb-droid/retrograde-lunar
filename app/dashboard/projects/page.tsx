import { Suspense } from "react"
import { 
    LayoutDashboard, 
    Briefcase, 
    PlaneLanding, 
    TrendingUp, 
    DollarSign, 
    Clock, 
    CheckCircle2,
    AlertTriangle,
    FileText,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchInput } from "@/components/search-input"
import { Progress } from "@/components/ui/progress"

import { CreateTadaClaimDialog } from "@/components/tada/create-claim-dialog"

import { TadaAuditLogSheet } from "@/components/tada/audit-log-sheet"
import { getProjects, getTadaClaims, getTasks } from "@/lib/db/queries"
import { KanbanBoard } from "@/components/tasks/kanban-board"
import { LayoutList, Kanban, FileSpreadsheet } from "lucide-react" 
import Link from "next/link"

export default async function ProjectsPage(props: { searchParams: Promise<{ q?: string; view?: string }> }) {
    const searchParams = await props.searchParams;
    const search = (searchParams?.q || '').toString().trim();
    const view = (searchParams?.view || 'list').toString(); // Default to list for now to preserve existing UX
    
    // Fetch Data
    const { data: projects } = await getProjects(1, 20, search);
    const { data: tadaClaims } = await getTadaClaims(1, 20, search);
    const tasks = await getTasks(); // Note: getTasks signature might need adjustment or is fine

    // Fetch Audit Log (Last 100)
    // Using main claims list for audit log in mock mode - transition to real audit logs or keep as claim history
    // For now keeping it simple
    const auditLogClaims = tadaClaims;

    const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
    const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
    const spendingRatio = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    return (
        <div className="space-y-6 tactical-grid min-h-screen p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                        <h2 className="text-3xl font-bold tracking-tighter uppercase">Project & TADA Control</h2>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-8">Operational Capital & Travel Disbursement Audit</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-card border border-primary/20 rounded-md p-0.5">
                        <Link href="?view=list" className={`p-2 rounded-sm transition-colors ${view === 'list' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                            <LayoutList className="h-4 w-4" />
                        </Link>
                        <Link href="?view=board" className={`p-2 rounded-sm transition-colors ${view === 'board' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                            <Kanban className="h-4 w-4" />
                        </Link>
                    </div>

                    <Suspense fallback={<div className="h-9 w-[300px] bg-card/20 animate-pulse border border-primary/10" />}>
                        <SearchInput placeholder={view === 'board' ? "SEARCH TASKS..." : "SEARCH PROJECTS/CLAIMS..."} />
                    </Suspense>
                    <CreateTadaClaimDialog />
                </div>
            </div>

            {view === 'board' ? (
                <div className="h-[calc(100vh-200px)]">
                    <KanbanBoard initialTasks={tasks} />
                </div>
            ) : (
                <>
            {/* Financial Overview Bento */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="tactical-card border-l-4 border-l-primary/50 md:col-span-2 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <TrendingUp className="h-24 w-24 scale-150 rotate-12" />
                    </div>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="technical-label">Aggregate Budget Utilization</CardTitle>
                            <span className="font-mono text-xl text-primary drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">{spendingRatio.toFixed(1)}%</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Progress value={spendingRatio} className="h-2 bg-card/50 border border-primary/10" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono text-muted-foreground uppercase">Total Allocations</p>
                                <p className="text-xl font-bold font-mono">৳{(totalBudget/1000000).toFixed(2)}M</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-mono text-muted-foreground uppercase">Executed Spend</p>
                                <p className="text-xl font-bold font-mono text-amber-500">৳{(totalSpent/1000000).toFixed(2)}M</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="tactical-card border-l-4 border-l-emerald-500/50">
                    <CardHeader className="pb-1">
                        <CardTitle className="technical-label">Active Deployments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold font-mono text-emerald-500">{projects.filter(p => p.status === 'Active').length}</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase leading-tight">Live Project<br/>Cycles</div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                            <ArrowUpRight className="h-3 w-3" />
                            <span>+2 FROM PREVIOUS CYCLE</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="tactical-card border-l-4 border-l-cyan-500/50">
                    <CardHeader className="pb-1">
                        <CardTitle className="technical-label">Pending TADA Claims</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold font-mono text-cyan-500">{tadaClaims.filter(c => c.status === 'Pending').length}</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase leading-tight">Awaiting<br/>Authorization</div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                            <Clock className="h-3 w-3" />
                            <span>AVG APPROVAL: 4.2 HRS</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Projects & Claims Interface */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Active Projects List */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between border-b border-primary/20 pb-2">
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                            Mission-Critical Projects
                        </h3>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                        {projects.map((project) => (
                            <Card key={project.id} className="tactical-card p-4 hover:border-primary/40 transition-colors group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-muted-foreground opacity-30 group-hover:opacity-100 uppercase">
                                    {project.id}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-tight truncate pr-16">{project.name}</h4>
                                        <p className="text-[10px] text-muted-foreground font-mono uppercase">{project.managerName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-mono">
                                            <span className="text-muted-foreground uppercase">UTILIZATION</span>
                                            <span className={project.spent > project.budget ? "text-red-500" : "text-primary"}>
                                                {Math.round((project.spent / project.budget) * 100)}%
                                            </span>
                                        </div>
                                        <Progress 
                                            value={Math.min((project.spent / project.budget) * 100, 100)} 
                                            className={`h-1.5 ${project.spent > project.budget ? "bg-red-500/20" : ""}`}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className={`text-[8px] uppercase rounded-none border-primary/20 ${
                                            project.status === 'Active' ? 'text-emerald-500 border-emerald-500/30' : 
                                            project.status === 'On Hold' ? 'text-amber-500 border-amber-500/30' : 'text-muted-foreground'
                                        }`}>
                                            {project.status}
                                        </Badge>
                                        <span className="font-mono text-[10px] font-bold">৳{(project.spent/1000).toFixed(0)}K / ৳{(project.budget/1000).toFixed(0)}K</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent TADA Claims Audit */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-primary/20 pb-2">
                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                            <PlaneLanding className="h-4 w-4 text-cyan-500" />
                            Expediture Claims
                        </h3>
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
                        {tadaClaims.map((claim) => (
                            <div key={claim.id} className="tactical-card p-3 border border-primary/10 hover:border-primary/30 transition-all flex items-center justify-between group">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase truncate max-w-[120px]">{claim.employeeName}</span>
                                        <span className="text-[8px] font-mono text-muted-foreground">{claim.id}</span>
                                    </div>
                                    <p className="text-[9px] text-muted-foreground uppercase line-clamp-1">{claim.purpose}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[7px] h-4 rounded-none px-1 border-primary/10 uppercase">
                                            {claim.status}
                                        </Badge>
                                        <span className="text-[8px] font-mono text-muted-foreground">{claim.date}</span>
                                    </div>
                                </div>
                                <div className="text-right space-y-2">
                                    <div className="text-xs font-bold font-mono text-primary">৳{claim.amount.toLocaleString()}</div>
                                    {claim.status === 'Pending' && (
                                        <Button variant="outline" size="xs" className="h-6 text-[8px] uppercase border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/10 rounded-none">
                                            Authorize
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <TadaAuditLogSheet claims={auditLogClaims} />
                </div>
            </div>
            </>
            )}
        </div>
    )
}
