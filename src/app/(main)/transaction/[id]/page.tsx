'use client'

import { useState, useEffect } from 'react'

type WithdrawalData = {
  id: string
  createdAt: string
  updatedAt: string
  descripcion: string
  user: {
    id: string
    username: string
  }
  detalleRetiro: Array<{
    id: string
    cantidad: number
    insumoDepartamento: {
      id: string
      existencia: number
      departamento: {
        id: string
        nombre: string
      }
    }
  }>
}

export default function Page() {
  const [withdrawal, setWithdrawal] = useState<WithdrawalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWithdrawalData = async () => {
      try {
        // Simulating an API call with the provided data
        const response = await new Promise<WithdrawalData>((resolve) => {
          setTimeout(() => {
            resolve({
              "id": "38f2176d-e3f0-44b2-9a92-cf0d56cf0bf5",
              "createdAt": "2024-11-12T00:03:59.288Z",
              "updatedAt": "2024-11-12T00:03:59.288Z",
              "descripcion": "Retiro de insumos del departamento Bodega para el departamento Enfermería",
              "user": {
                "id": "1d495d1c-3919-4241-a281-56ac3a7865e3",
                "username": "mlopez"
              },
              "detalleRetiro": [
                {
                  "id": "346c6d54-c522-4ae3-a454-90ba3f86fd3e",
                  "cantidad": 100,
                  "insumoDepartamento": {
                    "id": "ee17835d-9664-4cbf-b9e6-d7a0c01a9177",
                    "existencia": 100,
                    "departamento": {
                      "id": "45058b76-a467-44e0-9035-49d5a2a9a845",
                      "nombre": "Bodega"
                    }
                  }
                },
                {
                  "id": "ca3c39d3-4b20-4795-a38d-9fc008e83087",
                  "cantidad": 100,
                  "insumoDepartamento": {
                    "id": "4a7bedf3-7603-41bc-bdea-3498d0238656",
                    "existencia": 300,
                    "departamento": {
                      "id": "45058b76-a467-44e0-9035-49d5a2a9a845",
                      "nombre": "Bodega"
                    }
                  }
                },
                {
                  "id": "6b0a896a-b126-41c6-bbc7-c4eb2a755f58",
                  "cantidad": 100,
                  "insumoDepartamento": {
                    "id": "bc5221ee-ade3-4309-afbb-84f367d3142c",
                    "existencia": 200,
                    "departamento": {
                      "id": "45058b76-a467-44e0-9035-49d5a2a9a845",
                      "nombre": "Bodega"
                    }
                  }
                }
              ]
            })
          }, 1000) // Simulating a 1-second delay
        })
        setWithdrawal(response)
      } catch (err) {
        setError('Error al cargar los datos del retiro')
      } finally {
        setLoading(false)
      }
    }

    fetchWithdrawalData()
  }, [])

  if (loading) {
    return <div className="container mx-auto py-10">Cargando...</div>
  }

  if (error) {
    return <div className="container mx-auto py-10">Error: {error}</div>
  }
}