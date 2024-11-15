'use client'
import SearchBar from "../../../components/navigation/SearchBar";
import { RecipeQueue } from './components/recipeQueue'
import type { Recipe } from '@/app/types/models'
import { useRouter, useSearchParams } from "next/navigation";

interface RecipeQueueClientProps {
  initialRecipes: Recipe[]
}

export default function RecipeQueueClient({ initialRecipes }: RecipeQueueClientProps) {
  const router = useRouter();
  const onSearch = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("query", value);
    router.push(`${url.pathname}?${params.toString()}`);
    if (value === "") {
      router.push(`${url.pathname}`);
    }
  };

  return (
    <div>
      <SearchBar placeholder="Buscar recetas por nombre de paciente o por doctor que lo atendio" onSearch={onSearch} />
      <RecipeQueue initialRecipes={initialRecipes} />
    </div>
  )
}