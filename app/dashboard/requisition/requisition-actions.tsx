"use client"

import { Button } from "@/components/ui/button"
import { updateRequisitionStatus } from "@/app/actions"
import { useTransition } from "react"
import { toast } from "sonner"

export function RequisitionActions({ id, status }: { id: string, status: string }) {
    const [isPending, startTransition] = useTransition()

    const handleAction = (newStatus: 'Approved' | 'Rejected') => {
        startTransition(async () => {
            try {
                await updateRequisitionStatus(id, newStatus)
                toast.success(`Request ${newStatus}`)
            } catch (error) {
                toast.error("Failed to update status")
            }
        })
    }

    if (status !== 'Pending') {
        return <Button size="sm" variant="ghost" className="h-8">View Details</Button>
    }

    return (
        <div className="flex items-center gap-2 justify-end">
            <Button size="sm" variant="ghost" className="h-8">View Details</Button>
            <Button
                size="sm"
                variant="default"
                className="h-8 bg-green-600 hover:bg-green-700 text-white"
                disabled={isPending}
                onClick={() => handleAction('Approved')}
            >
                {isPending ? '...' : 'Approve'}
            </Button>
            <Button
                size="sm"
                variant="destructive"
                className="h-8"
                disabled={isPending}
                onClick={() => handleAction('Rejected')}
            >
                {isPending ? '...' : 'Reject'}
            </Button>
        </div>
    )
}
