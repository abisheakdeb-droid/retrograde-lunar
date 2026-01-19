"use client"

import { useDemoRole } from "@/components/providers/demo-role-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RoleGuardProps {
    children: React.ReactNode
    allowedRoles: string[]
    fallbackPath?: string
}

export function RoleGuard({ children, allowedRoles, fallbackPath = "/dashboard" }: RoleGuardProps) {
    const { role } = useDemoRole()
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        // Simple check
        if (allowedRoles.includes(role)) {
            setIsAuthorized(true)
        } else {
            setIsAuthorized(false)
        }
        setChecking(false)
    }, [role, allowedRoles])

    if (checking) {
        return null // or a loading spinner
    }

    if (!isAuthorized) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <ShieldAlert className="h-10 w-10 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-center">Access Restricted</h2>
                <p className="text-muted-foreground text-center max-w-md">
                    Your current clearance level <span className="font-mono text-foreground font-bold uppercase">[{role || 'UNKNOWN'}]</span> does not grant access to this secure sector.
                </p>
                <div className="flex gap-4 mt-6">
                    <Button variant="outline" onClick={() => router.push(fallbackPath)}>
                        Return to Command
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono mt-8 uppercase tracking-widest">
                    Security Protocol: OVERRIDE_DENIED
                </p>
            </div>
        )
    }

    return <>{children}</>
}
