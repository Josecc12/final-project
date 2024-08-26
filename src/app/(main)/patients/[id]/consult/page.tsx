'use client'

import LayoutSection from "@/components/LayoutSection";
import { ConsultForm } from "../components/ConsultForm";

export default function Page() {
  return (
    <LayoutSection
      title="Nueva consulta"
      description="Información sobre la consulta"
    >
      <div className="w-full">
        <ConsultForm />
       </div>
    </LayoutSection>
  );
}

