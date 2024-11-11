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
import Role from "@/app/types/models/Role";
import Department from "@/app/types/models/Department";
import { useState } from "react";
import { Eye, EyeOff} from "lucide-react";

type UserFormInputs = z.infer<typeof schema>;


type Props = {
  roles: Role[]
  departments: Department[];
}


export default function FormUser({roles, departments}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserFormInputs>();

  const [showPassword, setShowPassword] = useState(false); 

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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    {...field}
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
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
        <FormField
          control={control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="department">Departamento</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el departamento" />
                  </SelectTrigger>
                  <SelectContent>
                   {
                      departments.map((department) => (
                        <SelectItem key={department.departamento.id} value={`${department.departamento.id}`}>
                          {department.departamento.nombre}
                        </SelectItem>
                      ))
                   }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.department?.message}</FormMessage>
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
