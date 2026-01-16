"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchReportData } from "@/app/actions/report-actions"
import { Loader2, FileDown, FileSpreadsheet } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
// import ExcelJS from 'exceljs' // dynamic import to avoid fs issues on client if standard import acts up

type ReportType = 'PAYROLL' | 'ATTENDANCE' | 'INVENTORY'

export function ReportGenerator() {
    const [type, setType] = useState<ReportType>('PAYROLL')
    const [loading, setLoading] = useState(false)

    const handleGenerate = async (format: 'PDF' | 'EXCEL') => {
        setLoading(true)
        try {
            const res = await fetchReportData(type)
            if (!res.success || !res.data) {
                alert("Failed to fetch data")
                return
            }

            if (format === 'PDF') {
                generatePDF(res.data, type)
            } else {
                await generateExcel(res.data, type)
            }

        } catch (e) {
            console.error(e)
            alert("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const generatePDF = (data: any[], title: string) => {
        const doc = new jsPDF()
        doc.text(`${title} Report`, 14, 22)
        doc.setFontSize(10)
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)

        if (data.length === 0) {
             doc.text("No data available", 14, 40)
             doc.save(`${title.toLowerCase()}_report.pdf`)
             return
        }

        const headers = Object.keys(data[0])
        const rows = data.map(obj => Object.values(obj))

        autoTable(doc, {
            head: [headers],
            body: rows as any[],
            startY: 40,
        })

        doc.save(`${title.toLowerCase()}_report.pdf`)
    }

    const generateExcel = async (data: any[], title: string) => {
        // Dynamic import to ensure client-side compatibility
        const ExcelJS = (await import('exceljs')).default
        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet(title)

        if (data.length > 0) {
            const headers = Object.keys(data[0])
            sheet.columns = headers.map(header => ({ header, key: header, width: 20 }))
            sheet.addRows(data)
        }

        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download =(`${title.toLowerCase()}_report.xlsx`)
        a.click()
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Export system data to PDF or Excel formats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select value={type} onValueChange={(v) => setType(v as ReportType)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PAYROLL">Payroll Summary</SelectItem>
                            <SelectItem value="ATTENDANCE">Attendance Records</SelectItem>
                            <SelectItem value="INVENTORY">Inventory Levels</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2 pt-2">
                    <Button 
                        className="flex-1" 
                        variant="outline" 
                        onClick={() => handleGenerate('PDF')}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
                        Download PDF
                    </Button>
                    <Button 
                        className="flex-1" 
                        onClick={() => handleGenerate('EXCEL')}
                        disabled={loading}
                    >
                         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />}
                        Download Excel
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
