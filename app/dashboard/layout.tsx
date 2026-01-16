import { Sidebar } from "@/components/sidebar"
import { TacticalLayout } from "@/components/tactical-layout"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { IntercomLauncher } from "@/components/intercom/intercom-launcher"
import { auth } from "@/auth"
import { Box, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const userId = session?.user?.email?.split('@')[0].toUpperCase() || undefined

  return (
    <div className="flex min-h-screen">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-100">
        <Sidebar className="h-full" />
      </div>
      <main className="md:pl-64 flex-1 relative z-0">
        {/* Top Header with Notifications */}
        <div className="sticky top-0 z-90 flex items-center justify-between p-4 border-b border-[#22252b] bg-[#111217] tactical-header">
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-r border-border/50 bg-background w-72">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <Box className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold">Ha-Meem Group</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">Ha-Meem ERP</h1>
          </div>
          <div className="flex items-center gap-4">
            <IntercomLauncher />
            <NotificationBell userId={userId} />
            {session?.user && (
              <div className="text-sm hidden md:block">
                <p className="font-medium">{session.user.name}</p>
                <p className="text-muted-foreground text-xs">{(session.user as any)?.role}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="h-full bg-muted/20 min-h-screen p-8">
          <TacticalLayout>
            {children}
          </TacticalLayout>
        </div>
      </main>
    </div>
  )
}
