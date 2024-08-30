import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/Typography";

export function MedicalSummary() {
  return (
    <div className="w-full flex flex-col gap-3 xl:gap-4 ">
      <Typography variant="h5" className="">
        17/12/3 - Doctor Sample
      </Typography>
      <Accordion
        type="single"
        collapsible
        defaultValue="sicknes"
        className="w-full"
      >
        <AccordionItem value="sicknes" className="px-0">
          <AccordionTrigger className="flex items-center justify-between  py-4">
            <Typography variant="h4" className="text-balance text-left">
              Padecimintos{" "}
              <span className="text-sm text-muted-foreground">
                (Todos los padecimientos a lo largo de su HC)
              </span>
            </Typography>
            <div className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className=" pb-4 flex flex-col gap-y-4">
            <ul className="list-inside list-disc">
              <li className="font-mediumtext-sm">COVID-19</li>
              <li className="font-medium text-sm">Gripe</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="symptoms">
          <AccordionTrigger className="flex items-center justify-between  py-4">
            <h3 className="text-lg font-semibold">Síntomas</h3>
            <div className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pb-4">
            <div>
              <h4 className="text-sm font-medium">Fiebre</h4>
              <p className="text-muted-foreground">
                El paciente ha presentado fiebre de hasta 39°C durante los
                últimos 3 días.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Dolor de cabeza</h4>
              <p className="text-muted-foreground">
                El paciente ha reportado dolor de cabeza intenso desde el inicio
                de los síntomas.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Tos seca</h4>
              <p className="text-muted-foreground">
                El paciente ha presentado tos seca y persistente.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="treatment">
          <AccordionTrigger className="flex items-center justify-between py-4">
            <h3 className="text-lg font-semibold">Tratamiento</h3>
            <div className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="space-y-4  pb-4">
            <div>
              <h4 className="text-sm font-medium">Medicación</h4>
              <p className="text-muted-foreground">
                Se ha prescrito paracetamol y antiinflamatorios para aliviar los
                síntomas.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Reposo</h4>
              <p className="text-muted-foreground">
                Se ha recomendado al paciente descansar y mantener una buena
                hidratación.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="medications">
          <AccordionTrigger className="flex items-center justify-between py-4">
            <h3 className="text-lg font-semibold">Medicamentos y dosis</h3>
            <div className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="space-y-4  pb-4">
            <div>
              <h4 className="text-sm font-medium">Paracetamol</h4>
              <p className="text-muted-foreground">
                500 mg cada 6 horas, vía oral.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Ibuprofeno</h4>
              <p className="text-muted-foreground">
                400 mg cada 8 horas, vía oral.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notes">
          <AccordionTrigger className="flex items-center justify-between  py-4">
            <h3 className="text-lg font-semibold">Anotaciones</h3>
            <div className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
          </AccordionTrigger>
          <AccordionContent className="space-y-4  pb-4">
            <div>
              <h4 className="text-sm font-medium">Evolución</h4>
              <p className="text-muted-foreground">
                El paciente ha presentado una evolución favorable con la
                medicación prescrita.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Próxima cita</h4>
              <p className="text-muted-foreground">
                Se ha programado una cita de seguimiento para dentro de 7 días.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
