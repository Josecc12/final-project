
import findOne from "@/actions/department/findOne";
import PageClient from "./page.client";
import { DepartmentTemp } from "@/app/types/models";




type Props={
  params:{
    id: string;
  }
}

type DepartmentTempResponse = {
  status: number;
  data: DepartmentTemp;
}

export default async function Page({params}:Props) {


  const response = await findOne(params.id) as unknown as DepartmentTempResponse;
  
  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch data");
  }


  return (
   <PageClient department={response.data}/>
  );
  
}
