"use client";

import { useState } from "react";
import LayoutSection from "@/components/LayoutSection";
import SearchBar from "../../../components/navigation/SearchBar";
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
import { Pagination as PaginationType } from "@/app/types/api";
import { Insumo } from "@/app/types/models";



export default function PageClient({
    insumos, 
    pagination = {
        totalItems: 1,
        totalPages: 1,
        page: 1,
    },
}: any) {
    const router = useRouter();

    const onPageChange = (page: number) => {
        router.push("acquisitions/?page=" + page);
    };

    const onRow = (id: string) => {
        router.push(`acquisitions/${id}`);
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
            description="Encuentra aquí la información de las adquisiciones que haz realizado."
            title="Adquisiciones"
            actions={
                <Button variant="default" asChild className="self-end">
                    <Link href={`/acquisitions/new`}>Nueva adquisición</Link>
                </Button>
            }
        >
            <SearchBar placeholder="Buscar" onSearch={onSearch}/>
            
            <Card>
                <CardContent className="px-0">
                    {/* Tabla de escritorio */}
                    <Table className="hidden md:table overflow-hidden w-full">
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
                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {insumos.map((supply:any) => (
                                <TableRow 
                                    key={supply.id} 
                                    onClick={() => onRow(supply.id)}
                                    className="cursor-pointer"
                                >
                                    <TableCell className="w-1/4 hidden md:table-cell">
                                        {supply.numeroLote}
                                    </TableCell>
                                    <TableCell className="w-1/4">
                                        {supply.cantidadActual}
                                    </TableCell>
                                    <TableCell className="w-1/4 hidden lg:table-cell">
                                        {supply.insumoDepartamento.insumo.nombre}
                                    </TableCell>
                                    <TableCell className="w-1/4 text-center">
                                        {supply.fechaCaducidad}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Vista de lista para móviles */}
                    <div className="block md:hidden space-y-4 px-4">
                        {insumos.map((supply:any) => (
                            <div 
                                key={supply.id} 
                                className="border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors"
                                onClick={() => onRow(supply.id)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Código: {supply.numeroLote}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {supply.insumoDepartamento.insumo.nombre}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Cantidad: {supply.cantidadActual}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Caduca: {supply.fechaCaducidad}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mensaje cuando no hay adquisiciones */}
                    {insumos.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No hay adquisiciones registradas.
                        </div>
                    )}
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