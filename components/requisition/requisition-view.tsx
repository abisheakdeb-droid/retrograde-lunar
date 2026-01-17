"use client"

import * as React from "react"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Clock, CheckCircle2, XCircle } from "lucide-react"
import { RequisitionWizard } from "@/components/requisition/requisition-wizard"
import { RequisitionFilters } from "@/components/requisition/requisition-filters"
import { useDemoRole } from "@/components/providers/demo-role-provider"
import { cn } from "@/lib/utils"

interface Requisition {
    id: string
    requesterId: string
    requesterName: string
    department: string
    item: string
    date: string
    priority: string
    status: string
}

interface RequisitionViewProps {
    requisitions: Requisition[]
    searchParams: {
        status?: string
        priority?: string
        search?: string
    }
}

export function RequisitionView({ requisitions: allRequisitions, searchParams }: RequisitionViewProps) {
    const { role } = useDemoRole()
    
    // Using HMG-1004 as the demo staff ID
    const DEMO_STAFF_ID = "HMG-1004"
    const isAuthority = role === 'admin' || role === 'md' || role === 'hr' || role === 'dmd' || role === 'ed' // MD/Admin are authorities here.
    // 'Staff' role sees only their own.

    const filteredRequisitions = useMemo(() => {
        let data = allRequisitions;

        // 1. Role-based filtering
        if (role === 'staff') {
             // Strict filtering for demo staff ID
             const staffReqs = data.filter(r => r.requesterId === DEMO_STAFF_ID);
             // Verify if we have mock data for this ID, otherwise fallback might be confusing. 
             // We will assume the generator is consistent or empty state is acceptable.
             data = staffReqs;
        }

        // 2. Search Params Filtering
        // Status filter
        if (searchParams.status && searchParams.status !== 'All') {
            data = data.filter(req => req.status === searchParams.status);
        }
        
        // Priority filter
        if (searchParams.priority && searchParams.priority !== 'All') {
            data = data.filter(req => req.priority === searchParams.priority);
        }

        // Search text
        if (searchParams.search) {
            const search = searchParams.search.toLowerCase();
            data = data.filter(req => 
                req.item.toLowerCase().includes(search) || 
                req.requesterName.toLowerCase().includes(search) ||
                req.id.toLowerCase().includes(search)
            );
        }

        return data;
    }, [allRequisitions, role, searchParams]);

    const pendingCount = filteredRequisitions.filter(r => r.status === 'Pending').length
    const approvedCount = filteredRequisitions.filter(r => r.status === 'Approved').length
    const rejectedCount = filteredRequisitions.filter(r => r.status === 'Rejected').length

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isAuthority ? 'Requisition Control' : 'My Requisitions'}
                        </h1>
                        {isAuthority && (
                            <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-500/10">
                                Authority View
                            </Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground">
                        {isAuthority ? 'Overview of all employee material requests.' : 'Track and manage your material requests.'}
                    </p>
                </div>
                {!isAuthority && <RequisitionWizard />}
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="tactical-card border-l-4 border-l-amber-500 bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-amber-500">Pending Approval</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-100">{pendingCount}</div>
                        <p className="text-xs text-amber-500/80 mt-1">Needs attention</p>
                    </CardContent>
                </Card>

                <Card className="tactical-card border-l-4 border-l-green-500 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-500">Approved Today</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-100">{approvedCount}</div>
                        <p className="text-xs text-green-500/80 mt-1">$15k Value</p>
                    </CardContent>
                </Card>

                <Card className="tactical-card border-l-4 border-l-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-500">Rejected Requests</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-100">{rejectedCount}</div>
                        <p className="text-xs text-red-500/80 mt-1">Missing information</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder={isAuthority ? "Search employees, items, or IDs..." : "Search requests..."}
                        className="pl-9 bg-background/50 border-input/50 focus:border-primary/50 transition-colors"
                        defaultValue={searchParams.search}
                    />
                </div>
                <RequisitionFilters />
            </div>

            <Card className="tactical-card">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead className="w-[100px]">Req ID</TableHead>
                                <TableHead className="w-[80px]">Emp ID</TableHead>
                                <TableHead>Item</TableHead>
                                {isAuthority && <TableHead>Requester</TableHead>}
                                {isAuthority && <TableHead>Department</TableHead>}
                                <TableHead>Date</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRequisitions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={isAuthority ? 8 : 6} className="text-center py-8 text-muted-foreground">
                                        No requisitions found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRequisitions.map((req) => (
                                    <TableRow key={req.id} className="cursor-pointer hover:bg-muted/50 border-border/50">
                                        <TableCell className="font-mono text-xs text-muted-foreground">{req.id.split('-').pop()}</TableCell>
                                        <TableCell className="font-mono text-xs text-primary/80">{req.requesterId}</TableCell>
                                        <TableCell className="font-medium">{req.item}</TableCell>
                                        {isAuthority && <TableCell>{req.requesterName}</TableCell>}
                                        {isAuthority && <TableCell>{req.department}</TableCell>}
                                        <TableCell className="text-muted-foreground text-xs">{new Date(req.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                req.priority === 'High' ? 'border-red-500 text-red-500' :
                                                req.priority === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                                                'border-green-500 text-green-500'
                                            )}>
                                                {req.priority}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Rejected' ? 'destructive' : 'secondary'}>
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
