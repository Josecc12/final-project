'use client';

import { Patient } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { differenceInYears } from 'date-fns';
import Link from "next/link";
import Delete from "@/components/ui/delete"; 
import deletePatient from "@/actions/patient/delete"; 
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";

type Props = {
  patient: Patient;
}

export default function PageClient({ patient }: Props) {
  const age = differenceInYears(new Date(), new Date(patient.nacimiento));
  const router = useRouter(); 

  const onDelete = async () => {
    const response = await deletePatient({ id: patient.id }); 
    
    if (response?.status === 200) {
      toast({
        title: "Paciente eliminado exitosamente",
        description: `El paciente ha sido eliminado/a`,
        variant: "default",
      });
      router.push("/patients");
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
      title="Paciente"
      description="Información sobre el paciente"
      actions={
        <div className="flex gap-2 md:self-end self-end">
           <Button variant="outline" asChild>
            <Link href={`/patients/${patient.id}/recipe`}>Nueva receta</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href={`/patients/${patient.id}/edit`}>Editar</Link>
          </Button>
         
          <Delete onDelete={onDelete} />
        </div>
      }
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{patient.nombre}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Sexo</Typography>
          <Typography variant="muted">{patient.sexo}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Edad</Typography>
          <Typography variant="muted">{age} años / ({patient.nacimiento})</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">CUI</Typography>
          <Typography variant="muted">{patient.cui}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Familiares</Typography>
          <Typography variant="muted">{patient.familiares}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Quirúrgicos</Typography>
          <Typography variant="muted">{patient.quirurgicos}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Traumáticos</Typography>
          <Typography variant="muted">{patient.traumaticos}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Alergias</Typography>
          <Typography variant="muted">{patient.alergias}</Typography>
        </div>


        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Vicios</Typography>
          <Typography variant="muted">{patient.vicios}</Typography>
        </div>


      </div>
    </LayoutSection>
  );
}
