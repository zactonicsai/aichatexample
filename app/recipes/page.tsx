"use client"

import { useState } from "react"
import { veganBlackBeanRecipes } from "@/data/recipes"
import RecipeDisplay from "@/components/recipe-display"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState(veganBlackBeanRecipes[0])

  const filteredRecipes = searchTerm
    ? veganBlackBeanRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : veganBlackBeanRecipes

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Vegan Black Bean Recipes</h1>
          <Link href="/">
            <Button variant="outline">Back to AI Chat</Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {filteredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className={`cursor-pointer hover:bg-muted transition-colors ${
                    selectedRecipe.id === recipe.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium">{recipe.title}</h3>
                    <p className="text-sm text-muted-foreground">{recipe.tags.slice(0, 3).join(", ")}</p>
                  </CardContent>
                </Card>
              ))}

              {filteredRecipes.length === 0 && <p className="text-center py-4">No recipes found</p>}
            </div>
          </div>

          <div className="lg:col-span-2">
            <RecipeDisplay recipe={selectedRecipe} />
          </div>
        </div>
      </div>
    </main>
  )
}
