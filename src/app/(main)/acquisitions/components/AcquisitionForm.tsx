import DropdownSearch from "@/components/DropdownSearch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale"

const schema = z.object({

    insumos: z.array(
        z.object({
            cantidad: z.number().min(1, "La cantidad mínima es 1"),
            insumo: z.string().min(1, 'Selecciona un insumo'),
            caducidad: z.date({ required_error: "La fecha de nacimiento es requerida" })
        })
    ),
})

type FormInputs = z.infer<typeof schema>;

export default function AcquisitionForm() {

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
        <Card className="w-full max-w-[800px] flex flex-col gap-4 p-4">
            <CardContent className="gap-3 flex flex-col w-full">

                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2">
                        <div className="flex gap-3 flex-col md:flex-row">
                            <div className="flex gap-2 w-full">
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
                            </div>
                            <div className="flex gap-2 justify-between self-end">
                                <FormField
                                    control={control}
                                    name={`insumos.${index}.caducidad`}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Fecha de caducidad</FormLabel>
                                            <Popover >
                                                <PopoverTrigger asChild>
                                                    <FormControl className="w-full">
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP", { locale: es })
                                                            ) : (
                                                                <span>Selecciona una fecha</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full min-w-full p-0 relative" align="start">
                                                    <Calendar
                                                        className="!w-full min-w-full"
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                        </div>
                        {errors.insumos?.[index]?.cantidad && (
                            <p className="text-sm text-red-500">{errors.insumos[index]?.cantidad?.message}</p>
                        )}
                        {errors.insumos?.[index]?.insumo && (
                            <p className="text-sm text-red-500">{errors.insumos[index]?.insumo?.message}</p>
                        )}
                        {errors.insumos?.[index]?.caducidad && (
                            <p className="text-sm text-red-500">{errors.insumos[index]?.insumo?.message}</p>
                        )}
                    </div>
                ))}
                <Button

                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ cantidad: 1, insumo: "", caducidad: new Date() })}
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
