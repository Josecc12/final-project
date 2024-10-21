"use client";

import { useForm, FormProvider } from "react-hook-form";
import FormInventory from "../../components/FormInventory"; 
import { z } from "zod";
import { Category, Department, Insumo } from "@/app/types/models"; 
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../../components/schema"; 
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import update from "@/actions/inventory/update";
import InventoryDto from '@/app/types/dto/inventory/InventoryDto';
import { ErrorResponse } from "@/app/types/api";
import { Form } from "@/components/ui/form";
import LayoutSection from "@/components/LayoutSection";
type Props = {
    insumo: Insumo;
    categorias: Category[];
    departamentos: Department[];
};
type InsumoFormInputs = z.infer<typeof schema>;

export default function PageClient({ insumo, categorias, departamentos }: Props) {
    const methods = useForm<InsumoFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            trazador: insumo.trazador,
            nombre: insumo.nombre,
            codigo: insumo.codigo,
            categoriaId: insumo.categoria.id,
            departamentosId: insumo.departamentos.map((d) => d.id),   
        },
    });

    const {toast} = useToast();
    const router = useRouter();

    const onSubmit = async (data: InsumoFormInputs) => {
        const response = await update(data)
        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Departamento creado exitosamente",
                description: `El Departamento ${data.nombre} ha sido creado`,
                duration: 3000,
            });
            router.push("/department");
        } else {
            toast({
                title: `Error ${response.status}`,
                description: (response as ErrorResponse).message,
                duration: 3000,
                variant: "destructive",
            });
        }
    };

    return (
        <LayoutSection
            title="Crear Insumo"
            description="Agrega un nuevo Insumo centro de salud"
        >
        <FormProvider {...methods}>
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormInventory 
                        categorias={categorias} 
                        departamentos={departamentos} 
                    />
                   
                </form>
            </Form>
        </FormProvider>
        </LayoutSection>
    );
}
