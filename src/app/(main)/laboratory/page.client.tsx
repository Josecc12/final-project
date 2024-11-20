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

type Props = {
    tests: Test[];
    pagination?: Pagination;
}

export default function PageClient({ 
    tests, 
    pagination = {
        totalItems: 1,
        totalPages: 1,
        page: 1,
    }, 
}: Props) {
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
            <SearchBar placeholder="Buscar por nombre" onSearch={onSearch} />

            <Card>
                <CardContent className="px-0">
                    {/* Tabla de escritorio */}
                    <Table className="hidden md:table overflow-hidden">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-w-[200px] w-[200px]">Código</TableHead>
                                <TableHead>Nombre del Laboratorio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tests.map((laboratory) => (
                                <TableRow 
                                    key={laboratory.id} 
                                    className="cursor-pointer" 
                                    onClick={() => onRow(laboratory.id)}
                                >
                                    <TableCell>{laboratory.id}</TableCell>
                                    <TableCell>{laboratory.nombre}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Vista de lista para móviles */}
                    <div className="block md:hidden space-y-4 px-4">
                        {tests.map((laboratory) => (
                            <div 
                                key={laboratory.id} 
                                className="border rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors"
                                onClick={() => onRow(laboratory.id)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            Nombre: {laboratory.nombre}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-500 truncate">
                                        {laboratory.id}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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