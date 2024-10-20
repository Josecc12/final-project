"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { PlusCircle, Trash2 } from "lucide-react"
import DropdownSearch from "@/components/DropdownSearch"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"



const schema = z.object({
  insumos: z.array(
    z.object({
      cantidad: z.number().min(1, "La cantidad mínima es 1"),
      insumo: z.string().min(1,'Selecciona un insumo'),
    })
  ),
})

type FormInputs = z.infer<typeof schema>;


export default function InsumoForm() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors ,defaultValues},
  } = useForm<FormInputs>({
    defaultValues: {
      insumos: [{ cantidad: 1, insumo: "ef2da8ba-aae2-48cd-9b2d-963e9db4bea1" }],
    },
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "insumos",
  })

  const onSubmit = (data: FormInputs) => {
    console.log(data)
    // Aquí puedes manejar el envío del formulario
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2">
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-1 w-full max-w-[100px]">
              <label htmlFor={`insumos.${index}.cantidad`} className="text-sm font-medium">
                Cantidad
              </label>
              <Input

                id={`insumos.${index}.cantidad`}
                type="number"
                {...register(`insumos.${index}.cantidad` as const, {
                  required: "La cantidad es requerida",
                  min: { value: 1, message: "La cantidad mínima es 1" },
                })}
              />

            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor={`insumos.${index}.insumo`} className="text-sm font-medium">
                Insumo
              </label>
              <DropdownSearch
                defaultValue={defaultValues?.insumos?.[index]?.insumo}
                name={`insumos.${index}.insumo` as const}
                setValue={setValue}
                placeholder="Selecciona un insumo"
              />

            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              className="self-end"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {errors.insumos?.[index]?.cantidad && (
            <p className="text-sm text-red-500">{errors.insumos[index]?.cantidad?.message}</p>
          )}
          {errors.insumos?.[index]?.insumo && (
            <p className="text-sm text-red-500">{errors.insumos[index]?.insumo?.message}</p>
          )}
        </div>
      ))}
      <Button

        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ cantidad: 1, insumo: "" })}
        className="w-fit"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Agregar Insumo
      </Button>
      <Button type="submit" className="w-full">
        Guardar
      </Button>
    </form>
  )
}