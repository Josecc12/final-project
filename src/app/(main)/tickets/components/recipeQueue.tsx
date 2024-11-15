import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, FormProvider } from "react-hook-form"
import { useSearchParams } from 'next/navigation'
import RecipeProcessForm from './RecipeProcessForm'
import type { Recipe } from '@/app/types/models'
import deleteRecipe from '@/actions/recipe/delete'
import confirm from '@/actions/recipe/confirm'

interface RecipeQueueProps {
  initialRecipes: Recipe[]
}

export function RecipeQueue({ initialRecipes }: RecipeQueueProps) {
  const searchParams = useSearchParams()
  const [queue, setQueue] = useState<Recipe[]>([])
  const [processing, setProcessing] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  const form = useForm()

  // Efecto para actualizar el queue cuando cambien los parámetros de búsqueda o initialRecipes
  useEffect(() => {
    // Filtrar las recetas basado en los query params
    let filteredRecipes = [...initialRecipes]
    
    // Aquí puedes agregar la lógica específica de filtrado según tus queryParams
    // Por ejemplo:
    const fecha = searchParams.get('fecha')
    const doctor = searchParams.get('doctor')
    
    if (fecha) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        const recipeDate = new Date(recipe.createdAt).toLocaleDateString()
        return recipeDate === fecha
      })
    }

    if (doctor) {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.user.name.toLowerCase().includes(doctor.toLowerCase())
      )
    }

    // Aplicar el filtro de estado "Pendiente"
    filteredRecipes = filteredRecipes.filter(recipe => recipe.estado === "Pendiente")
    
    setQueue(filteredRecipes)
  }, [searchParams, initialRecipes]) // Dependencias del efecto

  const processRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
  }

  const onSubmitEdit = async () => {
    if (!editingRecipe) return
    
    setProcessing(true)
    console.log('Procesando receta:', editingRecipe)
    
    try {
      const response = await confirm(editingRecipe.id)
      if (response.status !== 200 || !("data" in response)) {
        console.error('Error al procesar receta:', response)
        return
      }

      // Actualizar el estado con los datos procesados
      setEditingRecipe(response.data)
      
      // Actualizar el queue para reflejar el nuevo estado
      setQueue(prevQueue => prevQueue.map(recipe => 
        recipe.id === editingRecipe.id ? response.data : recipe
      ))
    } catch (error) {
      console.error('Error durante el procesamiento:', error)
    } finally {
      setProcessing(false)
      // Ya no cerramos el diálogo aquí
      // setEditingRecipe(null) <- Removemos esta línea
    }
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
                    onClick={async () => {
                      await deleteRecipe({ id: recipe.id })
                      setQueue(prevQueue => prevQueue.filter(r => r.id !== recipe.id))
                    }}
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