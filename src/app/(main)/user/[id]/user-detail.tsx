import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, AtSign, Briefcase } from "lucide-react";

export default function UserDetail() {
  // Aquí normalmente obtendrías los datos del usuario de alguna fuente (API, estado, props, etc.)
  const usuario = {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    nombreUsuario: "juanperez123",
    email: "juan.perez@ejemplo.com",
    rol: "Editor"
  };

  return (
    <div className="mt-24"> {/* Incrementado el margen superior para que el componente quede más abajo */}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt={`${usuario.nombre} ${usuario.apellido}`}
            />
            <AvatarFallback>
              {usuario.nombre[0]}
              {usuario.apellido[0]}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">
            {usuario.nombre} {usuario.apellido}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Nombre completo</p>
              <p className="text-sm text-muted-foreground">
                {usuario.nombre} {usuario.apellido}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <AtSign className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Nombre de usuario</p>
              <p className="text-sm text-muted-foreground">
                {usuario.nombreUsuario}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Correo electrónico</p>
              <p className="text-sm text-muted-foreground">{usuario.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Briefcase className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Rol</p>
              <p className="text-sm text-muted-foreground">{usuario.rol}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
