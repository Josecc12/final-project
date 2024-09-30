"use client";

import { toast, useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import update from "@/actions/department/update";  
import { Department } from '@/app/types/models';  
import FormDepartment from "../../new/formDepartment";


const schema = z.object({
    nameDepartment: z.string().min(2, "El nombre debe tener al menos 2 caracteres")  
});

type DepartmentFormInputs = z.infer<typeof schema>;  
type Props = {
    department: Department;  
};

export default function PageClient({ department }: Props) {  
    const { toast } = useToast();
    const router = useRouter();
    const methods = useForm<DepartmentFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            nameDepartment: department.nombre,  
        },
    });

    const onSubmit = async (data: DepartmentFormInputs) => {
        const response = await update({
            ...data,
            id: department.id,  
            nombre: data.nameDepartment,  
        });

        if (response.status === 200) {
            toast({
                title: "Departamento actualizado exitosamente",
                description: `El departamento ${data.nameDepartment} ha sido actualizado`,  
            });
            router.push("/department");  
        } else {
            toast({
                title: "Error al editar departamento",
                description: `El departamento ${data.nameDepartment} no pudo ser actualizado`,  
                variant: "destructive",
            });
        }
    };

    return (
        <LayoutSection
            title="Edición de Departamento"  
            description="Completa la información para editar el departamento">  
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormDepartment department={department} />  
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    );
}
