import { getLeaveRequests } from "@/lib/db/queries"
import { LeaveView } from "@/components/hrm/leave-view"

export default async function LeaveManagementPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = searchParams?.q || '';

    // Fetch Leave Requests with Search
    const { data: rawLeaveRequests } = await getLeaveRequests(1, 100, search);
    
    // Map nullable fields for UI safety
    const leaveRequests = rawLeaveRequests.map(r => ({
        ...r,
        employeeName: r.employeeName || 'Unknown',
        employeeAvatar: r.employeeAvatar || undefined,
        startDate: r.startDate ? new Date(r.startDate).toLocaleDateString() : '',
        endDate: r.endDate ? new Date(r.endDate).toLocaleDateString() : '',
        appliedDate: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '',
        status: r.status || 'Pending',
        days: r.startDate && r.endDate ? Math.ceil((new Date(r.endDate).getTime() - new Date(r.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 1
    }));

    const holidays = [
        { id: '1', date: '2026-02-21', name: 'International Mother Language Day', type: 'Public Holiday' },
        { id: '2', date: '2026-03-26', name: 'Independence Day', type: 'Public Holiday' },
        { id: '3', date: '2026-04-14', name: 'Bengali New Year', type: 'Public Holiday' },
        { id: '4', date: '2026-05-01', name: 'May Day', type: 'Public Holiday' },
        { id: '5', date: '2026-02-18', name: 'Eid-Ul-Fitr', type: 'public holiday'},
    ];

    return (
        <LeaveView leaveRequests={leaveRequests} holidays={holidays} />
    )
}
