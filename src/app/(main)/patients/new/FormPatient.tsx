import { useFormContext } from "react-hook-form";
import schema from "./schema";
import { z } from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { es } from "date-fns/locale"
import { useState } from "react";

type UserFormInputs = z.infer<typeof schema>;

const sexos = [
  {
    id: `Masculino`,
    name: "Masculino",
  },
  {
    id: `Femenino`,
    name: "Femenino",
  },

];

export default function FormPatient() {
  const [showFemaleCard, setShowFemaleCard] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext<UserFormInputs>();
  const router = useRouter();

  const handleCancel = () => {
    router.push("/patients"); // Redirige a la lista de pacientes.
};

  return (
    <Card className="w-full max-w-[600px]">
      <CardContent className="gap-3 flex flex-col">
        
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="nombre">Nombre del Paciente</FormLabel>
                <FormControl>
                  <Input
                    id="nombe"
                    placeholder="Ingresa nombre del paciente"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.nombre?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <FormField
            control={control}
            name="cui"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cui">CUI</FormLabel>
                <FormControl>
                  <Input
                    id="cui"
                    placeholder="Ingresa cui del paciente"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.cui?.message}</FormMessage>
              </FormItem>
            )}
          />

        <FormField
          control={control}
          name="sexo"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="role">Sexo</FormLabel>
              <FormControl>
                <Select
                   onValueChange={(value) => {
                      field.onChange(value); 
                      setShowFemaleCard(value === "Femenino"); 
                     }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    {sexos.map((sexo) => (
                      <SelectItem key={sexo.id} value={`${sexo.id}`}>
                        {sexo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.sexo?.message}</FormMessage>
            </FormItem>
          )}
        />


        <FormField
          control={control}
          name="nacimiento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Popover >
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })	
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full min-w-full p-0 relative" align="start">
                  <Calendar
                    className="!w-full min-w-full"
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Ingresa la fecha de nacimiento del paciente
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="familiares"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="familiares">Familiares</FormLabel>
              <FormControl>
                <Textarea
                  id="familiares"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.familiares?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="quirurgicos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="quirurgicos">
                Procedimientos quirúrgico
              </FormLabel>
              <FormControl>
                <Textarea id="quirurgicos" placeholder="" {...field} />
              </FormControl>
              <FormMessage>{errors.quirurgicos?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="traumaticos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="traumaticos">
                Procedimientos traumáticos
              </FormLabel>
              <FormControl>
                <Textarea id="traumaticos" {...field} />
              </FormControl>
              <FormMessage>{errors.traumaticos?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="alergias"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="alergias">Alergias</FormLabel>
              <FormControl>
                <Textarea id="alergias" {...field} />
              </FormControl>
              <FormMessage>{errors.alergias?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="vicios"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="vicios">Vicios</FormLabel>
              <FormControl>
                <Textarea id="vicios" {...field} />
              </FormControl>
              <FormMessage>{errors.vicios?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>

      {showFemaleCard && (
  <Card className="w-full max-w-[600px] mt-4">
    <CardContent className="gap-3 flex flex-col">
      <div className="flex flex-col gap-4">
        {/* Gestas */}
        <FormField
          control={control}
          name="gestas"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="gestas">Número de gestas</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage>{errors.gestas?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Hijos vivos */}
        <FormField
          control={control}
          name="hijos_vivos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="hijos_vivos">Número de hijos vivos</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage>{errors.hijos_vivos?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Hijos muertos */}
        <FormField
          control={control}
          name="hijos_muertos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="hijos_muertos">
                Número de hijos muertos
              </FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage>{errors.hijos_muertos?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Abortos */}
        <FormField
          control={control}
          name="abortos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="abortos">Número de abortos</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage>{errors.abortos?.message}</FormMessage>
            </FormItem>
          )}
        />

<FormField
  control={control}
  name="ultima_regla"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Última regla</FormLabel>
      <FormControl>
        <Input
          type="date"
          value={field.value ? field.value.toISOString().split("T")[0] : ""}
          onChange={(e) => field.onChange(new Date(e.target.value))}
        />
      </FormControl>
      <FormMessage>{errors.ultima_regla?.message}</FormMessage>
    </FormItem>
  )}
/>


        {/* Planificación familiar */}
        <FormField
          control={control}
          name="planificacion_familiar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Planificación familiar</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe los métodos de planificación familiar"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {errors.planificacion_familiar?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Partos */}
        <FormField
          control={control}
          name="partos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de partos</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage>{errors.partos?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Cesáreas */}
        <FormField
          control={control}
          name="cesareas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de cesáreas</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormMessage>{errors.cesareas?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>
    </CardContent>
    <CardFooter className="flex justify-end">
      <Button type="button" variant="outline" onClick={() => setShowFemaleCard(false)}>
        Cerrar
      </Button>
    </CardFooter>
  </Card>
)}


      <CardFooter className="flex justify-end">
        <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </CardFooter>
    </Card>
  


  );



}
