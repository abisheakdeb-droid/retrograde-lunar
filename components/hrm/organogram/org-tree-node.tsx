"use client"

import { OrgNode } from "@/lib/data/mock-db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface OrgTreeNodeProps {
    node: OrgNode
    level?: number
}

export function OrgTreeNode({ node, level = 0 }: OrgTreeNodeProps) {
    const hasChildren = node.children && node.children.length > 0
    const isRoot = level === 0

    return (
        <div className="flex flex-col items-center relative">
            {/* Connection line from parent */}
            {!isRoot && (
                <div className="h-8 w-px bg-border absolute -top-8 left-1/2 -translate-x-1/2" />
            )}

            <Card className={cn(
                "relative z-10 w-64 transition-all hover:shadow-lg hover:border-primary/50",
                level === 0 ? "border-primary border-2 shadow-primary/20 shadow-xl" : "tactical-card"
            )}>
                <CardContent className="p-4 flex items-center gap-4">
                     <div className="relative">
                        <Avatar className={cn(
                            "h-12 w-12 border-2",
                            level === 0 ? "h-16 w-16 border-primary" : "border-border"
                        )}>
                            <AvatarImage src={node.avatar} />
                            <AvatarFallback>{node.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                            node.status === 'Online' ? "bg-green-500" :
                            node.status === 'In Meeting' ? "bg-amber-500" : "bg-muted-foreground"
                        )} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate leading-none mb-1">{node.name}</p>
                        <p className="text-xs text-muted-foreground truncate mb-1.5" title={node.role}>
                            {node.role}
                        </p>
                        {node.directReportsCount !== undefined && (
                             <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-mono">
                                {node.directReportsCount} Reports
                             </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Recursively render children */}
            {hasChildren && (
                <div className="flex pt-8 relative">
                    {/* Horizontal connector line */}
                    {node.children!.length > 1 && (
                        <div className="absolute top-0 left-0 right-0 h-px bg-border mx-auto w-[calc(100%-16rem)] translate-y-8" />
                    )}

                    {node.children!.map((child, index) => (
                        <div key={child.id} className="px-4">
                             {/* Vertical connection for each child handled by their own top padding/border */}
                            <OrgTreeNode node={child} level={level + 1} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
