"use client"

import { EmployeeRequisition } from "@/lib/data/generators"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, CheckCircle, XCircle, Clock, MapPin, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface MyRequisitionsProps {
  requisitions: EmployeeRequisition[]
}

export function MyRequisitions({ requisitions }: MyRequisitionsProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      'Pending': { variant: 'secondary', icon: Clock },
      'Approved': { variant: 'default', icon: CheckCircle },
      'Rejected': { variant: 'destructive', icon: XCircle },
    }
    const config = variants[status] || { variant: 'secondary', icon: Package }
    const Icon = config.icon
    return (
      <Badge variant={config.variant as any} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getItemStatusBadge = (itemStatus?: string) => {
    if (!itemStatus) return null
    
    const colors: Record<string, string> = {
      'Ordered': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'In Transit': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'In Store': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Collected': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    }
    
    return (
      <Badge variant="outline" className={colors[itemStatus]}>
        <Package className="h-3 w-3 mr-1" />
        {itemStatus}
      </Badge>
    )
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600',
    }
    return colors[priority] || 'text-gray-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Requisitions</CardTitle>
        <CardDescription>
          Track all your requisition requests and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requisitions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>No requisitions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requisitions.map((req) => (
              <Card key={req.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{req.item}</h4>
                        {getStatusBadge(req.status)}
                        {getItemStatusBadge(req.itemStatus)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Request ID: {req.id} • {req.department}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getPriorityColor(req.priority)}`}>
                        {req.priority} Priority
                      </p>
                      <p className="text-xs text-muted-foreground">${req.cost}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Requested: {req.date}</span>
                    </div>
                    {req.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{req.location}</span>
                      </div>
                    )}
                  </div>

                  {req.approvedBy && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      <p className="text-muted-foreground">
                        Approved by <span className="font-medium text-foreground">{req.approvedBy}</span>
                        {req.approvedDate && (
                          <span className="ml-1">
                            ({formatDistanceToNow(req.approvedDate, { addSuffix: true })})
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {req.itemStatus === 'In Store' && (
                    <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium text-green-800 dark:text-green-400">
                        ✓ Your item is ready for collection at {req.location}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
