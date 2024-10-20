import { ReadonlyURLSearchParams } from "next/navigation";
import PageClient from "./page.client";
import {findAll} from "@/actions/patient/findAll";


type Props = {
  searchParams: ReadonlyURLSearchParams;
};


export default async function Page({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
 
  const response = await findAll(
    {searchParams: params}
  );


  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch patients data");
  }
  return(
    <PageClient patients={response.data} pagination={response.meta}/>
  )
}