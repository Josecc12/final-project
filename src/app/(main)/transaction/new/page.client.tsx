
"use client"
import { Department, Insumo } from "@/app/types/models";
import { useToast } from "@/components/ui/use-toast";
import LayoutSection from "@/components/LayoutSection";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { ErrorResponse } from "@/app/types/api";
import FormTransaction from '../components/FormTransaction';
import { useRouter } from "next/navigation";
import TransactionDto from "@/app/types/dto/transaction/TransactionDto";
import create from "@/actions/transaction/create";

const schema = z.object({
    origen: z.string().min(1, "El nombre es requerido"),
    destino: z.string().min(1, "El nombre es requerido"),
    insumos: z.array(
        z.object({
            cantidad: z.number().min(1, "La cantidad mínima es 1"),
            insumoId: z.string().min(1, 'Selecciona un insumo'),
        })
    ),
  })

type Props = {
    departments: Department[];
    insumos: Insumo[];
};
type TransactionFormInputs = z.infer<typeof schema>;
export default function PageClient({
    departments,
    insumos,
}:Props) {
    const { toast } = useToast();
    const router = useRouter();
    const methods = useForm<TransactionFormInputs>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            origen: "",
            destino: "",
            insumos: [],

        }
    });

    const onSubmit = async (data: TransactionFormInputs) => {
        console.log("data")
        console.log(data);
        const transactionDto: TransactionDto = {
            departamentoRetiroId: data.origen,
            departamentoAdquisicionId: data.destino,
            insumos: data.insumos.map(({ insumoId, cantidad }) => ({
                insumoId: insumoId, // Conversión en el nombre
                cantidad,
            }))
        };
        
        console.log(transactionDto);
        const response = await create(transactionDto);

        if (response.status === 201 || response.status === 200) {
            toast({
                title: "Categoria creada Exitosamente",
                description: `el movimiento de insumos dessde ${data.origen} hasta ${data.destino} ha sido creado`,
                duration: 3000,
            });
            router.push("/transaction");
        } else {
            toast({
                title: `Error ${response.status}`,
                description: (response as ErrorResponse).message,
                duration: 3000,
                variant: "destructive",
            })
        }
    }

    return (
        <LayoutSection
            title="Crea un movimiento de insumos entre departamentos"
            description="completa la información requerida"
        >
            <FormProvider {...methods}>
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <FormTransaction departamentos={departments} insumos={insumos}/>
                    </form>
                </Form>
            </FormProvider>
        </LayoutSection>
    )

    

}