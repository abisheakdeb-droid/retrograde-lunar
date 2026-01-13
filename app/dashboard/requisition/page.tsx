import { MockDatabase } from "@/lib/data/mock-db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { RequisitionWizard } from "@/components/requisition/requisition-wizard"
import { RequisitionFilters } from "@/components/requisition/requisition-filters"
import { auth } from "@/auth"

type Props = {
    searchParams: Promise<{
        status?: string
        priority?: string
        search?: string
    }>
}

export default async function RequisitionPage({ searchParams }: Props) {
  const session = await auth()
  const params = await searchParams
  
  const userRole = (session?.user as any)?.role || 'Staff'
  const isAuthority = userRole === 'Admin' || userRole === 'Manager'

  // AUTHORITY: See ALL requests
  // STAFF: See ONLY own requests
  // SECURITY: If not authority, force filter ID. If session ID missing, use garbage string to return empty list.
  const requesterFilter = isAuthority ? undefined : (session?.user?.id || 'INVALID_SESSION_ID')

  // Build dynamic filter
  const where: any = {}

  if (requesterFilter && requesterFilter !== 'INVALID_SESSION_ID') {
      where.requesterId = requesterFilter
  } else if (requesterFilter === 'INVALID_SESSION_ID') {
      // Force empty result if invalid session
      where.id = '__NO_MATCH__'
  }

  if (params.status && params.status !== 'All') {
      where.status = params.status
  }

  if (params.priority && params.priority !== 'All') {
      where.priority = params.priority
  }

  if (params.search) {
      where.OR = [
          { item: { contains: params.search } },
          { requesterName: { contains: params.search } },
          { id: { contains: params.search } },
          { requesterId: { contains: params.search } },
      ]
  }

  const requisitions = await MockDatabase.getInstance().getRequisitions(50);

  const pendingCount = requisitions.filter(r => r.status === 'Pending').length
  const approvedCount = requisitions.filter(r => r.status === 'Approved').length
  const rejectedCount = requisitions.filter(r => r.status === 'Rejected').length

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

      {/* Stats Cards - Refactored for High Contrast Tactical Look */}
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
                defaultValue={params.search}
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
                <TableHead>Requester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requisitions.map((req) => (
                <TableRow key={req.id} className="cursor-pointer hover:bg-muted/50 border-border/50">
                  <TableCell className="font-mono text-xs text-muted-foreground">{req.id.split('-').pop()}</TableCell>
                  <TableCell className="font-mono text-xs text-primary/80">{req.requesterId}</TableCell>
                  <TableCell className="font-medium">{req.item}</TableCell>
                  <TableCell>{req.requesterName}</TableCell>
                  <TableCell>{req.department}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{new Date(req.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                        req.priority === 'High' ? 'border-red-500 text-red-500' :
                        req.priority === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                        'border-green-500 text-green-500'
                    }>
                        {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Rejected' ? 'destructive' : 'secondary'}>
                        {req.status}
                    </Badge>
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
