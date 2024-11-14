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
import SearchBar from "@/components/navigation/SearchBar";
import { Pagination } from "@/app/types/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { Transaction } from "@/app/types/models";


type Props = {
  transactions: Transaction[]
  pagination?: Pagination;
}

export default function PageClient({
  transactions,
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
    router.push(`transaction/${id}`);
  };

  return (
    <LayoutSection
        description="Encuentra aquí la información de los inventarios de los productos, stock, status y más."
        title="Inventarios"
        actions={
            <Button variant="default" asChild className="self-end">
                <Link href={`/transaction/new`}>Nuevo movimiento de insumos</Link>
            </Button>
        }
    >
        <SearchBar onSearch={onSearch}  placeholder= {"Buscar por usuario"}/>

        <Card>
            <CardContent className="px-0">
                <Table className="overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer w-[100px] hidden md:table-cell">
                                Fecha
                            </TableHead>
                            <TableHead className="cursor-pointer">Descripcion</TableHead>
                            <TableHead className="cursor-pointer hidden lg:table-cell">
                                Usuario
                            </TableHead>
                            <TableHead className="cursor-pointer hidden lg:table-cell">
                                Items
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow 
                                key={transaction.id} 
                                onClick={() => onRow(transaction.id)}
                                className="cursor-pointer hover:bg-gray-50"
                            >
                                <TableCell className="w-[100px] hidden md:table-cell">
                                    {format(new Date(transaction.createdAt), "dd/MM/yyyy HH:mm:ss")}
                                </TableCell>
                                <TableCell className="max-w-xs truncate">
                                    {transaction.descripcion}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    {transaction.user.username}
                                </TableCell>
                                <TableCell className="text-right lg:text-left">
                                    {transaction.detalleRetiro.length} items
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