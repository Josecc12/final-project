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
import user from "@/actions/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users2, Mail, Calendar, IdCard, ContactRound, Activity, Shell, Siren, Milk } from "lucide-react";

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
      
      <Card className="w-full max-w-md mx-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Detalle Paciente</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            
            <div className="flex items-center space-x-2">
              <Users2 className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Nombre</Typography>
              <Typography variant="muted">{patient.nombre}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <Users2 className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Sexo</Typography>
              <Typography variant="muted">{patient.sexo}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Edad</Typography>
              <Typography variant="muted">{age} años / ({patient.nacimiento})</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <IdCard className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
                <Typography variant="small" className="font-bold">CUI</Typography>
                <Typography variant="muted">{patient.cui}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <ContactRound className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
                <Typography variant="small" className="font-bold">Familiares</Typography>
                <Typography variant="muted">{patient.familiares}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Quirúrgicos</Typography>
              <Typography variant="muted">{patient.quirurgicos}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <Shell className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Traumáticos</Typography>
              <Typography variant="muted">{patient.traumaticos}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <Siren className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Alergias</Typography>
              <Typography variant="muted">{patient.alergias}</Typography>
              </span>
            </div>
            <br />

            <div className="flex items-center space-x-2">
              <Milk className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
              <Typography variant="small" className="font-bold">Vicios</Typography>
              <Typography variant="muted">{patient.vicios}</Typography>
              </span>
            </div>
            <br />
            
            <div className="flex gap-5 justify-end md:self-end">
              <Button variant="default" asChild>
                <Link href={`/patients/${patient.id}/edit`}>Editar</Link>
              </Button>
              <Delete onDelete={onDelete} />
            </div>

          
          </div>
        </CardContent>
      </Card>

    </LayoutSection>
  );
}
