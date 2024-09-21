"use client";

import { useState, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function DropdownSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    { label: "Acetaminofen", value: "1" },
    { label: "Ibuprofeno", value: "2" },
    { label: "Paracetamol", value: "3" },
    { label: "Aspirina", value: "4" },
    { label: "Diclofenaco", value: "5" },
    { label: "Naproxeno", value: "6" },
    { label: "Metamizol", value: "7" },
    { label: "Ketorolaco", value: "8" },
    { label: "Meloxicam", value: "9" },
    { label: "Indometacina", value: "10" },
    { label: "Celecoxib", value: "11" },
    { label: "Piroxicam", value: "12" },
  ];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <Select onValueChange={(value) => handleOptionSelect(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona una opcion" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10" // Espacio para el ícono
              onKeyDown={(e) => e.stopPropagation()} // Detener la propagación de teclas
              onFocus={(e) => e.stopPropagation()} // Detener la propagación de foco
            />

            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 size-5" />
          </div>

          <div className="flex flex-col gap-1 max-h-[200px] overflow-y-scroll h-full scrollbar-hide">
            {filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
