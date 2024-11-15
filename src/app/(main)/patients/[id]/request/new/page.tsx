import PageClient from "./page.client";
import findAll  from "@/actions/laboratory/findAll";


export default async function page({
  params,
}: {
  params: { id: string };
}) {
  const examenes = await findAll();

  if (examenes.status !== 200 || !("data" in examenes)) {
    throw new Error("Error al obtener los examenes");
  }

  return(
     <PageClient patientId={params.id} examenes={examenes.data} />);
}

