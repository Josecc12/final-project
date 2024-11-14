import { Suspense } from 'react'
import LayoutSection from "@/components/LayoutSection"
import RecipeQueueClient from './page.client'
import findAll from "@/actions/recipe/findAll"

export default async function Page() {
  'use server'
  
  const response = await findAll()

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch recipes data")
  }

  return (
    <LayoutSection
      title="Cola de Recetas"
      description="Gestiona y procesa las recetas de tus pacientes."
    >
      <Suspense fallback={<div>Cargando...</div>}>
        <RecipeQueueClient initialRecipes={response.data} />
      </Suspense>
    </LayoutSection>
  )
}
