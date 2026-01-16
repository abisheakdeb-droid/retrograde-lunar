import { getDocuments } from "@/lib/db/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import { 
    FileText, 
    Search, 
    Folder, 
    ShieldCheck, 
    Clock, 
    AlertTriangle,
    Download,
    Eye,
    Upload
} from "lucide-react"
import { SearchInput } from "@/components/search-input"
import { Suspense } from "react"
import { cn } from "@/lib/utils"
import { UploadDocumentDialog } from "@/components/documents/upload-document-dialog"

export default async function DocumentsPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = (searchParams?.q || '').toString().trim();
    const allDocuments = await getDocuments(100);
    const documents = allDocuments.filter((d: any) => search ? d.employeeName.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search) : true);

    const categories = [
        { name: 'NID & Identity', count: documents.filter(d => d.type === 'NID' || d.type === 'ID Card').length, icon: ShieldCheck, color: 'text-cyan-500' },
        { name: 'Contracts', count: documents.filter(d => d.type === 'Contract' || d.type === 'Join Letter').length, icon: FileText, color: 'text-amber-500' },
        { name: 'Certificates', count: documents.filter(d => d.type === 'Certificate' || d.type === 'Training Record').length, icon: Clock, color: 'text-emerald-500' }
    ];

    return (
        <div className="space-y-6 tactical-grid min-h-screen p-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Folder className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                        <h2 className="text-3xl font-bold tracking-tighter uppercase">Personnel Archive</h2>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-8">Digital Document & Record Compliance Vault</p>
                </div>
                <div className="flex items-center gap-4">
                    <Suspense fallback={<div className="h-9 w-[300px] bg-card/20 animate-pulse border border-primary/10" />}>
                        <SearchInput placeholder="SEARCH DOCUMENT ID/EMPLOYEE..." />
                    </Suspense>
                    {search && (
                        <Badge variant="outline" className="font-mono text-[10px] uppercase border-primary text-primary animate-pulse">
                            Filter: {search}
                        </Badge>
                    )}
                    <UploadDocumentDialog />
                </div>
            </div>

            {/* Folder View (Category Grid) */}
            <div className="grid gap-4 md:grid-cols-3">
                {categories.map((cat, i) => (
                    <Card key={i} className="tactical-card group hover:border-primary/40 transition-all cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="technical-label">{cat.name}</CardTitle>
                            <cat.icon className={cn("h-4 w-4", cat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold font-mono tracking-tighter">{cat.count} Files</div>
                                <div className="text-[10px] font-mono text-muted-foreground uppercase">Access Level: 3</div>
                            </div>
                            <div className="mt-3 h-1 w-full bg-muted/20 overflow-hidden">
                                <div className={cn("h-full", cat.color.replace('text', 'bg'))} style={{ width: '65%' }} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Document Register Table */}
            <Card className="tactical-card overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between py-4">
                    <div>
                        <CardTitle className="technical-label">Active Document Register</CardTitle>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">Verified personnel documentation log</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[9px] uppercase border-emerald-500/30 text-emerald-500">
                            98% Verified
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent border-primary/10">
                                <TableHead className="pl-6 technical-label w-[150px]">Reference</TableHead>
                                <TableHead className="technical-label">Employee</TableHead>
                                <TableHead className="technical-label">Type</TableHead>
                                <TableHead className="technical-label">Upload Date</TableHead>
                                <TableHead className="technical-label">Status</TableHead>
                                <TableHead className="text-right pr-6 technical-label">Execution</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id} className="border-primary/5 hover:bg-primary/5 transition-all">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-xs text-primary">{doc.id}</span>
                                            <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-tighter">{doc.fileSize}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-tight">{doc.employeeName}</span>
                                            <span className="text-[9px] font-mono text-muted-foreground">{doc.employeeId}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[9px] font-mono uppercase bg-muted/50 border-primary/20">
                                            {doc.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs font-mono text-muted-foreground">
                                        {new Date(doc.uploadDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "h-1.5 w-1.5 rounded-full shadow-[0_0_5px]",
                                                doc.status === 'Verified' ? "bg-emerald-500 shadow-emerald-500/50" : 
                                                doc.status === 'Pending' ? "bg-amber-500 animate-pulse shadow-amber-500/50" : "bg-red-500 shadow-red-500/50"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-mono uppercase",
                                                doc.status === 'Verified' ? "text-emerald-500" : 
                                                doc.status === 'Pending' ? "text-amber-500" : "text-red-500"
                                            )}>{doc.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex justify-end gap-1">
                                            <Button size="xs" variant="ghost" className="h-7 w-7 p-0 hover:bg-primary/20">
                                                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                                            </Button>
                                            <Button size="xs" variant="ghost" className="h-7 w-7 p-0 hover:bg-primary/20">
                                                <Download className="h-3.5 w-3.5 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
