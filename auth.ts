import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const isProduction = process.env.NODE_ENV === "production"
if (isProduction && !process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is required in production. Please set it in your environment variables.")
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET || "development-secret-key-change-in-production",
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Mock authentication - in production, verify against database
                const validUsers = [
                    { id: "1", email: "admin@hameem.com", password: "admin123", role: "Admin", name: "Admin User" },
                    { id: "2", email: "manager@hameem.com", password: "manager123", role: "Manager", name: "Manager User" },
                    { id: "3", email: "staff@hameem.com", password: "staff123", role: "Staff", name: "Staff User" },
                ]

                const user = validUsers.find(
                    u => u.email === credentials.email && u.password === credentials.password
                )

                if (user) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})
