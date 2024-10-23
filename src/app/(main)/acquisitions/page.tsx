'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import AcquisitionForm from "./components/AcquisitionForm";




const schema = z.object({
    insumos: z.array(
        z.object({
            cantidad: z.string().min(1, "La cantidad mínima es 1"),
            insumo: z.string().min(1, 'Selecciona un insumo'),
            caducidad: z.date({ required_error: "La fecha de nacimiento es requerida" })
        })
    ),
})

type FormInputs = z.infer<typeof schema>;

export default function Page() {

    const methods = useForm<FormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
     
            insumos: [{ cantidad: "1", insumo: "" , caducidad: new Date() }],
        },
    })

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        console.log(data);
    }


    return (
        <LayoutSection
            title="Adquisición de insumos"
            description="Completa la informacion de los insumos adquiridos">

            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AcquisitionForm />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    )
}
