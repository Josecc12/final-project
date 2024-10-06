"use client";
import Link from "next/link";
import { Button } from "../ui/button";


import {
  ActivityIcon,
  Building,
  ChartBarStacked,
  ClipboardPlusIcon,
  HomeIcon,
  House,
  LayoutGridIcon,
  MicroscopeIcon,
  ScrollTextIcon,
  ShoppingBasketIcon,
  UsersIcon,
} from "lucide-react";
import { Logout } from "@/actions/auth/logout";





export default function MainNav() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="items-center gap-2 font-bold hidden lg:flex"
          prefetch={false}
        >
          <span className="text-lg">Centro de Salud San Vicente Buenabaj</span>
        </Link>
        <nav className="space-y-1">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5 stroke-slate-500 stroke-[2px]" />
            Inicio
          </Link>
          <Link
            href="/inventory"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <LayoutGridIcon className="h-5 w-5" />
            Inventario
          </Link>
          <Link
            href="/user"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Usuarios
          </Link>
          <Link
        href="/patients"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <ClipboardPlusIcon className="h-5 w-5" />
            Pacientes
          </Link>
          <Link
            href="/tickets"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <ShoppingBasketIcon className="h-5 w-5" />
            Tickets
          </Link>
          <Link
            href="/category"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <ChartBarStacked  className="h-5 w-5" />
            Categorías
          </Link>
          <Link
            href="/department"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <Building className="h-5 w-5" />
            Departamentos
          </Link>
          <Link
            href="/laboratory"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <MicroscopeIcon  className="h-5 w-5" />
            Laboratorios
          </Link>
          <Link
            href="/request"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <ScrollTextIcon className="h-5 w-5" />
            Solicitudes
          </Link>
        </nav>
      </div>
      <div className="space-y-4">
        <Button  onClick={Logout} variant="default" size="sm" className="w-full">
           Cerrar sesión
        </Button>
      </div>
    </>
  );
}

