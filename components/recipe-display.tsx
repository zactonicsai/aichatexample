import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecipeDisplayProps {
  recipe: {
    id: string
    title: string
    ingredients: string[]
    instructions: string[]
    nutritionInfo: {
      calories: number
      protein: string
      fiber: string
      servingSize: string
    }
    prepTime: string
    cookTime: string
    totalTime: string
    servings: number
    tags: string[]
  }
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="text-sm font-medium">Prep Time</h4>
            <p>{recipe.prepTime}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Cook Time</h4>
            <p>{recipe.cookTime}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Total Time</h4>
            <p>{recipe.totalTime}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Servings</h4>
            <p>{recipe.servings}</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-md">
          <h3 className="text-sm font-medium mb-1">Nutrition (per {recipe.nutritionInfo.servingSize})</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-sm">Calories: {recipe.nutritionInfo.calories}</p>
            </div>
            <div>
              <p className="text-sm">Protein: {recipe.nutritionInfo.protein}</p>
            </div>
            <div>
              <p className="text-sm">Fiber: {recipe.nutritionInfo.fiber}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
