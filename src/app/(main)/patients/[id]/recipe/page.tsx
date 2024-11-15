'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import RecipeForm from "./RecipeForm";
import create from "@/actions/recipe/create";



const schema = z.object({
    descripcion: z.string().min(1, "LA descripción es requerida"),
    insumos: z.array(
        z.object({
            cantidad: z.string().min(1, "La cantidad mínima es 1"),
            insumo: z.string().min(1, 'Selecciona un insumo'),
        })
    ),
})

type FormInputs = z.infer<typeof schema>;

export default function PageClient() {

    const params = useParams<{ id: string; }>()

    const methods = useForm<FormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            descripcion: "",
            insumos: [{ cantidad: "1", insumo: "" }],
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        const response = await create({
            ...data,
            pacienteId: params.id, 
            estado: "Pendiente", 
            insumos: data.insumos.map(
                ({ cantidad, insumo }) => ({
                    cantidad: parseInt(cantidad),
                    insumoId: insumo,

                })
            )
        });

        if(response.status === 201 || response.status === 200){
            toast({
                title: "Receta creada",
                description: "La receta se ha creado correctamente",
                duration: 3000,
            });
            router.push(`/patients/${params.id}`);
        }
        
    }


    return (
        <LayoutSection
            title="Crear receta medica"
        >

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
