
import { ReadonlyURLSearchParams } from "next/navigation";
import PageClient from "./page.client";
import { findAll } from "@/actions/department";


type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
 
  const response = await findAll(
    {searchParams: params}
  );


  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch departament data");
  }

  return <PageClient departaments={response.data} pagination={response.meta}/>;
}
