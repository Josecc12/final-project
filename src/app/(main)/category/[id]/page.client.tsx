'use client';

import { Category } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Delete from "@/components/ui/delete"; 
import deleteCategory from "@/actions/category/delete"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";
import { MessageSquare, Notebook } from "lucide-react";

type Props = {
  category: Category;
};

export default function PageClient({ category }: Props) {
  const router = useRouter(); 

  const onDelete = async () => {
    const response = await deleteCategory({ id: category.id }); 

    if (response?.status === 200) {
      toast({
        title: "Categoría eliminada exitosamente",
        description: `La categoría ${category.nombre} ha sido eliminada`,
        variant: "default",
      });
      router.push("/category");
      router.refresh(); 
    } else if (response?.status === 401) {
      toast({
        title: "Error de autenticación",
        description: "No estás autorizado para realizar esta acción.",
        variant: "destructive",
      });
    } else if ("message" in response) {
      toast({
        duration: 3000,
        title: `Error ${response.status}`,
        description: (response as ErrorResponse).message,
      });
    }
  };

  return (
    <LayoutSection
      title={`Detalle de categoría`}
      description="Aquí puedes ver los detalles de la categoría"
      actions={
        <div className="flex gap-2 self-end">
          <Button variant="default" asChild>
            <Link href={`/category/${category.id}/edit`}>
              Editar
            </Link>
          </Button>
          <Delete onDelete={onDelete} />
        </div>
      }
    >
      <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">
            <Typography variant="small" className="font-bold">Código</Typography>
            <Typography variant="muted">{category.id}</Typography>
          </span>
        </div>

        <br />

        <div className="flex items-center space-x-2">
          <Notebook className="h-10 w-5 text-muted-foreground" />
          <span className="font-medium">
          <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{category.nombre}</Typography>
          </span>
        </div>
    </LayoutSection>
  );
}
