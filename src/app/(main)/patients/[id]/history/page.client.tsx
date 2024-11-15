"use client";

import LayoutSection from "@/components/LayoutSection";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationComponent } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

import { Pagination } from "@/app/types/api";
import { PatientMedicalHistory } from "@/app/types/models";

type Props = {
  patientHistory: PatientMedicalHistory;
  pagination?: Pagination;
};

export default function PageClient({
  patientHistory,
  pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  },
}: Props) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    router.push(`${url.pathname}?${params.toString()}`);
  };

  // Función para formatear la fecha y hora
  const formatFecha = (dateString: string) => {
    const fecha = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(fecha);
  };
  
  return (
    <LayoutSection
      title="Historial de recetas"
      description={`Listado de todas las recetas existentes del paciente ${patientHistory.nombre}`}
    >
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Descripcion</TableHead>
                <TableHead className="cursor-pointer">Fecha</TableHead>
                <TableHead className="cursor-pointer">Insumos</TableHead>
                <TableHead className="cursor-pointer">Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {patientHistory?.retiros.map((retiro) => (
                <TableRow key={retiro.id}>
                  <TableCell>{retiro.descripcion}</TableCell>
                  <TableCell>{formatFecha(retiro.createdAt)}</TableCell>
                  <TableCell>{retiro.insumos?.map((insumo) => insumo.nombre).join(", ")}</TableCell>
                  <TableCell>{retiro.tipo}</TableCell>
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
