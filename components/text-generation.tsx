"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function TextGeneration() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [reasoning, setReasoning] = useState("")
  const [loading, setLoading] = useState(false)
  const [showReasoning, setShowReasoning] = useState(false)
  const [extendedThinking, setExtendedThinking] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult("")
    setReasoning("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          extendedThinking,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate text")
      }

      const data = await response.json()
      setResult(data.text)
      if (data.reasoning) {
        setReasoning(data.reasoning)
      }
    } catch (error) {
      console.error("Error:", error)
      setResult("An error occurred while generating text.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Text Generation with Claude</CardTitle>
        <CardDescription>Generate text using Claude 3.7 Sonnet with optional extended thinking</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-32"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="extended-thinking" checked={extendedThinking} onCheckedChange={setExtendedThinking} />
            <Label htmlFor="extended-thinking">Enable extended thinking</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Text"
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Result</h3>
                {reasoning && (
                  <div className="flex items-center space-x-2">
                    <Switch id="show-reasoning" checked={showReasoning} onCheckedChange={setShowReasoning} />
                    <Label htmlFor="show-reasoning">Show reasoning</Label>
                  </div>
                )}
              </div>
              <div className="rounded-md bg-muted p-4 whitespace-pre-wrap">{result}</div>
            </div>

            {reasoning && showReasoning && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Reasoning</h3>
                <div className="rounded-md bg-muted p-4 whitespace-pre-wrap text-sm">{reasoning}</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
