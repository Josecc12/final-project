'use client';

import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { toast } from "@/components/ui/use-toast";
import { ClipboardList, Edit, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { ErrorResponse } from "@/app/types/api";
import Delete from "@/components/ui/delete";
import deleteDepartment from "@/actions/department/delete";
import { Department } from "@/app/types/models"; 
import { useRouter } from "next/navigation";
import { MessageSquare, Notebook } from "lucide-react";



type Props = {
  department: Department;
};

export default function PageClient({ department }: Props) {
  
  const router = useRouter(); 

  const onDelete = async () => {
    const response = await deleteDepartment({ id: department.departamento.id }); 

    if (response?.status === 200) {
      toast({
        title: "Departamento eliminado exitosamente",
        description: `El departamento ${department.departamento.nombre} ha sido eliminado.`,
        variant: "default",
      });
      router.push("/department");
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
               <CardTitle>Detalle del Departamento</CardTitle>
              <Typography variant="small" className="text-muted-foreground">
               
              </Typography>
            </div>
            
            <div className="flex gap-2">
              <Button variant="default" asChild>
                <Link href={`/department/${department.departamento.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="destructive" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </CardHeader>
          {/* Código del departamento */}
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Código</Typography>
              <Typography variant="muted">{department.departamento.id}</Typography>
            </div>
            
            </div>
            {/* Nombre del departamento */}
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Nombre</Typography>
              <Typography variant="muted">{department.departamento.nombre}</Typography>
            </div>
          </div>          
      </CardContent>
    </Card>
  

  );
}

