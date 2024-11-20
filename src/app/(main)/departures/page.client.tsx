'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { departure, Department } from '@/app/types/models';
import { Pagination } from "@/app/types/api";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card";

type Props = {
    retiros: departure[];
    departments: Department[];
    pagination?: Pagination;
};

export default function PageClient(
    {
        retiros,
        departments,
        pagination = { totalItems: 1, totalPages: 1, page: 1 },
    }: Props
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const [filters, setFilters] = useState({
    department: searchParams.get('filterDepartamento') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || ''
  });

  const processedData = retiros.reduce((acc, retiro) => {
    retiro.detalleRetiro.forEach(detalle => {
      if (!acc[detalle.nombreInsumo]) {
        acc[detalle.nombreInsumo] = {
          totalCantidad: 0,
          detalles: []
        }
      }
      acc[detalle.nombreInsumo].totalCantidad += detalle.cantidad
      acc[detalle.nombreInsumo].detalles.push({
        id: retiro.id,
        createdAt: retiro.createdAt,
        descripcion: retiro.descripcion,
        username: retiro.user.username,
        cantidad: detalle.cantidad
      })
    })
    return acc
  }, {} as { [key: string]: { totalCantidad: number, detalles: any[] } });

  const toggleRowExpansion = (nombreInsumo: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [nombreInsumo]: !prev[nombreInsumo]
    }))
  }

  const handleFilterSubmit = () => {
    const queryParams = new URLSearchParams();
    
    if (filters.department) {
      queryParams.set('filterDepartamento', filters.department);
    }
    if (filters.startDate) {
      queryParams.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      queryParams.set('endDate', filters.endDate);
    }

    router.push(`?${queryParams.toString()}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resumen de Retiros</h1>
      
      {/* Filter Section */}
      <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <Select 
          onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}
          value={filters.department}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar Departamento" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept.id} value={dept.nombre}>{dept.nombre}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !filters.startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.startDate ? (
                format(parseISO(filters.startDate), "PPP", { locale: es })
              ) : (
                <span>Fecha Inicio</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.startDate ? new Date(filters.startDate) : undefined}
              onSelect={(date) => setFilters(prev => ({ 
                ...prev, 
                startDate: date ? format(date, 'yyyy-MM-dd') : '' 
              }))}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !filters.endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.endDate ? (
                format(parseISO(filters.endDate), "PPP", { locale: es })
              ) : (
                <span>Fecha Fin</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.endDate ? new Date(filters.endDate) : undefined}
              onSelect={(date) => setFilters(prev => ({ 
                ...prev, 
                endDate: date ? format(date, 'yyyy-MM-dd') : '' 
              }))}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleFilterSubmit}>Filtrar</Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Nombre Insumo</TableHead>
                <TableHead className="w-1/6">Cantidad Total</TableHead>
                <TableHead className="w-1/2">Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(processedData).map(([nombreInsumo, { totalCantidad, detalles }]) => (
                <TableRow key={nombreInsumo}>
                  <TableCell className="font-medium">{nombreInsumo}</TableCell>
                  <TableCell>{totalCantidad}</TableCell>
                  <TableCell>
                    <Collapsible open={expandedRows[nombreInsumo]} onOpenChange={() => toggleRowExpansion(nombreInsumo)}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          {expandedRows[nombreInsumo] ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                          {expandedRows[nombreInsumo] ? 'Ocultar' : 'Ver'} Detalles
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Fecha</TableHead>
                              <TableHead>Descripción</TableHead>
                              <TableHead>Usuario</TableHead>
                              <TableHead>Cantidad</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {detalles.map((detalle) => (
                              <TableRow key={detalle.id}>
                                <TableCell>{new Date(detalle.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{detalle.descripcion}</TableCell>
                                <TableCell>{detalle.username}</TableCell>
                                <TableCell>{detalle.cantidad}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CollapsibleContent>
                    </Collapsible>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {Object.entries(processedData).map(([nombreInsumo, { totalCantidad, detalles }]) => (
          <Card key={nombreInsumo} className="w-full">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{nombreInsumo}</h3>
                <span className="text-muted-foreground">Total: {totalCantidad}</span>
              </div>

              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-2 mt-2">
                    {detalles.map((detalle) => (
                      <div 
                        key={detalle.id} 
                        className="border-t pt-2 first:border-t-0"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">Fecha:</span>
                          <span>{new Date(detalle.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Descripción:</span>
                          <span>{detalle.descripcion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Usuario:</span>
                          <span>{detalle.username}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Cantidad:</span>
                          <span>{detalle.cantidad}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}