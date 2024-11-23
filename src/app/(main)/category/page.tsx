import findAll from "@/actions/category/findAll";
import PageClient from "./page.client";
import { ReadonlyURLSearchParams } from "next/navigation";

type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
 
  const response = await findAll(
    {searchParams: params}
  );


  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch categoria data");
  }

  return <PageClient categories={response.data} pagination={response.meta}/>;
}
