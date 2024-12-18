import DropdownSearch from "@/components/DropdownSearch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";


const schema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    insumos: z.array(
        z.object({
            cantidad: z.number().min(1, "La cantidad mínima es 1"),
            insumo: z.string().min(1, 'Selecciona un insumo'),
        })
    ),
})

type FormInputs = z.infer<typeof schema>;

export default function TestForm() {

    const {
        control,
        formState: { errors, defaultValues },
        register,
        setValue,
    } = useFormContext<FormInputs>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "insumos",
    })

    return (
        <Card className="w-full max-w-[600px] flex flex-col gap-4 p-4">
            <CardContent className="gap-3 flex flex-col">
            

            <FormField
            control={control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cui">Nombre del examen</FormLabel>
                <FormControl>
                  <Input
                    id="cui"
                    placeholder="Ingresa tu nombre"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.nombre?.message}</FormMessage>
              </FormItem>
            )}
          />

            <FormField
                control={control}
                name="descripcion"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                        <FormControl>
                            <Input
                                id="descripcion"
                                placeholder="Ingresa la descripción"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage>{errors.descripcion?.message}</FormMessage>
                    </FormItem>
                )}/>

            

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
                            className="self-end min-w-[40px]"
                        >
                            <Trash2Icon className="h-4 w-4" />
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
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                Agregar Insumo
            </Button>
            <Button type="submit" className="w-full">
                Guardar
            </Button>
            </CardContent>
        </Card>
    )
}
