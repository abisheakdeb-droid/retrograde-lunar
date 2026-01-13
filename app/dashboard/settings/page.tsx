import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Bell, Lock, User } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Profile Settings</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" defaultValue="Admin User" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="admin@hameemgroup.com" disabled />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" /> Security</CardTitle>
                        <CardDescription>Manage password and access.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="current">Current Password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new">New Password</Label>
                            <Input id="new" type="password" />
                        </div>
                        <Button variant="outline">Update Password</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
                        <CardDescription>Configure alert preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <Label className="text-base">Email Alerts</Label>
                                <p className="text-xs text-muted-foreground">Receive updates via email</p>
                            </div>
                            {/* Checkbox would go here */}
                            <span className="text-sm font-bold text-green-500">On</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <Label className="text-base">SMS Alerts</Label>
                                <p className="text-xs text-muted-foreground">Receive critical alerts via SMS</p>
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">Off</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> System Preferences</CardTitle>
                        <CardDescription>Global application settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Button variant="outline">Theme Settings</Button>
                            <Button variant="outline">Language (English)</Button>
                            <Button variant="destructive">Clear Cache</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
