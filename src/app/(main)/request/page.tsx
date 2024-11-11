"use client";

import LayoutSection from "@/components/LayoutSection";
import SearchBar from "@/components/navigation/SearchBar";
import { Badge } from "@/components/ui/badge";
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

const mock = [
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 1",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 2",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 3",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 4",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 5",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 6",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 7",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 8",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 9",
  },
  {
    id: "asdasd12321-asdasd",
    name: "Laboratorio 10",
  },
];

export default function Page() {
  const router = useRouter();
  const onRow = (id: string) => {
    router.push(`laboratory/${id}`);
  };

  return (
    <LayoutSection
      title="Solicitudes de Laboratorio"
      description="Todas tus solicitudes de laboratorio"
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/request/new`}>Nueva solicitud</Link>
        </Button>
      }
    >
      <SearchBar placeholder="Buscar" />

      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                
                <TableHead className="w-[150px]">Estado</TableHead>
                <TableHead  className="w-[150px]">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mock.map((laboratory) => (
                <TableRow
                  key={laboratory.id}
                  className="cursor-pointer"
                  onClick={() => onRow(laboratory.id)}
                >
                  <TableCell>{laboratory.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      Aprobado
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent page={1} totalPages={100} />
        </CardFooter>
      </Card>
    </LayoutSection>
  );
}
