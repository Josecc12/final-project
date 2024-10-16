"use client";

import LayoutSection from "@/components/LayoutSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";


import FormUser from "./FormUser";
import create from "@/actions/user/create";
import { UserDto } from "@/app/types/dto/user";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/app/types/api";
import Role from "@/app/types/models/Role";

const schema = z.object({
  firstName: z.string().min(2, "El nombre debe ser requerido"),
  lastName: z.string().min(2, "El apellido debe ser requerido"),
  username: z
    .string()
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: z.string().min(1),
});

type UserFormInputs = z.infer<typeof schema>;

type Props = {
  roles: Role[];
};

export default function PageClient({ roles }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const methods = useForm<UserFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data: UserFormInputs) => {
    const userDto: UserDto = {
      name: data.firstName,
      lastname: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      roleId: data.role,
    };

    const response = await create(userDto);
    if (response.status === 201 || response.status === 200) {
      toast({
        title: "Usuario creado exitosamente",
        description: `El usuario ${data.firstName} ha sido creado`,
        duration: 3000,
      });
      router.push("/user");
    } 
    if(response.status ===409 ){
      toast({
        title: `Error`,
        description: `El nombre de usuario ya existe`,
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
      title="Creacion de Usuario"
      description="Completa el formulario para el nuevo usuario"
    >
      <FormProvider {...methods}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormUser roles={roles} />
          </form>
        </Form>
      </FormProvider>
    </LayoutSection>
  );
}
