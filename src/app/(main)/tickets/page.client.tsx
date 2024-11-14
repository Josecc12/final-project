'use client'

import { RecipeQueue } from './components/recipeQueue'
import type { Recipe } from '@/app/types/models'

interface RecipeQueueClientProps {
  initialRecipes: Recipe[]
}

export default function RecipeQueueClient({ initialRecipes }: RecipeQueueClientProps) {
  return (
    <RecipeQueue initialRecipes={initialRecipes} />
  )
}