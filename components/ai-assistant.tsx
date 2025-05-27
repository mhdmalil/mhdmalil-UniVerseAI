"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send } from "lucide-react"
import { usePathname } from "next/navigation"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const pathname = usePathname()

  const getContextualSuggestion = () => {
    switch (pathname) {
      case "/learn-hub":
        return "Would you like help uploading a file or understanding a concept?"
      case "/quizzer":
        return "Need help creating a quiz or understanding quiz results?"
      case "/tasks":
        return "Want to add a task or set up your schedule?"
      case "/insights":
        return "Looking for study tips or GPA improvement strategies?"
      case "/campus-connect":
        return "Need help finding study groups or connecting with tutors?"
      default:
        return "How can I assist you with your studies today?"
    }
  }

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputValue}". ${getContextualSuggestion()} Let me help you with that!`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputValue("")
  }

  const quickReplies = ["Explain this feature", "Help me get started", "Study tips", "Schedule help"]

  return (
    <>
      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg transition-all duration-200 hover:scale-110 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Bubble */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 shadow-xl z-40 transition-all duration-300 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        message.isUser ? "bg-blue-500 text-white" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInputValue(reply)
                      setTimeout(() => sendMessage(), 100)
                    }}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
