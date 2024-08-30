import LayoutSection from "@/components/LayoutSection";
import { MedicalSummary } from "./components/MedicalSummary";
import { Typography } from "@/components/ui/Typography";
import Visits from "./components/Visits";

export default function Page() {
  return (
    <LayoutSection
      title="Historial Clínico"
      description="Información sobre el historial de Juan Pérez"
    >
      <div className="w-full flex justify-between ">
        <MedicalSummary />
      </div>
    </LayoutSection>
  );
}
