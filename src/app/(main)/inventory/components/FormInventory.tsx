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
import { useFormContext} from "react-hook-form";
import Category from "@/app/types/models/Category";
import Department from "@/app/types/models/Department";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  nombre: z.string().min(1,"El nombre es requerido"),
  codigo: z.string().min(1,"El código es requerido"),
  categoriaId: z.string().min(1,"La categoría es requerida"),
  trazador: z.boolean().default(false),
});

type InventoryFormInputs = z.infer<typeof schema>;

type Props = {
  categorias: Category[];
  departamentos: Department[];
};

export default function FormInventory({ categorias, departamentos }: Props) {
  const { control } = useFormContext<InventoryFormInputs>();
  const router = useRouter();

  const handleCancel = () => {
    router.push('/inventory');
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardContent className="gap-3 flex flex-col py-4">
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
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}
                >
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
          name="trazador"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <FormLabel>¿Es un producto trazador?</FormLabel>
            </FormItem>
          )}
        />
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </CardFooter>
    </Card>
  );
}
