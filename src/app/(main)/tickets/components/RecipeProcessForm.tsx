// components/RecipeProcessForm.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

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

interface RecipeProcessFormProps {
  onCancel: () => void;
  isProcessing?: boolean;
}

export default function RecipeProcessForm({ onCancel, isProcessing = false }: RecipeProcessFormProps) {
    const {
        control,
        formState: { errors },
        register,
        watch,
    } = useFormContext<FormInputs>();

    const descripcion = watch('descripcion');

    return (
        <Card className="w-full max-w-[600px] flex flex-col gap-4 p-4">
            <CardContent className="gap-3 flex flex-col">
                {/* Descripción como texto de solo lectura */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        Motivo de la consulta
                    </label>
                    <div className="p-2 bg-muted rounded-md">
                        {descripcion}
                    </div>
                </div>

                {/* Lista de insumos */}
                <div className="space-y-4">
                    <label className="text-sm font-medium">
                        Insumos a procesar
                    </label>
                    {watch('insumos')?.map((field, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-1 w-full max-w-[120px]">
                                    <label 
                                        htmlFor={`insumos.${index}.cantidad`} 
                                        className="text-sm font-medium"
                                    >
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
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium">
                                        Insumo
                                    </label>
                                    <div className="p-2 bg-muted rounded-md text-sm">
                                        {/* Aquí deberías mostrar el nombre del insumo desde tu estado global o props */}
                                        {field.insumo}
                                    </div>
                                </div>
                            </div>
                            {errors.insumos?.[index]?.cantidad && (
                                <p className="text-sm text-destructive">
                                    {errors.insumos[index]?.cantidad?.message}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <CardFooter className="flex justify-end gap-2 px-0">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Procesando...' : 'Procesar'}
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    )
}