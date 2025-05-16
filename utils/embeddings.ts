import { OpenAIEmbeddings } from "langchain/embeddings/openai"

// This is a simplified version - in a real app, you'd use a vector database
// Here we're using in-memory vectors for demonstration
const recipeEmbeddings: { id: string; title: string; content: string; embedding: number[] }[] = []

const embedder = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

export async function initializeEmbeddings(recipes: any[]) {
  if (recipeEmbeddings.length > 0) return // Already initialized

  for (const recipe of recipes) {
    const content = `
      Title: ${recipe.title}
      Ingredients: ${recipe.ingredients.join(", ")}
      Instructions: ${recipe.instructions.join(" ")}
      Tags: ${recipe.tags.join(", ")}
    `

    try {
      const embedding = await embedder.embedQuery(content)
      recipeEmbeddings.push({
        id: recipe.id,
        title: recipe.title,
        content,
        embedding,
      })
    } catch (error) {
      console.error(`Error embedding recipe ${recipe.id}:`, error)
    }
  }

  console.log(`Initialized ${recipeEmbeddings.length} recipe embeddings`)
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magA * magB)
}

export async function findSimilarRecipes(query: string, topK = 3) {
  const queryEmbedding = await embedder.embedQuery(query)

  // Calculate similarity scores
  const scoredRecipes = recipeEmbeddings.map((recipe) => ({
    ...recipe,
    score: cosineSimilarity(queryEmbedding, recipe.embedding),
  }))

  // Sort by similarity score and take top K
  return scoredRecipes.sort((a, b) => b.score - a.score).slice(0, topK)
}
