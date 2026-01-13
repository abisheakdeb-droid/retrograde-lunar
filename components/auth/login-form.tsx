"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Box } from "lucide-react"

export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            router.push("/dashboard")
        }, 1500)
    }

    return (
        <Card className="w-full max-w-md border-0 bg-background/60 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                        <Box className="h-7 w-7" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                <CardDescription>
                    Enter your credentials to access the enterprise portal
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="name@hameemgroup.com" required className="bg-white/5" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required className="bg-white/5" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {/* Checkbox Placeholder if needed */}
                        </div>
                        <a href="#" className="text-sm font-medium text-primary hover:underline">
                            Forgot password?
                        </a>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isLoading} variant="premium">
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                    <div className="relative text-center text-xs text-muted-foreground w-full">
                        <span className="bg-background px-2">Protected by Ha-Meem Enterprise Security</span>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
