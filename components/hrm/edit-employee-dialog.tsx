"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react"
import { updateEmployee } from "@/app/actions"
import { toast } from "sonner"
import type { Employee } from "@/lib/data/generators"

export function EditEmployeeDialog({ employee }: { employee: Employee }) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    async function onSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                await updateEmployee(formData)
                setOpen(false)
                toast.success("Profile updated successfully")
            } catch (error) {
                toast.error("Failed to update profile")
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update employee details. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit} className="grid gap-4 py-4">
                    <input type="hidden" name="id" value={employee.id} />

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" defaultValue={employee.name} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={employee.email} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Role</Label>
                        <Input id="role" name="role" defaultValue={employee.role} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">Dept</Label>
                        <Input id="department" name="department" defaultValue={employee.department} className="col-span-3" required />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">Phone</Label>
                        <Input id="phone" name="phone" defaultValue={employee.phone} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">Address</Label>
                        <Input id="address" name="address" defaultValue={employee.address} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <div className="col-span-3">
                            <Select name="status" defaultValue={employee.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="On Leave">On Leave</SelectItem>
                                    <SelectItem value="Terminated">Terminated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
