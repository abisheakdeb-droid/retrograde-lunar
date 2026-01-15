"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { AuditLog } from "@/lib/data/mock-db" // Import type
import { Search, Filter } from "lucide-react"

interface AuditLogTableProps {
  initialLogs: AuditLog[]
}

export function AuditLogTable({ initialLogs }: AuditLogTableProps) {
  const [logs, setLogs] = useState<AuditLog[]>(initialLogs)
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("All")
  const [entityFilter, setEntityFilter] = useState("All")

  // Client-side filtering for simplicity in this iteration
  // In a real app, this would trigger server actions or re-fetch
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
        log.details.toLowerCase().includes(search.toLowerCase()) ||
        log.actorName.toLowerCase().includes(search.toLowerCase()) ||
        log.entityId.toLowerCase().includes(search.toLowerCase())

    const matchesAction = actionFilter === "All" || log.action === actionFilter
    const matchesEntity = entityFilter === "All" || log.entity === entityFilter

    return matchesSearch && matchesAction && matchesEntity
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Actions</SelectItem>
              <SelectItem value="CREATE">Create</SelectItem>
              <SelectItem value="UPDATE">Update</SelectItem>
              <SelectItem value="DELETE">Delete</SelectItem>
              <SelectItem value="LOGIN">Login</SelectItem>
              <SelectItem value="APPROVE">Approve</SelectItem>
              <SelectItem value="REJECT">Reject</SelectItem>
            </SelectContent>
          </Select>
           <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Entities</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
              <SelectItem value="Requisition">Requisition</SelectItem>
              <SelectItem value="Supplier">Supplier</SelectItem>
              <SelectItem value="System">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
               <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No logs found.
                </TableCell>
              </TableRow>
            ) : (
                filteredLogs.map((log) => (
                <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                    {format(new Date(log.timestamp), "MMM d, HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                        <div className="font-medium">{log.actorName}</div>
                        <div className="text-xs text-muted-foreground">{log.actorId}</div>
                    </TableCell>
                    <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            log.action === 'CREATE' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                            log.action === 'DELETE' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                            log.action === 'UPDATE' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                            'bg-gray-50 text-gray-600 ring-gray-500/10'
                        }`}>
                            {log.action}
                        </span>
                    </TableCell>
                    <TableCell>{log.entity}</TableCell>
                    <TableCell className="max-w-[300px] truncate" title={log.details}>
                        {log.details}
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredLogs.length} of {logs.length} logs
      </div>
    </div>
  )
}
