import user from "@/actions/user"

type LaboratoryOrderDto = {
    descripcion: string;
    estado: string;
    usuarioId: string;
    pacienteId: string;
    examenId: string;
}

export default LaboratoryOrderDto