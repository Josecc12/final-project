import { z } from "zod";

const schema = z.object({
    insumoId: z.string().min(1, "El insumo es requerido"),
    fechaVencimiento: z.date({ required_error: "La fecha de vencimiento es requerida" }),
    cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
    numeroLote: z.string().min(1, "El número de lote es requerido"),
    status: z.string().min(1, "El status es requerido"),
   });


export default schema