'use client'

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import AcquisitionForm from "../components/AcquisitionForm";
import create from "@/actions/adquisitions/create";
import { FormInput } from "lucide-react";
import AdquisitionDto from "@/app/types/dto/adquisition/adquisitionDto";
import { ErrorResponse } from "@/app/types/api";




const schema = z.object({
    descripcion: z.string().min(1, "La descripción es requerida"),
    insumos: z.array(
        z.object({
            cantidad  : z.string().min(1, "La cantidad mínima es 1"),
            insumo    : z.string().min(1, 'Selecciona un insumo'),
            caducidad : z.date({ required_error: "La fecha de nacimiento es requerida" }),
            numeroLote: z.string().min(1,"tiene que tener al menos 1"),
        })
    ),
})

type FormInputs = z.infer<typeof schema>;

export default function PageClient() {

    const methods = useForm<FormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
     
            insumos: [{ cantidad: "1", insumo: "" , caducidad: new Date(), numeroLote: ""}],
        },
    })

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: FormInputs) => {
        const adquisitionData: AdquisitionDto = {
            descripcion: data.descripcion,
            lotes: data.insumos.map((insumo) => ({
                numeroLote    : insumo.numeroLote,
                fechaCaducidad: insumo.caducidad.toISOString().split("T")[0],
                cantidadInical: parseInt(insumo.cantidad, 10),
                insumoId      : insumo.insumo,
            }))
        };

        const response = await create(adquisitionData);

        if(response.status === 201 || response.status === 200){
            toast({
                title      : "Adquisicición guardada",
                description: "Esta adquisición se ha guardado correctamente",
                duration   : 3000,
            });
            router.push('/acquisitions');
        }
        else if(response.status === 409){

            toast({
              title      : `Error`,
              description: '',
              duration   : 3000,
              variant    : "destructive",
            });
      
          }
          else {
            toast({
              title      : `Error ${response.status}`,
              description: (response as ErrorResponse).message,
              duration   : 3000,
              variant    : "destructive",
            });
          }
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
