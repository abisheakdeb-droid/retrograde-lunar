 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Box, Layers, Users } from "lucide-react";
import { db } from "@/lib/data/mock-db";
import { ProductionCostChart } from "@/components/charts/production-cost-chart";

export default async function Home() {
  const productionStats = await db.getProductionStats();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Box className="h-5 w-5" />
            </div>
            <span>Ha-Meem <span className="text-primary">Enterprise</span></span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard/hrm" className="hover:text-primary transition-colors">HRM</Link>
            <Link href="/dashboard/requisition" className="hover:text-primary transition-colors">Requisition</Link>
            <Link href="/dashboard/erp" className="hover:text-primary transition-colors">ERP</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Login
            </Link>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-12 lg:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    The Future of Corporate Management
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Unified HRM, Requisition, and ERP systems. Secured, Lag-free, and Premium experience across all platforms.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard/hrm">
                    <Button size="lg" className="w-full sm:w-auto">
                      Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Live Dashboard Preview */}
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 relative overflow-hidden backdrop-blur-sm bg-opacity-80">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <TrendingUpIcon />
                </div>
                <h3 className="font-semibold text-lg mb-4">Monthly Production vs Cost</h3>
                <ProductionCostChart data={productionStats} />
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12 mt-16">
              <Link href="/dashboard/hrm" className="block group">
                <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Smart HRM</h3>
                  <p className="text-muted-foreground">
                    Automated payroll, attendance tracking, and employee management.
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/erp" className="block group">
                <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <div className="p-3 rounded-full bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Box className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Seamless ERP</h3>
                  <p className="text-muted-foreground">
                    Real-time inventory, supply chain monitoring, and resource planning.
                  </p>
                </div>
              </Link>

              <Link href="/dashboard/requisition" className="block group">
                <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                  <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <Layers className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Fast Requisition</h3>
                  <p className="text-muted-foreground">
                    Streamlined approval flows for all corporate requests.
                  </p>
                </div>
              </Link>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
  )
}
