import { findAll } from "@/actions/role";
import PageClient from "./page.client";
import findOne from "@/actions/user/findOne";


type Props={
  params:{
    id: number
  }
}

export default async function Page({params}:Props) {

  const responseRole = await findAll();
  const responseUser = await findOne(params.id);

  if (responseRole.status !== 200 || !("data" in responseRole)) {
    throw new Error("Failed to fetch user data");
  }

  if (responseUser.status !== 200 || !("data" in responseUser)) {
    throw new Error("Failed to fetch user data");
  }

  return (
   <PageClient roles={responseRole.data} user={responseUser.data}/>
  );
  
}
