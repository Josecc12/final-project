import category from "@/actions/category";
import { Department } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { MessageSquare, Notebook } from "lucide-react";
import Link from "next/link";

type Props = {
  department: Department;
};

export default function PageClient({ department }: Props) {
  return (
    <LayoutSection
      title={``}
      description="Aqui puedes ver los detalles de los departamentos del centro de salud"
     
    >
      <Card className="w-full max-w-md mx-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Detalles</CardTitle>
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

        <div className="flex gap-2 self-end">
          <Button variant="default" asChild>
            <Link href={`/department/${department.id}/edit`}>Editar</Link>
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>

      </CardContent>
    </Card>



    
    </LayoutSection>
  );
}
