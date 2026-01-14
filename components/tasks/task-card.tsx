"use client"

import { Task, Priority } from "@/types/task-types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, AlertTriangle, MessageSquare, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"

interface TaskCardProps {
    task: Task;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onClick?: () => void;
}

const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case 'CRITICAL': return 'text-red-500 border-red-500/50 bg-red-500/10';
        case 'HIGH': return 'text-orange-500 border-orange-500/50 bg-orange-500/10';
        case 'NORMAL': return 'text-blue-500 border-blue-500/50 bg-blue-500/10';
        case 'LOW': return 'text-slate-500 border-slate-500/50 bg-slate-500/10';
        default: return 'text-slate-500';
    }
}

export function TaskCard({ task, ...props }: TaskCardProps) {
    return (
        <motion.div
            layoutId={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative"
        >
            <Card 
                className="tactical-card hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing border-l-4 border-l-transparent hover:border-l-primary/10"
                draggable={props.draggable}
                onDragStart={props.onDragStart}
                onClick={props.onClick}
            >
                <CardHeader className="p-3 pb-2 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                        <Badge variant="outline" className={`text-[9px] px-1 py-0 h-4 font-mono uppercase rounded-sm ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </Badge>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary">
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                    <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {task.title}
                    </h4>
                </CardHeader>
                <CardContent className="p-3 py-1">
                    <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map(tag => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/50 text-secondary-foreground font-mono">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5 border border-primary/20">
                            <AvatarImage src={task.assignee?.avatar} />
                            <AvatarFallback className="text-[8px]">{task.assignee?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {task.dueDate && (
                            <div className={`flex items-center gap-1 font-mono text-[9px] ${
                                new Date(task.dueDate) < new Date() ? 'text-red-400' : ''
                            }`}>
                                <Clock className="h-3 w-3" />
                                {format(new Date(task.dueDate), 'MMM d')}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[9px] font-mono">{task.id}</span>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
