"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Brain, BookOpen, Calendar, Users, Lightbulb, Zap } from "lucide-react"

interface ChatMessage {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  suggestions?: string[]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI study assistant. I can help you with studying, scheduling, finding resources, and connecting with other students. What would you like to work on today?",
      isUser: false,
      timestamp: new Date(),
      suggestions: ["Help me study", "Schedule my tasks", "Find study groups", "Explain a concept"],
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const quickActions = [
    { icon: BookOpen, label: "Study Help", action: "I need help understanding a concept" },
    { icon: Calendar, label: "Schedule", action: "Help me organize my schedule" },
    { icon: Users, label: "Study Groups", action: "Find me a study group" },
    { icon: Brain, label: "Quiz Me", action: "Create a quiz for me" },
    { icon: Lightbulb, label: "Study Tips", action: "Give me study tips" },
    { icon: Zap, label: "Quick Summary", action: "Summarize my notes" },
  ]

  const sendMessage = (content?: string) => {
    const messageContent = content || inputValue
    if (!messageContent.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(messageContent),
        isUser: false,
        timestamp: new Date(),
        suggestions: generateSuggestions(messageContent),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputValue("")
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("study") || lowerMessage.includes("learn")) {
      return "I'd be happy to help you study! I can create summaries, generate quizzes, explain concepts, or suggest study techniques. What subject are you working on?"
    } else if (lowerMessage.includes("schedule") || lowerMessage.includes("time")) {
      return "Let me help you organize your schedule! I can help you prioritize tasks, set study blocks, create reminders, and balance your academic workload. What do you need to schedule?"
    } else if (lowerMessage.includes("group") || lowerMessage.includes("connect")) {
      return "I can help you find study groups and connect with other students! Based on your courses, I can suggest relevant study groups or help you create one. What subject are you looking for?"
    } else if (lowerMessage.includes("quiz") || lowerMessage.includes("test")) {
      return "I can create custom quizzes for you! Just upload your study materials or tell me the topic, and I'll generate questions to test your knowledge. What would you like to be quizzed on?"
    } else if (lowerMessage.includes("tip") || lowerMessage.includes("advice")) {
      return "Here are some effective study tips: 1) Use active recall instead of just re-reading, 2) Practice spaced repetition, 3) Take regular breaks (Pomodoro technique), 4) Teach concepts to others, 5) Create mind maps for complex topics. Which area would you like more specific advice on?"
    } else {
      return "I understand you're asking about that topic. I'm here to help with your studies, scheduling, finding resources, and academic planning. Could you tell me more specifically how I can assist you today?"
    }
  }

  const generateSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("study")) {
      return [
        "Create a study plan",
        "Generate practice questions",
        "Explain difficult concepts",
        "Find study resources",
      ]
    } else if (lowerMessage.includes("schedule")) {
      return ["Set up study blocks", "Prioritize assignments", "Create reminders", "Balance workload"]
    } else if (lowerMessage.includes("group")) {
      return ["Find math study groups", "Create a new group", "Join existing groups", "Connect with classmates"]
    } else {
      return ["Help me study", "Organize my schedule", "Find study partners", "Create a quiz"]
    }
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">Your personal AI study companion</p>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => sendMessage(action.action)}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start space-x-3 max-w-[80%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{message.isUser ? "U" : "AI"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`p-3 rounded-xl ${
                          message.isUser ? "bg-blue-500 text-white" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.suggestions && (
                          <div className="mt-3 space-y-1">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="h-auto p-1 text-xs bg-white/20 hover:bg-white/30"
                                onClick={() => sendMessage(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about your studies..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={() => sendMessage()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Smart Study Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get explanations, create study plans, and receive personalized learning recommendations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Organize your time effectively with AI-powered scheduling and task prioritization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Social Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Find study partners, join groups, and connect with tutors based on your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
