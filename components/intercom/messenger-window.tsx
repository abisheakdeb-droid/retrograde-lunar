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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/20 backdrop-blur-[1px] z-9998 pointer-events-auto"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-screen md:w-[700px] lg:w-[900px] bg-background border-l border-border shadow-2xl z-9999 flex flex-col md:flex-row pointer-events-auto"
          >
            {/* Sidebar - Collapses on mobile when chat is active */}
            <div className={cn(
              "h-full w-full md:w-[260px] lg:w-[300px] border-r border-border/40 shrink-0 bg-muted",
              activeContactId ? "hidden md:flex" : "flex"
            )}>
              <MessengerSidebar 
                contacts={contacts} 
                activeContactId={activeContactId || undefined} 
                onSelectContact={setActiveContactId}
                onClose={() => setIsOpen(false)}
              />
            </div>

            {/* Chat Area */}
            <div className={cn(
              "h-full flex-1 min-w-0 bg-background",
              !activeContactId ? "hidden md:flex items-center justify-center" : "flex flex-col"
            )}>
              {activeContactId && activeContact ? (
                <MessengerChatArea
                  contact={activeContact}
                  messages={messages[activeContactId] || []}
                  onBack={() => setActiveContactId(null)}
                  onSendMessage={sendMessage}
                  isMobile={true} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-muted/20 flex items-center justify-center rotate-3">
                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Select a thread</h3>
                    <p className="text-sm text-muted-foreground/80 max-w-[200px] mx-auto mt-1">
                      Choose a contact from the list to start messaging.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

