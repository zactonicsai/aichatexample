import { veganBlackBeanRecipes } from "@/data/recipes"

// Simple search function that looks for keyword matches
export function searchRecipes(query: string, limit = 3) {
  const queryTerms = query.toLowerCase().split(" ")

  // Score each recipe based on how many query terms it contains
  const scoredRecipes = veganBlackBeanRecipes.map((recipe) => {
    const recipeText = `
      ${recipe.title.toLowerCase()}
      ${recipe.ingredients.join(" ").toLowerCase()}
      ${recipe.instructions.join(" ").toLowerCase()}
      ${recipe.tags.join(" ").toLowerCase()}
    `

    let score = 0
    for (const term of queryTerms) {
      if (recipeText.includes(term)) {
        score += 1
      }
    }

    return { recipe, score }
  })

  // Sort by score and return the top results
  return scoredRecipes
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.recipe)
}

// Function to format recipe as context for the AI
export function formatRecipeAsContext(recipe: any) {
  return `
Recipe: ${recipe.title}

Ingredients:
${recipe.ingredients.map((ing: string) => `- ${ing}`).join("\n")}

Instructions:
${recipe.instructions.map((step: string, i: number) => `${i + 1}. ${step}`).join("\n")}

Nutrition (per ${recipe.nutritionInfo.servingSize}):
- Calories: ${recipe.nutritionInfo.calories}
- Protein: ${recipe.nutritionInfo.protein}
- Fiber: ${recipe.nutritionInfo.fiber}

Prep Time: ${recipe.prepTime}
Cook Time: ${recipe.cookTime}
Total Time: ${recipe.totalTime}
Servings: ${recipe.servings}

Tags: ${recipe.tags.join(", ")}
`
}
