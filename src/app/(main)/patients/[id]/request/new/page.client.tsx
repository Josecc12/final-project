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
import { Test } from "@/app/types/models";
import RequestForm, { FormValues } from "../../components/RequestForm";
import create from "@/actions/order/create";

interface PageClientProps {
  patientId: string;
  examenes: Test[];
}

export default function PageClient({ patientId, examenes }: PageClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (values: FormValues) => {
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
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Nueva Orden de Laboratorio</CardTitle>
      </CardHeader>
      <CardContent>
        <RequestForm
          examenes={examenes}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </Card>
  );
}