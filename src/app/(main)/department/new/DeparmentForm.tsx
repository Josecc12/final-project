import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
});
  
type InventoryFormInputs = z.infer<typeof schema>;

export default function DepartmentForm({ isSubmitting = false }){
    const {
        control,
        formState: {errors},
    } = useFormContext<InventoryFormInputs>();
    const router = useRouter();

    const handleCancel = () => {
        router.push("/department");
    };

    return (
        <Card className="w-full max-w-[600px]"> 
            <CardContent className="gap-3 flex flex-col">
                <div className="flex flex-col gap-4">
                    <FormField
                        control={control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Nombre</FormLabel>
                                <FormControl>
                                    <Input 
                                        id="name"
                                        placeholder="Ingresa el nombre"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage>{errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
            </CardFooter>
        </Card>
    )
}