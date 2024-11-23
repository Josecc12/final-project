import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm, FormProvider } from "react-hook-form"
import { useSearchParams } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import RecipeProcessForm from './RecipeProcessForm'
import type { Recipe } from '@/app/types/models'
import deleteRecipe from '@/actions/recipe/delete'
import confirm from '@/actions/recipe/confirm'
import { ErrorResponse } from "@/app/types/api";
import Delete from "@/components/ui/delete";
interface RecipeQueueProps {
  initialRecipes: Recipe[]
}

export function RecipeQueue({ initialRecipes }: RecipeQueueProps) {
  const searchParams = useSearchParams()
  const [queue, setQueue] = useState<Recipe[]>([])
  const [processing, setProcessing] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const { toast } = useToast()

  const form = useForm()

  useEffect(() => {
    let filteredRecipes = [...initialRecipes]
    
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

    filteredRecipes = filteredRecipes.filter(recipe => recipe.estado === "Pendiente")
    
    setQueue(filteredRecipes)
  }, [searchParams, initialRecipes])

  const processRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
  }

  const handleDelete = async (recipeId: string) => {
    try {
      await deleteRecipe({ id: recipeId })
      setQueue(prevQueue => prevQueue.filter(r => r.id !== recipeId))
      toast({
        title: "Receta eliminada",
        description: "La receta se ha eliminado correctamente",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar la receta. Por favor, intente nuevamente.",
        variant: "destructive",
      })
    }
  }

  const onSubmitEdit = async () => {
    if (!editingRecipe) return
    
    setProcessing(true)
    
    try {
      const response = await confirm(editingRecipe.id)
      
      if (response?.status === 201) {
        toast({
          title: "la receta ha sido procesada",
          description: `la receta ha sido procesada exitosamente`,
          variant: "default",
          duration: 3000,
        });
        setProcessing(true)
      } else if (response?.status === 404) {
        toast({
          title: "Error",
          description: "no hay insumos para procesar la receta",
          variant: "destructive",
          duration: 3000,
        });
        setProcessing(false)
      } else if ("message" in response) {
        toast({
          duration: 3000,
          title: `Error ${response.status}`,
          description: (response as ErrorResponse).message,
          variant: "destructive",
        });
        setProcessing(false)
      }

    } catch (error) {
      toast({
        title: "Error al procesar la receta",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado al procesar la receta",
        variant: "destructive",
      })
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
                  <Delete onDelete={() => handleDelete(recipe.id)} />
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