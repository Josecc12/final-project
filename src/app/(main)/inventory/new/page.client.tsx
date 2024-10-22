"use client";
import LayoutSection from "@/components/LayoutSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import create from '@/actions/inventory/create'
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/types/api";
import Category from '@/app/types/models/Category';
import FormInventory from './FormInventory'
import InventoryDto from '@/app/types/dto/inventory/InventoryDto'

const schema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    categoriaId: z.string().min(1),
    codigo: z.string().min(2, "Debe tener al menos 2 caracteres"),
    trazador: z.boolean(),
});

type Props = {
    categorias: Category[];
}

type InventoryFormInputs = z.infer<typeof schema>;

export default function PageClient({ categorias }: Props) {
    const { toast } = useToast();
    const router = useRouter();

    const methods = useForm<InventoryFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            nombre: "",
            categoriaId: "",
            codigo: "",
            trazador: true,
        }
    });

    const onSubmit = async (data: InventoryFormInputs) => {
        const inventoryDto: InventoryDto = {
            nombre: data.nombre,
            codigo: data.codigo,
            categoriaId: data.categoriaId,
            trazador: data.trazador,
        };

        const response = await create(inventoryDto);

        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Producto creado exitosamente",
                description: `El producto ${data.nombre} ha sido creado`,
                duration: 3000,
            });
            router.push("/inventory");
        }
        else if (response.status === 409) {

            toast({
                title: `Error`,
                description: 'Codigo ya existe',
                duration: 3000,
                variant: "destructive",
            });

        }
        else {
            toast({
                title: `Error ${response.status}`,
                description: (response as ErrorResponse).message,
                duration: 3000,
                variant: "destructive",
            })
        }
    }

    return (
        <LayoutSection
            title="Inventario"
            description="completa la información requerida"
        >
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormInventory categorias={categorias} />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    )
}
