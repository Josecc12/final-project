"use client";

import { Login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/actions/types/api";

const loginSchema = z.object({
  username: z.string().min(4, "El email debe tener al menos 4 caracteres"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginFormInputs>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = form;

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    const response = await Login(data);
    console.log(response);

    if (response.status === 201) {
      router.push("/");
      toast({
        duration: 3000,
        title: "Inicio de sesión exitoso",
        description: "Bienvenido",
      });
    }
    if (response.status === 401) {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas",
      });
    } else if ("message" in response) {
      toast({
        duration: 3000,
        title: `Error ${response.status}`,
        description: (response as ErrorResponse).message,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800 items-center">
      <div className="w-full max-w-[400px] mx-auto space-y-4">
        <header className="flex flex-col items-center space-y-2 p-10">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8" />
            <span className="text-2xl font-bold">Centro de Salud</span>
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            Ingresa tus credenciales
          </p>
        </header>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 px-4">
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Enter your email"
                      {...field}
                      aria-invalid={errors.username ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.username && (
                      <p className="text-red-500 text-sm">
                        {errors.username.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              className="justify-center w-full"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
