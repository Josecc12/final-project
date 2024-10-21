type InventoryDto = {
    id?: string;
    codigo: string,
    nombre: string;
    categoriaId: string;
    trazador: boolean;
    departamentosId: string[];
}

export default InventoryDto;