import { z } from "zod";

const schema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    sexo: z.string().min(1, "El sexo es requerido"),
    cui: z.string(),
    nacimiento: z.date({ required_error: "La fecha de nacimiento es requerida" }),
    familiares: z.string(),
    quirurgicos: z.string(),
    traumaticos: z.string(),
    alergias: z.string(),
    vicios: z.string(),
 
   });


export default schema