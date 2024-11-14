"use client";

import { useState } from "react";
import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DepartmentForm from "./DeparmentForm";
import create from "@/actions/department/create";
import { useToast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

type InventoryFormInputs = z.infer<typeof schema>;

export default function PageClient() {
  const [buttonLocked, setButtonLocked] = useState(false);
  const methods = useForm<InventoryFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: InventoryFormInputs) => {
    if (buttonLocked) {
        return; // Si el botón está bloqueado, no hacer nada
    }

    try {
        setButtonLocked(true); // Bloquear el botón inmediatamente
        
        const response = await create(data);
        
        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Departamento creado exitosamente",
                description: `El Departamento ${data.name} ha sido creado`,
                duration: 3000,
            });
            router.push("/department");
        } else {
            toast({
                title: `Error ${response.status}`,
                description: (response as ErrorResponse).message,
                duration: 3000,
                variant: "destructive",
            });
            setButtonLocked(false); // Desbloquear solo en caso de error
        }
    } catch (error) {
        console.error("Error al crear departamento:", error);
        toast({
            title: "Error",
            description: "Ocurrió un error al crear el departamento",
            duration: 3000,
            variant: "destructive",
        });
        setButtonLocked(false); // Desbloquear en caso de error
    }
  };

  return (
    <LayoutSection
      title="Departamento"
      description="completa la información requerida"
    >
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DepartmentForm isSubmitting={buttonLocked} />
          </form>
        </Form>
      </FormProvider>
    </LayoutSection>
  );
}