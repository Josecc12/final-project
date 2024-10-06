import PageClient from './page.client'
import findAll from '@/actions/category/findAll';

export default async function page() {

    const responseCategory = await findAll();

    if(responseCategory.status !== 200 || !("data" in responseCategory)){
        throw new Error ("Failed to fetch category data");
    }

  return (
    <PageClient categorias={responseCategory.data}/>
  )
}
