"use client";

import { Pagination } from "@/app/types/api";
import { Order } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "@/components/navigation/SearchBar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationComponent } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import confirm from "@/actions/order/confirm";
import { useToast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";
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
  const router = useRouter();
  const { toast } = useToast()
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
    router.push(`${url.pathname}?${params.toString()}`);
    if (value === "") {
      router.push(`${url.pathname}`);
    }
  };

  const onRow = (id: string) => {
    router.push(`request/${id}`);
  };

  const handleConfirm = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    try {
      const response = await confirm(orderId);
      console.log(response);
      if (response.status !== 200) {
        toast({
          title: "confirmada",
          description: `la orden ha sido confirmada`,
          variant: "default",
          duration: 3000,
        });
      } else if ("message" in response) {
        toast({
          duration: 3000,
          title: `Error ${response.status}`,
          description: (response as ErrorResponse).message,
          variant: "destructive",
          } );
    }
      router.refresh(); // Refresh the page to show updated status
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <LayoutSection
      title="Solicitudes de Laboratorio"
      description="Todas tus solicitudes de laboratorio"
    >
     <SearchBar placeholder="Buscar" onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>     
                <TableHead className="w-[150px]">Paciente</TableHead>
                <TableHead className="w-[150px]">Examen</TableHead>
                <TableHead className="w-[150px]">Descripcion de Examen</TableHead>
                <TableHead className="w-[150px]">Usuario</TableHead>
                <TableHead className="w-[150px]">Estado</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.filter(order => order.estado == "Pendiente").map((order) => (
                <TableRow key={order.id} onClick={() => onRow(order.id)}>
                  <TableCell>{order.paciente.nombre}</TableCell>
                  <TableCell>{order.examen.nombre}</TableCell>
                  <TableCell>{order.examen.descripcion}</TableCell>
                  <TableCell>{order.usuario.nombre}</TableCell>
                  <TableCell>{order.estado}</TableCell>
                  <TableCell>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => handleConfirm(order.id, e)}
                      disabled={order.estado === 'CONFIRMADO'}
                    >
                      Confirmar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent page={pagination.page} totalPages={pagination.totalPages} onPageChange={onPageChange} />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}