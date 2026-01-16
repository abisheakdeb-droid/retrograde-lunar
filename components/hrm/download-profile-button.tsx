"use client"

import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Employee, KpiScorecard } from "@/lib/data/generators"
import { Task } from "@/types/task-types"

interface DownloadProfileButtonProps {
    employee: Employee;
    tasks: Task[];
    performance: KpiScorecard[];
}

export function DownloadProfileButton({ employee, tasks, performance }: DownloadProfileButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 100)); // UI update

        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;

            // Brand Header
            doc.setFillColor(30, 41, 59); // Slate 800
            doc.rect(0, 0, pageWidth, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.text("Ha-Meem Group", 20, 25);
            doc.setFontSize(12);
            doc.setTextColor(148, 163, 184);
            doc.text("Employee Dossier", pageWidth - 20, 25, { align: 'right' });

            // Employee Header
            doc.setTextColor(33, 33, 33);
            doc.setFontSize(16);
            doc.text(`Profile: ${employee.name}`, 20, 55);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`ID: ${employee.employeeId} | Dept: ${employee.department} | Role: ${employee.role}`, 20, 62);

            // Personal Info Table
            autoTable(doc, {
                startY: 70,
                head: [['Attribute', 'Details']],
                body: [
                    ['Email', employee.email],
                    ['Phone', employee.phone],
                    ['Address', employee.address],
                    ['Status', employee.status],
                    ['Join Date', new Date(employee.joinDate).toLocaleDateString()],
                    ['Performance Score', `${employee.performance}%`]
                ],
                theme: 'striped',
                headStyles: { fillColor: [71, 85, 105] }
            });

            // Performance History
            const finalY = (doc as any).lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.setTextColor(33, 33, 33);
            doc.text("Performance History", 20, finalY);

            const performanceRows = performance.map(p => [
                new Date(p.reviewDate).toLocaleDateString(),
                p.overallScore + '%',
                p.trend.toUpperCase(),
                p.feedback
            ]);

            autoTable(doc, {
                startY: finalY + 5,
                head: [['Date', 'Score', 'Trend', 'Feedback']],
                body: performanceRows.length ? performanceRows : [['No records', '-', '-', '-']],
                theme: 'grid',
                headStyles: { fillColor: [22, 163, 74] } // Green
            });

            // Task History
            const taskY = (doc as any).lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.setTextColor(33, 33, 33);
            doc.text("Recent Task History", 20, taskY);

            const taskRows = tasks.map(t => [
                t.title,
                t.status,
                t.priority,
                t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'N/A'
            ]);

            autoTable(doc, {
                startY: taskY + 5,
                head: [['Task', 'Status', 'Priority', 'Due Date']],
                body: taskRows.length ? taskRows : [['No tasks found', '-', '-', '-']],
                theme: 'grid',
                headStyles: { fillColor: [37, 99, 235] } // Blue
            });

            // Footer
            const pageCount = (doc as any).internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(150);
            for(let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.text(`Generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
            }

            doc.save(`${employee.employeeId}_profile.pdf`);
        } catch (error) {
            console.error("PDF Generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <Button variant="outline" size="sm" onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Download Profile
        </Button>
    )
}
