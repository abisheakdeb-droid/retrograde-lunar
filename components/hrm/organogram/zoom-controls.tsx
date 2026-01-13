"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize, Download } from "lucide-react"

interface ZoomControlsProps {
    onZoomIn: () => void
    onZoomOut: () => void
    onFit: () => void
    onExport?: () => void
}

export function ZoomControls({ onZoomIn, onZoomOut, onFit, onExport }: ZoomControlsProps) {
    return (
        <div className="flex flex-row items-center gap-2 bg-background/80 backdrop-blur-md p-1.5 rounded-full border shadow-lg">
            <Button variant="ghost" size="icon" onClick={onZoomIn} title="Zoom In">
                <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onZoomOut} title="Zoom Out">
                <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onFit} title="Fit to Screen">
                <Maximize className="h-4 w-4" />
            </Button>
            {onExport && (
                <>
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="icon" onClick={onExport} title="Export PDF">
                        <Download className="h-4 w-4" />
                    </Button>
                </>
            )}
        </div>
    )
}
