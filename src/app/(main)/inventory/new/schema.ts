import { de } from "date-fns/locale";
import { z } from "zod";

const schema = z.object({
    codigo: z.string().min(2, "el código debe tener al menos 2 caracteres"),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    categoriaId: z.string(),
    departamentosId: z.string(),
    trazador: z.boolean(),
  });

  export default schema;