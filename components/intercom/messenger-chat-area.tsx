"use client"

import { Phone, Video, Info, MoreVertical, Send, Paperclip, Smile, ArrowLeft, Plus, X, File as FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageBubble } from "./message-bubble"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
// import { SmoothScrollArea, SmoothScrollHandle } from "@/components/ui/smooth-scroll-area" // Removed
import { MessengerProfileSheet } from "./messenger-profile-sheet"
import { Attachment } from "./intercom-context"

interface Message {
  id: string
  text: string
  isMe: boolean
  timestamp: string
  attachments?: Attachment[]
}

interface MessengerChatAreaProps {
  contact: {
    id: string
    name: string
    avatar: string
    status: string
  }
  messages: Message[]
  onBack?: () => void
  onSendMessage: (text: string, attachments?: Attachment[]) => void
  isMobile?: boolean
}

export function MessengerChatArea({ 
  contact, 
  messages, 
  onBack, 
  onSendMessage,
  isMobile 
}: MessengerChatAreaProps) {
  const [inputValue, setInputValue] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [showProfile, setShowProfile] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim() && attachments.length === 0) return
    onSendMessage(inputValue, attachments)
    setInputValue("")
    setAttachments([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newAttachments: Attachment[] = Array.from(e.target.files).map(file => ({
            id: Math.random().toString(36).substring(7),
            name: file.name,
            type: file.type.startsWith('image/') ? 'image' : 'file',
            url: URL.createObjectURL(file),
            size: (file.size / 1024).toFixed(1) + ' KB'
        }))
        setAttachments(prev => [...prev, ...newAttachments])
        // Reset input
        e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="h-16 border-b border-border/40 flex items-center justify-between px-4 bg-card/30">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-1 -ml-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <button 
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-3 group hover:opacity-80 transition-opacity text-left"
          >
            <div className="relative">
              <Avatar className="h-9 w-9 border border-border/50">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {contact.status === "online" && (
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-background" />
              )}
            </div>
            
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-none group-hover:underline decoration-muted-foreground/50 underline-offset-2">{contact.name}</span>
              <span className="text-[10px] text-muted-foreground mt-1">
                {contact.status === "online" ? "Active now" : "Offline"}
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary h-8 w-8"
            onClick={() => setShowProfile(true)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <MessengerProfileSheet 
        contact={contact as any} 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />

      {/* Messages Area */}
      <div 
        ref={scrollAreaRef}
        className="flex-1 p-4 overflow-y-auto panel-scroll"
      >
        <div className="flex flex-col justify-end min-h-full">
          {/* Welcome Message */}
          <div className="flex flex-col items-center justify-center py-8 space-y-2 opacity-50 mb-8">
            <Avatar className="h-16 w-16">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <p className="text-xs text-muted-foreground">
              You are now connected with {contact.name}
            </p>
          </div>

          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg.text} 
              isMe={msg.isMe} 
              timestamp={msg.timestamp}
              attachments={msg.attachments}
            />
          ))}
        </div>
        </div>


      {/* Input Area */}
      <div className="p-4 border-t border-border/40 bg-card/30">
        {/* Attachment Preview */}
        {attachments.length > 0 && (
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
            {attachments.map((file) => (
              <div key={file.id} className="relative group shrink-0">
                <div className="h-16 w-16 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                  {file.type === 'image' ? (
                    <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                  ) : (
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <button
                  onClick={() => setAttachments(prev => prev.filter(a => a.id !== file.id))}
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="flex gap-1 mb-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileSelect}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="pr-10 rounded-full bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
            />
            <Button 
              size="icon" 
              onClick={handleSend}
              disabled={!inputValue.trim() && attachments.length === 0}
              className={cn(
                "absolute right-1 top-1 h-7 w-7 rounded-full transition-all duration-200",
                inputValue.trim() ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
          

        </div>
      </div>
    </div>
  )
}
