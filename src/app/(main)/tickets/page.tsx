import LayoutSection from "@/components/LayoutSection";
import { Ticket } from "./components/Ticket";

export default function Page() {
  return (
    <LayoutSection
      title="Tickets"
      description="Manage your tickets and track their status."
    >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />

        </div>
    </LayoutSection>
  );
}
