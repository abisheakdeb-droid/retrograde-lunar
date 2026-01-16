"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessengerSidebar } from "./messenger-sidebar"
import { MessengerChatArea } from "./messenger-chat-area"
import { cn } from "@/lib/utils"
import { useIntercom } from "./intercom-context"

export function MessengerWindow() {
  const { 
    isOpen, 
    contacts, 
    activeContactId, 
    setActiveContactId, 
    messages, 
    sendMessage,
    setIsOpen
  } = useIntercom()

  const activeContact = contacts.find(c => c.id === activeContactId)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-background border border-border shadow-2xl rounded-2xl z-9999 flex flex-col overflow-hidden"
        >
          {/* Sidebar - Visible when no chat is active */}
          <div className={cn(
            "h-full w-full bg-background",
            activeContactId ? "hidden" : "flex"
          )}>
            <MessengerSidebar 
              contacts={contacts} 
              activeContactId={activeContactId || undefined} 
              onSelectContact={setActiveContactId}
              onClose={() => setIsOpen(false)}
            />
          </div>

          {/* Chat Area - Visible when chat is active */}
          <div className={cn(
            "h-full w-full bg-background",
            !activeContactId ? "hidden" : "flex flex-col"
          )}>
            {activeContactId && activeContact && (
              <MessengerChatArea
                contact={activeContact}
                messages={messages[activeContactId] || []}
                onBack={() => setActiveContactId(null)}
                onSendMessage={sendMessage}
                isMobile={true} 
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

