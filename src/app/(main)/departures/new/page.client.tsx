'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import WithdrawalForm from "../components/WithdrawalForm"
import create from "@/actions/departures/create";

const schema = z.object({
    descripcion: z.string().min(1, "La descripción es requerida"),
    detalles: z.array(
        z.object({
            cantidad: z.string().min(1, "La cantidad mínima es 1"),
            insumoDepartamentoId: z.string().min(1, 'Selecciona un insumo'),
        })
    ),
});

type FormInputs = z.infer<typeof schema>;

export default function WithdrawalPageClient() {
    const methods = useForm<FormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            descripcion: "",
            detalles: [{ cantidad: "1", insumoDepartamentoId: "" }],
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        const response = await create({
            descripcion: data.descripcion,
            detalles: data.detalles.map(
                ({ cantidad, insumoDepartamentoId }) => ({
                    cantidad: parseInt(cantidad),
                    insumoId: insumoDepartamentoId,
                })
            )
        });

        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Retiro creado",
                description: "El retiro se ha creado correctamente",
                duration: 3000,
            });
            router.push("/departures");
        }else if(response.status === 404){
            toast({
                title: "Error",
                description: "no hay insumos suficientes en el departamento para completar esta accion",
                duration: 3000,
                variant: "destructive",
            });
        }
    }

    return (
        <LayoutSection title="Crear retiro de departamento">
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <WithdrawalForm />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    );
}