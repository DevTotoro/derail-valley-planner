import type { RollingStock } from '@/lib/schemas/delivery.schema';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

import { Icons } from '@/components/icons';
import { LocomotiveForm } from '@/components/planner/locomotive-form';
import { CargoForm } from '@/components/planner/cargo-form';

interface Props {
  rollingStock: RollingStock;
  setRollingStock: (rs: RollingStock) => void;
  onDelete: () => void;
  previousRollingStock?: RollingStock;
  nextRollingStock?: RollingStock;
}

export const RollingStockCard = ({
  rollingStock,
  setRollingStock,
  previousRollingStock,
  nextRollingStock,
  onDelete
}: Props) => {
  const handleTypeChange = (value: string) => {
    if (value !== 'locomotive' && value !== 'cargo') return;

    setRollingStock({ ...rollingStock, type: value });
  };

  const handleRollingStockChange = (updatedRollingStock: RollingStock) => {
    setRollingStock({ ...rollingStock, ...updatedRollingStock });
  };

  return (
    <Card className="w-full shrink-0 md:w-72">
      <Tabs value={rollingStock.type} onValueChange={handleTypeChange} className="gap-4">
        <CardHeader className="flex items-center justify-between gap-4">
          <TabsList className="w-full max-w-xs">
            <TabsTrigger value="locomotive">Locomotive</TabsTrigger>
            <TabsTrigger value="cargo">Cargo</TabsTrigger>
          </TabsList>

          <Button size="icon" variant="destructive" className="size-8" onClick={onDelete}>
            <Icons.trash />
          </Button>
        </CardHeader>

        <CardContent>
          <TabsContent value="locomotive">
            {rollingStock.type === 'locomotive' && (
              <LocomotiveForm
                locomotive={rollingStock}
                setLocomotive={handleRollingStockChange}
                previousRollingStock={previousRollingStock}
                nextRollingStock={nextRollingStock}
              />
            )}
          </TabsContent>
          <TabsContent value="cargo">
            {rollingStock.type === 'cargo' && <CargoForm cargo={rollingStock} setCargo={handleRollingStockChange} />}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
