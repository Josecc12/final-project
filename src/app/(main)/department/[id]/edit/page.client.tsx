"use client";

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import create from "@/actions/department/create";
import { ErrorResponse } from "@/app/types/api";
import { Department } from "@/app/types/models";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import DeparmentForm from "../../new/DeparmentForm";
import update from "@/actions/department/update";


const schema = z.object({
    id: z.string().min(1, "El id es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
});

type InventoryFormInputs = z.infer<typeof schema>;

type Props = {
    department: Department
}

export default function PageClient({department}:Props) {
    const methods = useForm<InventoryFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            id: department.id,
            name: department.nombre,
        },
    });

    const { toast } = useToast();

    const router = useRouter();

    const onSubmit = async (data: InventoryFormInputs) => {
        const response = await update(data)
        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Departamento creado exitosamente",
                description: `El Departamento ${data.name} ha sido creado`,
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
            title="Departamento"
            description="completa la información requerida"
        >
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <DeparmentForm />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    );
}
