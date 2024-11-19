import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Recipe } from '@/app/types/models';
import { useToast } from "@/components/ui/use-toast";

interface RecipeProcessFormProps {
  recipe: Recipe | null;
  onCancel: () => void;
  isProcessing?: boolean;
  processedData?: Recipe | null;
  onProcess?: (recipe: Recipe) => Promise<void>;
}

export default function RecipeProcessForm({ 
  recipe, 
  onCancel, 
  isProcessing = false,
  processedData,
  onProcess
}: RecipeProcessFormProps) {
  const { toast } = useToast();
  
  // Determinar qué datos mostrar basado en si la receta ha sido procesada
  const displayData = processedData || recipe;
  const insumosList = processedData ? processedData.insumosRetirados : recipe?.insumosRecetados;

  const handleProcess = async () => {
    if (!recipe || !onProcess) return;

    try {
      await onProcess(recipe);
      toast({
        title: "Receta procesada",
        description: "La receta se ha procesado exitosamente",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error al procesar",
        description: error instanceof Error ? error.message : "Ocurrió un error al procesar la receta",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-[800px] flex flex-col gap-4 p-4">
      <CardContent className="gap-4 flex flex-col">
        {displayData && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Paciente</label>
                <div className="p-2 bg-muted rounded-md">{displayData.paciente.nombre}</div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Atendido por</label>
                <div className="p-2 bg-muted rounded-md">{displayData.user.name}</div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Descripción</label>
              <div className="p-2 bg-muted rounded-md whitespace-pre-wrap">{displayData.descripcion}</div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">
                {processedData ? 'Insumos Retirados' : 'Insumos Recetados'}
              </label>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Insumo</TableCell>
                    <TableCell className="text-right">Cantidad</TableCell>
                    {processedData && <TableCell className="text-right">Estado</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {insumosList?.map((insumo) => (
                    <TableRow key={insumo.id}>
                      <TableCell>{insumo.nombre}</TableCell>
                      <TableCell className="text-right">{insumo.cantidad}</TableCell>
                      {processedData && (
                        <TableCell className="text-right">
                          <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            Entregado
                          </span>
                        </TableCell>
                      )}
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
        {!processedData && (
          <Button 
            onClick={handleProcess}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Procesar Receta'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}