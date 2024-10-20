
import { ReadonlyURLSearchParams } from "next/navigation";

import findAll from "@/actions/inventory/findAll";
import PageClient from "./page.client";

type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
 
  const response = await findAll(
    {searchParams: params}
  );


  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return <PageClient insumos={response.data} />;
}
