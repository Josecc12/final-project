'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import TestForm from "./TestForm";
import create from "@/actions/laboratory/create";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/types/api";


const schema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),

    insumos: z.array(
        z.object({
            cantidad: z.string().min(1, "La cantidad mínima es 1"),
            insumo: z.string().min(1, 'Selecciona un insumo'),
        })
    ),
})

type FormInputs = z.infer<typeof schema>;

export default function Page() {

    const methods = useForm<FormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            nombre: "",
            descripcion: "",
            insumos: [{ cantidad: "1", insumo: "" }],
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit =  async (data: FormInputs) => {
        const transformedData = {
            ...data,
            insumos: data.insumos.map((insumo, index) => ({
                id: insumo.insumo,
                cantidad: parseInt(insumo.cantidad, 10)
            }))
        };
        const response = await create(transformedData);
        if (response.status === 201 || response.status === 200) {
            toast({
              title: "Laboratorio creado ",
              description: `El laboratorio ${data.nombre} ha sido creado`,
              duration: 3000,
            });
            router.push("/laboratory");
          } 
          else {
            toast({
              title: `Error ${response.status}`,
              description: (response as ErrorResponse).message,
              duration: 3000,
              variant: "destructive",
            });
          }

    }

    return (
        <LayoutSection title="Creacion de examen de laboratorio" description="Crear un nuevo detalle de laboratorio">
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TestForm/>
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    )
}