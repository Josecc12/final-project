"use client";
import findOne from "@/actions/department/findOne";
import PageClient from "./page.client";
import { ReadonlyURLSearchParams } from "next/navigation";


type Props = {
  params: {
      id: string;
  }
  searchParams: ReadonlyURLSearchParams;
}

export default async function Page({params}:Props) {

  const response = await findOne(params.id)

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return (
    <PageClient department={response.data}/>
  )
  
}

