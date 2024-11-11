"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import FormInventory from "../../components/FormInventory";

import update from "@/actions/inventory/update";
import { ErrorResponse } from "@/app/types/api";
import { Insumo, Category, Department } from "@/app/types/models";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  nombre: z.string().min(1, "El nombre es requerido"),
  codigo: z.string().min(1, "El código es requerido"),
  categoriaId: z.string().min(1, "La categoría es requerida"),
  trazador: z.boolean().default(false), // Booleano con valor por defecto
});

type InsumoFormInputs = z.infer<typeof schema>;

type Props = {
  insumo: Insumo;
  categorias: Category[];
  departamentos: Department[];
};

export default function PageClient({ insumo, categorias, departamentos }: Props) {
  const methods = useForm<InsumoFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      id: insumo.id, // Incluir el ID en los valores predeterminados
      nombre: insumo.nombre,
      codigo: insumo.codigo,
      categoriaId: insumo.categoria.id,
      trazador: insumo.trazador ?? false, // Asegurar valor booleano
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: InsumoFormInputs) => {
    try {
      console.log(data);
      const response = await update(data);
      console.log(response);

      if (response.status === 201 || response.status === 200) {
        toast({
          title: "Insumo actualizado exitosamente",
          description: `El insumo ${data.nombre} ha sido actualizado`,
          duration: 3000,
        });
        router.push("/inventory");
      } else {
        toast({
          title: `Error ${response.status}`,
          description: (response as ErrorResponse).message,
          duration: 3000,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error al actualizar",
        description: error.message,
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <LayoutSection
      title="Editar Insumo"
      description="Modifica la información del insumo"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInventory categorias={categorias} departamentos={departamentos} />
          <button type="submit">Actualizar</button> {/* Asegura que haya un botón de submit */}
        </form>
      </FormProvider>
    </LayoutSection>
  );
}
