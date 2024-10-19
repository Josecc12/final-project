import Role from "./Role"
import Department from "./Department"

type User = {
    id: string
    name: string
    lastname: string
    username: string
    email: string
    createdAt: string
    updatedAt:string
    role : Role
    departamento: Department
}

export default User