import { ReadonlyURLSearchParams } from "next/navigation";
import findAll from "@/actions/inventory/findAll";
import {findAll as patientFindAll} from "@/actions/patient/findAll";
import PageClient from "./page.client";


// Tipo de Props
type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
  
  const patientsResponse = await patientFindAll({searchParams: params});

  if (patientsResponse.status !== 200 || !("data" in patientsResponse)) {
    throw new Error("Failed to fetch patients data");
  }
  const response = await findAll({ searchParams: params });
  // Asegúrate de que la respuesta sea la esperada
  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch inventory data");
  }

  return <PageClient insumos={response.data} pacientes={patientsResponse.data}/>;
}