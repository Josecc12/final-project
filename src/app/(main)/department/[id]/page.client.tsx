
import { Department} from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

type Props = {
  department: Department;
};

export default function PageClient({ department }: Props) {
  return (
    <LayoutSection title={`Detalle Departamento`} description="Aqui puedes ver los detalles de los departamentos del centro de salud" 
    actions= {
      <div className="flex gap-2 self-end">
      <Button variant="default" asChild>
        <Link href={`/department/${department.id}/edit`}>
        Editar</Link>
      </Button>
      <Button variant="destructive">Eliminar</Button>
    </div>
    }
    
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Codigo</Typography>
          <Typography variant="muted">{department.id}</Typography>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{department.nombre}</Typography>
        </div>

        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Estado</Typography>
          <Typography variant="muted">{department.is_active ? "Activo" : "Inactivo"}</Typography>
        </div>
        
        <div className="w-full flex  items-center gap-1">
        </div>
      </div>
    </LayoutSection>
  );
}
