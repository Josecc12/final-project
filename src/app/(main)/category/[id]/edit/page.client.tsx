"use client"
import { toast, useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";

import FormCategory from '@/app/(main)/category/new/FormCategory';
import update from "@/actions/category/udpate";
import { useRouter } from "next/navigation";
import {Category} from '@/app/types/models'


const schema = z.object({
    nameCategory: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    is_active: z.boolean(),
})

type CategoryFormInputs = z.infer<typeof schema>;

type Props={
    categoria:Category;
}

export default function PageClient({categoria}: Props) {
    const { toast } = useToast();
    const router    = useRouter();
    const methods   = useForm<CategoryFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            nameCategory: categoria.nombre,
            is_active: true,
        }
    });

    const onSubmit = async(data: CategoryFormInputs) => {
        const response = await update({
            ...data,
            id    : categoria.id,
            nombre: data.nameCategory,
            
        });

        if(response.status === 200) {
            toast({
                title: "Categoria actualizada exitosamente",
                description: `La categoria ${data.nameCategory} ha sido actualizada`,
            });
            router.push("/category");
        } else {
            toast({
                title: "Error al editar categoria",
                description: `La categoria ${data.nameCategory} no pudo ser actualizada`,
                variant: "destructive",
            });
        }
    };

  return (
    <LayoutSection
    title="Edicion de categoria"
    description="Completa la información">
        <FormProvider {...methods}>
            <Form{...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCategory 
                    />
                </form>
            </Form>
        </FormProvider>
    </LayoutSection>
  )
}
