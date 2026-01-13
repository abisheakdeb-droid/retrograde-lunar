"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Box,
  Truck,
  Activity,
  Terminal,
  Search,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center border-b border-border/40 px-3 overflow-hidden">
          <Terminal className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput placeholder="Type a command or search..." className="border-0 focus:ring-0" />
      </div>
      <CommandList className="font-mono text-sm max-h-[350px]">
        <CommandEmpty>No matching command.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/analytics"))}>
            <Activity className="mr-2 h-4 w-4" />
            <span>Analytics Dashboard</span>
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard/erp"))}>
            <Box className="mr-2 h-4 w-4" />
            <span>Inventory ERP</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
             <Search className="mr-2 h-4 w-4" />
             <span>Overview</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Operations">
          <CommandItem onSelect={() => runCommand(() => console.log('Initiating scan'))}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Initiate System Scan</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => console.log('Deploying'))}>
            <Truck className="mr-2 h-4 w-4" />
            <span>Deploy Supplies</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => console.log("Profile"))}>
            <User className="mr-2 h-4 w-4" />
            <span>UserProfile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => console.log("Billing"))}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing & Cost</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => console.log("Settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>System Config</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
