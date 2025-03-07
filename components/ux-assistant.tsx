"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, MessageSquare, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "@/components/theme-provider"

export function UXAssistant() {
  const { theme } = useTheme()
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", content: "Hi there! I'm Kuria's UX Assistant. How can I help you today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const chatEndRef = useRef(null)

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    setChatMessages((prev) => [...prev, { role: "user", content: inputMessage }])

    // Simulate bot response based on user input
    setTimeout(() => {
      let botResponse = ""

      if (inputMessage.toLowerCase().includes("market force")) {
        botResponse =
          "Market Force is a digital wallet & reconciliation platform for financial institutions in emerging markets. The project achieved a 78% increase in efficiency and 92% reduction in errors."
      } else if (inputMessage.toLowerCase().includes("process") || inputMessage.toLowerCase().includes("methodology")) {
        botResponse =
          "My UX process typically involves discovery (user research, stakeholder interviews), definition (personas, journey maps), design (wireframes, prototypes), and validation (usability testing, iteration)."
      } else if (inputMessage.toLowerCase().includes("contact") || inputMessage.toLowerCase().includes("hire")) {
        botResponse = "You can contact Kuria at hello@kuria.design to discuss potential projects or collaborations."
      } else if (inputMessage.toLowerCase().includes("tools") || inputMessage.toLowerCase().includes("software")) {
        botResponse =
          "I primarily use Figma for design, Maze for usability testing, and various prototyping tools depending on the project needs."
      } else {
        botResponse =
          "Thanks for your message! Feel free to ask about my UX process, specific case studies, or design methodology."
      }

      setChatMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 1000)

    setInputMessage("")
  }

  useEffect(() => {
    // Scroll to bottom of chat when messages change
    if (!isCollapsed) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages, isCollapsed])

  return (
    <Card className="overflow-hidden border-border">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Kuria" />
            <AvatarFallback className="bg-primary text-primary-foreground">K</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">UX Assistant</CardTitle>
            <CardDescription className="text-xs">Ask me anything about UX</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-0">
              <div className="flex flex-col h-[400px]">
                <ScrollArea className="flex-1 px-4 py-2">
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-start gap-3 max-w-[80%]">
                          {message.role === "bot" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder-user.jpg" alt="Kuria" />
                              <AvatarFallback className="bg-primary text-primary-foreground">K</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg p-3 text-sm ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : theme === "dark"
                                  ? "bg-muted"
                                  : "bg-muted"
                            }`}
                          >
                            {message.content}
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-[#118AB2] text-white">U</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
                <div className="flex gap-2 p-4 border-t border-border">
                  <Input
                    placeholder="Ask about my UX process, case studies, or methodology..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      {isCollapsed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pb-4 pt-0">
          <Button variant="outline" className="w-full gap-2" onClick={() => setIsCollapsed(false)}>
            <MessageSquare className="h-4 w-4" />
            Open Chat
          </Button>
        </motion.div>
      )}
    </Card>
  )
}

