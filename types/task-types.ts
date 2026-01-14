export type Priority = 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: Priority;
    assignee?: {
        name: string;
        avatar?: string;
        role?: string;
    };
    dueDate?: Date;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Column {
    id: TaskStatus;
    title: string;
    tasks: Task[];
}

export const KANBAN_COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: 'PENDING', title: 'Tactical Queue' },
    { id: 'IN_PROGRESS', title: 'Active Operations' },
    { id: 'REVIEW', title: 'Command Review' },
    { id: 'COMPLETED', title: 'Mission Complete' },
];
