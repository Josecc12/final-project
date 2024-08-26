"use client";

import LayoutSection from "@/components/LayoutSection";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationComponent } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../inventory/components/SearchBar";

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
    password: "$2b$10$abc123456789X9NNVIbaSfWSKiOFcunltCiPUfEyyv1hNpqx/tc.CDCfqi",
    role: {
      id: 2,
      name: "Enfermero",
    },
  },

];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const onPageChange = (page: number) => {
    router.push("users/?page=" + page);
  };

  return (
    <LayoutSection
      title="Usuarios"
      description="Lista de usuarios, mostrando solo el correo y el rol asignado."
    >
      <SearchBar />
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Email</TableHead>
                <TableHead className="cursor-pointer">Rol</TableHead>
               
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
            
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent
            page={currentPage}
            totalPages={10}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}
