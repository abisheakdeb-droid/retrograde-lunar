"use client"

import { useRef, useState, useEffect } from "react"
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
import { Mail, Phone, MapPin, Briefcase, Camera, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NodeDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  node: OrgNode | null
}

export function NodeDetailsDialog({ isOpen, onClose, node }: NodeDetailsDialogProps) {
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (node) {
      setCurrentAvatar(node.avatar)
    }
  }, [node])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  if (!node) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center sm:text-center mt-2">
            <div className="relative mb-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                    <AvatarImage src={currentAvatar || node.avatar} />
                    <AvatarFallback className="bg-transparent">
                         <img 
                            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
                            alt="Memoji" 
                            className="h-full w-full object-cover scale-125 translate-y-2"
                        />
                    </AvatarFallback>
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
           <div className="flex items-center justify-center gap-2 mt-4 w-full">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                />
                 <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={triggerFileUpload}>
                    <Camera className="h-4 w-4" />
                    Change Photo
                </Button>
                 <Button size="sm" className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Check className="h-4 w-4" />
                    Save Changes
                </Button>
           </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
