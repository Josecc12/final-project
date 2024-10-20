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
import { useRef } from "react";
import DialogVisits from "./components/DialogVisits";
import DrawerVisits from "./components/DrawerVisits";
import SearchBar from "@/components/navigation/SearchBar";
import { Patient } from "@/app/types/models";
import { Pagination } from "@/app/types/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";



type Props = {
  patients: Patient[]
  pagination?: Pagination;
}

export default function PageClient({
  patients,
  pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
  },
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      if (ref.current) {
        ref.current.click();
      }
    } else {
      if (dialogRef.current) {
        dialogRef.current.click();
      }
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`patients/${id}`);
  }

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

  return (
    <LayoutSection
      title="Pacientes"
      description="Encuentra el historial clínico de tu paciente o crea uno nuevo"
      actions={
        <Button variant="default" asChild className="self-end">
          <Link href={`/patients/new`}>Agregar paciente</Link>
        </Button>
      }
    >
      <SearchBar onSearch={onSearch} />
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[170px]">DPI</TableHead>
                <TableHead className="cursor-pointer">Nombre</TableHead>


              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} onClick={()=>handleRowClick(patient.id)}>
                  <TableCell>{patient.cui}</TableCell>
                  <TableCell>{patient.nombre}</TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent page={pagination.page} totalPages={pagination.totalPages} onPageChange={onPageChange} />
        </CardFooter>
      </Card>
      <div className="hidden">
        <DrawerVisits ref={ref} />
        <DialogVisits ref={dialogRef} />
      </div>
    </LayoutSection>
  );
}
