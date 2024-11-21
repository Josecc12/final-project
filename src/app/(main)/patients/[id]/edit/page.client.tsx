"use client";

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import update from "@/actions/patient/update";
import { ErrorResponse } from "@/app/types/api";
import { Patient } from "@/app/types/models";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormPatient from "../../new/FormPatient";

const schema = z.object({
    id: z.string().min(1, "El id es requerido"),
    nombre: z.string().min(1, "El nombre es requerido"),
    sexo: z.string().min(1, "El sexo es requerido"),
    cui: z.string(),
    telefono: z.string(),
    comunidad: z.string(),
    municipio: z.string(),
    nacimiento: z.date({ required_error: "La fecha de nacimiento es requerida" }),
    familiares: z.string(),
    quirurgicos: z.string(),
    traumaticos: z.string(),
    alergias: z.string(),
    vicios: z.string(),

});


type UserFormInputs = z.infer<typeof schema>;

type Props = {
    patient: Patient;
};


export default function Page({ patient }: Props) {
    const methods = useForm<UserFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            id: patient.id,
            nombre: patient.nombre,
            sexo: patient.sexo,
            cui: patient.cui,
            telefono: patient.telefono,
            comunidad: patient.comunidad,
            municipio: patient.municipio,
            nacimiento: new Date(patient.nacimiento),
            familiares: patient.familiares,
            quirurgicos: patient.quirurgicos,
            traumaticos: patient.traumaticos,
            alergias: patient.alergias,
            vicios: patient.vicios
        },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: UserFormInputs) => {


        console.log(data);
        const response = await update(data);

        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Paciente actualizado exitosamente",
                description: `El Paciente ${data.nombre} ha sido actualizado`,
                duration: 3000,
            });
            router.push("/patients");
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
            title="Crear paciente"
            description="Agrega un nuevo paciente a el centro de salud"
        >
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormPatient />
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    );
}
