// agregar a bodega

import Lote from "./Lote";

type adquisition = {
    usuarioId  : string;
    descripcion: string;
    lotes      : Lote[];
}

export default adquisition;