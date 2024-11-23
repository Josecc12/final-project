'use client';

import { Category} from "@/app/types/models";


import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Delete from "@/components/ui/delete"; 
import deleteCategory from "@/actions/category/delete"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { ErrorResponse } from "@/app/types/api";
import { ClipboardList, Edit, Tag } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


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
    <Card className="w-full max-w-md m-8 my-9">
      <CardContent className="space-y-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
               <CardTitle>Detalle de la categoría</CardTitle>
            </div>
            
            <div className="flex gap-2">
              <Button variant="default" asChild>
                <Link href={`/category/${category.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Delete onDelete={onDelete} />
            </div>
          </div>

        </CardHeader>
          {/* Código del insumo */}
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Código</Typography>
              <Typography variant="muted">{category.id}</Typography>
            </div>
            
            </div>
            {/* Nombre del insumo */}
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <div>
              <Typography variant="small" className="font-bold">Nombre</Typography>
              <Typography variant="muted">{category.nombre}</Typography>
            </div>
          </div>          
      </CardContent>
    </Card>
  );
}
