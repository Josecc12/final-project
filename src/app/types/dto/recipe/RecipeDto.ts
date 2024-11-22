type RecipeDto = {
    descripcion: string;
    pacienteId: string;
    estado: string;
    insumos: {
        insumoId: string;
        cantidad: number;
        uso: string;

    }[];
}

export default RecipeDto;