
import findAll from "@/actions/transaction/findAll";
import PageClient from "./page.client";

type Props = {
  params: {
      id: string;
  }
}

export default async function Page({params}:Props) {

  const response = await findAll()
  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return (
    <PageClient transactions={response.data} pagination={response.meta}/>
  )
  
}

