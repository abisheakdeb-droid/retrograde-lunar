import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req
    const role = (req.auth?.user as any)?.role

    // 1. Redirect to login if not authenticated for protected routes
    const isDashboard = nextUrl.pathname.startsWith('/dashboard')
    const isLogin = nextUrl.pathname === '/login'

    if (isDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', nextUrl))
    }

    if (isLogin && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
    }

    // 2. Role-Based Access Control (RBAC)
    if (isDashboard && role) {
        // Admin Only Routes
        if (nextUrl.pathname.startsWith('/dashboard/settings') || nextUrl.pathname.startsWith('/dashboard/users')) {
            if (role !== 'Admin') {
                return NextResponse.redirect(new URL('/dashboard', nextUrl)) // Access Denied
            }
        }

        // Admin & Manager Routes
        if (nextUrl.pathname.startsWith('/dashboard/hrm') || nextUrl.pathname.startsWith('/dashboard/finance')) {
            if (role !== 'Admin' && role !== 'Manager') {
                return NextResponse.redirect(new URL('/dashboard', nextUrl)) // Access Denied
            }
        }
    }

    return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
