"use client";

import LayoutSection from "@/components/LayoutSection";


import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationComponent } from "@/components/ui/pagination";
import { useState } from 'react'
import { Car, ChevronDown, ChevronUp } from 'lucide-react'


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef } from "react";
import SearchBar from "@/components/navigation/SearchBar";
import { Pagination } from "@/app/types/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type transaction = {
    id: string
    createdAt: string
    descripcion: string
    user: {
      username: string
    }
    detalleRetiro: Array<{
      id: string
      cantidad: number
      insumoDepartamento: {
        existencia: number
        departamento: {
          nombre: string
        }
      }
    }>
  }

type Props = {
  transactions: transaction[]
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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
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
    router.push(`transaction/${id}`);
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
  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }
  return (

    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Lista de Retiros</h1>
      <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                <TableCell>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(transaction.id)}
                    >
                    {expandedRows.has(transaction.id) ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                    </Button>
                </TableCell>
                <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                <TableCell>{transaction.descripcion}</TableCell>
                <TableCell>{transaction.user.username}</TableCell>
                <TableCell>{transaction.detalleRetiro.length} items</TableCell>
                </TableRow>
            ))}
        </TableBody>

      </Table>
      </Card>
    </div>
  );
}
