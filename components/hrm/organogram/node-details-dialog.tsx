"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { OrgNode } from "@/lib/data/mock-db"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Briefcase, Calendar, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NodeDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  node: OrgNode | null
}

export function NodeDetailsDialog({ isOpen, onClose, node }: NodeDetailsDialogProps) {
  if (!node) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center sm:text-center mt-2">
            <div className="relative mb-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                    <AvatarImage src={node.avatar} />
                    <AvatarFallback className="text-2xl">{node.name[0]}</AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-background ${
                    node.status === 'Online' ? "bg-green-500" :
                    node.status === 'In Meeting' ? "bg-amber-500" : "bg-muted-foreground"
                }`} title={node.status} />
            </div>
          <DialogTitle className="text-xl font-bold">{node.name}</DialogTitle>
          <DialogDescription className="text-base font-medium text-primary">
            {node.role}
          </DialogDescription>
          <Badge variant="outline" className="mt-2 bg-muted/50">
            {node.department}
          </Badge>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="space-y-4 py-2">
            <div className="grid gap-4">
                {node.email && (
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            <Mail className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-medium">Email</span>
                            <span>{node.email}</span>
                        </div>
                    </div>
                )}
                
                {node.phone && (
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            <Phone className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-medium">Phone</span>
                            <span>{node.phone}</span>
                        </div>
                    </div>
                )}

                {node.location && (
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-medium">Office Location</span>
                            <span>{node.location}</span>
                        </div>
                    </div>
                )}
                
                 {node.directReportsCount !== undefined && (
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            <Briefcase className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-medium">Headcount Responsibility</span>
                            <span>{node.directReportsCount} Direct Reports</span>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <DialogHeader>
           <div className="flex items-center justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="w-full gap-2">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                    LinkedIn
                </Button>
                 <Button variant="outline" size="sm" className="w-full gap-2">
                    <Twitter className="h-4 w-4 text-sky-500" />
                    Twitter
                </Button>
           </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
