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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, useFormContext } from "react-hook-form";
import { z } from "zod";
import schema from "./schema";
import Category from '@/app/types/models/Category'

type InventoryFormInputs = z.infer<typeof schema>;

type Props = {
    categorias: Category[];
}

export default function FormInventory({categorias}: Props) {
    const {
        control,
        formState: {errors},
    } = useFormContext<InventoryFormInputs>();

  return (
    <Card className="w-full max-w-[600px]"> 
        <CardContent className="gap-3 flex flex-col">
            <div className="flex flex-col gap-4">
                <FormField
                    control={control}
                    name="nombre"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel htmlFor="nombre">Nombre</FormLabel>
                            <FormControl>
                                <Input 
                                    id="nombre"
                                    placeholder="Ingresa el nombre"
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
                name="codigo"
                render={({field}) => (
                    <FormItem>
                        <FormLabel htmlFor="codigo">Código</FormLabel>
                        <FormControl>
                            <Input
                                id="codigo"
                                placeholder="Código del producto"
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            >
            </FormField>
            <FormField
                    control={control}
                    name="categoriaId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel htmlFor="categoriaId">Categoria</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona la categoria"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categorias.map((categoria) => (
                                                <SelectItem key={categoria.id} value={`${categoria.id}`}>
                                                    {categoria.nombre}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage>{errors.categoriaId?.message}</FormMessage>
                        </FormItem>
                    )}
                />
        </CardContent>
        <CardFooter className="flex justify-end">
            <Button type="submit">Guardar</Button>
        </CardFooter>
    </Card>
  )
}
