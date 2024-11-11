import Category from "./Category";
import Department from "./Department";

type Insumo = {
    trazador: boolean;
    id: string;
    codigo: string;
    nombre: string;
    categoria: Category;
    departamentos: Department[];

}

export default Insumo