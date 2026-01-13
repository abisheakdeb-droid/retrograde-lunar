import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Archive, TrendingUp, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { db } from "@/lib/data/mock-db"
import { SearchInput } from "@/components/search-input"
import { ActionBar } from "@/components/action-bar"
import { ExportButton } from "@/components/export-button"
import { InventoryFilters } from "@/components/inventory/inventory-filters"
import { InventoryTable } from "@/components/erp/inventory-table"
import { TypingEffect } from "@/components/ui/typing-effect"

export default async function ERPPage(props: { searchParams: Promise<{ page?: string, q?: string }> }) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;
    const search = searchParams?.q || '';
    const { data: inventory, total, totalPages } = await db.getInventory(page, 15, search);
    const stats = await db.getStats();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/50 bg-clip-text text-transparent uppercase font-mono flex items-center gap-2">
                        <TypingEffect text="Tactical Inventory" />
                    </h2>
                    <div className="text-muted-foreground technical-label mt-1 text-xs">
                        <TypingEffect text="Supply Chain Ops & Resource Tracking" delay={0.5} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ActionBar />
                    <InventoryFilters />
                    <ExportButton data={inventory} type="inventory" />
                    <Button className="neon-glow-cyan">Manage Inventory</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="tactical-card bg-card/50 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium technical-label">Total Inventory Value</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono">${(stats.totalInventoryValue / 1000000).toFixed(2)}M</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                            +2.5% <span className="text-muted-foreground ml-1">vs last month</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="tactical-card bg-card/50 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium technical-label">Active Shipments</CardTitle>
                        <Truck className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono">18</div>
                        <p className="text-xs text-muted-foreground mt-1">8 arriving today</p>
                    </CardContent>
                </Card>
                <Card className="tactical-card bg-card/50 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium technical-label leading-none">Low Stock Alerts</CardTitle>
                        <Archive className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-mono text-orange-500 neon-glow-amber">{stats.lowStockItems}</div>
                        <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="tactical-card bg-card/50 backdrop-blur-md">
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle>Global Inventory List</CardTitle>
                            <p className="text-xs text-muted-foreground technical-label mt-1">
                                Live stock tracking across all warehouses.
                            </p>
                        </div>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <SearchInput placeholder="Search by SKU or Item Name..." />
                        </React.Suspense>
                    </div>
                </CardHeader>
                <CardContent>
                    <InventoryTable data={inventory} />

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between space-x-2 py-4 border-t border-border/40 mt-4">
                        <div className="text-xs text-muted-foreground font-mono">
                            Page {page} of {totalPages}
                        </div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page <= 1} asChild>
                                <a href={`?page=${page - 1}&q=${search}`}><ChevronLeft className="h-4 w-4" /></a>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={page >= totalPages} asChild>
                                <a href={`?page=${page + 1}&q=${search}`}><ChevronRight className="h-4 w-4" /></a>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
