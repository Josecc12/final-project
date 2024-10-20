"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Definición del tipo de insumo
type Insumo = {
  id: string
  codigo: string
  nombre: string
  categoria: {
    id: string
    nombre: string
  }
}

interface SelectSearchBarProps {
  insumos: Insumo[]
  onSelect: (insumo: Insumo) => void
}

export default function SelectSearchBar({ insumos, onSelect }: SelectSearchBarProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const filteredInsumos = React.useMemo(() => {
    if (!value) return insumos
    const lowerCaseValue = value.toLowerCase()
    return insumos.filter(
      (insumo) =>
        insumo.nombre.toLowerCase().includes(lowerCaseValue) ||
        insumo.codigo.toLowerCase().includes(lowerCaseValue)
    )
  }, [value, insumos])

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left"
          >
            {value ? `${value.slice(0, 20)}...` : "Buscar insumo..."}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Buscar insumo por nombre o código..."
              value={value}
              onValueChange={setValue}
              className="w-full"
            />
            <CommandList>
              <CommandEmpty>No se encontraron insumos.</CommandEmpty>
              <CommandGroup>
                {filteredInsumos.map((insumo) => (
                  <CommandItem
                    key={insumo.id}
                    onSelect={() => {
                      setValue(insumo.nombre)
                      onSelect(insumo)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span>{insumo.nombre}</span>
                      <span className="text-sm text-muted-foreground">
                        Código: {insumo.codigo} | Categoría: {insumo.categoria.nombre}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
