"use client";

import { Pagination } from "@/app/types/api";
import { Test } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "@/components/navigation/SearchBar";
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
import test from "node:test";



type Props = {
    tests: Test[];
    pagination?: Pagination;
}


export default function PageClient({ tests, pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  }, }: Props) {

    const router = useRouter();
    const onRow = (id: string) => {
        router.push(`laboratory/${id}`);
      };


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

  return (
    <LayoutSection
      title="Laboratorios"
      description="Todos los laboratorios y sus detalles."
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href='/laboratory/new'>Crear Examen de Laboratorio</Link>
        </Button>
      }
    >
      <SearchBar onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
              <TableHead className="max-w-[370px] w-[370px]" >Codigo</TableHead>
                <TableHead>Nombre</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((laboratory) => (
                <TableRow key={laboratory.id} className="cursor-pointer" onClick={() => onRow(laboratory.id)}>
                    <TableCell>{laboratory.id}</TableCell>
                  <TableCell >{laboratory.nombre}</TableCell>
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
