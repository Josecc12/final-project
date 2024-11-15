import InsumoExamenes from "./InsumoExamenes";
import Patient from "./Patient";
import Test from "./Test";
import User from "./User";
import UserTemp from "./UserTemp";



type Order ={
    id: string
    descripcion: string;
    estado: string;
    usuario: UserTemp
    paciente: Patient
    examen: Test
}

export default Order