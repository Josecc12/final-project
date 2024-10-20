import FormTicket from '../components/FormTicket'
import { Insumo, Patient }from "@/app/types/models"
import { Pagination } from "@/app/types/api"

type Props = {
    insumos: Insumo[]
    pacientes:Patient[]
  }
  
  

export default function PageClient({
    insumos,
    pacientes
  }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Nueva Consulta</h1>
            <FormTicket insumos={insumos} pacientes={pacientes}/>
        </div>
    )   
}