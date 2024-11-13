type TransactionDto = {
    id: string;
    departamentoRetiroId: string;
    departamentoAdquisicionId: string;
    insumos: {
        insumoId: string;
        cantidad: number;
    }[];
}

export default TransactionDto;