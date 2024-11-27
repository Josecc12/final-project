"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

import {
  Building,
  ClipboardPlusIcon,
  HomeIcon,
  LayoutGridIcon,
  MicroscopeIcon,
  ScrollTextIcon,
  ShoppingBasketIcon,
  UsersIcon,
  PackageIcon,
  LayersIcon,
  TagIcon,
  ChevronDown,
  TruckIcon,
  ArrowLeftRight
} from "lucide-react";
import Logout from "@/actions/auth/logout";

type Role = 'SuperAdmin' | 'Farmacia' | 'Bodega' | 'Odontologia' | 'Nutricion' | 'Medicos' | 'Enfermeria' | 'Laboratorio' | 'Direccion';

const rolePermissions: Record<Role, { 
  inventory?: boolean, 
  users?: boolean, 
  patients?: boolean, 
  tickets?: boolean, 
  departments?: boolean, 
  laboratory?: boolean, 
  requests?: boolean 
}> = {
  SuperAdmin: { 
    inventory: true, 
    users: true, 
    patients: true, 
    tickets: true, 
    departments: true, 
    laboratory: true, 
    requests: true 
  },
  Farmacia: { 
    inventory: true, 
    tickets: true 
  },
  Bodega: { 
    inventory: true 
  },
  Odontologia: { 
    patients: true 
  },
  Nutricion: { 
    patients: true 
  },
  Medicos: { 
    patients: true 
  },
  Enfermeria: { 
    patients: true 
  },
  Laboratorio: { 
    laboratory: true, 
    requests: true 
  },
  Direccion: {}
};

interface MainNavProps {
  role: Role;
}

export default function MainNav({ role }: MainNavProps) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const permissions = rolePermissions[role];

  const toggleInventory = () => setIsInventoryOpen((prev) => !prev);

  const Log = async () => {
    await Logout();
  };

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
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5 stroke-slate-500 stroke-[2px]" />
            Inicio
          </Link>

          {permissions.inventory && (
            <div>
              <button
                onClick={toggleInventory}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              >
                <div className="flex items-center gap-2">
                  <LayoutGridIcon className="h-5 w-5" />
                  Inventario
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isInventoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isInventoryOpen ? "max-h-50" : "max-h-0"
                }`}
              >
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/category"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <TagIcon className="h-4 w-4" />
                      Categorías
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/inventory"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <PackageIcon className="h-4 w-4" />
                      Insumos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/transaction"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <LayersIcon className="h-4 w-4" />
                      Movimientos
                    </Link>
                    <Link
                      href="/acquisitions"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <TruckIcon className="h-4 w-4" />
                      Adquisiciones
                    </Link>
                    <Link
                      href="/departures"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
                      prefetch={false}
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      Retiros
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {permissions.users && (
            <Link
              href="/user"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <UsersIcon className="h-5 w-5" />
              Usuarios
            </Link>
          )}

          {permissions.patients && (
            <Link
              href="/patients"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <ClipboardPlusIcon className="h-5 w-5" />
              Pacientes
            </Link>
          )}

          {permissions.tickets && (
            <Link
              href="/tickets"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <ShoppingBasketIcon className="h-5 w-5" />
              Recetas
            </Link>
          )}

          {permissions.departments && (
            <Link
              href="/department"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <Building className="h-5 w-5" />
              Departamentos
            </Link>
          )}

          {permissions.laboratory && (
            <Link
              href="/laboratory"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <MicroscopeIcon className="h-5 w-5" />
              Laboratorios
            </Link>
          )}

          {permissions.requests && (
            <Link
              href="/request"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
              prefetch={false}
            >
              <ScrollTextIcon className="h-5 w-5" />
              Solicitudes
            </Link>
          )}
        </nav>
      </div>

      <div className="space-y-4">
        <Button onClick={Log} variant="default" size="sm" className="w-full">
          Cerrar sesión
        </Button>
      </div>
    </>
  );
}