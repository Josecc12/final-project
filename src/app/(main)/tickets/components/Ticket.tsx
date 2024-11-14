import confirm from "@/actions/recipe/confirm";
import { ErrorResponse } from "@/app/types/api";
import { Insumo } from "@/app/types/models";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ChevronsUpDown } from "lucide-react";


type Props = {
  id: string;
  createdAt: string;
  usuario: string;
  paciente: string;
  insumos: (Insumo & { cantidad: number })[];
}

export function Ticket({
  id,
  createdAt,
  usuario,
  paciente,
  insumos,
}: Props) {

  const { toast } = useToast() 

  const onConfirm = async () => {
    const response = await confirm(id);
    if (response?.status === 200 || response?.status === 201) {
      toast({
        title: "Orden entregada exitosamente",
        description: `La orden ha sido entregada`,
        variant: "default",
      });
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

  }

  return (

    

    <Card className="overflow-hidden w-full">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Orden {id}
          </CardTitle>
          <CardDescription>{
            new Date(createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <ChevronsUpDown className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onConfirm}>Entregada</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Rechazar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalles de Orden</div>
          <ul className="grid gap-3">

            {
              insumos.map((insumo) => (
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {insumo.nombre} x <span>{ insumo.cantidad}</span>
                  </span>

                </li>
              ))
            }
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Infomracion de paciente</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Paciente</dt>
              <dd>{paciente}</dd>
            </div>

          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Recetado por: {usuario}
        </div>
      </CardFooter>
    </Card>
  );
}


