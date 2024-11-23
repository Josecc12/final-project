import User from "./User";
import Patient from "./Patient";
// types/models/Receta.ts

  type Receta = {
    id: string;
    descripcion: string;
    createdAt: string;
    estado: string;
    user: User;
    paciente: Patient;
    insumosRecetados: {
        id: string;
        nombre: string;
        cantidad: number;
        uso: string;
    }[];
    insumosRetirados: {
        id: string;
        nombre: string;
        cantidad: number;
        uso: string;
    }[];

  };
  

export default Receta;
