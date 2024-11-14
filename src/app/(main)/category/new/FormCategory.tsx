"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    nameCategory: z.string().min(2, "El nombre debe tener al menos 2 caracteres")
});

type CategoryFormInputs = z.infer<typeof schema>;

export default function FormCategory() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CategoryFormInputs>();
    const router = useRouter();

    const handleCancel = () => {
        router.push("/category"); // Redirige a la lista de categorías u otra ruta deseada
    };

    return (
        <Card className="w-full max-w-[600px]">
            <CardContent className="gap-3 flex flex-col">
                <div className="flex flex-col gap-4">
                    <FormField
                        control={control}
                        name="nameCategory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="nombre">Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        id="nombre"
                                        placeholder="Ingresa el nombre"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.nameCategory?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
            </CardFooter>
        </Card>
    );
}
