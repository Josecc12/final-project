type TransactionDto = {
    departamentoRetiroId: string;
    departamentoAdquisicionId: string;
    insumos: {
        insumoId: string;
        cantidad: number;
    }[];
}

export default TransactionDto;