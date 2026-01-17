import { getRequisitions } from "@/lib/db/queries"
import { RequisitionView } from "@/components/requisition/requisition-view"

type Props = {
    searchParams: Promise<{
        status?: string
        priority?: string
        search?: string
    }>
}

export default async function RequisitionPage({ searchParams }: Props) {
  const params = await searchParams
  
  // Fetch all requisitions (limit can be increased or paginated in real implementation)
  const requisitions = await getRequisitions(100);

  // Map to clean types if necessary, though getRequisitions returns matching structure mostly.
  // Ensuring dates are serialized for client component if they aren't strings.
  const serializedRequisitions = requisitions.map((r: any) => ({
      ...r,
      date: r.date ? new Date(r.date).toISOString() : new Date().toISOString()
  }));

  return (
    <RequisitionView 
        requisitions={serializedRequisitions} 
        searchParams={params} 
    />
  )
}
