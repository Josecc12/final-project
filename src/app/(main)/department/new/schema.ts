import { z } from "zod";

const schema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    is_active: z.boolean(),
  });
  
export default schema;