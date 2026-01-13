"use client"

import { createContext, useContext } from "react"

export interface Contact {
  id: string
  empId: string
  name: string
  designation: string
  department: string
  avatar: string
  status: "online" | "offline" | "busy"
  lastMessage: string
  time: string
  unread: number
}

export interface Attachment {
  id: string
  name: string
  type: 'image' | 'file'
  url: string
  size: string
}

export interface Message {
  id: string
  text: string
  isMe: boolean
  timestamp: string
  attachments?: Attachment[]
}

interface IntercomContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  activeContactId: string | null
  setActiveContactId: (id: string | null) => void
  contacts: Contact[]
  messages: Record<string, Message[]>
  sendMessage: (text: string, attachments?: Attachment[]) => void
}

export const IntercomContext = createContext<IntercomContextType | undefined>(undefined)

export function useIntercom() {
  const context = useContext(IntercomContext)
  if (!context) {
    throw new Error("useIntercom must be used within an IntercomProvider")
  }
  return context
}
