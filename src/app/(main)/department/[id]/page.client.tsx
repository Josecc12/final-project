'use client';

import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare, Notebook } from "lucide-react";
import Link from "next/link";
import { ErrorResponse } from "@/app/types/api";
import Delete from "@/components/ui/delete";
import deleteDepartment from "@/actions/department/delete";
import { Department } from "@/app/types/models"; 
import { useRouter } from "next/navigation";

type Props = {
  department: Department;
};

export default function PageClient({ department }: Props) {
  
  const router = useRouter(); 

  const onDelete = async () => {
    const response = await deleteDepartment({ id: department.id }); 

    if (response?.status === 200) {
      toast({
        title: "Departamento eliminado exitosamente",
        description: `El departamento ${department.nombre} ha sido eliminado.`,
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
    <LayoutSection
      title={`Detalles Departamento`}
      description="Aqui puedes ver los detalles de los departamentos del centro de salud"
     
    >
      <Card className="w-full max-w-md mx-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center"></CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">

              <Typography variant="small" className="font-bold">Codigo</Typography>
              <Typography variant="muted">{department.id}</Typography>
              
              </span>
            </div>
            <br />

          <div className="flex items-center space-x-2">
            <Notebook className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">
            <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{department.nombre}</Typography>
            </span>
          </div>
          <br />             
        </div>

        <div className="flex gap-5 justify-end md:self-end">
          <Button variant="default" asChild>
            <Link href={`/department/${department.id}/edit`}>Editar</Link>
          </Button>
          <Delete onDelete={onDelete} />
        </div>

      </CardContent>
    </Card>



    
    </LayoutSection>
  );
}
