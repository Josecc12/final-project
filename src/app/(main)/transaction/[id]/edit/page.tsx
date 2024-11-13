

import findOne from "@/actions/transaction/findOne";
import PageClient from './page.client'
import findAll from '@/actions/category/findAll';
import { findAll as findAllDepartments } from '@/actions/department';

type Props={
  params:{
    id: string;
  }
}

export default async function Page({params}:Props) {


  const response = await findOne(params.id);
  const responseCategory = await findAll();
  const responseDepartments = await findAllDepartments();
  if(responseCategory.status !== 200 || !("data" in responseCategory)){
      throw new Error ("Failed to fetch category data");
  }
  if (responseDepartments.status !== 200 || !("data" in responseDepartments)) {
      throw new Error("Failed to fetch department");
  }
  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch data");
  }


  return (
   <PageClient departments={responseDepartments.data} transaction={response.data}/>
  );
  
}