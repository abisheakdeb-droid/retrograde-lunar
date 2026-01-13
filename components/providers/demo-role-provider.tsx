"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "md" | "dmd" | "ed" | "admin" | "hr" | "staff"

interface DemoRoleContextType {
  role: UserRole
  setRole: (role: UserRole) => void
}

const DemoRoleContext = createContext<DemoRoleContextType | undefined>(undefined)

export function DemoRoleProvider({ children }: { children: React.ReactNode }) {
  // Default to MD for the "Premium/Executive experience" initially
  const [role, setRole] = useState<UserRole>("md")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DemoRoleContext.Provider value={{ role, setRole }}>
      {children}
    </DemoRoleContext.Provider>
  )
}

export function useDemoRole() {
  const context = useContext(DemoRoleContext)
  if (context === undefined) {
    throw new Error("useDemoRole must be used within a DemoRoleProvider")
  }
  return context
}
