import Insumo from "./Insumo";

type Department = {
    id: string;
    nombre: string;
    insumos: Insumo[];
    totalItems: number;
    totalPages: number;
    page: number;
};

export default Department;
