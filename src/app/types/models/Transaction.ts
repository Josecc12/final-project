type Transaction = {
    id: string
    createdAt: string
    descripcion: string
    user: {
      username: string
    }
    detalleRetiro: Array<{
      id: string
      cantidad: number
      insumoDepartamento: {
        existencia: number
        departamento: {
          nombre: string
        }
      }
    }>
  }
export default Transaction