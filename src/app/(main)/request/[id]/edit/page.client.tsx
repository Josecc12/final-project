"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Test, Order } from "@/app/types/models";
import RequestForm, { FormValues } from "@/app/(main)/patients/[id]/components/RequestForm";
import update from "@/actions/order/update";

interface PageClientProps {
  examenes: Test[];
  order: Order;
}

export default function PageClient({ examenes, order }: PageClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Preparar los datos iniciales para el formulario
  const initialData: FormValues = {
    examenId: order.examen.id,
    descripcion: order.examen.descripcion,
  };
  
  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await update(order.id, {
        ...values,
        pacienteId: order.paciente.id,
      });

      if (response.status === 200) {
        toast({
          title: "Orden actualizada exitosamente",
          description: "La orden de laboratorio ha sido actualizada",
          duration: 3000,
        });
        router.push("/request");
        router.refresh();
      } else {
        toast({
          title: "Error al actualizar la orden",
          description: "Ha ocurrido un error inesperado",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log("Error updating laboratory order:", error);
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle>Editar Orden de Laboratorio</CardTitle>
        <div className="text-sm text-muted-foreground">
          ID: {order.id}
        </div>
      </CardHeader>
      <CardContent>
        <RequestForm
          examenes={examenes}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          initialData={initialData}
        />
      </CardContent>
    </Card>
  );
}