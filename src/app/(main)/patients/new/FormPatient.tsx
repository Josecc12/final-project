import { useState } from "react";
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
import { es } from "date-fns/locale";

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
  const {
    control,
    formState: { errors },
  } = useFormContext<UserFormInputs>();
  const router = useRouter();
  const [isFemale, setIsFemale] = useState(false);

  const handleCancel = () => {
    router.push("/patients"); // Redirige a la lista de pacientes.
  };

  const handleSexChange = (value: string) => {
    setIsFemale(value === "Femenino");
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
                    id="nombre"
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
                <Input id="cui" placeholder="Ingresa cui del paciente" {...field} />
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
              <FormLabel htmlFor="sexo">Sexo</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleSexChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    {sexos.map((sexo) => (
                      <SelectItem key={sexo.id} value={sexo.name}>
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
              <Popover>
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
                <PopoverContent
                  className="w-full min-w-full p-0 relative"
                  align="start"
                >
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
                <Textarea id="familiares" {...field} />
              </FormControl>
              <FormMessage>{errors.familiares?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="medicos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="medicos">Medicos</FormLabel>
              <FormControl>
                <Textarea id="medicos" {...field} />
              </FormControl>
              <FormMessage>{errors.medicos?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="quirurgicos"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="quirurgicos">Procedimientos quirúrgicos</FormLabel>
              <FormControl>
                <Textarea id="quirurgicos" {...field} />
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
              <FormLabel htmlFor="traumaticos">Procedimientos traumáticos</FormLabel>
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

        {/* Mostrar campos adicionales si el sexo es Femenino */}
        {isFemale && (
          <div className="mt-4">
            <FormField
              control={control}
              name="antecedentes.0.gestas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gestas:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="Gestas realizadas:"
                      {...field}
                      value={field.value || 0} // Asigna 0 si el valor es undefined o vacío
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                        field.onChange(value); // Asegura que el valor sea un número
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.antecedentes?.[0]?.gestas?.message}</FormMessage>
                </FormItem>
              )}
            />


             <FormField
                  control={control}
              name="antecedentes.0.hijos_vivos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hijos Vivos:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="Hijos vivos:"
                      {...field}
                      value={field.value || 0} 
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                        field.onChange(value); 
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.antecedentes?.[0]?.hijos_vivos?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
                  control={control}
              name="antecedentes.0.hijos_muertos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hijos fallecidos:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="Hijos fallecidos:"
                      {...field}
                      value={field.value || 0} 
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                        field.onChange(value); 
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.antecedentes?.[0]?.hijos_muertos?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="antecedentes.0.abortos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abortos:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="Abortos Realizados:"
                      {...field}
                      value={field.value || 0} // Asigna 0 si el valor es undefined o vacío
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                        field.onChange(value); // Asegura que el valor sea un número
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.antecedentes?.[0]?.abortos?.message}</FormMessage>
                </FormItem>
              )}
            />


            <FormField
          control={control}
          name="antecedentes.0.ultima_regla"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de la ultima Menstrución:</FormLabel>
              <Popover>
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
                <PopoverContent
                  className="w-full min-w-full p-0 relative"
                  align="start"
                >
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
            </FormItem>
          )}
        />

            <FormField
                  control={control}
                  name="antecedentes.0.planificacion_familiar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Usa Planificación Familiar?</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sí">Sí</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{errors.antecedentes?.[0]?.planificacion_familiar?.message}</FormMessage>
                    </FormItem>
                  )}
              />

            <FormField
                  control={control}
              name="antecedentes.0.partos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partos:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="Partos realizados:"
                      {...field}
                      value={field.value || 0} 
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                        field.onChange(value); 
                      }}
                 />

                  </FormControl>
                  <FormMessage>{errors.antecedentes?.[0]?.partos?.message}</FormMessage>
                </FormItem>
              )}
            />

             <FormField
                  control={control}
              name="antecedentes.0.cesareas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cesareas:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      placeholder="Cesareas realizadas:"
                      {...field}
                      value={field.value || 0} 
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                        field.onChange(value); 
                      }}
                 />

                  </FormControl>
                  <FormMessage>{errors.antecedentes?.[0]?.cesareas?.message}</FormMessage>
                </FormItem>
              )}
            />

          </div>
        )}

      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </CardFooter>
    </Card>
  );
}