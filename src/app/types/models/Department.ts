import Category from "./Category"

type Department = {

    id: string
    nombre: string
    categoria_id: Category
    trazador: boolean
    is_active: boolean
}

export default Department