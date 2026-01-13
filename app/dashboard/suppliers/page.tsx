import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Globe, ShieldCheck, AlertTriangle } from "lucide-react"
import { SupplierPerformanceCard } from "@/components/suppliers/supplier-performance-card"
import { prisma } from "@/lib/db"
import { Supplier } from "@/lib/data/generators"
import { AddSupplierDialog } from "@/components/suppliers/add-supplier-dialog"
import { ImportSuppliersDialog } from "@/components/suppliers/import-suppliers-dialog"

export default async function SupplierPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawSuppliers = await (prisma as any).supplier.findMany({ take: 100 });
    const suppliers = rawSuppliers as unknown as Supplier[];

    // Filter for top performance cards (mock logic for now, or could sorting)
    const topSuppliers = [...suppliers].sort((a,b) => b.rating - a.rating).slice(0, 3);
    // Find a risk supplier
    const riskSupplier = suppliers.find(s => s.status === 'Risk');
    const performanceCards = riskSupplier ? [...topSuppliers, riskSupplier] : topSuppliers;

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Globe className="h-6 w-6 text-primary neon-glow-cyan" />
                        Global Supply Chain Network
                    </h1>
                    <p className="text-muted-foreground">Strategic vendor management and performance monitoring.</p>
                </div>
                <div className="flex gap-2">
                    <ImportSuppliersDialog />
                    <AddSupplierDialog />
                </div>
            </div>

            {/* Top Stats - Supplier Health */}
            <div className="grid gap-4 md:grid-cols-3">
                 <Card className="tactical-card bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-primary">Active Vendors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary neon-text-cyan">{suppliers.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across 12 countries</p>
                    </CardContent>
                 </Card>
                 <Card className="tactical-card bg-amber-500/5 border-amber-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-amber-500">Compliance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-500 neon-text-amber">94.2%</div>
                        <p className="text-xs text-muted-foreground mt-1">+2.1% this quarter</p>
                    </CardContent>
                 </Card>
                 <Card className="tactical-card bg-red-500/5 border-red-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-500">Critical Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-500">{suppliers.filter(s => s.status === 'Risk').length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
                    </CardContent>
                 </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                {/* Performance Cards - Top & Risk */}
                {performanceCards.slice(0, 4).map(supplier => (
                    <SupplierPerformanceCard 
                        key={supplier.id}
                        name={supplier.name} 
                        category={supplier.category} 
                        score={supplier.rating} 
                        speed={supplier.speed} 
                        status={supplier.status} 
                    />
                ))}
            </div>

            <Card className="tactical-card">
                <CardHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold">Tactical Vendor Registry</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search suppliers..." 
                                className="pl-9 w-[250px] bg-background/50 border-input/50"
                            />
                        </div>
                        <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border/50">
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Supplier Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Reliability</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier.id} className="cursor-pointer hover:bg-muted/50 border-border/50">
                                    <TableCell className="font-mono text-xs text-muted-foreground">{supplier.id}</TableCell>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        {supplier.status === 'Vetted' && <ShieldCheck className="h-3 w-3 text-primary" />}
                                        {supplier.status === 'Risk' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                                        {supplier.name}
                                    </TableCell>
                                    <TableCell>{supplier.category}</TableCell>
                                    <TableCell>{supplier.location}</TableCell>
                                    <TableCell>
                                        <div className="w-[60px] h-1.5 bg-secondary rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full ${
                                                    supplier.rating > 90 ? 'bg-primary neon-glow-cyan' :
                                                    supplier.rating > 75 ? 'bg-amber-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${supplier.rating}%` }}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            supplier.status === 'Vetted' ? 'border-primary text-primary bg-primary/10' :
                                            supplier.status === 'Risk' ? 'border-red-500 text-red-500 bg-red-500/10' :
                                            'border-amber-500 text-amber-500 bg-amber-500/10'
                                        }>
                                            {supplier.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <Globe className="h-4 w-4" />
                                        </Button>
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
