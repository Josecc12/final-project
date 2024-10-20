'use client';

import { User } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import Delete from "@/components/ui/delete";
import deleteUser from "@/actions/user/delete";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";
import { Users2, Mail, Briefcase, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type Props = {
  user: User;
};

export default function PageClient({ user }: Props) {
  const router = useRouter(); 

  const onDelete = async () => {
    const response = await deleteUser({ id: user.id }); 

    if (response?.status === 200) {
      toast({
        title: "Usuario eliminado exitosamente",
        description: `El usuario ${user.name} ha sido eliminado/a`,
        variant: "default",
      });
      router.push("/user"); 
      router.refresh(); 
    } else if (response?.status === 401) {
      toast({
        title: "Error de autenticación",
        description: "No estás autorizado para realizar esta acción.",
        variant: "destructive",
      });
    } else if ("message" in response) {
      toast({
        duration: 3000,
        title: `Error ${response.status}`,
        description: (response as ErrorResponse).message,
      });
    }
  };

  return (

    <LayoutSection
      title={``}
      description="Acerca de tu perfil"
      actions={
        <div className="flex gap-2 md:self-end self-end">
          <Button variant="default" asChild>
            <Link href={`/user/${user.id}/edit`}>Editar</Link>
          </Button>
          <Delete onDelete={onDelete} />
        </div>
      }
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{user.name} {user.lastname}</Typography>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Email</Typography>
          <Typography variant="muted">{user.email}</Typography>
        </div>
        <div className="w-full flex  items-center gap-1">
          <Typography variant="small" className="font-bold">Role</Typography>
          <Badge variant="outline" className="w-fit">
            {user.role.name}
          </Badge>
        </div>
      </div>
    </LayoutSection>
  );
}
