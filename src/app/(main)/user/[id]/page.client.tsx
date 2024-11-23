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
import { Users2, Mail, Briefcase, Building2, MessagesSquare, Badge, Edit, Trash2 } from "lucide-react"
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
    <Card className="w-full max-w-md m-8 my-9">
      <CardContent className="space-y-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
               <CardTitle>Detalle del Usuario</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="default" asChild>
                <Link href={`/user/${user.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Delete onDelete={onDelete} />
            </div>
          </div>

        </CardHeader>
          {/* Nombre del usuario */}
          <div className="flex items-center space-x-2">
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Nombre</Typography>
              <Typography variant="muted">{user.name} {user.lastname}</Typography>
            </div>      
          </div>
            
          {/* Username */}
          <div className="flex items-center space-x-2">
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <div>
             <Typography variant="small" className="font-bold">Nombre de usuario</Typography>
             <Typography variant="muted">{user.username}</Typography>
            </div>
          </div>  

          {/* Correo del usuario */}
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
             <Typography variant="small" className="font-bold">Correo Eléctronico</Typography>
             <Typography variant="muted">{user.email}</Typography>
            </div>
          </div>  


          {/* Rol del usuario */}
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <div>
             <Typography variant="small" className="font-bold">Rol</Typography>
             <Typography variant="muted">{user.role.name}</Typography>
            </div>
          </div>  

      </CardContent>
    </Card>
  );
}
