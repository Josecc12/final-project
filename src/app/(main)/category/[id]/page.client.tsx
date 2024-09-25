"use client";


import { Category, User } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Delete  from "@/components/ui/delete";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  category: Category;
};

export default function PageClient({ category }: Props) {


  const router = useRouter();


  return (
    <LayoutSection title={`Detalle de categoria`} description="Aqui puedes ver los detalles de la categoria" 
    actions= {
      <div className="flex gap-2 self-end">
      <Button variant="default" asChild>
        <Link href={`/category/${category.id}/edit`}>
        Editar</Link>
      </Button>
      <Delete categoria={category}/>
    </div>
    }
    
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Codigo</Typography>
          <Typography variant="muted">{category.id}</Typography>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{category.nombre}</Typography>
        </div>
        <div className="w-full flex  items-center gap-1">
        </div>
      </div>
    </LayoutSection>
  );
}
