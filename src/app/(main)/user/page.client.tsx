"use client";

import LayoutSection from "@/components/LayoutSection";
import { Pagination } from "@/app/types/api";
import { User } from "@/app/types/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationComponent } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "../../../components/navigation/SearchBar";

type Props = {
  users: User[];
  pagination?: Pagination;
};

export default function PageClient({
  users,
  pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  },
}: Props) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("page", page.toString());
    router.push(`${url.pathname}?${params.toString()}`);
  };

  const onSearch = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("query", value);
    router.push(`${url.pathname}?${params.toString()}`);
    if (value === "") {
      router.push(`${url.pathname}`);
    }
  };

  const onRow = (id: string) => {
    router.push(`user/${id}`);
  };

  return (
    <LayoutSection
      title="Usuarios"
      description="Listado de usuarios, mostrando solo el correo y el rol asignado."
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/user/new`}>Agregar Usuario</Link>
        </Button>
      }
    >
      <SearchBar placeholder="Buscar por nombre o nombre de usuario" onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          {/* Tabla de escritorio */}
          <Table className="hidden md:table overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Correo electrónico</TableHead>
                <TableHead className="cursor-pointer">Nombre</TableHead>
                <TableHead className="cursor-pointer">Nombre de Usuario</TableHead>
                <TableHead className="cursor-pointer">Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} onClick={() => onRow(user.id)}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Vista de lista para móviles */}
          <div className="block md:hidden space-y-4 px-4">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors"
                onClick={() => onRow(user.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.username}
                    </p>
                  </div>
                  <span className="ml-2 px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                    {user.role.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <PaginationComponent
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}