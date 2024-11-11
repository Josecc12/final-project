import {findAll as findAllDepartments} from "@/actions/department/findAll";
import { ReadonlyURLSearchParams } from "next/navigation";
import PageClient from "./page.client";

type Props = {
    searchParams: ReadonlyURLSearchParams;
  };
  
  export default async function Page({ searchParams }: Props) {
    const params = new URLSearchParams(searchParams);
   
    const response = await findAllDepartments(
      {searchParams: params}
    );
  
  
    if (response.status !== 200 || !("data" in response)) {
      throw new Error("Failed to fetch categoria data");
    }
  
    return <PageClient categories={response.data} pagination={response.meta}/>;
  }