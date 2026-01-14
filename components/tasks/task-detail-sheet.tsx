"use client"

import { Task } from "@/types/task-types"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Tag, User, AlertCircle } from "lucide-react"
import { format } from "date-fns"

interface TaskDetailSheetProps {
    task: Task | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskDetailSheet({ task, open, onOpenChange }: TaskDetailSheetProps) {
    if (!task) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px] border-l-primary/20 backdrop-blur-md bg-background/90" style={{ zIndex: 10002 }}>
                <SheetHeader className="space-y-4 pb-4 border-b border-primary/10">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-mono uppercase text-xs">
                            {task.id}
                        </Badge>
                        <Badge variant="outline" className={`font-mono uppercase text-xs ${
                            task.priority === 'CRITICAL' ? 'text-red-500 border-red-500/50' :
                            task.priority === 'HIGH' ? 'text-orange-500 border-orange-500/50' :
                            'text-primary border-primary/50'
                        }`}>
                            {task.priority} Priority
                        </Badge>
                    </div>
                    <SheetTitle className="text-xl font-bold uppercase tracking-tight text-primary">
                        {task.title}
                    </SheetTitle>
                    <SheetDescription className="font-mono text-xs">
                         In column: <span className="text-foreground font-bold">{task.status.replace('_', ' ')}</span>
                    </SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                    {/* Assignee */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-mono font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <User className="h-4 w-4" /> Personnel
                        </h4>
                        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/20 border border-primary/5">
                            <Avatar className="h-10 w-10 border border-primary/20">
                                <AvatarImage src={task.assignee?.avatar} />
                                <AvatarFallback>{task.assignee?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-sm text-foreground">{task.assignee?.name}</p>
                                <p className="text-xs text-muted-foreground font-mono">{task.assignee?.role || 'Operative'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-mono font-bold uppercase text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Deadline
                            </h4>
                            <div className="p-3 rounded-md bg-secondary/20 border border-primary/5 font-mono text-sm">
                                {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'No Date Set'}
                            </div>
                        </div>
                        <div className="space-y-2">
                             <h4 className="text-sm font-mono font-bold uppercase text-muted-foreground flex items-center gap-2">
                                <Tag className="h-4 w-4" /> Tags
                            </h4>
                            <div className="flex flex-wrap gap-1">
                                {task.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-[10px] font-mono">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description placeholder */}
                     <div className="space-y-2">
                        <h4 className="text-sm font-mono font-bold uppercase text-muted-foreground flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" /> Briefing
                        </h4>
                        <div className="p-4 rounded-md bg-secondary/10 border border-primary/5 text-sm leading-relaxed text-muted-foreground min-h-[100px]">
                            Task description content would go here. Currently using mock data which doesn't include long description fields.
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
