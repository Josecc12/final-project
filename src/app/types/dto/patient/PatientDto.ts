
type PatientDto = {
    id?: string
    nombre: string
    sexo: string
    cui?: string
    telefono?: string
    comunidad?: string
    municipio?: string
    nacimiento: Date
    familiares?: string
    quirurgicos?: string
    traumaticos?: string
    alergias?: string
    vicios?: string
    antecedentes?: {
        gestas?: number
        partos?: number
        cesareas?: number
        abortos?: number
        hijos_vivos?: number
        hijos_muertos?: number
        planificacion_familiar?: string
        ultima_regla?: Date
    }[]|any
}

export default PatientDto
