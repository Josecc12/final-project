

export interface Antecedente {
    id: string;
    createdAt: string;
    gestas: number;
    hijos_vivos: number;
    hijos_muertos: number;
    abortos: number;
    ultima_regla: string;
    planificacion_familiar: string;
    partos: number;
    cesareas: number;
  }
type Patient = {

    id: string
    nombre: string
    sexo: string
    cui: string
    telefono: string
    municipio: string,
    comunidad: string,
    createdAt: string
    nacimiento: string
    familiares: string
    quirurgicos: string
    traumaticos: string
    alergias: string
    medicos: string
    vicios: string
    antecedente?:Antecedente

}

export default Patient