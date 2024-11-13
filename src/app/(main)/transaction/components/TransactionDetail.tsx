import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from '@/app/types/models';


interface TransactionDetailProps {
  transaction: Transaction;
}

const TransactionDetail = ({ transaction }: TransactionDetailProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ID de Transacción</p>
              <p className="text-sm">{transaction.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha de Creación</p>
              <p className="text-sm">
                {format(new Date(transaction.createdAt), "dd/MM/yyyy HH:mm:ss")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Usuario</p>
              <p className="text-sm">{transaction.user.username}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Descripción</p>
            <p className="text-sm mt-1">{transaction.descripcion}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalle de Insumos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departamento</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Existencia</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaction.detalleRetiro.map((detalle) => (
                <TableRow key={detalle.id}>
                  <TableCell>{detalle.insumoDepartamento.departamento.nombre}</TableCell>
                  <TableCell className="text-right">{detalle.cantidad}</TableCell>
                  <TableCell className="text-right">{detalle.insumoDepartamento.existencia}</TableCell>
                  <TableCell>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionDetail;