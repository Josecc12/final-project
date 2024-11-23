'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { ClipboardList, Tag,Calendar, Milk } from "lucide-react";

export default function PageClient({ department }: any) {
  
    
    
    return (
  
      <Card className="w-full max-w-md m-8 my-9">
        <CardContent className="space-y-4">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
                 <CardTitle>Detalle de la adquisición</CardTitle>
                <Typography variant="small" className="text-muted-foreground">
                 
                </Typography>
              </div>
            </div>
  
          </CardHeader>
            {/* Código del departamento */}
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <Typography variant="small" className="font-bold">id</Typography>
                <Typography variant="muted">{department.id}</Typography>
              </div>
              
              </div>
              {/* Nombre del departamento */}
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              <div>
                <Typography variant="small" className="font-bold">Lote</Typography>
                <Typography variant="muted">{department.numeroLote}</Typography>
              </div>
            </div>  
            <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
                <div>
                <Typography variant="small" className="font-bold">Nombre</Typography>
                <Typography variant="muted">{department.insumoDepartamento.insumo.nombre}</Typography>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Milk className="h-5 w-5 text-muted-foreground" />
                <div>
                <Typography variant="small" className="font-bold">Cantidad disponible</Typography>
                <Typography variant="muted">{department.cantidadActual}</Typography>
                </div>
                <div>
                <Typography variant="small" className="font-bold">Cantidad Inicial</Typography>
                <Typography variant="muted">{department.cantidadInical}</Typography>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                    <Typography variant="small" className="font-bold">Fecha de caducidad</Typography>
                    <Typography variant="muted">{department.fechaCaducidad}</Typography>
                </div>
            </div>    
        </CardContent>
      </Card>
    
  
    );
  }