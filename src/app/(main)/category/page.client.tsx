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

import { Pagination } from "@/app/types/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Category } from "@/app/types/models";

const categories = [
  {
    
  },
];

type Props = {
  categories: Category[];
  pagination?: Pagination;
};

export default function PageClient({
  categories,
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
    router.push(`category/${id}`);
  };

  return (
    <LayoutSection
      title="Categorías"
      description="Listado disponible en el centro de salud"
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/category/new`}>Agregar Categoría</Link>
        </Button>
      }
    >
      <SearchBar onSearch={onSearch} />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Nombre</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {categories.map((categori) => (
                <TableRow key={categori.id} onClick={() => onRow(categori.id)}>
                  <TableCell>{categori.nombre}</TableCell>
       
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
