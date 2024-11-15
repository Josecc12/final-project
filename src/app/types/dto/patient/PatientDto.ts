
type PatientDto = {
    id?: string
    nombre: string
    sexo: string
    cui?: string
    nacimiento: Date
    familiares?: string
    quirurgicos?: string
    traumaticos?: string
    alergias?: string
    vicios?: string
    antecededentes?: {
            gestas?: number;
            hijos_vivos?: number;
            hijos_muertos?: number;
            abortos?: number;
            ultima_regla?: Date;
            planificacion_familiar?: string;
            partos?: number;
            cesareas?: number;
        
    }
}


export default PatientDto
