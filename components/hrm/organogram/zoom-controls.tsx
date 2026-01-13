"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"

interface ZoomControlsProps {
    onZoomIn: () => void
    onZoomOut: () => void
    onFit: () => void
}

export function ZoomControls({ onZoomIn, onZoomOut, onFit }: ZoomControlsProps) {
    return (
        <div className="flex flex-col gap-2 bg-background/50 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
            <Button variant="ghost" size="icon" onClick={onZoomIn} title="Zoom In">
                <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onZoomOut} title="Zoom Out">
                <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onFit} title="Fit to Screen">
                <Maximize className="h-4 w-4" />
            </Button>
        </div>
    )
}
