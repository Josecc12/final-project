import { ReadonlyURLSearchParams } from "next/navigation";
import PageClient from "./page.client";
import findMedicalHistory from "@/actions/patient/findMedicalHistory";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {

  const response = await findMedicalHistory({
    id: params.id
  });

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch department data");
  }

  return <PageClient patientHistory={response.data} pagination={response.meta} />;
}
