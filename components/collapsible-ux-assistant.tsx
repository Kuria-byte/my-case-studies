"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, ChevronDown, Star, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Typing animation component
const TypingAnimation = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 40) // Speed of typing
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])
  
  return (
    <span>{displayedText}<span className="animate-pulse">|</span></span>
  )
}

export function CollapsibleUXAssistant() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([
    { role: "assistant", content: "Hi! I'm your UX assistant. Ask me about the case studies or UX process." }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [typingMessage, setTypingMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isExpanded) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [chat, isExpanded])

  const handleSend = () => {
    if (!message.trim()) return

    // Add user message
    setChat(prev => [...prev, { role: "user", content: message }])

    // Simulate assistant typing
    setIsTyping(true)
    setTypingMessage("Thanks for your message! I can help you understand the UX process and methodologies used in these case studies.")
    
    // Simulate assistant response after typing
    setTimeout(() => {
      setIsTyping(false)
      setChat(prev => [...prev, {
        role: "assistant",
        content: "Thanks for your message! I can help you understand the UX process and methodologies used in these case studies."
      }])
    }, 2000)

    setMessage("")
  }

  // Star rotation animation variants
  const starVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  // Sparkle animation variants
  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  }

  return (
    <Card className="overflow-hidden border-border shadow-lg">
      <CardHeader
        className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-full bg-gradient-to-br from-[#118AB2] to-[#06D6A0]">
              <motion.div
                variants={starVariants}
                animate="rotate"
                className="relative z-10"
              >
                <Star className="h-4 w-4 text-white" />
              </motion.div>
              <motion.div 
                variants={sparkleVariants}
                animate="animate"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#118AB2]/30 to-[#06D6A0]/30 blur-sm"
              />
            </div>
            <div>
              <CardTitle className="text-base font-medium text-white">UX Assistant</CardTitle>
              {!isExpanded && (
                <div className="text-xs text-gray-300 mt-0.5 font-light">
                  <TypingAnimation text="How can I help you today?" />
                </div>
              )}
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <ChevronDown className="h-4 w-4 text-gray-300" />
          </motion.div>
        </div>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="p-4 bg-gradient-to-b from-zinc-900/50 to-background/95 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="h-[240px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {chat.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                          msg.role === "user"
                            ? "bg-gradient-to-r from-[#06D6A0] to-[#06D6A0]/90 text-white"
                            : "bg-zinc-800 text-gray-100 border border-zinc-700/50"
                        )}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-zinc-800 text-gray-100 border border-zinc-700/50 shadow-sm">
                        <TypingAnimation text={typingMessage} />
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
                <div className="flex gap-2 pt-2 border-t border-zinc-800/50">
                  <Input
                    placeholder="Ask about UX process..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 bg-zinc-800/50 border-zinc-700 text-gray-200 placeholder:text-gray-500 focus-visible:ring-[#118AB2]"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-[#118AB2] to-[#06D6A0] hover:opacity-90 text-white shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
