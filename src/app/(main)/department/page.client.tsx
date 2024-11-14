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
import { useRouter } from "next/navigation";
import SearchBar from "../../../components/navigation/SearchBar";

import { Pagination } from "@/app/types/api";
import { Department } from "@/app/types/models";
import { Button } from "@/components/ui/button";
import Link from "next/link";



type Props = {
  departaments: Department[];
  pagination?: Pagination;
};

export default function PageClient({
  departaments,
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
    router.push(`department/${id}`);
  };

  return (
    <LayoutSection
      title="Departamentos"
      description="Listado de los departamentos existentes"
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/department/new`}>Agregar Departamento</Link>
        </Button>
      }
    >
      <SearchBar placeholder="Buscar" onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Nombre</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {departaments.map((departament) => (
                <TableRow key={departament.id} onClick={() => onRow(departament.id)}>
                  <TableCell>{departament.nombre}</TableCell>
       
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
