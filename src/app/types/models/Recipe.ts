import Insumo from "./Insumo"
import User from "./User"


type Recipe = {

    id: string
    description: string
    createdAt: string
    estado: string
    user: User
    paciente: {
        id: string
        nombre: string
    }
    insumos: (Insumo & { cantidad: number })[];

}

export default Recipe