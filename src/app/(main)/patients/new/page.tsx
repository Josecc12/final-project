"use client";

import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import schema from "./schema";
import FormPatient from "./FormPatient";

type UserFormInputs = z.infer<typeof schema>;

export default function Page() {
  const methods = useForm<UserFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      sexo: "",
      cui: "",
      nacimiento: "",
      familiares: "",
      quirurgicos: "",
      traumaticos: "",
      alergias: "",
      vicios: "",
    },
  });

  const onSubmit = async (data: UserFormInputs) => {
    console.log(data);
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
