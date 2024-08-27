"use client";

import LayoutSection from "@/components/LayoutSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { User } from "@/actions/types/models";
import Role from "@/actions/types/models/Role";
import update from "@/actions/user/update";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormUser from "../../new/FormUser";
import { useRouter } from "next/navigation";

const schema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  username: z
    .string()
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
  email: z.string().email("Debe ser un correo electrónico válido"),
  role: z.string().min(1),
  password: z.string(),
});

type UserFormInputs = z.infer<typeof schema>;

type Props = {
  roles: Role[];
  user: User;
};

export default function PageClient({ roles, user }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const methods = useForm<UserFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.name || "",
      lastName: user.lastname,
      username: user.username,
      email: user.email,
      role: `${user.role.id}`,
      password: "",
    },
  });

  const onSubmit = async (data: UserFormInputs) => {
    const response = await update({
      ...data,
      roleId: parseInt(data.role, 10),
      id: user.id,
      name: data.firstName,
      lastname: data.lastName,
    });
    if (response.status === 200) {
      toast({
        title: "Usuario actualizado exitosamente",
        description: `El usuario ${data.firstName} ha sido actualizado`,
      });
      router.push("/user");
    } else {
      toast({
        title: "Error al editar usuario",
        description: `El usuario ${data.firstName} no pudo ser actualizado Error ${response.status}`,
        variant: "destructive",
      });
    }
  };

  return (
    <LayoutSection
      title="Edición de Usuario"
      description="Completa el formulario para editar tu cuenta"
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