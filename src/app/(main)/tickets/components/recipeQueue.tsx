import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, FormProvider } from "react-hook-form"
import RecipeProcessForm from './RecipeProcessForm'
import type { Recipe } from '@/app/types/models'
import deleteRecipe from '@/actions/recipe/delete'
interface RecipeQueueProps {
  initialRecipes: Recipe[]
}

export function RecipeQueue({ initialRecipes }: RecipeQueueProps) {
  const [queue, setQueue] = useState<Recipe[]>(initialRecipes)
  const [processing, setProcessing] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  const form = useForm()

  const processRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
  }

  const onSubmitEdit = async () => {
    if (!editingRecipe) return

    console.log('Procesando receta:', editingRecipe)
    setProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setProcessing(false)

    setQueue(prevQueue => prevQueue.filter(recipe => recipe.id !== editingRecipe.id))
    setEditingRecipe(null)
  }


  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {queue.map(recipe => (
            <Card key={recipe.id} className="mb-4">
              <CardHeader>
                <CardTitle>{recipe.paciente.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lo atendio: {recipe.user.name}</p>
                <p>Estado: {recipe.estado}</p>
                <div className="flex justify-between">
                  <Button onClick={() => processRecipe(recipe)} className="mt-2">
                    Procesar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteRecipe({ id: recipe.id })}
                    className="mt-2"
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={editingRecipe !== null} onOpenChange={() => setEditingRecipe(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Procesar Entrega de Insumos</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)}>
              <RecipeProcessForm
                recipe={editingRecipe}
                onCancel={() => setEditingRecipe(null)}
                isProcessing={processing}
              />
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}