"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TextGeneration from "@/components/text-generation"
import ChatInterface from "@/components/chat-interface"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Claude AI with AI SDK</h1>
          <p className="mt-2 text-muted-foreground">Using custom vegan black bean recipe data</p>
          <Link href="/recipes" className="mt-4 inline-block">
            <Button variant="outline">Browse Recipes</Button>
          </Link>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Text Generation</TabsTrigger>
            <TabsTrigger value="chat">Chat Interface</TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <TextGeneration />
          </TabsContent>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
