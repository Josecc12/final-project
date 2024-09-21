import { DropdownSearch } from "@/components/DropdownSearch";
import LayoutSection from "@/components/LayoutSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/Typography";

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

export default function PageClient() {
  return (
    <LayoutSection
      title="Nueva solicitud de laboratorio"
      description="Selecciona un laboratorio para solicitar un insumos"
    >
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-8">
          <DropdownSearch />
          <Button>
            Enviar solicitud
          </Button>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Typography variant="small" className="font-bold">
            Detalle de la solicitud
          </Typography>
          <Card>
            <CardContent className="px-0">
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead className="w-[100px]">Cantidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mock.map((item, index) => (
                    <TableRow key={index}>
                      <TableHead>{item.item}</TableHead>
                      <TableHead className="flex items-center justify-center">
                        {item.quantity}
                      </TableHead>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutSection>
  );
}
