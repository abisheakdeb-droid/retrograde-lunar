"use client"

import { useState, useMemo } from "react"
import { Task, Column, KANBAN_COLUMNS, TaskStatus } from "@/types/task-types"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { updateTaskStatus } from "@/app/actions/task-actions"
import { toast } from "sonner"
import { TaskDetailSheet } from "./task-detail-sheet"

interface KanbanBoardProps {
    initialTasks: Task[];
}

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const columns = useMemo(() => {
        return KANBAN_COLUMNS.map(col => ({
            ...col,
            tasks: tasks.filter(task => task.status === col.id)
        }));
    }, [tasks]);

    const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
        // Optimistic Update
        const previousTasks = [...tasks];
        setTasks(prev => prev.map(t => 
            t.id === taskId ? { ...t, status: newStatus } : t
        ));

        // Server Action
        const result = await updateTaskStatus(taskId, newStatus);
        if (!result.success) {
            setTasks(previousTasks); // Revert
            toast.error("Failed to move task");
        } else {
             toast.success("Task moved");
        }
    };

    return (
        <div className="h-full overflow-x-auto pb-4">
            <div className="flex gap-4 h-full min-w-[1000px]">
                {columns.map(col => (
                    <div 
                        key={col.id} 
                        className="flex-shrink-0 w-[280px] flex flex-col gap-3 group/col"
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add('bg-primary/5');
                        }}
                        onDragLeave={(e) => {
                             e.currentTarget.classList.remove('bg-primary/5');
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('bg-primary/5');
                            const taskId = e.dataTransfer.getData("taskId");
                            if (taskId) {
                                handleStatusChange(taskId, col.id);
                            }
                        }}
                    >
                        {/* Column Header */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-card/30 border border-primary/10 backdrop-blur-sm sticky top-0 z-10">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary neon-glow-cyan" />
                                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    {col.title}
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono bg-background/50 px-1.5 rounded text-primary">
                                {col.tasks.length}
                            </span>
                        </div>

                        {/* Task List */}
                        <div className="flex-1 space-y-3 min-h-[200px] p-1 rounded-md transition-colors">
                            <AnimatePresence mode="popLayout">
                                {col.tasks.map(task => (
                                    <TaskCard 
                                        key={task.id} 
                                        task={task} 
                                        draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("taskId", task.id);
                                        }}
                                        onClick={() => setSelectedTask(task)}
                                    />
                                ))}
                            </AnimatePresence>
                            <Button 
                                variant="ghost" 
                                className="w-full text-xs text-muted-foreground border-2 border-dashed border-primary/10 hover:border-primary/30 hover:bg-primary/5 hover:text-primary h-9"
                            >
                                <Plus className="h-3 w-3 mr-1" /> Add Task
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <TaskDetailSheet 
                task={selectedTask} 
                open={!!selectedTask} 
                onOpenChange={(open) => !open && setSelectedTask(null)} 
            />
        </div>
    )
}
