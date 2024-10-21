
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  FormControl,
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
import { useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import Category from "@/app/types/models/Category";
import Department from "@/app/types/models/Department";
import schema from "./schema";
type InventoryFormInputs = z.infer<typeof schema>;

type Props = {
  categorias: Category[];
  departamentos: Department[];
};

export default function FormInventory({ categorias, departamentos }: Props) {
  const { control, setValue, getValues } = useFormContext<InventoryFormInputs>();
  const [listaDepartamentos, setListaDepartamentos] = useState<Department[]>([]);

  // Agrega el ID al array de departamentos seleccionados
  const handleDepartamentoChange = (id: string) => {
    const departamentoSeleccionado = departamentos.find((d) => d.id === id);
    if (departamentoSeleccionado) {
      const yaSeleccionado = listaDepartamentos.some((d) => d.id === id);
      if (!yaSeleccionado) {
        const nuevaLista = [...listaDepartamentos, departamentoSeleccionado];
        setListaDepartamentos(nuevaLista);

        // Actualiza el array de IDs en el estado del formulario
        setValue(
          "departamentosId",
          nuevaLista.map((d) => d.id)
        );
      }
    }
  };

  // Elimina un departamento de la lista y actualiza el array de IDs
  const eliminarDepartamento = (id: string) => {
    const nuevaLista = listaDepartamentos.filter((d) => d.id !== id);
    setListaDepartamentos(nuevaLista);

    // Actualiza el array de IDs en el estado del formulario
    setValue(
      "departamentosId",
      nuevaLista.map((d) => d.id)
    );
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardContent className="gap-3 flex flex-col">
        <FormField
          control={control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="Código del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="categoriaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="departamentosId"
          render={() => (
            <FormItem>
              <FormLabel>Departamentos</FormLabel>
              <FormControl>
                <Select onValueChange={handleDepartamentoChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((departamento) => (
                      <SelectItem key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              {/* Lista de departamentos seleccionados */}
              <div className="mt-4">
                <h3 className="font-semibold">Seleccionados:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {listaDepartamentos.map((departamento) => (
                    <li key={departamento.id} className="flex justify-between items-center">
                      <span>{departamento.nombre}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => eliminarDepartamento(departamento.id)}
                      >
                        Eliminar
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </FormItem>
          )}
        />
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button type="submit">Guardar</Button>
      </CardFooter>
    </Card>
  );
}
