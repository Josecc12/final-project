import findAll from "@/actions/laboratory/findAll";
import findOne from "@/actions/order/findOne";
import PageClient from "./page.client";

export default async function EditOrderPage({
  params,
}: {
  params: { id: string };
}) {
  // Obtenemos los exámenes y la orden específica
  const [examenesResponse, orderResponse] = await Promise.all([
    findAll(),
    findOne(params.id),
  ]);

  if (examenesResponse.status !== 200 || !("data" in examenesResponse)) {
    throw new Error("Error al obtener los examenes");
  }

  if (orderResponse.status !== 200 || !("data" in orderResponse)) {
    throw new Error("Error al obtener la orden");
  }
  
  return (
    <PageClient 
      examenes={examenesResponse.data} 
      order={orderResponse.data}
    />
  );
}