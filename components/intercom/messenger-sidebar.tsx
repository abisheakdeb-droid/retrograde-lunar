"use client"

import { useState, useRef } from "react"

import { Search, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import { SmoothScrollArea } from "@/components/ui/smooth-scroll-area" // Removed

// ... imports

import { Contact } from "./intercom-context"

interface MessengerSidebarProps {
  contacts: Contact[]
  activeContactId?: string
  onSelectContact: (id: string) => void
  onClose?: () => void
  isMobile?: boolean
}

export function MessengerSidebar({ 
  contacts, 
  activeContactId, 
  onSelectContact,
  onClose
}: MessengerSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Filter contacts based on search
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.empId.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.department.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <div className="flex flex-col h-full">
      {/* Header - Top Section (Aligned with Chat Header) */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/40 shrink-0">
        <h2 className="text-xl font-bold tracking-tight">Chats</h2>
        <div className="flex items-center gap-1">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full hover:bg-muted/50"
            onClick={() => {
              inputRef.current?.focus()
              setSearchQuery("") // Clear search to show unfiltered list or ready for new search
            }}
            aria-label="New Chat"
          >
             <Plus className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={onClose}
              aria-label="Close Messenger"
          >
             <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Search Section */}
      <div className="p-4"> 
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            ref={inputRef}
            placeholder="Search by name, ID, or role..." 
            className="pl-9 h-9 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col pb-2 gap-1">
          {filteredContacts.length === 0 ? (
             <div className="p-4 text-center text-sm text-muted-foreground">
               No employees found.
             </div>
          ) : (
            filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={cn(
                "flex items-center gap-3 p-3 transition-all duration-200 text-left group border-b border-border/40 last:border-0 hover:bg-muted/50",
                activeContactId === contact.id 
                  ? "bg-primary/10 border-l-2 border-primary pl-[10px]" 
                  : "bg-transparent border-l-2 border-transparent pl-[10px]"
              )}
            >
              <div className="relative">
                <Avatar className="h-9 w-9 border border-border/50">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="text-[10px] bg-background">{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {contact.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
                )}
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={cn(
                    "text-sm truncate font-medium",
                    contact.unread > 0 ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"
                  )}>
                    {contact.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap ml-2 font-mono">
                    {contact.time}
                  </span>
                </div>
                
                {/* ID and Designation Row */}
                <div className="flex items-center gap-2 mb-1 text-[10px] text-muted-foreground/70">
                    <span className="font-mono bg-muted/50 px-1 rounded">{contact.empId}</span>
                    <span>•</span>
                    <span className="truncate max-w-[100px]">{contact.designation}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs truncate max-w-[140px]",
                    contact.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground/70"
                  )}>
                    {contact.lastMessage}
                  </span>
                  {contact.unread > 0 && (
                    <span className="flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          )))}
        </div>
      </div>
    </div>
  )
}
