import Lote from "../../models/Lote";

type AdquisitionDto = {
    usuarioId  ?: string;
    descripcion: string;
    lotes      : Lote[];
}

export default AdquisitionDto;