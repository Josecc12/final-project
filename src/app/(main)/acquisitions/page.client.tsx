"use client";

import { useState } from "react";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "../../../components/navigation/SearchBar";
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
import { ErrorResponse, Pagination } from "@/app/types/api";
import { toast } from "@/components/ui/use-toast";
import deleteSupply from "@/actions/inventory/delete";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Insumo } from "@/app/types/models";


export default function PageClient({insumos, pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
},}: any){
    const router = useRouter();

    const onPageChange = (page: number) => {
        router.push("acquisitions/?page=" + page);
    };
    const onRow = (id: string) => {
        router.push(`acquisitions/${id}`);
      };

      return (
        <LayoutSection
            description="Encuentra aquí la información de las adquisiciones que haz realizado."
            title="Adquisiciones"
            actions={
                <Button variant="default" asChild className="self-end">
                    <Link href={`/acquisitions/new`}>Nueva adquisición</Link>
                </Button>
            }
        >

            <SearchBar placeholder="Buscar" />
            <Card>
                <CardContent className="px-0">
                    <Table className="overflow-hidden w-full">
                        <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer w-1/4 hidden md:table-cell">
                            Codigo
                            </TableHead>
                            <TableHead className="cursor-pointer w-1/4">
                            Cantidad disponible
                            </TableHead>
                            <TableHead className="cursor-pointer w-1/4 hidden lg:table-cell">
                            Insumo
                            </TableHead>
                            <TableHead className="w-1/4">
                            Fecha de caducidad
                            </TableHead>
                            <TableHead className="w-[40px] p-0 pr-1" />
                        </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                        {insumos.map((supply: any) => (
                            <TableRow key={supply.id} onClick={() => onRow(supply.id)}>
                            <TableCell className="w-1/4 hidden md:table-cell">
                                {supply.numeroLote}
                            </TableCell>
                            <TableCell className="w-1/4">
                                {supply.cantidadActual}
                            </TableCell>
                            <TableCell className="w-1/4 hidden lg:table-cell">
                                {supply.insumoDepartamento.insumo.nombre}
                            </TableCell>
                            <TableCell className="w-1/4 flex justify-center text-center">
                                {supply.fechaCaducidad}
                            </TableCell>
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