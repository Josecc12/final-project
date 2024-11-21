
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
}

export default PatientDto
