import { z } from "zod";

const schema = z.object({
    nombre: z.string().min(1, "El nombre es requerido"),
    sexo: z.string().min(1, "El sexo es requerido"),
    cui: z.string(),
    telefono: z.string(),
    comunidad: z.string(),
    municipio: z.string(),
    nacimiento: z.date({ required_error: "La fecha de nacimiento es requerida" }),
    familiares: z.string(),
    medicos: z.string(),
    quirurgicos: z.string(),
    traumaticos: z.string(),
    alergias: z.string(),
    vicios: z.string(),
    antecedentes: z.array(
        z.object({
            gestas: z.number().min(0),
            hijos_vivos: z.number().min(0),
            hijos_muertos: z.number().min(0),
            abortos: z.number().min(0),
            ultima_regla: z.date().optional(),
            planificacion_familiar: z.string().optional(),
            partos: z.number().min(0),
            cesareas: z.number().min(0),
        })
    ),
   });


export default schema