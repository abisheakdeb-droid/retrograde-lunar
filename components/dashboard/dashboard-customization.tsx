"use client"

import { useWidgetConfig } from "@/lib/hooks/use-widget-config"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardCustomization() {
  const { widgets, toggleWidget, resetWidgets } = useWidgetConfig()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Dashboard Widgets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {widgets.map((widget) => (
          <DropdownMenuCheckboxItem
            key={widget.id}
            checked={widget.enabled}
            onCheckedChange={() => toggleWidget(widget.id)}
          >
            {widget.name}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={resetWidgets}
        >
          Reset to Default
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
