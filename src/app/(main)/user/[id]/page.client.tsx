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
import { Users2, Mail, Briefcase, Building2, MessagesSquare, Badge } from "lucide-react"
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
    >
      

    <Card className="w-full max-w-md mx-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Detalles del Usuario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
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
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">
            <Typography variant="small" className="font-bold">Nombre de usuario</Typography>
            <Typography variant="muted"> {user.username}</Typography>
            </span>
          </div>
          <br />

          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">
            <Typography variant="small" className="font-bold">Correo Electrónico</Typography>
            <Typography variant="muted">{user.email}</Typography>
            </span>
          </div>
          <br />

          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">
            <Typography variant="small" className="font-bold">Rol</Typography>
            <Typography variant="muted">{user.role.name}</Typography> 
            </span>
          </div>

          <br />

            <div className="flex gap-5 justify-end md:self-end">
              <Button variant="default" asChild>
                <Link href={`/user/${user.id}/edit`}>Editar</Link>
                </Button>
                <Delete onDelete={onDelete} />
            </div>
                
          </div>
      </CardContent>
    </Card>
    </LayoutSection>
  );
}
