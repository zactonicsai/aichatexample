import { anthropic, type AnthropicProviderOptions } from "@ai-sdk/anthropic"
import { streamText } from "ai"
import { searchRecipes, formatRecipeAsContext } from "@/utils/recipe-search"

export async function POST(req: Request) {
  try {
    const { messages, extendedThinking } = await req.json()

    // Get the latest user message
    const latestUserMessage = messages.filter((msg: any) => msg.role === "user").pop()?.content || ""

    // Search for relevant recipes based on the latest user message
    const relevantRecipes = searchRecipes(latestUserMessage, 2)

    // Format recipes as context
    const recipeContext = relevantRecipes.map(formatRecipeAsContext).join("\n\n")

    // Create a system prompt that instructs the model to use only the provided recipes
    const systemPrompt = `You are a helpful assistant that provides information ONLY about vegan black bean recipes.
You have access to the following recipes:

${recipeContext}

Only answer questions based on these recipes. If you're asked about something not covered in these recipes, 
politely explain that you can only provide information about the vegan black bean recipes you know about.
Do not make up information or recipes that aren't included above.`

    // Configure provider options for extended thinking if enabled
    const providerOptions: { anthropic?: AnthropicProviderOptions } = {}

    if (extendedThinking) {
      providerOptions.anthropic = {
        thinking: { type: "enabled", budgetTokens: 12000 },
      } as AnthropicProviderOptions
    }

    const response = streamText({
      model: anthropic("claude-3-7-sonnet-20250219"),
      system: systemPrompt,
      messages,
      providerOptions,
    })

    return response.toResponse()
  } catch (error) {
    console.error("Error in chat:", error)
    return Response.json({ error: "Failed to process chat" }, { status: 500 })
  }
}
