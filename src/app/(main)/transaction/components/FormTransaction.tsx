'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DropdownSearch from "@/components/DropdownSearch";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, PlusCircleIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Department, Insumo } from "@/app/types/models";
import { Card } from "@/components/ui/card";
import { z } from "zod";

const schema = z.object({
  origen: z.string().min(1, "Selecciona el departamento de origen"),
  destino: z.string().min(1, "Selecciona el departamento de destino"),
  insumos: z.array(
      z.object({
          cantidad: z.number().min(1, "La cantidad mínima es 1"),
          insumo: z.string().min(1, "Selecciona un insumo"),
      })
  ),
});

type FormInputs = z.infer<typeof schema>;

type Props = {
    departamentos: Department[];
    insumos: Insumo[];
};

export default function FormTransaction({ departamentos, insumos }: Props) {
  const { 
          control, 
          formState: { errors, defaultValues },
          register, 
          setValue 
        } = useFormContext<FormInputs>();

  const { fields, append, remove } = useFieldArray({
      control,
      name: "insumos",
  });
  console.log(fields);
  return (
    <div className="container mx-auto p-4">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Departamento de Origen*/}
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
                      {departamentos.map(departamento => (
                        <SelectItem key={departamento.id} value={departamento.id}>{departamento.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.origen?.message}</FormMessage>
              </FormItem>
            )}
          />
          {/* Departamento de Destino */}
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
                      {departamentos.map(departamento => (
                        <SelectItem key={departamento.id} value={departamento.id}>{departamento.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.destino?.message}</FormMessage>
              </FormItem>
            )}
          />
           
        </div>
        {/* Detalles de Insumos */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Detalles de Insumos</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-3">
              <FormField
                control={control}
                name={`insumos.${index}.cantidad`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Cantidad"
                      required
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)} // Convirtiendo a número
                    />
                    <FormMessage>{errors.insumos?.[index]?.cantidad?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`insumos.${index}.insumo`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insumo</FormLabel>
                    <DropdownSearch
                      defaultValue={field.value}
                      name={`insumos.${index}.insumo`}
                      setValue={setValue}
                      placeholder="Selecciona un insumo"
                    />
                    <FormMessage>{errors.insumos?.[index]?.insumo?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="self-end min-w-[40px]"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ cantidad: 1, insumo: "" })}
            className="w-fit"
          >
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Agregar Insumo
          </Button>
        </div>
        <Button type="submit" className="mt-4">Guardar Movimiento</Button>
      </Card>
    </div>
  );
}
