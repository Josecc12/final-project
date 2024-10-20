"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

import { Insumo, Test } from "@/app/types/models"
import { UseFormSetValue, PathValue, FieldValues, Path } from "react-hook-form"
import findAll from "@/actions/laboratory/findAll"
import findOne from "@/actions/laboratory/findOne"

interface DropdownSearchProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  placeholder?: string
  defaultValue?: string
}

export default function DropdownLaboratory<TFieldValues extends FieldValues>({
  name,
  setValue,
  placeholder = "Selecciona una opción",
  defaultValue = ""
}: DropdownSearchProps<TFieldValues>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<Test[]>([])
  const [selectedItem, setSelectedItem] = useState<Test | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  const fetchInventory = useCallback(async (resetItems: boolean = false) => {
    if (loading || (!hasMore && !resetItems)) return

    setLoading(true)
    const searchParams = new URLSearchParams()
    searchParams.append('limit', '10')
    searchParams.append('page', resetItems ? '1' : page.toString())
    if (searchTerm) searchParams.append('search', searchTerm)

    try {
      const response = await findAll({
        searchParams: searchParams
      })
      if (response.status !== 200 || !("data" in response)) {
        throw new Error("Failed to fetch inventory data")
      }
      setItems(prevItems => resetItems ? response.data : [...prevItems, ...response.data])
      setPage(prevPage => resetItems ? 2 : prevPage + 1)
      setHasMore(resetItems ? (response.meta?.totalPages ?? 0) > 1 : page < (response.meta?.totalPages ?? 0))
    } catch (error) {
      console.error("Error fetching inventory:", error)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, loading, hasMore])

  useEffect(() => {
    fetchInventory(true)
  }, [searchTerm])

  useEffect(() => {
    const fetchDefaultValue = async () => {
      if (defaultValue && defaultValue !== "") {
        try {

          const response = await findOne(defaultValue)
          console.log(response)
          if (response.status === 200 && "data" in response) {
            setSelectedItem(response.data)
            setValue(name, response.data.id as PathValue<TFieldValues, Path<TFieldValues>>, {
              shouldValidate: true,
            })
          }
        } catch (error) {
          console.error("Error fetching default value:", error)
        }
      }
    }

    fetchDefaultValue()
  }, [defaultValue, name, setValue])

  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchInventory()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, fetchInventory])

  const handleOptionSelect = (value: string) => {
    const selected = items.find(item => item.id === value)
    if (selected) {
      setSelectedItem(selected)
      setValue(name, value as PathValue<TFieldValues, Path<TFieldValues>>, {
        shouldValidate: true,
      })
    }
    setIsOpen(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1)
    setHasMore(true)
  }

  const filteredItems = items.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full">
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        onValueChange={(value) => handleOptionSelect(value)}
        value={selectedItem?.id}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {selectedItem ? selectedItem.nombre : placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Buscar opciones..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10"
                onKeyDown={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((option, index) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    ref={index === filteredItems.length - 1 ? lastItemRef : null}
                  >
                    {option.nombre}
                  </SelectItem>
                ))
              ) : (
                <div className="text-center py-2">No se encontraron resultados</div>
              )}
              {loading && <div className="text-center py-2">Cargando...</div>}
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}