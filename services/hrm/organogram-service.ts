import { OrgNode, db } from "@/lib/data/mock-db";

export interface OrganogramService {
    getOrgChart(): Promise<OrgNode>;
    // Future expansion:
    // searchEmployees(query: string): Promise<OrgNode[]>;
    // getDepartmentStats(deptId: string): Promise<any>;
}

export class MockOrganogramService implements OrganogramService {
    async getOrgChart(): Promise<OrgNode> {
        // In a real scenario, this would call an API
        // For now, it delegates to our existing mock-db
        return db.getOrgChart();
    }
}

// Singleton instance for easy usage
export const organogramService = new MockOrganogramService();
