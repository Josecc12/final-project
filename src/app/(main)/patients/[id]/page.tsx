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
        <div className="max-w-[300px] w-full  flex gap-3 flex-col">
          <div className="w-full flex bg-primary  rounded-md p-3 justify-center ">
            <Typography variant="muted" className="text-accent">
              Visitas Medicas
            </Typography>
          </div>
          {[1, 2, 3, 4, 5].map((visit) => (
            <Visits key={visit} />
          ))}
        </div>
        <MedicalSummary />
      </div>
    </LayoutSection>
  );
}
