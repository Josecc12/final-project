import findOne from "@/actions/adquisitions/findOne";
import PageClient from "./page.client"

export default async function Page({params}:any) {

    const response = await findOne(params.id)
    if (response.status !== 200 || !("data" in response)) {
      throw new Error("Failed to fetch user data");
    }
  
    return (
      <PageClient department={response.data}/>
    )
    
  }
  