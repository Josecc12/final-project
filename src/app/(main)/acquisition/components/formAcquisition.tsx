"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Insumo } from "@/app/types/models"
import { Pagination } from "@/app/types/api"
import SelectSearchBar from "@/components/navigation/SelectSearchBar"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
} from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { da, es } from "date-fns/locale"
import { Form, useFormContext } from "react-hook-form";
import { date, z } from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import schema from "./schema";


interface Lote {
  numeroLote: string
  fechaCaducidad: Date
  cantidadInicial: number
  status: string
  insumoId: string
}



type AcquisitionFormInputs = z.infer<typeof schema>;
type Props = {
  insumos: Insumo[]
  pagination?: Pagination;
}

export default function FormAcquisition({
  insumos,
  pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  },
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<AcquisitionFormInputs>();

  const [lotes, setLotes] = useState<Lote[]>([]);
  const [nuevoLote, setNuevoLote] = useState<Lote>({
    numeroLote: "",
    fechaCaducidad: new Date(),
    cantidadInicial: 0,
    status: "NUEVO",
    insumoId: "",
  });
  
  const agregarLote = () => {
    console.log("Nuevo Lote:", nuevoLote); // Agrega esta línea
    if (!nuevoLote.numeroLote) {
      console.log("Falta el número de lote."); // Agrega esta línea
    }

    if (!nuevoLote.fechaCaducidad) {
      console.log("Falta la fecha de caducidad."); // Agrega esta línea
    }
    if (nuevoLote.cantidadInicial <= 0) {
      console.log("La cantidad inicial debe ser mayor a 0."); // Agrega esta línea
    }
    if (!nuevoLote.insumoId) {
      console.log("Falta el insumo."); // Agrega esta línea
    }


    if (
      nuevoLote.numeroLote &&
      nuevoLote.fechaCaducidad &&
      nuevoLote.cantidadInicial > 0 &&
      nuevoLote.insumoId
    ) {
      setLotes([...lotes, nuevoLote]);
      setNuevoLote({
        numeroLote: "",
        fechaCaducidad: new Date(),
        cantidadInicial: 0,
        status: "NUEVO",
        insumoId: "",
      });
    } else {
      //console.log("Faltan datos en el nuevo lote."); // Agrega esta línea
    }
  }
  
  

  const eliminarLote = (index: number) => {
    setLotes(lotes.filter((_, i) => i !== index));
  }

  const enviarAdquisicion = () => {
   
    // Aquí iría la lógica para enviar los lotes al servidor
  }

  return (
    <div >
      <Card className="container mx-auto p-4 space-y-6">
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <FormField
          control={control}
          name="insumoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insumo</FormLabel>
                <Select
                    value={nuevoLote.insumoId}
                    onValueChange={(value) => setNuevoLote({ ...nuevoLote, insumoId: value })}
                  >
                  <SelectSearchBar 
                    insumos={insumos} 
                    onSelect={(insumo) => {
                      setNuevoLote({ ...nuevoLote, insumoId: insumo.id });
                      field.onChange(insumo.id); // Asegúrate de actualizar el formulario también
                    }} 
                  />

                  <SelectContent>
                    {insumos.map((insumo) => (
                      <SelectItem key={insumo.id} value={insumo.id}>
                        {insumo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
          </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="numeroLote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Lote</FormLabel>
              <Input
                placeholder="Número de lote"
                value={nuevoLote.numeroLote}
                onChange={(e) => {
                  setNuevoLote({ ...nuevoLote, numeroLote: e.target.value });
                  field.onChange(e.target.value); // Actualiza el valor en el formulario
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="fechaVencimiento"
          render={({ field }) => (
            <FormItem className="flex flex-col m-2">
              <FormLabel>Fecha de Caducidad</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full min-w-full p-0 relative" align="start">
                  <Calendar
                    className="!w-full min-w-full"
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) { // Verificamos que date no sea undefined
                        const selectedDate = date; // Formateamos la fecha a ISO
                        field.onChange(selectedDate); // Actualiza el formulario
                        setNuevoLote({ ...nuevoLote, fechaCaducidad: selectedDate }); // Actualiza el estado de nuevo lote
                      }
                    }}
                    disabled={(date) => new Date() > date}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
        )}/>



        <FormField
          control={control}
          name="cantidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad Inicial</FormLabel>
              <Input
                type="number"
                placeholder="Cantidad inicial"
                value={nuevoLote.cantidadInicial}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setNuevoLote({ ...nuevoLote, cantidadInicial: value });
                  field.onChange(value); // Actualiza el valor en el formulario
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button onClick={agregarLote} className="my-8">
          <Plus className="mr-2 h-4 w-4" /> Agregar Lote
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Insumo</TableHead>
            <TableHead>Número de Lote</TableHead>
            <TableHead>Fecha de Caducidad</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lotes.map((lote, index) => (
            <TableRow key={index}>
              <TableCell>
                {insumos.find(i => i.id === lote.insumoId)?.nombre}
              </TableCell>
              <TableCell>{lote.numeroLote}</TableCell>
              <TableCell>
                {lote.fechaCaducidad ? format(new Date(lote.fechaCaducidad), 'dd/MM/yyyy') : 'Sin fecha'}
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={lote.cantidadInicial}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const updatedLotes = [...lotes];
                    updatedLotes[index].cantidadInicial = value; // Actualiza la cantidad
                    setLotes(updatedLotes); // Actualiza el estado de lotes
                  }}
                />
              </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => eliminarLote(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>

      </Table>
      <CardFooter className="flex justify-end">
        <Button type="submit" disabled={lotes.length === 0}>
          Enviar Adquisición
        </Button>
      </CardFooter>
      
      </Card>
    </div>
  )
}