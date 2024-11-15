
type PatientMedicalHistory = {
  id: string
  nombre: string
  sexo: string
  cui: string
  createdAt: string
  nacimiento: string
  familiares: string
  quirurgicos: string
  traumaticos: string
  alergias: string
  vicios: string
  antecedente?:Antecedente
  retiros: retiros[]
}

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

interface retiros {
  id: string
  descripcion: string,
  estado: string,
  createdAt: string,
  updatedAt: string,
  tipo: string
  insumos: insumos[]
}

interface insumos {
  id: string
  nombre: string,
  categoria: string,
  cantidad: string,
}
export default PatientMedicalHistory