import findOne from "@/actions/department/findOne";
import PageClient from "./page.client"; 

type Props = {
  params: {
    id: string;
  },
  searchParams: {
    q?: string;
    page?: string;
  }
}

export default async function Page({params, searchParams}:Props) {
  const response = await findOne(params.id, { 
    searchParams: new URLSearchParams(searchParams),
    q: searchParams.q 
  });

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch data");
  }

  return (
    <PageClient 
      department={response.data}
      pagination={{
        page: response.meta?.page || 1,
        totalPages: response.meta?.totalPages || 1,
        totalItems: response.meta?.totalItems || 0
      }}
    />
  );
}