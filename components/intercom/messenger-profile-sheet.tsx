"use client"

import { Contact } from "./intercom-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Building2, Clock, Calendar } from "lucide-react"

interface MessengerProfileSheetProps {
  contact: Contact
  isOpen: boolean
  onClose: () => void
}

export function MessengerProfileSheet({ contact, isOpen, onClose }: MessengerProfileSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] border-l shadow-2xl">
        <SheetHeader className="pb-6 border-b">
          <SheetTitle>Contact Info</SheetTitle>
          <SheetDescription>Employee details and information.</SheetDescription>
        </SheetHeader>
        
        <div className="flex items-start py-6 gap-6 pl-4">
          <div className="relative shrink-0">
            <Avatar className="h-20 w-20 border-4 border-muted">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback className="text-2xl">{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className={`absolute bottom-0 right-0 h-5 w-5 rounded-full border-4 border-background ${
              contact.status === 'online' ? 'bg-green-500' : 
              contact.status === 'busy' ? 'bg-red-500' : 'bg-muted-foreground'
            }`} />
          </div>
          
          <div className="space-y-1.5 pt-1">
            <h3 className="text-xl font-bold leading-none">{contact.name}</h3>
            <p className="text-muted-foreground font-medium">{contact.designation}</p>
            <Badge variant="outline" className="font-mono text-xs">{contact.empId}</Badge>
          </div>
        </div>

        <div className="space-y-6 pt-4 pl-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Department Info</h4>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Department:</span>
                <span>{contact.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Availability:</span>
                <span className="capitalize">{contact.status}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact Details</h4>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{contact.empId.toLowerCase()}@retrograde.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
