
import { MockDatabase, AuditLog } from '@/lib/data/mock-db';

const db = MockDatabase.getInstance();

export const auditService = {
  async log(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    return await db.addAuditLog(entry);
  },

  async getLogs(filters?: {
    action?: string;
    entity?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return await db.getAuditLogs(1, 100, filters); // Default to 100 logs for now
  }
};
