import Role from "./Role"
import Department from "./Department"

type UserTemp = {
    id: string
    nombre: string
    lastname: string
    username: string
    email: string
    createdAt: string
    updatedAt:string
    role : Role
    departamento: Department
}

export default UserTemp