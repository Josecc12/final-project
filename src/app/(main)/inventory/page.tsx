"use client";

import LayoutSection from "@/components/LayoutSection";
import SearchBar from "./components/SearchBar";
import {DeleteModal} from './components/Delete'
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
import {EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const medicalSupplies = [
  {
    id: 1,
    quantity: 50,
    description: "Mascarillas quirúrgicas",
    category: "Equipos de protección",
    inStock: true,
  },
  {
    id: 2,
    quantity: 20,
    description: "Guantes de látex",
    category: "Equipos de protección",
    inStock: true,
  },
  {
    id: 3,
    quantity: 5,
    description: "Termómetros digitales",
    category: "Instrumentos médicos",
    inStock: false,
  },
  {
    id: 4,
    quantity: 100,
    description: "Vendas elásticas",
    category: "Suministros médicos",
    inStock: true,
  },
  {
    id: 5,
    quantity: 15,
    description: "Jeringas desechables",
    category: "Suministros médicos",
    inStock: true,
  },
  {
    id: 6,
    quantity: 30,
    description: "Alcohol isopropílico",
    category: "Suministros médicos",
    inStock: false,
  },
  {
    id: 7,
    quantity: 80,
    description: "Gasas estériles",
    category: "Suministros médicos",
    inStock: true,
  },
  {
    id: 8,
    quantity: 10,
    description: "Estetoscopios",
    category: "Instrumentos médicos",
    inStock: true,
  },
  {
    id: 9,
    quantity: 25,
    description: "Batas quirúrgicas",
    category: "Equipos de protección",
    inStock: true,
  },
  {
    id: 10,
    quantity: 40,
    description: "Apósitos adhesivos",
    category: "Suministros médicos",
    inStock: true,
  },
];

type MedicalSupply = {
  id: number;
  quantity: number;
  description: string;
  category: string;
  inStock: boolean;
}

export default function Page() {
  const router       = useRouter();
  const searchParams = useSearchParams()
  const currentPage  = Number(searchParams.get("page")) || 1;
  const onPageChange = (page: number) => {
    router.push("inventory/?page=" + page);
  };

  const [selectedSupply, setSelectedSupply] = useState<MedicalSupply | null>(null);

  function handleEditClick(supply: MedicalSupply){
    setSelectedSupply(supply)
    router.push(`inventory/edit/${supply.id}`)
  }


  return (
    <LayoutSection
      title="Inventarios"
      description="Encuentra aquí la información de los inventarios de los productos, stock, status y más."
    >
      <SearchBar />
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer w-[100px] hidden md:table-cell">
                  Cantidad
                </TableHead>
                <TableHead className="cursor-pointer">Descripción</TableHead>

                <TableHead className="cursor-pointer hidden lg:table-cell">
                  Categoría
                </TableHead>
                <TableHead className="w-[150px]">Estado de stock</TableHead>
                <TableHead className="size-[40px] p-0 pr-1" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalSupplies.map((supply: MedicalSupply) => (
                <TableRow key={supply.id}>
                  <TableCell className="w-[100px] hidden md:table-cell">
                    {supply.quantity}
                  </TableCell>
                  <TableCell>{supply.description}</TableCell>

                  <TableCell className="hidden lg:table-cell">
                    {supply.category}
                  </TableCell>
                  <TableCell className="w-[150px] flex justify-center">
                    <Badge
                      variant="outline"
                      className={clsx(
                        supply.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {supply.inStock ? "En stock" : "Agotado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="size-[40px]  p-0 pr-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="focus:ring-0 focus-visible:ring-0"
                        >
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={()=> handleEditClick(supply)}>
                          Editar
                        </DropdownMenuItem>
                        <DeleteModal {... supply}/>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
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
