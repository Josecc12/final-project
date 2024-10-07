"use client";

import LayoutSection from "@/components/LayoutSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";


import create from "@/actions/department/create"; // Cambiar la función de creación al endpoint adecuado
import { DepartmentDto } from "@/app/types/dto/department"; // Tipo adecuado para departamento
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/types/api";
import FormDepartment from "./formDepartment";

const schema = z.object({
  nameDepartment: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  is_active: z.boolean(),
});

type DepartmentFormInputs = z.infer<typeof schema>;

export default function PageClient() {
  const { toast } = useToast();
  const router = useRouter();
  const methods = useForm<DepartmentFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      nameDepartment: "",
      is_active: true, // Valor predeterminado true o false
    },
  });

  const onSubmit = async (data: DepartmentFormInputs) => {
    console.log(data);
    const departmentDto: DepartmentDto = {
      nombre: data.nameDepartment,
      is_active: data.is_active,
    };

    const response = await create(departmentDto);
    if (response.status === 201 || response.status === 200) {
      toast({
        title: "Departamento creado exitosamente",
        description: `El departamento ${data.nameDepartment} ha sido creado`,
        duration: 3000,
      });
      router.push("/departments"); // Ruta que corresponde
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
      title="Creacion de Departamento"
      description="Completa el formulario para editar el departamento"
    >
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormDepartment/>
          </form>
        </Form>
      </FormProvider>
    </LayoutSection>
  );
}
