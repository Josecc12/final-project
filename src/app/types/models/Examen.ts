import User from "./User"
import Department from "./Department"
import Insumo from "./Insumo"


type Examen = {

    id: string
    nombre: string
    user_id: User
    departamentos: Department[];
    descripcion: string;
    detalles: Insumo[];

}

export default Examen