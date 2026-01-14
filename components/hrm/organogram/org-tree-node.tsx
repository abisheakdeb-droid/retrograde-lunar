"use client"

import { useState, useEffect } from "react"
import { OrgNode } from "@/lib/data/mock-db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { NodeDetailsDialog } from "./node-details-dialog"

interface OrgTreeNodeProps {
    node: OrgNode
    level?: number
    highlightedId?: string | null
    expandedIds?: Set<string>
}

export function OrgTreeNode({ node, level = 0, highlightedId, expandedIds }: OrgTreeNodeProps) {
    const hasChildren = node.children && node.children.length > 0
    const isRoot = level === 0
    const [isExpanded, setIsExpanded] = useState(true)
    const [showDetails, setShowDetails] = useState(false)

    // Sync expanded state with search results
    useEffect(() => {
        if (expandedIds?.has(node.id)) {
            setIsExpanded(true)
        }
    }, [expandedIds, node.id])

    const isHighlighted = highlightedId === node.id

    return (
        <div 
            id={isRoot ? "org-root-node" : undefined}
            className="flex flex-col items-center relative"
        >
            {/* Connection line from parent */}
            {/* Connection line from parent - Handled by parent container now for better alignment */}
            {/* {!isRoot && (
                <div className="h-8 w-px bg-border absolute -top-8 left-1/2 -translate-x-1/2" />
            )} */}

            <div className="relative z-10 group">
                 <Card 
                    className={cn(
                        "w-64 transition-all duration-300 cursor-pointer relative overflow-hidden",
                        isHighlighted ? "border-amber-500 shadow-amber-500/20 ring-2 ring-amber-500/50 scale-105 z-20" : "",
                        level === 0 ? "border-primary border-2 shadow-primary/20 shadow-xl scale-105" : "tactical-card hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                    )}
                    onClick={() => setShowDetails(true)}
                >
                    {/* Hover Effect Gradient */}
                    <div className={cn(
                        "absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 -translate-x-full transition-transform duration-1000",
                        isHighlighted ? "animate-pulse bg-amber-500/10 translate-x-0" : "group-hover:translate-x-full"
                    )} />
                    
                    <CardContent className="p-4 flex items-center gap-4 relative z-10">
                         <div className="relative">
                            <Avatar className={cn(
                                "h-12 w-12 border-2 transition-transform duration-200 group-hover:scale-110",
                                level === 0 ? "h-16 w-16 border-primary" : "border-border",
                                isHighlighted ? "border-amber-500" : ""
                            )}>
                                <AvatarImage src={node.avatar} />
                                <AvatarFallback className="bg-transparent">
                                    <img 
                                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
                                        alt="Memoji" 
                                        className="h-full w-full object-cover scale-125 translate-y-2"
                                    />
                                </AvatarFallback>
                            </Avatar>
                            <span className={cn(
                                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                                node.status === 'Online' ? "bg-green-500" :
                                node.status === 'In Meeting' ? "bg-amber-500" : "bg-muted-foreground"
                            )} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <p className={cn(
                                "text-sm font-bold truncate leading-none mb-1 transition-colors",
                                isHighlighted ? "text-amber-500" : "group-hover:text-primary"
                            )}>{node.name}</p>
                            <p className="text-xs text-muted-foreground truncate mb-1.5" title={node.role}>
                                {node.role}
                            </p>
                            {node.directReportsCount !== undefined && (
                                 <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-mono bg-secondary/50 backdrop-blur-sm">
                                    {node.directReportsCount} Reports
                                 </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Vertical Connector to Expand/Collapse Button */}
                {hasChildren && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                         <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 rounded-full border-muted-foreground/40 bg-background hover:bg-muted hover:text-primary p-0"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </Button>
                    </div>
                )}
            </div>

            {/* Recursively render children */}
            {hasChildren && isExpanded && (
                <div className="flex pt-8 relative animate-in fade-in zoom-in-95 duration-300 origin-top">
                    {node.children!.map((child, index) => {
                        const isFirst = index === 0;
                        const isLast = index === node.children!.length - 1;
                        const isSingle = node.children!.length === 1;

                        return (
                            <div key={child.id} className="px-4 relative">
                                {/* Connector Lines Logic */}
                                {!isSingle && (
                                    <>
                                        {/* Left Line: From Left Edge to Center (Hidden for First Child) */}
                                        {!isFirst && (
                                            <div className="absolute top-0 left-0 w-[calc(50%+1rem)] h-px bg-border -translate-y-px" />
                                        )}
                                        {/* Right Line: From Center to Right Edge (Hidden for Last Child) */}
                                        {!isLast && (
                                            <div className="absolute top-0 right-0 w-[calc(50%+1rem)] h-px bg-border -translate-y-px" />
                                        )}
                                    </>
                                )}
                                
                                {/* Vertical Line from Horizontal Bar Down to Child */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-px bg-border" />

                                <OrgTreeNode 
                                    node={child} 
                                    level={level + 1} 
                                    highlightedId={highlightedId}
                                    expandedIds={expandedIds}
                                />
                            </div>
                        )
                    })}
                </div>
            )}
            
            <NodeDetailsDialog 
                isOpen={showDetails} 
                onClose={() => setShowDetails(false)} 
                node={node} 
            />
        </div>
    )
}

