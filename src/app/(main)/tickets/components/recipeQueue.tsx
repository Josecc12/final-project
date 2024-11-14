// components/RecipeQueue.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import RecipeProcessForm from './RecipeProcessForm'
import type { Recipe } from '@/app/types/models'

const schema = z.object({
  descripcion: z.string().min(1, "El motivo es requerido"),
  insumos: z.array(
    z.object({
      cantidad: z.number().min(1, "La cantidad mínima es 1"),
      insumo: z.string().min(1, 'Selecciona un insumo'),
    })
  ),
})

type FormInputs = z.infer<typeof schema>;

interface RecipeQueueProps {
  initialRecipes: Recipe[]
}

export function RecipeQueue({ initialRecipes }: RecipeQueueProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [queue, setQueue] = useState<Recipe[]>([])
  const [processing, setProcessing] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  
  const form = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      descripcion: '',
      insumos: []
    }
  })

  const addToQueue = (recipe: Recipe) => {
    // En lugar de agregar directamente a la cola, abrimos el formulario de edición
    setEditingRecipe(recipe)
    
    // Establecemos los valores iniciales del formulario
    form.reset({
      descripcion: recipe.description,
      insumos: recipe.insumos.map(insumo => ({
        cantidad: insumo.cantidad,
        insumo: insumo.id
      }))
    })
  }

  const onSubmitEdit = async (data: FormInputs) => {
    if (!editingRecipe) return

    // Creamos una nueva versión de la receta con los datos actualizados
    const updatedRecipe = {
      ...editingRecipe,
      descripcion: data.descripcion,
      insumos: data.insumos.map((item, index) => ({
        ...editingRecipe.insumos[index],
        cantidad: item.cantidad,
      }))
    }

    console.log('Receta procesada:', updatedRecipe)
    
    // Agregamos la receta actualizada a la cola
    setQueue(prevQueue => [...prevQueue, updatedRecipe])
    
    // Cerramos el diálogo de edición
    setEditingRecipe(null)
  }

  const processQueue = async () => {
    if (processing || queue.length === 0) return

    setProcessing(true)
    const currentRecipe = queue[0]
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log("Procesando receta:", currentRecipe)

    setQueue(prevQueue => prevQueue.slice(1))
    setProcessing(false)

    if (queue.length > 1) {
      processQueue()
    }
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Recetas Disponibles</h2>
            {recipes.map(recipe => (
              <Card key={recipe.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{recipe.paciente.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Lo atendio: {recipe.user.name}</p>
                  <p>Estado: {recipe.estado}</p>
                  <Button onClick={() => addToQueue(recipe)} className="mt-2">
                    Agregar a la Cola
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Cola de Procesamiento</h2>
            {queue.map((recipe, index) => (
              <Card key={`${recipe.id}-${index}`} className="mb-4">
                <CardHeader>
                  <CardTitle>{recipe.description}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Paciente: {recipe.paciente.nombre}</p>
                  <p>Estado: {recipe.estado}</p>
                  <div className="mt-2">
                    <h3 className="font-medium">Insumos a entregar:</h3>
                    <ul className="list-disc pl-5">
                      {recipe.insumos.map(insumo => (
                        <li key={insumo.id}>
                          {insumo.nombre}: {insumo.cantidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              onClick={processQueue} 
              disabled={processing || queue.length === 0}
            >
              {processing ? 'Procesando...' : 'Procesar Cola'}
            </Button>
          </div>
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