"use client";
import LayoutSection from "@/components/LayoutSection";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

import { PaginationComponent } from "@/components/ui/pagination";
import SearchBar from "@/components/navigation/SearchBar";

export default function PageClient({
    department,
  pagination = { totalItems: 1, totalPages: 1, page: 1 },
}: any) {
  const router = useRouter();
      const onPageChange = (page: number) => {
        router.push("department/?page=" + page);
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
      description="Encuentra aquí la información de los insumos del departamento"
      title="Insumos"
  
    >
      
      <Card>
      <SearchBar placeholder="Buscar" onSearch={onSearch}/>
      <div className="mb-4"></div>
        <CardContent className="px-0 overflow-x-auto">
          <Table className="overflow-hidden w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Código</TableHead>
                <TableHead className="cursor-pointer">Nombre</TableHead>
                <TableHead className="cursor-pointer">Existencia</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {department.insumos.map((supply: any) => (
                <TableRow key={supply.id}>
                  <TableCell>{supply.codigo}</TableCell>
                  <TableCell>{supply.nombre}</TableCell>
                   <TableCell>{supply.existencia} </TableCell>
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
    // <h1>Insumos hola hofasljfdas;ldf</h1>
  );
}
