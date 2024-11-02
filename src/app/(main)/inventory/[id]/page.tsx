import PageClient from "./page.client";
import findOne from "@/actions/inventory/findOne";
type Props = {
    params: {
        id: string;
    }
  }
export default async function page(
    {params}:Props
) {
    const response = await findOne(params.id)

    if (response.status !== 200 || !("data" in response)) {
        throw new Error("Failed to fetch user data");
    }

    return(<PageClient  insumo={response.data}/>)
    
}