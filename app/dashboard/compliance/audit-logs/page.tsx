
import { AuditLogTable } from "@/components/compliance/audit-log-table";
import { MockDatabase } from "@/lib/data/mock-db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Logs | Compliance",
  description: "System audit logs and activity tracking",
};

export default async function AuditLogsPage() {
  const logs = await MockDatabase.getInstance().getAuditLogs(1, 100);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground">
            Track and monitor critical system activities and data changes.
          </p>
        </div>
      </div>

      <div className="bg-background rounded-lg border p-4 shadow-sm">
        <AuditLogTable initialLogs={logs.data} />
      </div>
    </div>
  );
}
