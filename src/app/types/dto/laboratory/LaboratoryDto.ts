
type LaboratoryDto = {
    id?: string
    nombre: string
    descripcion: string
    insumos: {
        id: string;
        cantidad: number;
    }[];
}

export default LaboratoryDto
