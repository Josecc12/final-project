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


    gestas: z.number().optional(),
  hijos_vivos: z.number().optional(),
  hijos_muertos: z.number().optional(),
  abortos: z.number().optional(),
  ultima_regla: z
  .date()
  .optional()
  .refine(
    (date) => date === undefined || date <= new Date(),
    {
      message: "La última regla no puede ser una fecha futura",
    }
  ),
  planificacion_familiar: z.string().optional(),
  partos: z.number().optional(),
  cesareas: z.number().optional(),



   });


export default schema