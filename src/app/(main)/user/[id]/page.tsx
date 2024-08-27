import findOne from "@/actions/user/findOne";
import PageClient from "./page.client";



type Props = {
  params: {
      id: number;
  }
}

export default async function Page({params}:Props) {

  const response = await findOne(params.id)
  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch user data");
  }

  return (
    <PageClient user={response.data}/>
  )
  
}


