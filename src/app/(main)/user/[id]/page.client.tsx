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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users2, Mail, Briefcase, Building2, User2 } from "lucide-react"


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
      title={`Detalle del usuario`}
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
        <div className="flex justify-center">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-4xl">
          <Typography variant="small" className="font-bold">{user.username}</Typography>
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Users2 className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">
            <Typography variant="small" className="font-bold">Nombre</Typography>
            <Typography variant="muted">{user.name} {user.lastname}</Typography>
          </span>
        </div>
        <br />
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>
            <Typography variant="small" className="font-bold">Email</Typography>
            <Typography variant="muted">{user.email}</Typography>            
          </span>
        </div>
        <br />
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          <span>
          <Typography variant="small" className="font-bold">Rol</Typography>
          <Typography variant="muted">{user.role.name}</Typography> 
          </span>
        </div>
        </div>
    </LayoutSection>
  );
}
