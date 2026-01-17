import { getAssets } from "@/lib/db/queries"
import { AssetsView } from "@/components/hrm/assets-view"

export default async function AssetsPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = searchParams?.q || '';

    // Fetch Assets with Search
    const { data: rawAssets } = await getAssets(1, 100, search);

    const assets = rawAssets.map(a => ({
        ...a,
        location: a.location || null,
        serialNumber: a.serialNumber || null,
        assignedTo: a.assignedTo || null,
        condition: a.condition as string, // Ensure string type mismatch is handled
        status: a.status as string
    }));

    return (
        <AssetsView assets={assets} />
    )
}
