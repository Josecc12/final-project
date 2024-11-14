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
          <Table className="overflow-hidden">
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
