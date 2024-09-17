
import { User } from "@/app/types/models";
import LayoutSection from "@/components/LayoutSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

type Props = {
  user: User;
};

export default function PageClient({ user }: Props) {
  return (
    <LayoutSection title={`Detalle de usuario`} description="Acerca de tu pefil" 
    actions= {
      <div className="flex gap-2 md:self-end self-end">
      <Button variant="default" asChild>
        <Link href={`/user/${user.id}/edit`}>
        Editar</Link>
      </Button>
      <Button variant="destructive">Eliminar</Button>
    </div>
    }
    
    >
      <div className="flex flex-col gap-2 xl:gap-3">
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Nombre</Typography>
          <Typography variant="muted">{user.name} {user.lastname}</Typography>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Typography variant="small" className="font-bold">Email</Typography>
          <Typography variant="muted">{user.email}</Typography>
        </div>
        <div className="w-full flex  items-center gap-1">
          <Typography variant="small" className="font-bold">Role</Typography>
          <Badge variant="outline" className="w-fit">
            {user.role.name}
          </Badge>
        </div>
      </div>
    </LayoutSection>
  );
}
