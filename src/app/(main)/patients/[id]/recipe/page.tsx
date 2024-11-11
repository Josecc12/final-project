'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import RecipeForm from "./RecipeForm";



const schema = z.object({
    motivo: z.string().min(1, "El nombre es requerido"),
    anotaciones: z.string(),
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
            motivo: "",
            anotaciones: "",
            insumos: [{ cantidad: "1", insumo: "" }],
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        console.log(data);
    }


    return (
        <LayoutSection
            title="Nueva visita medica"
            description="Pacientes Sample Sample">

            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <RecipeForm />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    )
}