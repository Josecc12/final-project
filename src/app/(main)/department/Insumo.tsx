import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  export default function InsumoDepartamento() {
    const insumos = [
      { codigo: "INS001", nombre: "Ibuprofeno", existencia: 500 },
      { codigo: "INS002", nombre: "Paracetamol", existencia: 200 },
      { codigo: "INS003", nombre: "Diclofenaco", existencia: 100 },
      { codigo: "INS004", nombre: "Enalapril", existencia: 1000 },
      { codigo: "INS005", nombre: "Metformina", existencia: 50 },
    ]
  
    return (
      <div className="container mx-auto py-10">
        <Table>
          <TableCaption>Lista de Insumos del Departamento</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Existencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insumos.map((insumo) => (
              <TableRow key={insumo.codigo}>
                <TableCell className="font-medium">{insumo.codigo}</TableCell>
                <TableCell>{insumo.nombre}</TableCell>
                <TableCell className="text-right">{insumo.existencia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }