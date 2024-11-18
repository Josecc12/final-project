import { ReadonlyURLSearchParams } from "next/navigation";

import findAllDepartures from "@/actions/departures/findAll";
import {findAll} from "@/actions/department/findAll";
import PageClient from "./page.client";

type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default async function Page({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);
 
  const responseDepartures = await findAllDepartures(
    {searchParams: params}
  );
  const responseDepartments = await findAll();

  if (responseDepartments.status !== 200 || !("data" in responseDepartments)) {
    throw new Error("Failed to fetch department data");
  }

  if (responseDepartures.status !== 200 || !("data" in responseDepartures)) {
    throw new Error("Failed to fetch departures data");
  }

  return <PageClient 
    retiros={responseDepartures.data} 
    pagination={responseDepartures.meta} 
    departments={responseDepartments.data}
  />;
}