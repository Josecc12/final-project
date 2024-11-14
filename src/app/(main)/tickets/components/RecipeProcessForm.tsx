// components/RecipeProcessForm.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import type { Recipe } from '@/app/types/models';

interface RecipeProcessFormProps {
 recipe: Recipe | null;
 onCancel: () => void;
 isProcessing?: boolean;
}

export default function RecipeProcessForm({ recipe, onCancel, isProcessing = false }: RecipeProcessFormProps) {
    return (
        <Card className="w-full max-w-[600px] flex flex-col gap-4 p-4">
          <CardContent className="gap-3 flex flex-col">
            {recipe && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Paciente</label>
                  <div className="p-2 bg-muted rounded-md">{recipe.paciente.nombre}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Atendido por</label>
                  <div className="p-2 bg-muted rounded-md">{recipe.user.name}</div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium">Insumos a procesar</label>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Insumo</TableCell>
                        <TableCell>Cantidad</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recipe.insumos.map((insumo, index) => (
                        <TableRow key={index}>
                          <TableCell>{insumo.nombre}</TableCell>
                          <TableCell>{insumo.cantidad}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2 px-0">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Procesando...' : 'Procesar Receta'}
            </Button>
          </CardFooter>
        </Card>
      );
}