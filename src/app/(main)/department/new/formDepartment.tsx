/*"use client";

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
import { useFormContext } from "react-hook-form";
import { Department } from '@/app/types/models';  
import { z } from "zod";


const schema = z.object({
    nameDepartment: z.string().min(2, "El nombre debe tener al menos 2 caracteres")  
});

type DepartmentFormInputs = z.infer<typeof schema>;  

type Props = {
    department: Department; 
}

export default function FormDepartment({ department }: Props) {  
    const {
        control,
        formState: { errors },
      } = useFormContext<DepartmentFormInputs>();  

    return (
        <Card className="w-full max-w-[600px]">
            <CardContent className="gap-3 flex flex-col">
                <div className="flex flex-col gap-4">
                    <FormField
                     control={control}
                     name="nameDepartment"  
                     render={({field}) => (
                        <FormItem>
                            <FormLabel htmlFor="nombre">Nombre del Departamento</FormLabel>  
                            <FormControl>
                                <Input 
                                    id="nombre"
                                    placeholder="Ingresa el nombre del departamento"  
                                    {...field}>
                                </Input>
                            </FormControl>
                            <FormMessage>{errors.nameDepartment?.message}</FormMessage>  
                        </FormItem>
                     )}>
                    </FormField>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit">Guardar</Button>
            </CardFooter>
        </Card>
    );
}*/
"use client";

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
import { Checkbox } from "@/components/ui/checkbox"; // Importa el checkbox
import { useFormContext } from "react-hook-form";
import { Department } from '@/app/types/models';  
import { z } from "zod";


const schema = z.object({
    nameDepartment: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    is_active: z.boolean(),  // Añado el campo booleano
});

type DepartmentFormInputs = z.infer<typeof schema>;  

type Props = {
    department: Department; 
}

export default function FormDepartment({ department }: Props) {  
    const {
        control,
        formState: { errors },
      } = useFormContext<DepartmentFormInputs>();  

    return (
        <Card className="w-full max-w-[600px]">
            <CardContent className="gap-3 flex flex-col">
                <div className="flex flex-col gap-4">
                    {/* Campo de nombre del departamento */}
                    <FormField
                        control={control}
                        name="nameDepartment"  
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="nombre">Nombre del Departamento</FormLabel>  
                                <FormControl>
                                    <Input
                                        id="nombre"
                                        placeholder="Ingresa el nombre del departamento"  
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{errors.nameDepartment?.message}</FormMessage>  
                            </FormItem>
                        )}
                    />

                    {/* Campo de estado activo (checkbox) */}
                    <FormField
                        control={control}
                        name="is_active"  
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        id="is_active"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel htmlFor="is_active" className="ml-2">
                                    Activo
                                </FormLabel>
                                <FormMessage>{errors.is_active?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit">Guardar</Button>
            </CardFooter>
        </Card>
    );
}