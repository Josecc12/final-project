import PageClient from './page.client'
import findAll from '@/actions/category/findAll';
import { findAll as findAllDepartments } from '@/actions/department/findAll';
export default async function page() {

    const responseCategory = await findAll();
    const responseDepartments = await findAllDepartments();
    if(responseCategory.status !== 200 || !("data" in responseCategory)){
        throw new Error ("Failed to fetch category data");
    }
    if (responseDepartments.status !== 200 || !("data" in responseDepartments)) {
        throw new Error("Failed to fetch department");
    }

  return (
    <PageClient categorias={responseCategory.data} departamentos={responseDepartments.data}/>
  )
}
