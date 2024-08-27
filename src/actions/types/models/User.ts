import Role from "./Role"


type User = {
    id: number
    name: string
    lastname: string
    username: string
    email: string
    createdAt: string
    updatedAt:string
    role : Role
}

export default User