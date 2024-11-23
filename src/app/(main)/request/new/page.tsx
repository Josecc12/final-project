'use client'

import { useState, useEffect } from 'react'
import DropdownLaboratory from "@/components/DropdownLaboratory"
import LayoutSection from "@/components/LayoutSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Typography } from "@/components/ui/Typography"
import { useForm } from "react-hook-form"
import { z } from "zod"
import findOne from '@/actions/laboratory/findOne'
import { Test } from '@/app/types/models'

const schema = z.object({
  laboratory: z.string().min(1, "El laboratorio es requerido"),
})

type FormInputs = z.infer<typeof schema>



export default function PageClient() {
  const [laboratoryDetails, setLaboratoryDetails] = useState<Test | null>(null)

  const { setValue, watch } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      laboratory: ""
    }
  })

  const selectedLaboratory = watch('laboratory')

  useEffect(() => {
    const fetchLaboratoryDetails = async () => {
      if (selectedLaboratory) {
        try {
       
          const response = await findOne(selectedLaboratory)
          if (response.status !== 200 || !("data" in response)) {
            throw new Error("Failed to fetch inventory data")
          }
          setLaboratoryDetails(response.data)
        } catch (error) {
          console.error("Error fetching laboratory details:", error)
          setLaboratoryDetails(null)
        }
      } else {
        setLaboratoryDetails(null)
      }
    }

    fetchLaboratoryDetails()
  }, [selectedLaboratory])

  return (
    <LayoutSection
      title="Nueva solicitud de laboratorio"
      description="Selecciona un laboratorio para solicitar insumos"
    >
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-8">
          <div className="w-full">
            <DropdownLaboratory
              name="laboratory"
              setValue={setValue}
              placeholder="Selecciona un laboratorio"
            />
          </div>
          <Button>
            Enviar solicitud
          </Button>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Typography variant="small" className="font-bold">
            Detalle de la solicitud
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
                  {laboratoryDetails?.insumoExamenes.map((item, index) => (
                    <TableRow key={index}>
                      <TableHead>nombre</TableHead>
                      <TableHead className="flex items-center justify-center">
                        {item.cantidad}
                      </TableHead>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutSection>
  )
}