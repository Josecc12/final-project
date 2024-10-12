import PageClient from './page.client'
import findAll from '@/actions/category/findAll';

type Props={
    params:{
      id: number
    }
  }
export default async function page({params}:Props) {

    const responseCategory = await findAll();

    if(responseCategory.status !== 200 || !("data" in responseCategory)){
        throw new Error ("Failed to fetch category data");
    }

  return (
    <PageClient categoria={responseCategory.data}/>
  )
}
