import DropdownSearch from "@/components/DropdownSearch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function WithdrawalForm() {
    const router = useRouter();
    const handleCancel = () => {
        router.push("/departures");
    };

    const {
        control,
        formState: { errors, defaultValues },
        register,
        setValue,
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "detalles",
    });

    return (
        <Card className="w-full max-w-[600px] flex flex-col gap-4 p-4">
            <CardContent className="gap-3 flex flex-col">
                <FormField
                    control={control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción del retiro</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ingresa la descripción del retiro"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.root?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-2">
                        <div className="flex items-end gap-3">
                            <div className="flex flex-col gap-1 w-full max-w-[100px]">
                                <label htmlFor={`detalles.${index}.cantidad`} className="text-sm font-medium">
                                    Cantidad
                                </label>
                                <Input
                                    id={`detalles.${index}.cantidad`}
                                    type="number"
                                    {...register(`detalles.${index}.cantidad` as const, {
                                        required: "La cantidad es requerida",
                                        min: { value: 1, message: "La cantidad mínima es 1" },
                                    })}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor={`detalles.${index}.insumoDepartamentoId`} className="text-sm font-medium">
                                    Insumo
                                </label>
                                <DropdownSearch
                                    defaultValue={defaultValues?.detalles?.[index]?.insumoDepartamentoId}
                                    name={`detalles.${index}.insumoDepartamentoId` as const}
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
                    </div>
                ))}

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ cantidad: "1", insumoDepartamentoId: "" })}
                    className="w-fit"
                >
                    <PlusCircleIcon className="h-4 w-4 mr-2" />
                    Agregar Insumo
                </Button>

                <CardFooter className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                    >
                        Guardar
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
}