type RecipeDto = {
    descripcion: string;
    pacienteId: string;
    estado: string;
    insumos: {
        insumoId: string;
        cantidad: number;

    }[];
}

export default RecipeDto;