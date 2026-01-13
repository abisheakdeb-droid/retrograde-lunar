"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Search } from "lucide-react"
import { TadaClaim } from "@/lib/data/generators"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface TadaAuditLogSheetProps {
    claims: TadaClaim[]
}

export function TadaAuditLogSheet({ claims }: TadaAuditLogSheetProps) {
    const [search, setSearch] = useState("")

    const filteredClaims = claims.filter(claim => 
        claim.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        claim.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        claim.purpose.toLowerCase().includes(search.toLowerCase()) ||
        claim.id.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="w-full text-xs font-mono uppercase text-muted-foreground hover:text-primary h-8 py-0">
                    View Audit Log
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[540px] border-l-primary/20 bg-background/95 backdrop-blur-sm p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-primary/10">
                    <SheetTitle className="text-xl font-mono uppercase tracking-wider text-primary flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        TADA Audit Log
                    </SheetTitle>
                    <SheetDescription className="font-mono text-[10px] uppercase text-muted-foreground">
                        Comprehensive history of all travel and daily allowance claims.
                    </SheetDescription>
                </SheetHeader>
                
                <div className="p-4 border-b border-primary/10">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="SEARCH LOGS..." 
                            className="pl-8 font-mono text-xs bg-card/50 border-primary/20 rounded-none uppercase"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-4">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-primary/20 hover:bg-transparent">
                                        <TableHead className="font-mono text-[10px] uppercase text-primary h-8 w-[80px]">ID</TableHead>
                                        <TableHead className="font-mono text-[10px] uppercase text-primary h-8">Details</TableHead>
                                        <TableHead className="font-mono text-[10px] uppercase text-primary h-8 text-right whitespace-nowrap">Amount</TableHead>
                                        <TableHead className="font-mono text-[10px] uppercase text-primary h-8 text-right w-[80px]">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredClaims.map((claim) => (
                                        <TableRow key={claim.id} className="border-primary/10 hover:bg-primary/5 group">
                                            <TableCell className="font-mono text-[10px] text-muted-foreground py-2 whitespace-nowrap align-top">
                                                {claim.id}
                                            </TableCell>
                                            <TableCell className="py-2">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-bold text-[10px] uppercase">{claim.employeeName}</span>
                                                        <span className="text-[8px] font-mono text-muted-foreground/70">[{claim.employeeId}]</span>
                                                    </div>
                                                    <span className="text-[9px] text-muted-foreground uppercase truncate max-w-[180px]">{claim.purpose}</span>
                                                    <span className="text-[8px] font-mono text-muted-foreground/50">{claim.date}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-xs font-bold text-primary py-2 whitespace-nowrap align-top">
                                                ৳{claim.amount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right py-2 align-top">
                                                <div className="flex justify-end">
                                                    <Badge variant="outline" className={`text-[8px] h-4 rounded-none px-1 uppercase whitespace-nowrap ${
                                                        claim.status === 'Approved' ? 'border-emerald-500/50 text-emerald-500' :
                                                        claim.status === 'Pending' ? 'border-cyan-500/50 text-cyan-500' :
                                                        claim.status === 'Rejected' ? 'border-red-500/50 text-red-500' :
                                                        'border-muted text-muted-foreground'
                                                    }`}>
                                                        {claim.status}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    )
}
