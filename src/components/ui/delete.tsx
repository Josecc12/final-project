import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { toast, useToast } from "@/components/ui/use-toast";
  import deleteCategory from "@/actions/category/delete";
  import { useRouter } from "next/navigation";
  import {Category} from '@/app/types/models'

type Props={
    categoria:Category;
}
  
  export default function Delete({categoria}: Props) {

    const { toast } = useToast();
    const router    = useRouter();


    const onDelete = async() => {
        const response =  await deleteCategory({
            id: categoria.id,
            nombre: categoria.nombre,
        });

        if(response.status === 200) {
            toast({
                title: "Categoria actualizada exitosamente",
                description: `La categoria ${categoria.nombre} ha sido actualizada`,
            });
            router.push("/category");
        } else {
            toast({
                title: "Error al editar categoria",
                description: `La categoria ${categoria.nombre} no pudo ser actualizada`,
                variant: "destructive",
            });
        }

    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Eliminar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estas seguro/a de hacer es?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede revertir, vas a eliminar la categoria  <b>{categoria.nombre}</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  