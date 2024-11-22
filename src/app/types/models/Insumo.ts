import Category from "./Category";
import Department from "./Department";

type Insumo = {
    trazador: boolean;
    id: string;
    codigo: string;
    nombre: string;
    categoria: Category;
    departamentos: Department[];
    cantidadActual: number;
    status: "red" | "yellow" | "green" | "out-of-stock";
}

export default Insumo