import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const mock = [
  {
    quantity: 10,
    item: "Guantes de latex",
  },
  {
    quantity: 5,
    item: "Jeringas",
  },
  {
    quantity: 20,
    item: "Algodón",
  },
  {
    quantity: 10,
    item: "Alcohol",
  },
  {
    quantity: 5,
    item: "Jeringas",
  },
  {
    quantity: 20,
    item: "Algodón",
  },
  {
    quantity: 10,
    item: "Alcohol",
  },
  {
    quantity: 5,
    item: "Jeringas",
  },
  {
    quantity: 20,
    item: "Algodón",
  },
  {
    quantity: 10,
    item: "Alcohol",
  },
  
];

export default function Page() {
  return (
    <LayoutSection
      title="Laboratorio VIH"
      description="Detalle de insumos y cantidades"
      actions={
        <div className="flex gap-2 md:self-end self-end">
          <Button variant="default" asChild>
            <Link href="#">Editar</Link>
          </Button>
          <Button variant="destructive">Eliminar</Button>
        </div>
      }
    >
      <Card>
        <CardContent className="px-0">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                
                <TableHead>
                  Insumo
                </TableHead>
                <TableHead className="w-[100px]">Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mock.map((item , index) => (
                <TableRow key={index} >
                   
                    <TableHead >{item.item}</TableHead>
                    <TableHead className="flex items-center justify-center">{item.quantity}</TableHead>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </LayoutSection>
  );
}
