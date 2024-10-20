'use client'
import { Insumo } from "@/app/types/models"
import { Pagination } from "@/app/types/api"
import FormAcquisition from "../components/formAcquisition";
import LayoutSection from "@/components/LayoutSection";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import create from "@/actions/patient/create";
import { ErrorResponse } from "@/app/types/api";
import schema from "../components/schema";

type AcquisitionFormInputs = z.infer<typeof schema>;

type Props = {
  insumos: Insumo[]
  pagination?: Pagination;
}

export default function PageClient({
  insumos,
  pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  },
}: Props) {
  const methods = useForm<AcquisitionFormInputs>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      insumoId: "",
      cantidad: 0,
      fechaVencimiento: new Date(),
      numeroLote: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  /*const onSubmit = async (data: AcquisitionFormInputs) => {
    const response = await create(data);
    if (response.status === 201 || response.status === 200) {
      toast({
        title: "Adquisición creada exitosamente",
        description: `La adquisición ha sido creada`,
        duration: 3000,
      });
      router.push("/acquisition");
    } else {
      const error = response.data as ErrorResponse;
      toast({
        title: `Error ${response.status}`,
        description: error.message,
        duration: 3000,
        variant: "destructive",
      });
    }
    };
    */
   const onSubmit = async (data: AcquisitionFormInputs) => {
    console.log(data);
    toast({
      title: "Adquisición creada exitosamente",
      description: `La adquisición ha sido creada`,
      duration: 3000,
    });
    router.push("/acquisition");
   }
  return (
    <LayoutSection title="Nueva Adquisición" description="Adquisición de insumos">
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormAcquisition insumos={insumos} pagination={pagination}/>
            </form>
        </FormProvider>
    </LayoutSection>
  );
}