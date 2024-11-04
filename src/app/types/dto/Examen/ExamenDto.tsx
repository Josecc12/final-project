type ExamenDto = {
    id?: string;
    nombre: string;
    descripcion: string;

    usuario: {
        id: string;
        nombre: string;
    }[];
    departamento: {
        id: string;
        nombre: string;
    }[];
    insumos: {
        id: string;
        cantidad: number;
    }[];

}

export default ExamenDto;