import findOne from "@/actions/department/findOne"; 
import PageClient from "./page.client";
type Props = {
    params: {
        id: string; 
    }
}

export default async function Page({ params }: Props) {
    const responseDepartment = await findOne(params.id); 

    if (responseDepartment.status !== 200 || !("data" in responseDepartment)) {
        throw new Error('Failed to fetch department data'); 
    }

    return (
        <PageClient department={responseDepartment.data} /> 
    );
}

