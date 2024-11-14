import LayoutSection from "@/components/LayoutSection";
import { Ticket } from "./components/Ticket";
import findAll from "@/actions/recipe/findAll";

export default async function Page() {

  const response = await findAll();

  if (response.status !== 200 || !("data" in response)) {
    throw new Error("Failed to fetch patients data");
  }

  return (
    <LayoutSection
      title="Tickets"
      description="Revisa las ordenes de tus pacientes y entrega los insumos necesarios."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {
          response.data.map((ticket) => (
            <Ticket
              id={ticket.id}
              key={ticket.id}
              createdAt={ticket.createdAt}


              usuario={ticket.user.name + ticket.user.lastname}
              paciente={ticket.paciente.nombre}
              insumos={ticket.insumos}
            />
          ))
        }


      </div>
    </LayoutSection>
  );
}
