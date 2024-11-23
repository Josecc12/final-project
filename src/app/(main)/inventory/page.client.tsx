"use client";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "../../../components/navigation/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaCircle, FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pagination } from "@/app/types/api";
import { Insumo } from "@/app/types/models";
import { PaginationComponent } from "@/components/ui/pagination";

// Función para seleccionar el ícono y el color según el estado del inventario
function getSemaphoreIcon(status: string) {
  switch (status) {
    case "red":
      return <FaCircle className="text-red-500" />;
    case "yellow":
      return <FaCircle className="text-yellow-500" />;
    case "green":
      return <FaCircle className="text-green-500" />;
    case "out-of-stock":
      return <FaExclamationTriangle className="text-red-500" />;
    default:
      return <FaExclamationTriangle className="text-gray-400" />;
  }
}

type Props = {
  insumos: Insumo[];
  pagination?: Pagination;
};

export default function PageClient({
  insumos,
  pagination = { totalItems: 1, totalPages: 1, page: 1 },
}: Props) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    router.push(`${url.pathname}?${params.toString()}`);
  };

  const onSearch = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("query", value);
    params.delete("page"); // Reset page when searching
    router.push(`${url.pathname}?${params.toString()}`);
    if (value === "") {
      router.push(`${url.pathname}`);
    }
  };

  const onRow = (id: string) => {
    router.push(`inventory/${id}`);
  };

  return (
    <LayoutSection
      description="Encuentra aquí la información de los inventarios de los productos, stock, status y más."
      title="Inventarios"
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/inventory/new`}>Agregar Producto</Link>
        </Button>
      }
    >
      <Card>
        <SearchBar placeholder="Buscar" onSearch={onSearch}/>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[100px] hidden md:table-cell">
                  Código
                </TableHead>
                <TableHead className="cursor-pointer">Nombre</TableHead>
                <TableHead className="cursor-pointer hidden lg:table-cell">
                  Categoría
                </TableHead>
                <TableHead className="w-[100px] text-right">
                  Cantidad
                </TableHead>
                <TableHead className="w-[150px]">Estado de stock</TableHead>
                <TableHead className="size-[40px] p-0 pr-1" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {insumos.map((supply) => (
                <TableRow key={supply.id} onClick={() => onRow(supply.id)}>
                  <TableCell className="w-[100px] hidden md:table-cell">
                    {supply.codigo}
                  </TableCell>
                  <TableCell>{supply.nombre}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {supply.categoria.nombre}
                  </TableCell>
                  <TableCell className="text-right">
                    {supply.cantidadActual.toLocaleString()}
                  </TableCell>
                  <TableCell className="w-[150px] flex justify-center items-center">
                    {getSemaphoreIcon(supply.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}