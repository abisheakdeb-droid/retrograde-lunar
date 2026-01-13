export interface ERPItem {
  id: string
  sku: string
  name: string
  category: string
  quantity: number
  unit: string
  warehouse: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  value: number
  lastUpdated: string
}

const CATEGORIES = ['Electronics', 'Raw Materials', 'Components', 'Hazardous', 'Tools']
const WAREHOUSES = ['Sector Alpha', 'Sector Beta', 'Lunar Outpost', 'Orbital Station']

export function generateERPInventory(count: number = 50): ERPItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const quantity = Math.floor(Math.random() * 1000)
    const status = quantity === 0 ? 'Out of Stock' : quantity < 50 ? 'Low Stock' : 'In Stock'
    
    return {
      id: `INV-${String(i + 1).padStart(4, '0')}`,
      sku: `SKU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name: `Component ${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      quantity,
      unit: 'units',
      warehouse: WAREHOUSES[Math.floor(Math.random() * WAREHOUSES.length)],
      status,
      value: parseFloat((Math.random() * 500).toFixed(2)),
      lastUpdated: new Date().toISOString()
    }
  })
}
