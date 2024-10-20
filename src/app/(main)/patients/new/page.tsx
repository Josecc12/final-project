"use client";

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import schema from "./schema";
import FormPatient from "./FormPatient";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import create from "@/actions/patient/create";
import { ErrorResponse } from "@/app/types/api";

type UserFormInputs = z.infer<typeof schema>;

export default function Page() {
  const methods = useForm<UserFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      sexo: "",
      cui: "",
      nacimiento: new Date(),
      familiares: "",
      quirurgicos: "",
      traumaticos: "",
      alergias: "",
      vicios: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: UserFormInputs) => {
 
   

    const response = await create(data);
    if (response.status === 201 || response.status === 200) {
      toast({
        title: "Paciente creado exitosamente",
        description: `El Paciente ${data.nombre} ha sido creado`,
        duration: 3000,
      });
      router.push("/patients");
    } 
    
    else if(response.status ===409){

      toast({
        title: `Error`,
        description: 'CUI ya existe',
        duration: 3000,
        variant: "destructive",
      });

    }
    else {
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
