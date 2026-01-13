
"use client"

import { useState, useRef, useEffect } from "react"
import { OrgNode } from "@/lib/data/mock-db"
import { OrgTreeNode } from "@/components/hrm/organogram/org-tree-node"
import { ZoomControls } from "@/components/hrm/organogram/zoom-controls"
import { Card } from "@/components/ui/card"
import { organogramService } from "@/services/hrm/organogram-service"

// Client wrapper to handle zoom/pan
export default function OrganogramPage() {
    const [data, setData] = useState<OrgNode | null>(null)
    const [scale, setScale] = useState(0.8)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Search State
    const [searchQuery, setSearchQuery] = useState("")
    const [highlightedId, setHighlightedId] = useState<string | null>(null)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

    useEffect(() => {
        // Fetch data via Service
        organogramService.getOrgChart().then(setData)
    }, [])

    // Search Logic
    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (!query.trim() || !data) {
            setHighlightedId(null)
            return
        }

        // Helper to find node and path
        const findNode = (node: OrgNode, path: string[]): { found: boolean, path: string[], id: string } => {
            if (node.name.toLowerCase().includes(query.toLowerCase()) || node.role.toLowerCase().includes(query.toLowerCase())) {
                return { found: true, path, id: node.id }
            }
            if (node.children) {
                for (const child of node.children) {
                    const result = findNode(child, [...path, node.id])
                    if (result.found) return result
                }
            }
            return { found: false, path: [], id: '' }
        }

        const result = findNode(data, [])
        if (result.found) {
            setHighlightedId(result.id)
            setExpandedIds(new Set(result.path)) // Expand all parents
            
            // Optional: Auto-center on match (simplified)
             setTimeout(() => {
                // We rely on the tree expanding and the user seeing the highlight for now
             }, 300)
        } else {
            setHighlightedId(null)
        }
    }

    // Auto-center on load
    useEffect(() => {
        if (data && containerRef.current && contentRef.current) {
            // ... existing auto-center logic ...
            setTimeout(() => {
                const rootNode = document.getElementById('org-root-node');
                if (rootNode) {
                    rootNode.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    console.log('Centered Root Node');
                }
            }, 500);
        }
    }, [data])

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 1.5))
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.3))
    const handleFit = () => setScale(0.6)

    // Export Logic
    const handleExport = async () => {
        // Dynamic import to avoid SSR issues if library relies on window heavily at import time (though our util is safe, better to be safe)
        const { exportToPdf } = await import('@/lib/utils/pdf-exporter');
        await exportToPdf('organogram-content', 'hameem-organogram.pdf');
    }

    if (!data) return <div className="p-8 text-center text-muted-foreground">Loading specific command structure...</div>

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col relative overflow-hidden bg-muted/10 rounded-xl border border-dashed border-border/50">
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <div>
                    <h2 className="text-2xl font-bold">Command Structure</h2>
                    <p className="text-sm text-muted-foreground">Tactical View • Level 1-4</p>
                </div>
                 {/* Search Input */}
                 <div className="relative w-64">
                    <input 
                        type="text" 
                        placeholder="Search personnel..." 
                        className="w-full pl-9 pr-4 py-2 bg-background/80 backdrop-blur-sm border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <svg className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <ZoomControls 
                    onZoomIn={handleZoomIn} 
                    onZoomOut={handleZoomOut} 
                    onFit={handleFit} 
                    onExport={handleExport}
                />
            </div>

            {/* Draggable/Pannable Area */}
            <div 
                ref={containerRef}
                className="flex-1 overflow-auto cursor-grab active:cursor-grabbing p-20 flex items-start"
            >
                <div 
                    id="organogram-content"
                    ref={contentRef}
                    className="m-auto"
                    style={{ 
                        transform: `scale(${scale})`, 
                        transformOrigin: 'top center',
                        transition: 'transform 0.2s ease-out'
                    }}
                >
                    <OrgTreeNode 
                        node={data} 
                        highlightedId={highlightedId}
                        expandedIds={expandedIds}
                    />
                </div>
            </div>
        </div>
    )
}
