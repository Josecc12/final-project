import findOne from "@/actions/order/findOne";
import PageClient from "./page.client";



type Props = {
  params: {
      id: string;
  }
}

export default async function Page({params}:Props) {

  const response = await findOne(params.id)
  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return (
    <PageClient order={response.data}/>
  )
  
}


