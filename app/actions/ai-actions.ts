"use server"

export type InsightType = 'warning' | 'success' | 'info' | 'critical'

export interface SystemInsight {
    id: string
    type: InsightType
    message: string
    impact: 'High' | 'Medium' | 'Low'
    actionable: boolean
    timestamp: Date
}

export async function getSystemInsights(): Promise<{ success: boolean, data?: SystemInsight[] }> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const insights: SystemInsight[] = [
        {
            id: '1',
            type: 'warning',
            message: 'Production efficiency in Dyeing Unit dropped by 12% in the last 4 hours.',
            impact: 'High',
            actionable: true,
            timestamp: new Date()
        },
        {
            id: '2',
            type: 'success',
            message: 'Inventory turnover rate is currently optimal. No stockouts predicted for next 14 days.',
            impact: 'Medium',
            actionable: false,
            timestamp: new Date()
        },
        {
            id: '3',
            type: 'critical',
            message: 'Detected irregular attendance pattern in Finishing department. 15% absenteeism today.',
            impact: 'High',
            actionable: true,
            timestamp: new Date()
        },
        {
            id: '4',
            type: 'info',
            message: 'Energy consumption is 5% lower than last week average.',
            impact: 'Low',
            actionable: false,
            timestamp: new Date()
        }
    ]

    return { success: true, data: insights }
}
