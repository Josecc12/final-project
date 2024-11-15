"use client";

import { Pagination } from "@/app/types/api";
import { Order } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "@/components/navigation/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type Props = {
  orders: Order[]
  pagination?: Pagination;
}

export default function PageClient({
  orders,
  pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  },
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      if (ref.current) {
        ref.current.click();
      }
    } else {
      if (dialogRef.current) {
        dialogRef.current.click();
      }
    }
  };


  const router = useRouter();
  const onRow = (id: string) => {
    router.push(`request/${id}`);
  };

  return (
    <LayoutSection
      title="Solicitudes de Laboratorio"
      description="Todas tus solicitudes de laboratorio"
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/request/new`}>Nueva solicitud</Link>
        </Button>
      }
    >
      <SearchBar placeholder="Buscar" />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>     
              <TableHead  className="w-[150px]">Paciente</TableHead>
                <TableHead className="w-[150px]">Examen</TableHead>
                <TableHead className="w-[150px]">Descripcion de Examen</TableHead>
                <TableHead  className="w-[150px]">Usuario</TableHead>
                <TableHead  className="w-[150px]">Estado</TableHead>  
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
               <TableRow key={order.id} onClick={() => onRow(order.id)}>
                <TableCell>{order.paciente.nombre}</TableCell>
                  <TableCell>{order.examen.nombre}</TableCell>
                  <TableCell>{order.examen.descripcion}</TableCell>
                  <TableCell>{order.usuario.nombre}</TableCell>
                  <TableCell>{order.estado}</TableCell>
                  <TableCell>{}</TableCell>
                  <TableCell>{}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent page={1} totalPages={100} />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}
