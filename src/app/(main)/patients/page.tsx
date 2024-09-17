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

const patients = [
  {
    id: 1,
    dpi: "1234567890101",
    name: "Juan Pérez",
    age: 45,
    lastVisit: "2024-08-01",
  },
  {
    id: 2,
    dpi: "9876543210102",
    name: "Ana Gómez",
    age: 32,
    lastVisit: "2024-07-15",
  },
  {
    id: 3,
    dpi: "1357924680103",
    name: "Carlos Martínez",
    age: 28,
    lastVisit: "2024-06-30",
  },
  {
    id: 4,
    dpi: "2468135790104",
    name: "María Rodríguez",
    age: 52,
    lastVisit: "2024-08-10",
  },
  {
    id: 5,
    dpi: "1597534860105",
    name: "Lucía Hernández",
    age: 37,
    lastVisit: "2024-07-22",
  },
];

export default function Page() {
  const ref = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      if (ref.current) {
        ref.current.click();
      }
    }else{
      if (dialogRef.current) {
        dialogRef.current.click();
      }
    }
  };

  return (
    <LayoutSection
      title="Pacientes"
      description="Encuentra el historial clínico de tu paciente o crea uno nuevo"
    >
      <SearchBar />
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[170px]">DPI</TableHead>
                <TableHead className="cursor-pointer">Nombre</TableHead>

                <TableHead className="cursor-pointer w-[250px]">
                  Última visita
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} onClick={handleClick}>
                  <TableCell>{patient.dpi}</TableCell>
                  <TableCell>{patient.name}</TableCell>

                  <TableCell>
                    {new Date(patient.lastVisit).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    {new Date(patient.lastVisit).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <PaginationComponent page={1} totalPages={10} />
        </CardFooter>
      </Card>
      <div className="hidden">
        <DrawerVisits ref={ref} />
        <DialogVisits ref={dialogRef} />
      </div>
    </LayoutSection>
  );
}
