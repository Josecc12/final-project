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
import SearchBar from "../inventory/components/SearchBar";
import { User } from "@/actions/types/models";

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
};

export default function PageClient({ users }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const onPageChange = (page: number) => {
    router.push("users/?page=" + page);
  };

  const onRow = (id: number) => {
    router.push(`user/${id}`);
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
            page={currentPage}
            totalPages={10}
            onPageChange={onPageChange}
          />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}
