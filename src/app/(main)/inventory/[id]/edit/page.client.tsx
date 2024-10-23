"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import FormInventory from "../../components/FormInventory";
import schema from "../../components/schema";
import update from "@/actions/inventory/update";
import { ErrorResponse } from "@/app/types/api";
import { Insumo, Category, Department } from "@/app/types/models";
import {z} from "zod";
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
      nombre: insumo.nombre,
      codigo: insumo.codigo,
      categoriaId: insumo.categoria.id,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: InsumoFormInputs) => {
    const response = await update(data);

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
  };

  return (
    <LayoutSection
      title="Editar Insumo"
      description="Modifica la información del insumo"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInventory categorias={categorias} departamentos={departamentos} />
        </form>
      </FormProvider>
    </LayoutSection>
  );
}
