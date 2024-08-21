import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800 items-center">
      <div className="w-full max-w-[400px] mx-auto space-y-4">
        <header className="flex flex-col items-center space-y-2 p-10">
          <div className="flex items-center space-x-2">
            <ActivityIcon className="w-8 h-8" />
            <span className="text-2xl font-bold">Centro de Salud</span>
          </div>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ingresa tus credenciales
          </p>
        </header>
        <div className="grid gap-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Link href="#" className="w-full" prefetch={false}>
            <Button variant="default" className="justify-center w-full">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}
