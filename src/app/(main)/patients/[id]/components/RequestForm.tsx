"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Test } from "@/app/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const formSchema = z.object({
  examenId: z.string().min(1, "Debe seleccionar un examen"),
  descripcion: z.string().min(1, "La descripción es requerida"),
});

export type FormValues = z.infer<typeof formSchema>;

interface RequestFormProps {
  examenes: Test[];
  onSubmit: (values: FormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  initialData?: FormValues;
}

export default function RequestForm({ 
  examenes, 
  onSubmit,
  onCancel, 
  isSubmitting,
  initialData,
}: RequestFormProps) {
  const [selectedExamen, setSelectedExamen] = useState<Test | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examenId: initialData?.examenId || "",
      descripcion: initialData?.descripcion || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      // Establecemos los valores manualmente
      form.setValue("examenId", initialData.examenId);
      form.setValue("descripcion", initialData.descripcion);
    }
  }, [initialData, form]);

  // Establecer el examen seleccionado inicial cuando hay datos iniciales
  useEffect(() => {
    if (initialData?.examenId) {
      const examen = examenes.find((e) => e.id === initialData.examenId);
      setSelectedExamen(examen || null);
    }
  }, [initialData, examenes]);

  const handleExamenChange = (examenId: string) => {
    const examen = examenes.find((e) => e.id === examenId);
    setSelectedExamen(examen || null);
    form.setValue("examenId", examenId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="examenId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Examen</FormLabel>
              <Select
                onValueChange={(value) => handleExamenChange(value)}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un examen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {examenes.map((examen) => (
                    <SelectItem key={examen.id} value={examen.id}>
                      {examen.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese la descripción de la orden"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedExamen && selectedExamen.insumoExamenes && selectedExamen.insumoExamenes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Insumos Requeridos</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Insumo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedExamen.insumoExamenes.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.insumo?.nombre || 'Sin nombre'}</TableCell>
                    <TableCell className="text-right">{item.cantidad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}