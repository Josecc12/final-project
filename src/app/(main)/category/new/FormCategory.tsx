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

export default function FormCategory({ isSubmitting = false }) {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const router = useRouter();

    const handleCancel = () => {
        router.push("/category");
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
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage>{errors.root?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </CardFooter>
        </Card>
    );
}