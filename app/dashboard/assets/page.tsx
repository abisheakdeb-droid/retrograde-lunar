import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Layers, 
  Search, 
  Plus, 
  Settings2, 
  ShieldAlert, 
  Wrench, 
  History,
  Activity
} from "lucide-react"
import { getAssets } from "@/lib/db/queries"

export default async function AssetsPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const search = searchParams?.q || '';

    // Fetch Assets with Search
    const { data: assets } = await getAssets(1, 100, search);

    // Calculate Stats (could be optimized with aggregation, but filtering in memory for simple stats is fine for now < 100 items)
    const stats = {
      total: assets.length,
      maintenance: assets.filter(a => a.condition === 'Maintenance Required').length,
      repair: assets.filter(a => a.status === 'Being Repaired').length,
      value: assets.reduce((acc, a) => acc + a.purchaseValue, 0)
    };

    return (
        <div className="space-y-6 tactical-grid min-h-screen p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                      <h2 className="text-3xl font-bold tracking-tighter uppercase">Asset Matrix</h2>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-8">Industrial Equipment & Technical Assets Tracking</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden border-border/50 uppercase font-mono text-[10px] tracking-widest hover:bg-primary/10">
                      <Settings2 className="mr-2 h-3 w-3" />
                      Configuration
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground neon-glow-cyan uppercase font-mono text-[10px] tracking-widest rounded-none">
                        <Plus className="mr-2 h-3 w-3" />
                        Provision Asset
                    </Button>
                </div>
            </div>

            {/* Tactical Stats Bento */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                  { label: "Total Asset Load", value: stats.total, icon: Layers, color: "text-primary" },
                  { label: "Critical Maint", value: stats.maintenance, icon: ShieldAlert, color: "text-red-500", glow: "0_0_10px_rgba(239,68,68,0.3)" },
                  { label: "Unit Repair Status", value: stats.repair, icon: Wrench, color: "text-amber-500", glow: "0_0_10px_rgba(245,158,11,0.3)" },
                  { label: "Capital Valuation", value: `$${(stats.value / 1000000).toFixed(2)}M`, icon: Activity, color: "text-emerald-500" },
                ].map((stat, i) => (
                  <Card key={i} className="tactical-card border-l-4 border-l-primary/50 overflow-hidden relative group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="technical-label">{stat.label}</CardTitle>
                      <stat.icon className={cn("h-4 w-4", stat.color)} />
                    </CardHeader>
                    <CardContent>
                      <div className={cn("text-2xl font-bold font-mono tracking-tighter", stat.color)} style={{ textShadow: stat.glow }}>{stat.value}</div>
                      <div className="mt-2 h-1 w-full bg-muted/30 overflow-hidden">
                        <div className="h-full bg-primary/40 animate-pulse w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Asset Table */}
            <Card className="tactical-card bg-card/40 backdrop-blur-sm border-t-0">
                <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
                    <CardTitle className="technical-label">Active Asset Register</CardTitle>
                    <div className="flex items-center gap-2 border border-border/50 px-3 py-1 bg-background/50">
                      <Search className="h-3 w-3 text-muted-foreground" />
                      <input 
                        placeholder="Search UUID / Name..." 
                        className="bg-transparent border-none text-[10px] font-mono focus:ring-0 w-32 uppercase tracking-widest"
                      />
                    </div>
                </div>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent border-border/30">
                                <TableHead className="pl-6 technical-label">UUID</TableHead>
                                <TableHead className="technical-label">Asset Descriptor</TableHead>
                                <TableHead className="technical-label">Category</TableHead>
                                <TableHead className="technical-label">Deployment Site</TableHead>
                                <TableHead className="technical-label">Condition</TableHead>
                                <TableHead className="technical-label">Status</TableHead>
                                <TableHead className="text-right pr-6 technical-label">Operations</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assets.map((asset) => (
                                <TableRow key={asset.id} className="border-border/20 hover:bg-primary/5 transition-colors group">
                                    <TableCell className="pl-6 font-mono text-[10px] text-primary/80">{asset.id}</TableCell>
                                    <TableCell>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-semibold uppercase">{asset.name}</span>
                                        <span className="text-[9px] text-muted-foreground font-mono">SN: {asset.serialNumber}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="outline" className="text-[9px] uppercase font-mono rounded-none border-border/50">{asset.category}</Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground uppercase">{asset.location}</TableCell>
                                    <TableCell>
                                      <span className={cn(
                                        "text-[10px] uppercase font-bold",
                                        asset.condition === 'Excellent' ? "text-emerald-500" :
                                        asset.condition === 'Maintenance Required' ? "text-red-500 animate-pulse" :
                                        "text-amber-500"
                                      )}>
                                        {asset.condition}
                                      </span>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2 text-[10px] font-mono">
                                        <div className={cn(
                                          "h-1.5 w-1.5 rounded-full",
                                          asset.status === 'In Use' ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" :
                                          asset.status === 'Being Repaired' ? "bg-amber-500" : "bg-slate-500"
                                        )} />
                                        {asset.status}
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/20"><History className="h-3 w-3" /></Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/20"><Wrench className="h-3 w-3" /></Button>
                                      </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
