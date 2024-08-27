import { z } from "zod";

const schema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    username: z
      .string()
      .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z.string().min(8, "La contraseña debe tener al menos 6 caracteres"),
    role: z.string(),
  });
  
export default schema;