"use client"
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { ErrorResponse } from "@/app/types/api";
import FormCategory from '@/app/(main)/category/new/FormCategory';
import { useRouter } from "next/navigation";
import CategoryDto from "@/app/types/dto/category/CategoryDto";
import create from "@/actions/category/create";

const schema = z.object({
    nameCategory: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    is_active: z.boolean(),
})

type CategoryFormInputs = z.infer<typeof schema>;

export default function PageClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const methods = useForm<CategoryFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            nameCategory: '',
            is_active: true,
        }
    });

    const onSubmit = async (data: CategoryFormInputs) => {
        if (isSubmitting) return; // Previene múltiples envíos
        
        try {
            setIsSubmitting(true);
            const categoryDto: CategoryDto = {
                ...data,
                nombre: data.nameCategory,
            };

            const response = await create(categoryDto);

            if (response.status === 201 || response.status === 200) {
                toast({
                    title: "Categoria creada Exitosamente",
                    description: `La categoria ${data.nameCategory} ha sido creado`,
                    duration: 3000,
                });
                router.push("/category");
            } else {
                toast({
                    title: `Error ${response.status}`,
                    description: (response as ErrorResponse).message,
                    duration: 3000,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error al crear categoría:", error);
            toast({
                title: "Error",
                description: "Ocurrió un error al crear la categoría",
                duration: 3000,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <LayoutSection
            title="Agrega una nueva categoría"
            description="completa la información requerida"
        >
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormCategory isSubmitting={isSubmitting} />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    )
}
