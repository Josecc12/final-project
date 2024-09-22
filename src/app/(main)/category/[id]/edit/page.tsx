import findOne from "@/actions/category/findOne";
import PageClient from "./page.client";

type Props={
    params:{
        id:number;
    }
}

export default async function Page({params}: Props) {
    const responseCategory = await findOne(params.id);

    if(responseCategory.status !== 200 || !("data" in responseCategory)){
        throw new Error('Failed to fetch caregory data');
    }
  return (
    <PageClient categoria={responseCategory.data}/>
  )
}
