export interface AnalyticsKPI {
  id: string
  label: string
  value: number | string
  change: number
  trend: 'up' | 'down' | 'neutral'
  unit?: string
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
}

export function generateAnalyticsKPIs(): AnalyticsKPI[] {
  return [
    {
      id: 'total-revenue',
      label: 'TotaL Revenue',
      value: (Math.random() * 10000000).toFixed(2),
      change: +(Math.random() * 10).toFixed(1),
      trend: 'up',
      unit: 'USD'
    },
    {
      id: 'active-users',
      label: 'Active Personnel',
      value: Math.floor(Math.random() * 5000),
      change: +(Math.random() * 5).toFixed(1),
      trend: 'up'
    },
    {
      id: 'efficiency',
      label: 'System Efficiency',
      value: (85 + Math.random() * 14).toFixed(1),
      change: -(Math.random() * 2).toFixed(1),
      trend: 'down',
      unit: '%'
    },
    {
      id: 'latency',
      label: 'Ntwk Latency',
      value: Math.floor(20 + Math.random() * 50),
      change: +(Math.random() * 10).toFixed(1),
      trend: 'down', // increasing latency is bad
      unit: 'ms'
    }
  ]
}

export function generateActivityFeed(count: number = 10): ActivityItem[] {
  const actions = ['Authorized', 'Deployed', 'Intercepted', 'Synchronized', 'Purged', 'Encrypted']
  const targets = ['Mainframe A', 'Sector 7', 'Payload B', 'Database Node', 'Security Protocol', 'Uplink']
  const users = ['CMDR Shepard', 'Lt. Ripley', 'Off. Deckard', 'Ens. Crusher', 'Dr. Bowman']

  return Array.from({ length: count }).map((_, i) => {
    const isError = Math.random() > 0.9
    const isWarning = Math.random() > 0.8 && !isError
    
    return {
      id: `act-${Math.random().toString(36).substr(2, 9)}`,
      user: users[Math.floor(Math.random() * users.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      target: targets[Math.floor(Math.random() * targets.length)],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
      status: isError ? 'error' : isWarning ? 'warning' : 'success'
    }
  })
}
