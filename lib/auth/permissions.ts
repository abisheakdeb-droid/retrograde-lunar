export type UserRole = "Admin" | "Manager" | "Staff"

export const permissions = {
    Admin: {
        canDeleteEmployee: true,
        canEditEmployee: true,
        canViewAllEmployees: true,
        canExportData: true,
        canManageInventory: true,
        canApproveRequisitions: true,
    },
    Manager: {
        canDeleteEmployee: false,
        canEditEmployee: true,
        canViewAllEmployees: true,
        canExportData: true,
        canManageInventory: true,
        canApproveRequisitions: true,
    },
    Staff: {
        canDeleteEmployee: false,
        canEditEmployee: false,
        canViewAllEmployees: false,
        canExportData: false,
        canManageInventory: false,
        canApproveRequisitions: false,
    },
}

export function hasPermission(role: UserRole | undefined, permission: keyof typeof permissions.Admin): boolean {
    if (!role) return false
    return permissions[role]?.[permission] || false
}
