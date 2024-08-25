import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ListFilter } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStock, setFilterStock] = useState("");

  return (
    <div className="flex items-center mb-4">
      <div className="relative flex-1">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-4 h-8 gap-1">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filtrar
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filterCategory === ""}
            onCheckedChange={() => setFilterCategory("")}
          >
            Todas las categorías
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterCategory === "Equipos de protecci\u00F3n"}
            onCheckedChange={() =>
              setFilterCategory("Equipos de protecci\u00F3n")
            }
          >
            Equipos de protección
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterCategory === "Instrumentos m\u00E9dicos"}
            onCheckedChange={() =>
              setFilterCategory("Instrumentos m\u00E9dicos")
            }
          >
            Instrumentos médicos
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterCategory === "Suministros m\u00E9dicos"}
            onCheckedChange={() =>
              setFilterCategory("Suministros m\u00E9dicos")
            }
          >
            Suministros médicos
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filterStock === ""}
            onCheckedChange={() => setFilterStock("")}
          >
            Todos los estados
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterStock === "in_stock"}
            onCheckedChange={() => setFilterStock("in_stock")}
          >
            En stock
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filterStock === "out_of_stock"}
            onCheckedChange={() => setFilterStock("out_of_stock")}
          >
            Agotado
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
