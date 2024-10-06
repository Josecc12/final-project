'use client';

import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { toast } from "@/components/ui/use-toast";
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
      title={`Detalle Departamento`}
      description="Aqui puedes ver los detalles de los departamentos del centro de salud"
      actions={
        <div className="flex gap-2 self-end">
          <Button variant="default" asChild>
            <Link href={`/department/${department.id}/edit`}>Editar</Link>
          </Button>
          <Delete onDelete={onDelete} />
        </div>
      }
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">
            Codigo
          </Typography>
          <Typography variant="muted">{department.id}</Typography>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">
            Nombre
          </Typography>
          <Typography variant="muted">{department.nombre}</Typography>
        </div>
      </div>
    </LayoutSection>
  );
}
