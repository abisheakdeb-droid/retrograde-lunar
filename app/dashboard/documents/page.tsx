import { getDocuments } from "@/lib/db/queries"
import { DocumentsView } from "@/components/hrm/documents-view"

export default async function DocumentsPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = (searchParams?.q || '').toString().trim();
    const allDocuments = await getDocuments(100);
    const documents = allDocuments.filter((d: any) => search ? d.employeeName.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search) : true).map((d: any) => ({
        ...d,
        status: d.status as string,
        uploadDate: d.uploadDate ? new Date(d.uploadDate).toISOString() : new Date().toISOString()
    }));

    return (
        <DocumentsView documents={documents} search={search} />
    )
}
