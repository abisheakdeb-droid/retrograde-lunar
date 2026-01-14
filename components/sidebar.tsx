"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText, 
  Settings, 
  Box, 
  Layers, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  GraduationCap,
  ClipboardList,
  BarChart3,
  Bell,
  Briefcase,
  Network
} from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

const sidebarGroups = [
  {
    title: "Overview",
    items: [
      { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
      { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    ]
  },
  {
    title: "Personnel (HRM)",
    items: [
      { name: "Employee Directory", href: "/dashboard/hrm", icon: Users },
      { name: "Leave & Shift", href: "/dashboard/leave", icon: Calendar },
      { name: "Payroll & Payslips", href: "/dashboard/payroll", icon: CreditCard },
      { name: "Appraisal (KPI)", href: "/dashboard/appraisal", icon: BarChart3 },
      { name: "Training & Skill", href: "/dashboard/training", icon: GraduationCap },
      { name: "Organogram", href: "/dashboard/hrm/organogram", icon: Network },
    ]
  },
  {
    title: "Operations & Assets",
    items: [
      { name: "Asset Tracking", href: "/dashboard/assets", icon: Layers },
      { name: "Material Inventory", href: "/dashboard/erp", icon: Package },
      { name: "Project & TADA", href: "/dashboard/projects", icon: Briefcase },
      { name: "Requisition Control", href: "/dashboard/requisition", icon: ClipboardList },
      { name: "Supplier Database", href: "/dashboard/suppliers", icon: Truck },
    ]
  },
  {
    title: "Administration",
    items: [
      { name: "Documents & Archive", href: "/dashboard/documents", icon: FileText },
      { name: "Safety & Compliance", href: "/dashboard/compliance", icon: ShieldCheck },
      { name: "System Settings", href: "/dashboard/settings", icon: Settings },
    ]
  }
]

interface SidebarProps {
    className?: string
}

import { useDemoRole, UserRole } from "@/components/providers/demo-role-provider"
import { Shield, UserCog, Users as UsersIcon } from "lucide-react"

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { role, setRole } = useDemoRole()

    // Filter groups based on role
    const filteredGroups = sidebarGroups.map(group => {
        // --- 4. STAFF (Workforce) ---
        if (role === 'staff') {
             if (group.title === 'Overview') return group
             if (group.title === 'Personnel (HRM)') {
                 return { ...group, items: group.items.filter(i => ['Leave & Shift', 'Payroll & Payslips', 'Training & Skill', 'Organogram'].includes(i.name)) }
             }
             if (group.title === 'Operations & Assets') {
                 // Staff can track assets and make requests
                 return { ...group, items: group.items.filter(i => ['Asset Tracking', 'Requisition Control'].includes(i.name)) }
             }
             return null // No Admin access
        }

        // --- 3. HR (Functional Management) ---
        if (role === 'hr') {
            if (group.title === 'Administration') {
                // HR needs access to Documents and Compliance, but maybe not System Config
                return { ...group, items: group.items.filter(i => ['Documents & Archive', 'Safety & Compliance'].includes(i.name)) }
            }
            if (group.title === 'Operations & Assets') return null // HR typically doesn't manage Inventory/Logistics
            return group // Full access to Overview and Personnel
        }

        // --- 2. ED (Executive Director - Ops Focus) ---
        if (role === 'ed') {
            if (group.title === 'Personnel (HRM)') return null // ED focuses on Ops, leaves HR to HR Manager (mostly)
            if (group.title === 'Administration') return null
            return group // Focus on Overview and Operations
        }

        // --- 1. MD / DMD / ADMIN (Strategic & System Command) ---
        // MD/DMD see everything for situational awareness.
        // Admin sees everything for configuration.
        // So we return the group as-is for these roles.
        return group
    }).filter(Boolean) as typeof sidebarGroups

    return (
        <div className={cn("flex flex-col bg-card border-r tactical-grid h-full", className)}>
            {/* Logo */}
            <div className="flex h-16 items-center gap-2 px-6 border-b bg-card/50 backdrop-blur-md shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-primary text-primary neon-glow-cyan">
                    <Box className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-tighter uppercase">Ha-Meem Group</span>
                  <span className="text-[10px] font-mono text-primary/70 -mt-1 uppercase tracking-widest">Tactical ERP</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 pb-20 space-y-6">
                {filteredGroups.map((group) => (
                    <div key={group.title} className="space-y-2">
                        <h3 className="technical-label px-3">{group.title}</h3>
                        <div className="space-y-1">
                        {group.items.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-xs font-medium transition-all duration-200 group relative",
                                        isActive
                                            ? "text-primary bg-primary/10 border-r-2 border-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-4 w-4 shrink-0 transition-all",
                                        isActive ? "text-primary scale-110 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" : "group-hover:text-foreground"
                                    )} />
                                    <span className="truncate">{item.name}</span>
                                    {isActive && (
                                        <div className="absolute inset-y-2 left-0 w-[2px] bg-primary neon-glow-cyan" />
                                    )}
                                </Link>
                            )
                        })}
                        </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Role Switcher & Logout */}
            <div className="p-4 border-t bg-card/50 backdrop-blur-md shrink-0 space-y-4">
                {/* Role Status Indicator */}
                 <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono text-muted-foreground">CURRENT ACCESS:</span>
                    <span className={cn(
                        "text-[10px] font-bold font-mono px-2 py-0.5 rounded",
                        role === 'md' ? "bg-red-500/20 text-red-500 border border-red-500/50" :
                        role === 'admin' ? "bg-primary/20 text-primary border border-primary/50" :
                        "bg-muted text-muted-foreground"
                    )}>
                        {role.toUpperCase()}
                    </span>
                 </div>

                {/* Role Grid */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-background/50 rounded-md border text-[9px]">
                    {(['md', 'dmd', 'ed', 'admin', 'hr', 'staff'] as const).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={cn(
                                "py-1.5 px-0.5 rounded uppercase font-bold transition-all",
                                role === r 
                                    ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <LogoutButton />
            </div>
        </div>
    )
}
