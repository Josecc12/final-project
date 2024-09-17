import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  onSearch?: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch?.(value);
  }, 300);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="relative flex-1">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
