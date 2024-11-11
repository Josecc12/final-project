import Category from "./Category"

type DepartmentTemp = {
    departamento: {
        id: string
        nombre: string
        categoria_id: Category
        trazador: boolean
        is_active: boolean
    }
}

export default DepartmentTemp