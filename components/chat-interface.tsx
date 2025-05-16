"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send, User, Bot } from "lucide-react"
import { useChat } from "ai/react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatInterface() {
  const [extendedThinking, setExtendedThinking] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      extendedThinking,
    },
  })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat with Claude</CardTitle>
        <CardDescription>Have a conversation with Claude 3.7 Sonnet</CardDescription>
        <div className="flex items-center space-x-2 mt-2">
          <Switch id="chat-extended-thinking" checked={extendedThinking} onCheckedChange={setExtendedThinking} />
          <Label htmlFor="chat-extended-thinking">Enable extended thinking</Label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto p-2">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">Start a conversation with Claude</div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  } rounded-lg p-3`}
                >
                  <div className="mt-0.5">
                    {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input placeholder="Type your message..." value={input} onChange={handleInputChange} disabled={isLoading} />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
