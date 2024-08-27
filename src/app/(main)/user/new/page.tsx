

import { findAll } from "@/actions/role";
import PageClient from "./page.client";



type Props={
  params:{
    id: number
  }
}

export default async function Page({params}:Props) {

  const responseRole = await findAll();


  if (responseRole.status !== 200 || !("data" in responseRole)) {
    throw new Error("Failed to fetch user data");
  }

  

  return (
   <PageClient roles={responseRole.data}/>
  );
  
}
