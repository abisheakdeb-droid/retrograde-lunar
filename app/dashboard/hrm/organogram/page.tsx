
"use client"

import { useState, useRef, useEffect } from "react"
import { OrgNode } from "@/lib/data/mock-db"
import { OrgTreeNode } from "@/components/hrm/organogram/org-tree-node"
import { ZoomControls } from "@/components/hrm/organogram/zoom-controls"
import { Card } from "@/components/ui/card"
import { db } from "@/lib/data/mock-db" // We'll fetch client side for simplicity in this visual demo interactiveness

// Client wrapper to handle zoom/pan
export default function OrganogramPage() {
    const [data, setData] = useState<OrgNode | null>(null)
    const [scale, setScale] = useState(0.8)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Fetch data
        db.getOrgChart().then(setData)
    }, [])

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5))
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.3))
    const handleFit = () => setScale(0.6) // Default "fit" assumption

    if (!data) return <div className="p-8 text-center text-muted-foreground">Loading specific command structure...</div>

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col relative overflow-hidden bg-muted/10 rounded-xl border border-dashed border-border/50">
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <h2 className="text-2xl font-bold">Command Structure</h2>
                <p className="text-sm text-muted-foreground">Tactical View • Level 1-4</p>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-4 right-4 z-20">
                <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onFit={handleFit} />
            </div>

            {/* Draggable/Pannable Area (Native scroll for simplicity) */}
            <div 
                ref={containerRef}
                className="flex-1 overflow-auto cursor-grab active:cursor-grabbing p-20 flex items-start justify-center"
            >
                <div 
                    ref={contentRef}
                    style={{ 
                        transform: `scale(${scale})`, 
                        transformOrigin: 'top center',
                        transition: 'transform 0.2s ease-out'
                    }}
                >
                    <OrgTreeNode node={data} />
                </div>
            </div>
        </div>
    )
}
