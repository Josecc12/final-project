'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from 'lucide-react';
import { useFormContext } from "react-hook-form";
import { useState } from 'react';
import { Department, Insumo } from "@/app/types/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Detalle {
  insumo: string;
  cantidad: number;
}

// Lista de insumos predefinidos
type Props = {
    departamentos: Department[];
    insumos: Insumo[];
};

export default function FormTransaction(
    { departamentos, insumos }: Props

) {
  const { control, formState: { errors } } = useFormContext();
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [nuevoInsumo, setNuevoInsumo] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState('');

  const agregarDetalle = () => {
    if (nuevoInsumo && nuevaCantidad) {
      setDetalles([...detalles, { insumo: nuevoInsumo, cantidad: Number(nuevaCantidad) }]);
      setNuevoInsumo('');
      setNuevaCantidad('');
    }
  };

  const eliminarDetalle = (index: number) => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movimiento de Insumos</h1>
      <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="origen"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="origen">Departamento de Origen</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger id="origen">
                      <SelectValue placeholder="Seleccione origen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dep1">Departamento 1</SelectItem>
                      <SelectItem value="dep2">Departamento 2</SelectItem>
                      <SelectItem value="dep3">Departamento 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
               
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="destino"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="destino">Departamento de Destino</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} required>
                    <SelectTrigger id="destino">
                      <SelectValue placeholder="Seleccione destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dep1">Departamento 1</SelectItem>
                      <SelectItem value="dep2">Departamento 2</SelectItem>
                      <SelectItem value="dep3">Departamento 3</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
               
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="descripcion">Descripción</FormLabel>
              <FormControl>
                <Input
                  id="descripcion"
                  placeholder="Descripción del movimiento"
                  {...field}
                  required
                />
              </FormControl>
              
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Detalles de Insumos</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Select onValueChange={setNuevoInsumo} value={nuevoInsumo}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Seleccione insumo" />
              </SelectTrigger>
              <SelectContent>
                {insumos.map((insumo) => (
                  <SelectItem key={insumo} value={insumo}>{insumo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Cantidad"
              value={nuevaCantidad}
              onChange={(e) => setNuevaCantidad(e.target.value)}
              className="w-full sm:w-[100px]"
            />
            <Button type="button" onClick={agregarDetalle}>Agregar</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insumo</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detalles.map((detalle, index) => (
              <TableRow key={index}>
                <TableCell>{detalle.insumo}</TableCell>
                <TableCell>{detalle.cantidad}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="icon" onClick={() => eliminarDetalle(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button type="submit">Guardar Movimiento</Button>
      </form>
        </Card>
    </div>
  );
}
