import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ConsultForm() {
  return (
    <Card className="w-full py-7 max-w-[800px]">
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" defaultValue="Juan Pérez" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input id="age" defaultValue="35" disabled />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="symptoms">Síntomas</Label>
          <Textarea
            id="symptoms"
            placeholder="Ingrese los síntomas del paciente"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="treatment">Tratamiento</Label>
          <Textarea
            id="treatment"
            placeholder="Ingrese el tratamiento recomendado"
          />
        </div>
        <div>
          <Label>Medicamentos</Label>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medication-2">Medicamento</Label>
                <Input id="medication-2" placeholder="Nombre del medicamento" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity-2">Cantidad</Label>
                <Input id="quantity-2" type="number" placeholder="Dosis" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Anotaciones</Label>
          <Textarea
            id="notes"
            placeholder="Ingrese cualquier anotación adicional"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
}
