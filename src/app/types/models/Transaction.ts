type Transaction = {
    id: string
    createdAt: string
    descripcion: string
    user: {
      username: string
    }
    departamentoOrigen: {
      id: string
      nombre: string
    }
    departamentoDestino: {
      id: string
      nombre: string
    }
    detalleRetiro: Array<{
      id: string
      nombreInsumo: string
      cantidad: number
    }>
  }
export default Transaction