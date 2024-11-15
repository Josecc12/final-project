"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import create from "@/actions/order/create";
import { Test } from "@/app/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  examenId: z.string().min(1, "Debe seleccionar un examen"),
  descripcion: z.string().min(1, "La descripción es requerida"),
});

interface PageClientProps {
  patientId: string;
  examenes: Test[];
}

export default function PageClient({ patientId, examenes }: PageClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedExamen, setSelectedExamen] = useState<Test | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examenId: "",
      descripcion: "",
    },
  });

  const handleExamenChange = (examenId: string) => {
    const examen = examenes.find((e) => e.id === examenId);
    setSelectedExamen(examen || null);
    form.setValue("examenId", examenId);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await create({
        ...values,
        pacienteId: patientId,
      });

      if (response.status === 201) {
        toast({
          title: "Orden creada exitosamente",
          description: "La orden de laboratorio ha sido creada",
          duration: 3000,
        });
        router.push("/request");
        router.refresh();
      } else {
        toast({
          title: "Error al crear la orden",
          description: "Ha ocurrido un error inesperado",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log("Error creating laboratory order:", error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Nueva Orden de Laboratorio</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="examenId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examen</FormLabel>
                  <Select
                    onValueChange={(value) => handleExamenChange(value)}
                    defaultValue={field.value}
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
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear Orden"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}