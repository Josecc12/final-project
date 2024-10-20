

import { findAll  as findAllRoles} from "@/actions/role";
import {findAll} from "@/actions/department";
import PageClient from "./page.client";
import findOne from "@/actions/user/findOne";


type Props={
  params:{
    id: number
  }
}

export default async function Page({params}:Props) {

  const responseRole = await findAllRoles();
  const responseDepartment = await findAll();
  const responseUser = await findOne(params.id);

  if (responseRole.status !== 200 || !("data" in responseRole)) {
    throw new Error("Failed to fetch user data");
  }
  if (responseDepartment.status !== 200 || !("data" in responseDepartment)) {
    throw new Error("Failed to fetch user data");
  }

  if (responseUser.status !== 200 || !("data" in responseUser)) {
    throw new Error("Failed to fetch user data");
  }

  return (
   <PageClient departments={responseDepartment.data} roles={responseRole.data} user={responseUser.data}/>
  );
  
}
