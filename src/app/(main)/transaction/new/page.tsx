import {findAll as findAllDepartments} from "@/actions/department/findAll";
import { ReadonlyURLSearchParams } from "next/navigation";
import PageClient from "./page.client";

type Props = {
    searchParams: ReadonlyURLSearchParams;
  };
  
  export default async function Page({ searchParams }: Props) {
    const params = new URLSearchParams(searchParams);
   
    const responseDepartamentos = await findAllDepartments(
      {searchParams: params}
    );
  
    if (responseDepartamentos.status !== 200 || !("data" in responseDepartamentos)) {
      throw new Error("Failed to fetch departamentos data");
    }
  
    return <PageClient departments={responseDepartamentos.data}/>;
  }