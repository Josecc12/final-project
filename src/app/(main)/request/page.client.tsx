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

import { useRouter } from "next/navigation";

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
      if (response.status == 201) {
        toast({
          title: "Confirmada",
          description: `La orden ha sido confirmada`,
          variant: "default",
          duration: 3000,
        });
      } else if (response.status == 404) {
        toast({
          duration: 3000,
          title: `Error ${response.status}`,
          description: "No se pudo confirmar la orden por falta de medicamento en el inventario de laboratorio",
          variant: "destructive",
        });
      }else if ("message" in response) {
        toast({
          duration: 3000,
          title: `Error ${response.status}`,
          description: (response as ErrorResponse).message,
          variant: "destructive",
        });
      }
      router.refresh(); // Refresh the page to show updated status
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  // Filtrar solo órdenes pendientes
  const pendingOrders = orders.filter(order => order.estado == "Pendiente");

  return (
    <LayoutSection
      title="Solicitudes de Laboratorio"
      description="Todas tus solicitudes de laboratorio"
    >
      <SearchBar placeholder="Buscar" onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          {/* Tabla de escritorio */}
          <Table className="hidden md:table overflow-hidden">
            <TableHeader>
              <TableRow>     
                <TableHead className="w-[150px]">Paciente</TableHead>
                <TableHead className="w-[150px]">Examen</TableHead>
                <TableHead className="w-[150px]">Descripción de Examen</TableHead>
                <TableHead className="w-[150px]">Usuario</TableHead>
                <TableHead className="w-[150px]">Estado</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.map((order) => (
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

          {/* Vista de lista para móviles */}
          <div className="block md:hidden space-y-4 px-4">
            {pendingOrders.map((order) => (
              <div 
                key={order.id} 
                className="border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors"
                onClick={() => onRow(order.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.paciente.nombre}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {order.examen.nombre}
                    </p>
                  </div>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                    order.estado === 'Pendiente' ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'
                  }`}>
                    {order.estado}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500 truncate">
                    {order.usuario.nombre}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfirm(order.id, e);
                    }}
                    disabled={order.estado === 'CONFIRMADO'}
                    className="ml-2"
                  >
                    Confirmar
                  </Button>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-400">
                    {order.examen.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje cuando no hay órdenes pendientes */}
          {pendingOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay solicitudes de laboratorio pendientes.
            </div>
          )}
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