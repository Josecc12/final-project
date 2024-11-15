'use client'

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

import findOne from '@/actions/laboratory/findOne'
import create from '@/actions/order/create'
import DropdownLaboratory from "@/components/DropdownLaboratory"
import LayoutSection from "@/components/LayoutSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Typography } from "@/components/ui/Typography"
import { Test } from '@/app/types/models'

type Props = {
  pacienteId: string
  usuarioId: string
}

export default function PageClient({ pacienteId, usuarioId }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const [laboratoryDetails, setLaboratoryDetails] = useState<Test | null>(null)
  const [formData, setFormData] = useState({
    laboratory: "",
    descripcion: "",
    estado: "PENDIENTE"
  })
  const [errors, setErrors] = useState({
    laboratory: "",
    descripcion: ""
  })

  useEffect(() => {
    const fetchLaboratoryDetails = async () => {
      if (formData.laboratory) {
        try {
          const response = await findOne(formData.laboratory)
          if (response.status === 200 && "data" in response) {
            setLaboratoryDetails(response.data)
          } else {
            throw new Error("No se pudo obtener los detalles del laboratorio")
          }
        } catch (error) {
          console.error("Error fetching laboratory details:", error)
          setLaboratoryDetails(null)
          toast({
            title: "Error",
            description: "No se pudo cargar los detalles del laboratorio",
            variant: "destructive"
          })
        }
      }
    }

    fetchLaboratoryDetails()
  }, [formData.laboratory, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    
    if (!laboratoryDetails?.id) {
      toast({
        title: "Error",
        description: "Debe seleccionar un laboratorio válido",
        variant: "destructive"
      })
      return
    }

    try {
      const orderDto = {
        descripcion: formData.descripcion,
        estado: formData.estado,
        examenId: laboratoryDetails.id,
        pacienteId,
        usuarioId
      }

      const response = await create(orderDto)

      if ('data' in response) {
        toast({
          title: "Orden creada exitosamente",
          duration: 3000
        })
        router.push("/laboratory")
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al crear la orden",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al crear la orden",
        variant: "destructive"
      })
    }
  }

  return (
    <LayoutSection
      title="Nueva orden de laboratorio"
      description="Selecciona un laboratorio para solicitar insumos"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-8">
          <div className="w-full">
            <DropdownLaboratory
              name="laboratory"
              setValue={(name: string, value: string) => {
                setFormData(prev => ({ ...prev, [name]: value }))
              }}
              placeholder="Selecciona un laboratorio"
            />
            {errors.laboratory && (
              <p className="text-sm text-red-500 mt-1">{errors.laboratory}</p>
            )}
          </div>
          
          <div className="w-full">
            <textarea
              value={formData.descripcion}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, descripcion: e.target.value }))
              }}
              placeholder="Descripción de la orden"
              className="w-full p-2 border rounded"
            />
            {errors.descripcion && (
              <p className="text-sm text-red-500 mt-1">{errors.descripcion}</p>
            )}
          </div>
        </div>

        {laboratoryDetails && (
          <div className="w-full flex flex-col gap-3">
            <Typography variant="small" className="font-bold">
              Detalle del examen
            </Typography>
            <Card>
              <CardContent className="px-0">
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Insumo</TableHead>
                      <TableHead className="w-[100px]">Cantidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laboratoryDetails.insumoExamenes?.map((item, index) => (
                      <TableRow key={index}>
                        <TableHead>{item.insumo?.nombre || 'Sin nombre'}</TableHead>
                        <TableHead className="text-center">
                          {item.cantidad}
                        </TableHead>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit">
            Enviar solicitud
          </Button>
        </div>
      </form>
    </LayoutSection>
  )
}