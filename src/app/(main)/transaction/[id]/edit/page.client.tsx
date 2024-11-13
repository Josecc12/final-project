"use client"
import { Department } from "@/app/types/models";
import { useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { ErrorResponse } from "@/app/types/api";
import FormTransaction from '../../components/FormTransaction';
import { useRouter } from "next/navigation";
import TransactionDto from "@/app/types/dto/transaction/TransactionDto";
import update from "@/actions/transaction/update";
import { Transaction } from "@/app/types/models";
const schema = z.object({
    origen: z.string().min(1, "Selecciona el departamento de origen"),
    destino: z.string().min(1, "Selecciona el departamento de destino"),
    insumos: z.array(
      z.object({
        cantidad: z.number().min(1, "La cantidad mínima es 1"),
        insumoId: z.string().min(1, "Selecciona un insumo"),
      })
    ).min(1, "Debe agregar al menos un insumo"),
  }).refine((data) => data.origen !== data.destino, {
    message: "El departamento de origen y destino no pueden ser el mismo",
    path: ["destino"],
  });

type Props = {
    departments: Department[];
    transaction: Transaction;
};

type TransactionFormInputs = z.infer<typeof schema>;

export default function PageClient({
    departments,
    transaction,
}: Props) {
    const { toast } = useToast();
    const router = useRouter();
    const methods = useForm<TransactionFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            origen: transaction.departamentoOrigen.id,
            destino: transaction.departamentoDestino.id,
            insumos: transaction.detalleRetiro.map(insumo => ({
                cantidad: insumo.cantidad,
                insumoId: insumo.id,
            })),
        }
    });

    const onSubmit = async (data: TransactionFormInputs) => {
        const transactionDto: TransactionDto = {
            id: transaction.id, // Incluimos el ID para la actualización
            departamentoRetiroId: data.origen,
            departamentoAdquisicionId: data.destino,
            insumos: data.insumos.map(({ insumoId, cantidad }) => ({
                insumoId: insumoId,
                cantidad,
            }))
        };

        const response = await update(transactionDto);

        if (response.status === 200) {
            toast({
                title: "Movimiento actualizado exitosamente",
                description: `El movimiento de insumos desde ${data.origen} hasta ${data.destino} ha sido actualizado`,
                duration: 3000,
            });
            router.push("/transaction");
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
            title="Editar movimiento de insumos entre departamentos"
            description="Modifica la información del movimiento"
        >
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormTransaction departamentos={departments}/>
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    );
}