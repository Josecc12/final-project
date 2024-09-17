"use client";

import LayoutSection from "@/components/LayoutSection";

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
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../../../components/navigation/SearchBar";
import { User } from "@/app/types/models";
import { Pagination } from "@/app/types/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const users = [
  {
    id: 4,
    name: "daniel",
    lastname: "chocoy",
    username: "Juanito",
    email: "test@gmail.com",
    createdAt: "2024-08-26T05:02:49.489Z",
    updatedAt: "2024-08-26T05:02:49.489Z",
    is_Active: true,
    password: "$2b$10$0TZ9K9yX9NNVIbaSfWSKiOFcunltCiPUfEyyv1hNpqx/tc.CDCfqi",
    role: {
      id: 1,
      name: "Doctor",
    },
  },
  {
    id: 5,
    name: "jose",
    lastname: "perez",
    username: "JoseP",
    email: "joseperez@gmail.com",
    createdAt: "2024-08-26T06:02:49.489Z",
    updatedAt: "2024-08-26T06:02:49.489Z",
    is_Active: true,
    password:
      "$2b$10$abc123456789X9NNVIbaSfWSKiOFcunltCiPUfEyyv1hNpqx/tc.CDCfqi",
    role: {
      id: 2,
      name: "Enfermero",
    },
  },
];

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
      description="Lista de usuarios, mostrando solo el correo y el rol asignado."
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/user/new`}>Agregar Uusario</Link>
        </Button>
      }
    >
      <SearchBar onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Email</TableHead>
                <TableHead className="cursor-pointer">UserName</TableHead>
                <TableHead className="cursor-pointer">Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} onClick={() => onRow(user.id)}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
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
