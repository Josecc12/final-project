'use client';

import { useRouter } from "next/navigation";
import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Delete from "@/components/ui/delete";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Tag, Warehouse, Building2, Trash2,Edit, } from "lucide-react";
import deleteInsumo from "@/actions/inventory/delete";
import Insumo from "@/app/types/models/Insumo";
import { ErrorResponse } from "@/app/types/api";
import { Department } from "@/app/types/models";

type Props = {
  insumo: Insumo;
};

export default function PageClient({ insumo }: Props) {
  const router = useRouter();

  const onDelete = async () => {
    const response = await deleteInsumo({ id: insumo.id });

    if (response?.status === 200) {
      toast({
        title: "Insumo eliminado exitosamente",
        description: `El insumo ${insumo.nombre} ha sido eliminado`,
        variant: "default",
      });
      router.push("/inventory");
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
                <CardTitle>Detalle de insumo</CardTitle>
                <Typography variant="small" className="text-muted-foreground">
                  Aquí puedes ver los detalles del insumo
                </Typography>
              </div>
              <div className="flex gap-2">
                <Button variant="default" asChild>
                  <Link href={`/inventory/${insumo.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="destructive" size="icon" onClick={onDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          {/* Código del insumo */}
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Código</Typography>
              <Typography variant="muted">{insumo.codigo}</Typography>
            </div>
          </div>

          {/* Nombre del insumo */}
          <div className="flex items-center space-x-2">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Nombre</Typography>
              <Typography variant="muted">{insumo.nombre}</Typography>
            </div>
          </div>

          {/* Categoría */}
          <div className="flex items-center space-x-2">
            <Warehouse className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Categoría</Typography>
              <Typography variant="muted">{insumo.categoria.nombre}</Typography>
            </div>
          </div>

          {/* Departamentos */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <Typography variant="small" className="font-bold">Departamentos</Typography>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {insumo.departamentos.map((dep: Department) => (
                <Card key={dep.id} className="p-4 border rounded-lg shadow-sm">
                  <Typography variant="small" className="font-bold">{dep.nombre}</Typography>
                </Card>
              ))}
            </div>
          </div>

          {/* Acciones */}
          
        </CardContent>
      </Card>
  );
}
