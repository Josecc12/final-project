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
import { Trash2Icon, PlusCircleIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Department } from "@/app/types/models";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { useState } from 'react';

const schema = z.object({
  origen: z.string().min(1, "Selecciona el departamento de origen"),
  destino: z.string().min(1, "Selecciona el departamento de destino"),
  insumos: z.array(
    z.object({
      cantidad: z.number().min(1, "La cantidad mínima es 1"),
      insumoId: z.string().min(1, "Selecciona un insumo"),
    })
  )
  .min(1, "Debe agregar al menos un insumo")
  .refine(
    (insumos) => {
      const insumoIds = insumos.map(i => i.insumoId);
      return new Set(insumoIds).size === insumoIds.length;
    },
    {
      message: "No puede haber insumos duplicados",
    }
  ),
}).refine((data) => data.origen !== data.destino, {
  message: "El departamento de origen y destino no pueden ser el mismo",
  path: ["destino"],
});

type FormInputs = z.infer<typeof schema>;

type Props = {
    departamentos: Department[];
};

export default function FormTransaction({ departamentos}: Props) {
  const { 
          control, 
          formState: { errors, defaultValues },
          register, 
          setValue,
          watch,
          trigger 
        } = useFormContext<FormInputs>();

  const [duplicateErrors, setDuplicateErrors] = useState<{ [key: number]: string }>({});

  const { fields, append, remove } = useFieldArray({
      control,
      name: "insumos",
  });

  // Función para verificar si un insumo ya existe
  const isInsumoAlreadySelected = (insumoId: string, currentIndex: number) => {
    const insumos = watch('insumos');
    return insumos?.some((insumo, idx) => 
      insumo.insumoId === insumoId && idx !== currentIndex
    );
  };

  // Función modificada para manejar el cambio de insumo
  const handleInsumoChange = (value: string, index: number) => {
    if (isInsumoAlreadySelected(value, index)) {
      // Si el insumo ya existe, mostramos el error
      setDuplicateErrors(prev => ({
        ...prev,
        [index]: "Este insumo ya fue seleccionado"
      }));
      return;
    }
    // Limpiamos el error si existe
    setDuplicateErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
    setValue(`insumos.${index}.insumoId`, value);
    trigger('insumos'); // Esto dispara la validación del formulario
  };

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
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-2">
            <div className="flex items-end gap-3">
              <div className="flex flex-col gap-1 w-full max-w-[100px]">
                <label htmlFor={`insumos.${index}.cantidad`} className="text-sm font-medium">
                  Cantidad
                </label>
                <Input
                  id={`insumos.${index}.cantidad`}
                  type="number"
                  {...register(`insumos.${index}.cantidad` as const, {
                    valueAsNumber: true,
                    required: "La cantidad es requerida",
                    min: { value: 1, message: "La cantidad mínima es 1" },
                  })}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor={`insumos.${index}.insumo`} className="text-sm font-medium">
                  Insumo
                </label>
                <DropdownSearch
                  defaultValue={defaultValues?.insumos?.[index]?.insumoId}
                  name={`insumos.${index}.insumoId` as const}
                  setValue={(name, value) => handleInsumoChange(value, index)}
                  placeholder="Selecciona un insumo"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="self-end min-w-[40px]"
                disabled={fields.length === 1}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
            {errors.insumos?.[index]?.cantidad && (
              <p className="text-sm text-red-500">{errors.insumos[index]?.cantidad?.message}</p>
            )}
            {errors.insumos?.[index]?.insumoId && (
              <p className="text-sm text-red-500">{errors.insumos[index]?.insumoId?.message}</p>
            )}
            {duplicateErrors[index] && (
              <p className="text-sm text-red-500">{duplicateErrors[index]}</p>
            )}
          </div>
        ))}
        
        {/* Mostrar error general de insumos */}
        {errors.insumos && !Array.isArray(errors.insumos) && (
          <p className="text-sm text-red-500 mt-2">{errors.insumos.message}</p>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ cantidad: 1, insumoId: "" })}
          className="w-fit mt-4"
        >
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Agregar Insumo
        </Button>

        <Button type="submit" className="mt-4">Guardar Movimiento</Button>
      </Card>
    </div>
  );
}