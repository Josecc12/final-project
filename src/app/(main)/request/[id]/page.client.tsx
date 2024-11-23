'use client';

import { Order } from "@/app/types/models";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import Delete from "@/components/ui/delete";
import deleteLaboratoryOrder from "@/actions/order/delete";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";
import { Users2, Edit,Sheet, Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  order: Order;
};

export default function PageClient({ order }: Props) {
  const router = useRouter(); 
  
  const onDelete = async () => {
    const response = await deleteLaboratoryOrder({ id: order.id }); 

    if (response?.status === 200) {
      toast({
        title: "Usuario eliminado exitosamente",
        description: `La solicitud ${order.id} ha sido eliminado/a`,
        variant: "default",
      });
      router.push("/request"); 
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
               <CardTitle>Detalle de Solicitud</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="default" asChild>
                <Link href={`/request/${order.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Delete onDelete={onDelete}/>
            </div>
          </div>

        </CardHeader>
          {/* Nombre del usuario */}
          <div className="flex items-center space-x-2">
            <Users2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Paciente</Typography>
              <Typography variant="muted">{order.paciente.nombre} </Typography>
            </div>      
          </div>
            
          {/* Username */}
          <div className="flex items-center space-x-2">
            <Sheet className="h-5 w-5 text-muted-foreground" />
            <div>
             <Typography variant="small" className="font-bold">Nombre del Examen</Typography>
             <Typography variant="muted">{order.examen.nombre}</Typography>
            </div>
          </div>  

          {/* Correo del usuario */}
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
             <Typography variant="small" className="font-bold">Descripcion del Examen</Typography>
             <Typography variant="muted">{order.examen.descripcion}</Typography>
            </div>
          </div>  


          {/* estado */}
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
             <Typography variant="small" className="font-bold">Estado</Typography>
             <Typography variant="muted">{order.estado}</Typography>
            </div>
          </div>  

      </CardContent>
    </Card>
  );
}
