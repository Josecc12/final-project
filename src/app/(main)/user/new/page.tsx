
import LayoutSection from "@/components/LayoutSection";

import { FormNewUser } from "./form-new-user";

export default function Page() {
  return (
    <LayoutSection
      title="Registro de Usuario"
      description="Completa el formulario para crear una nueva cuenta"
    >
      <div className="w-full flex flex-col items-start">
        <FormNewUser />
      </div>
    </LayoutSection>
  );
}
