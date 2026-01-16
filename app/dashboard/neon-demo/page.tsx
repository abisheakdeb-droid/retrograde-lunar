"use client"

import { NeonChart } from "@/components/ui/neon-chart"

// Generate sample data matching EXACT Neon's monitoring pattern
const generateData = () => {
  const now = new Date()
  const data = []
  
  // Create data points matching Neon's time range (5:08 PM to ~1:08 PM next day)
  for (let i = 0; i < 120; i++) {
    const time = new Date(now.getTime() - (120 - i) * 4 * 60 * 1000) // 4-minute intervals
    const progress = i / 120
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      // Inactive fills the entire chart height (0.5 is the max for the scale)
      inactive: 0.5,
      // Allocated CU stays flat at 0.25
      cu: 0.25,
      // RAM usage: flat at 0 until the very end, then spikes dramatically
      ram: i > 108 ? 0.08 + (i - 108) * 0.015 + Math.random() * 0.01 : 0,
    })
  }
  
  return data
}

export default function NeonDemoPage() {
  const data = generateData()
  
  return (
    <div className="p-8 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Neon-Style Monitoring Charts</h1>
          <p className="text-gray-400">Exact replica of Neon's database monitoring interface</p>
        </div>
        
        {/* CPU & RAM Chart - PIXEL PERFECT MATCH */}
        <div className="bg-[#0a0a0a] rounded-lg border border-[#151515]">
          <NeonChart
            data={data}
            height={228}
            dataKeys={[
              { 
                key: 'inactive', 
                color: '#2a2a2a', 
                name: 'ENDPOINT INACTIVE',
                yAxisId: 'left',
                inactive: true // Ultra-fine diagonal stripe pattern
              },
              { 
                key: 'cu', 
                color: '#666666', 
                name: 'ALLOCATED CU',
                yAxisId: 'left'
              },
              { 
                key: 'ram', 
                color: '#00E5BF', // Neon's exact teal: vibrant cyan
                name: 'RAM USAGE',
                yAxisId: 'right'
              }
            ]}
            leftAxisLabel="CU"
            rightAxisLabel="RAM (GB)"
          />
        </div>
        
        {/* Additional Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0a0a0a] rounded-lg border border-gray-800">
            <NeonChart
              title="Database Connections"
              subtitle="Active connections over time"
              data={data.map(d => ({
                ...d,
                connections: Math.floor(Math.random() * 50)
              }))}
              dataKeys={[
                { 
                  key: 'connections', 
                  color: '#00D9B1', 
                  name: 'ACTIVE CONNECTIONS',
                  yAxisId: 'left'
                }
              ]}
              leftAxisLabel="Connections"
            />
          </div>
          
          <div className="bg-[#0a0a0a] rounded-lg border border-gray-800">
            <NeonChart
              title="Query Performance"
              subtitle="Average query time in milliseconds"
              data={data.map(d => ({
                ...d,
                queryTime: 5 + Math.random() * 15
              }))}
              dataKeys={[
                { 
                  key: 'queryTime', 
                  color: '#F59E0B', // Amber for warnings
                  name: 'AVG QUERY TIME',
                  yAxisId: 'left'
                }
              ]}
              leftAxisLabel="ms"
            />
          </div>
        </div>
        
        {/* Design Specs */}
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Design Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400 mb-1">Background</div>
              <div className="text-white font-mono">#0a0a0a</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Primary Color</div>
              <div className="text-white font-mono">#00D9B1</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Grid Lines</div>
              <div className="text-white font-mono">#1a1a1a</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Text Color</div>
              <div className="text-white font-mono">#6a6a6a</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Stripe Pattern</div>
              <div className="text-white font-mono">45° diagonal</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Stripe Color</div>
              <div className="text-white font-mono">#2a2a2a</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Line Width</div>
              <div className="text-white font-mono">1.5px</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Font Size</div>
              <div className="text-white font-mono">11px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
