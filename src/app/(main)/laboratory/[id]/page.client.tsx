"use client"

import deleteLaboratory from "@/actions/laboratory/delete";
import { Test } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { ErrorResponse } from "@/app/types/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Delete from "@/components/ui/delete";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  test: Test
}

export default function PageClient({ test }: Props) {

  const insumos = test.insumoExamenes;
  const router  = useRouter();

  const onDelete = async () => {
    const response = await deleteLaboratory({ id: test.id }); 

    if (response?.status === 200) {
      toast({
        title      : "Examen de laboratorio eliminada exitosamente",
        description: `El examen ${test.nombre} ha sido eliminada`,
        variant    : "default",
      });
      router.push("/laboratory");
      router.refresh(); 
    } else if (response?.status === 401) {
      toast({
        title      : "Error de autenticación",
        description: "No estás autorizado para realizar esta acción.",
        variant    : "destructive",
      });
    } else if ("message" in response) {
      toast({
        duration   : 3000,
        title      : `Error ${response.status}`,
        description: (response as ErrorResponse).message,
      });
    }
  };

  return (
    <LayoutSection
      title={test.nombre}
      description={test.descripcion}
      actions={
        <div className="flex gap-2 md:self-end self-end">
          <Button variant="default" asChild>
          <Link href={`/laboratory/${test.id}/edit`}>Editar</Link>
          </Button>
          <Delete onDelete={onDelete} />
        </div>
      }
    >
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>

                <TableHead>
                  Insumo
                </TableHead>
                <TableHead className="w-[100px]">Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insumos.map((item, index) => (
                <TableRow key={index} >
                  <TableCell className="">{item.insumo.nombre}</TableCell>
                  <TableCell className="flex items-center justify-center">{item.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </LayoutSection>
  );
}
