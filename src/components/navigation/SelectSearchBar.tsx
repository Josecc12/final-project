"use client"

import * as React from "react"
import { Search } from "lucide-react"
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

// Props genéricas con función de filtro personalizada
interface SelectSearchBarProps<T> {
  items: T[]
  onSelect: (item: T) => void
  getLabel: (item: T) => string
  getDescription?: (item: T) => string
  filterFn: (item: T, query: string) => boolean // Nueva función de filtro
  placeholder?: string
}

export default function SelectSearchBar<T>({
  items,
  onSelect,
  getLabel,
  getDescription,
  filterFn,
  placeholder = "Buscar...",
}: SelectSearchBarProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const filteredItems = React.useMemo(() => {
    if (!value) return items
    const lowerCaseValue = value.toLowerCase()
    return items.filter((item) => filterFn(item, lowerCaseValue))
  }, [value, items, filterFn])

  return (
    <div className="w-full max-w-2xl">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left"
          >
            {value ? `${value.slice(0, 20)}...` : placeholder}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-w-2xl">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={value}
              onValueChange={setValue}
              className="w-full"
            />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setValue(getLabel(item))
                      onSelect(item)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span>{getLabel(item)}</span>
                      {getDescription && (
                        <span className="text-sm text-muted-foreground">
                          {getDescription(item)}
                        </span>
                      )}
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
