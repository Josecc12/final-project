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

const medicalSupplies = [
    {
        trazador: true,
        id: "42195e9f-b1ef-4331-aa15-dbac8fb53e49",
        codigo: "INS-147",
        nombre: "Insumo Ejemplo",
        categoria: {
            id: "08fd8e7a-f877-4cbc-b40b-7fb4023f7832",
            nombre: "Maternidad"
        }
    }
];

type Props = {
    insumos: Insumo[];
    pagination?: Pagination;
}

export default function PageClient({ insumos, pagination = {
    totalItems: 1,
    totalPages: 1,
    page: 1,
}, }: Props) {
    const router = useRouter();





    const onPageChange = (page: number) => {
        router.push("inventory/?page=" + page);
    };
    const onRow = (id: string) => {
        router.push(`inventory/${id}`);
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
            description="Encuentra aquí la información de los inventarios de los productos, stock, status y más."
            title="Inventarios"
            actions={
                <Button variant="default" asChild className="self-end">
                    <Link href={`/inventory/new`}>Agregar Producto</Link>
                </Button>
            }
        >

            <SearchBar placeholder="Buscar" onSearch={onSearch}/>

            <Card>
                <CardContent className="px-0">
                    <Table className="overflow-hidden">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="cursor-pointer w-[100px] hidden md:table-cell">
                                    Codigo
                                </TableHead>
                                <TableHead className="cursor-pointer">Nombre</TableHead>
                                <TableHead className="cursor-pointer hidden lg:table-cell">
                                    Categoría
                                </TableHead>
                                <TableHead className="w-[150px]">Estado de stock</TableHead>
                                <TableHead className="size-[40px] p-0 pr-1" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {insumos.map((supply) => (
                                <TableRow key={supply.id} onClick={() => onRow(supply.id)}>
                                    <TableCell className="w-[100px] hidden md:table-cell">
                                        {supply.codigo}
                                    </TableCell>
                                    <TableCell>{supply.nombre}</TableCell>

                                    <TableCell className="hidden lg:table-cell">
                                        {supply.categoria.nombre}
                                    </TableCell>
                                    <TableCell className="w-[150px] flex justify-center">
                                        <Badge
                                            variant="outline"
                                            className={clsx(
                                                supply.trazador
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            )}
                                        >
                                            {supply.trazador ? "En stock" : "Agotado"}
                                        </Badge>
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