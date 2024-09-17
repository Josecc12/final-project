import findAll from "@/actions/user/findAll";
import PageClient from "./page.client";
import parseSearchParams from "@/utils/functions/parsePaginationParams";
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
    throw new Error("Failed to fetch user data");
  }

  return <PageClient users={response.data} pagination={response.meta}/>;
}
