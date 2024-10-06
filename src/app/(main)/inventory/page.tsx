"use client";

import { useState } from "react";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "../../../components/navigation/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationComponent } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorResponse } from "@/app/types/api";
import { toast } from "@/components/ui/use-toast";
import deleteSupply from "@/actions/inventory/delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const medicalSupplies = [
  {
    trazador: true,
    id: "42195e9f-b1ef-4331-aa15-dbac8fb53e49",
    codigo: "INS-147",
    nombre: "Insumo Ejemplo",
    categoria: {
        id: "08fd8e7a-f877-4cbc-b40b-7fb4023f7832",
        nombre: "Maternidad"
    }
  }
];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [currentSupplyId, setCurrentSupplyId] = useState<string | null>(null);

  const onPageChange = (page: number) => {
    router.push("inventory/?page=" + page);
  };

  const onDelete = async (id: string) => {
    const response = await deleteSupply({ id });

    if (response?.status === 200) {
      toast({
        title: "Insumo eliminado exitosamente",
        description: `El insumo ha sido eliminado.`,
        variant: "default",
      });
      router.push("/inventory");
      router.refresh();
    } else if (response?.status === 401) {
      setIsDialogOpen(false); 
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

  const handleDeleteClick = (supplyId: string) => {
    setCurrentSupplyId(supplyId); 
    setIsDialogOpen(true); 
  };

  return (
    <LayoutSection
    description="Encuentra aquí la información de los inventarios de los productos, stock, status y más."
      title="Inventarios"
    >
      <Button variant="default" asChild className="self-end">
        <Link href={`/inventory/new`}>Agregar Producto</Link>
      </Button>
      <SearchBar />
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[100px] hidden md:table-cell">
                  Codigo
                </TableHead>
                <TableHead className="cursor-pointer">Nombre</TableHead>
                <TableHead className="cursor-pointer hidden lg:table-cell">
                  Categoría
                </TableHead>
                <TableHead className="w-[150px]">Estado de stock</TableHead>
                <TableHead className="size-[40px] p-0 pr-1" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalSupplies.map((supply) => (
                <TableRow key={supply.id}>
                  <TableCell className="w-[100px] hidden md:table-cell">
                    {supply.codigo}
                  </TableCell>
                  <TableCell>{supply.nombre}</TableCell>

                  <TableCell className="hidden lg:table-cell">
                    {supply.categoria.nombre}
                  </TableCell>
                  <TableCell className="w-[150px] flex justify-center">
                    <Badge
                      variant="outline"
                      className={clsx(
                        supply.trazador
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {supply.trazador ? "En stock" : "Agotado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="size-[40px]  p-0 pr-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="focus:ring-0 focus-visible:ring-0"
                        >
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href="/">Editar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button 
                            variant="ghost"
                            className="p-0 text-normal font-normal h-auto" 
                            onClick={() => handleDeleteClick(supply.id)} >
                            Eliminar
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent
            page={currentPage}
            totalPages={10}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </Card>

      {/* Diálogo de confirmación */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro/a de eliminar este insumo?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede revertir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(currentSupplyId!)}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LayoutSection>
  );
}