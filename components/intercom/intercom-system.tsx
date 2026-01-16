"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { IntercomContext, Contact, Message, Attachment } from "./intercom-context"

import { MessengerWindow } from "./messenger-window"
// @ts-ignore
import { faker } from "@faker-js/faker"
import { MockDatabase } from "@/lib/data/mock-db"

export function IntercomSystem({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeContactId, setActiveContactId] = useState<string | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [mounted, setMounted] = useState(false)

  // Clear unread count when contact becomes active
  useEffect(() => {
    if (activeContactId) {
      setContacts(prev => prev.map(c => 
        c.id === activeContactId ? { ...c, unread: 0 } : c
      ))
    }
  }, [activeContactId])

  // Initialize Data from Mock DB
  useEffect(() => {
    setMounted(true)
    
    // Load real employees from DB
    const loadData = async () => {
      const db = MockDatabase.getInstance()
      const { data: employees } = await db.getEmployees(1, 50) // Get first 50 employees
      
      const mappedContacts: Contact[] = employees.map(emp => ({
        id: emp.id,
        empId: emp.employeeId,
        name: emp.name,
        designation: emp.role,
        department: emp.department,
        avatar: emp.avatar,
        status: faker.helpers.arrayElement(["online", "offline", "busy"]),
        lastMessage: faker.lorem.sentence(), // Mock last message for now
        time: `${faker.number.int({ min: 1, max: 12 })}:${faker.number.int({ min: 10, max: 59 })} ${faker.helpers.arrayElement(["AM", "PM"])}`,
        unread: faker.datatype.boolean() ? faker.number.int({ min: 0, max: 3 }) : 0
      }))
      
      setContacts(mappedContacts)
    }

    loadData()
  }, [])

  // Helper for generating conversation on the fly
  const generateConversation = () => {
     return Array.from({ length: 8 }).map((_, i) => ({
        id: `msg-${i}-${Date.now()}`,
        text: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
        isMe: faker.datatype.boolean(),
        timestamp: `${faker.number.int({ min: 1, max: 12 })}:${faker.number.int({ min: 10, max: 59 })} ${faker.helpers.arrayElement(["AM", "PM"])}`
      })).sort(() => Math.random() - 0.5)
  }

  // Initialize messages for a contact if they don't exist when selected
  useEffect(() => {
    if (activeContactId && !messages[activeContactId]) {
      setMessages(prev => ({
        ...prev,
        [activeContactId]: generateConversation()
      }))
    }
  }, [activeContactId, messages])

  const sendMessage = (text: string, attachments?: Attachment[]) => {
    if (!activeContactId) return
    
    // Don't send empty messages unless there's an attachment
    if (!text.trim() && (!attachments || attachments.length === 0)) return
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      isMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments
    }
    
    setMessages(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }))
    
    // Simulate auto-reply
    if (Math.random() > 0.5) {
        setTimeout(() => {
            const reply: Message = {
              id: `msg-reply-${Date.now()}`,
              text: faker.lorem.sentence(),
              isMe: false,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => ({
                ...prev,
                [activeContactId]: [...(prev[activeContactId] || []), reply]
              }))
        }, 2000 + Math.random() * 2000)
    }
  }

  const value = {
    isOpen,
    setIsOpen,
    activeContactId,
    setActiveContactId,
    contacts,
    messages,
    sendMessage
  }

  return (
    <IntercomContext.Provider value={value}>
      {children}
      {mounted && createPortal(
        <MessengerWindow />,
        document.body
      )}
    </IntercomContext.Provider>
  )
}
