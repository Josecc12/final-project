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
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import schema from "./schema";
import Role from "@/actions/types/models/Role";

type UserFormInputs = z.infer<typeof schema>;


type Props = {
  roles: Role[]
}


export default function FormUser({roles}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserFormInputs>();

  return (
    <Card className="w-full max-w-[600px]">
      <CardContent className="gap-3 flex flex-col">
        <div className="flex flex-col gap-4">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstName">Nombre</FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    placeholder="Ingresa tu nombre"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.firstName?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastName">Apellido</FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    placeholder="Ingresa tu apellido"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.lastName?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  id="username"
                  placeholder="Elige un nombre de usuario"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="role">Rol</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                   {
                      roles.map((role) => (
                        <SelectItem key={role.id} value={`${role.id}`}>
                          {role.name}
                        </SelectItem>
                      ))
                   }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.role?.message}</FormMessage>
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
