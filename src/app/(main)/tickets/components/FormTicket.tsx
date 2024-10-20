'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import SelectSearchBar from "@/components/navigation/SelectSearchBar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Insumo, Patient } from "@/app/types/models"

// Esquema de validación
const formSchema = z.object({
  pacienteId: z.string().min(1, 'El paciente es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  insumos: z.array(z.object({
    id: z.string(),
    cantidad: z.number().min(1, 'La cantidad debe ser al menos 1'),
    intervalo: z.number().min(1, 'El intervalo debe ser al menos 1'),
    duracion: z.number().min(1, 'La duración debe ser al menos 1'),
  })).min(1, 'Debe seleccionar al menos un insumo'),
})

type Props = {
  insumos: Insumo[]
  pacientes: Patient[]
}

export default function FormTicket({ insumos, pacientes }: Props) {
  const [insumosSeleccionados, setInsumosSeleccionados] = useState<(Insumo & { cantidad: number; intervalo: number; duracion: number })[]>([])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descripcion: '',
      insumos: [],
      pacienteId: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Receta enviada:', { ...values, insumosSeleccionados })
  }

  const handleInsumoSelect = (insumo: Insumo) => {
    if (!insumosSeleccionados.some((i) => i.id === insumo.id)) {
      const updatedInsumos = [...insumosSeleccionados, { ...insumo, cantidad: 1, intervalo: 8, duracion: 1 }]
      setInsumosSeleccionados(updatedInsumos)
      form.setValue('insumos', updatedInsumos, { shouldValidate: true })
    }
  }

  const handleInsumoChange = (id: string, field: string, value: number) => {
    const updatedInsumos = insumosSeleccionados.map((insumo) =>
      insumo.id === id ? { ...insumo, [field]: value } : insumo
    )
    setInsumosSeleccionados(updatedInsumos)
    form.setValue('insumos', updatedInsumos, { shouldValidate: true })
  }

  const handleInsumoRemove = (insumoId: string) => {
    const updatedInsumos = insumosSeleccionados.filter((i) => i.id !== insumoId)
    setInsumosSeleccionados(updatedInsumos)
    form.setValue('insumos', updatedInsumos, { shouldValidate: true })
  }

  const handlePacienteSelect = (pacienteId: string) => {
    form.setValue('pacienteId', pacienteId, { shouldValidate: true })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Receta Médica</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Campo Paciente */}
            <FormField
              control={form.control}
              name="pacienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <FormControl>
                    <SelectSearchBar
                      items={pacientes}
                      onSelect={(paciente) => handlePacienteSelect(paciente.id)}
                      getLabel={(paciente) => paciente.nombre}
                      getDescription={(paciente) => `CUI: ${paciente.cui} | Fecha de nacimiento: ${paciente.nacimiento}`}
                      placeholder="Buscar paciente por nombre o CUI"
                      filterFn={(paciente, query) =>
                        paciente.nombre.toLowerCase().includes(query) ||
                        paciente.cui.toLowerCase().includes(query)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Descripción */}
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la descripción de la receta"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tabla de Insumos */}
            <FormItem>
              <FormLabel>Insumos</FormLabel>
              <SelectSearchBar
                items={insumos}
                onSelect={(insumo) => handleInsumoSelect(insumo)}
                getLabel={(insumo) => insumo.nombre}
                getDescription={(insumo) => `Código: ${insumo.codigo} | Categoría: ${insumo.categoria.nombre}`}
                placeholder="Buscar insumo por nombre o código..."
                filterFn={(insumo, query) =>
                  insumo.nombre.toLowerCase().includes(query) ||
                  insumo.codigo.toLowerCase().includes(query)
                }
              />
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Horas</TableHead>
                    <TableHead>Duración (días)</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insumosSeleccionados.map((insumo) => (
                    <TableRow key={insumo.id}>
                      <TableCell>{insumo.nombre}</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          min="1"
                          value={insumo.cantidad}
                          onChange={(e) => handleInsumoChange(insumo.id, 'cantidad', parseInt(e.target.value, 10))}
                          className="w-16 border rounded p-1"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          min="1"
                          value={insumo.intervalo}
                          onChange={(e) => handleInsumoChange(insumo.id, 'intervalo', parseInt(e.target.value, 10))}
                          className="w-16 border rounded p-1"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          min="1"
                          value={insumo.duracion}
                          onChange={(e) => handleInsumoChange(insumo.id, 'duracion', parseInt(e.target.value, 10))}
                          className="w-16 border rounded p-1"
                        />
                      </TableCell>
                      <TableCell>{insumo.cantidad * (24/insumo.intervalo)*insumo.duracion}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleInsumoRemove(insumo.id)}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </FormItem>

            <CardFooter className="flex justify-end">
              <Button type="submit">Guardar Receta</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
