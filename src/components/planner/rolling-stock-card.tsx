import type { RollingStock } from '@/lib/schemas/delivery.schema';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocomotiveForm } from '@/components/planner/locomotive-form';

interface Props {
  rollingStock: RollingStock;
  setRollingStock: (rs: RollingStock) => void;
  previousRollingStock?: RollingStock;
  nextRollingStock?: RollingStock;
}

export const RollingStockCard = ({ rollingStock, setRollingStock, previousRollingStock, nextRollingStock }: Props) => {
  const handleTypeChange = (value: string) => {
    if (value !== 'locomotive' && value !== 'cargo') return;

    setRollingStock({ ...rollingStock, type: value });
  };

  const handleRollingStockChange = (updatedRollingStock: RollingStock) => {
    setRollingStock({ ...rollingStock, ...updatedRollingStock });
  };

  return (
    <Card className="w-64">
      <Tabs value={rollingStock.type} onValueChange={handleTypeChange}>
        <CardHeader>
          <TabsList className="w-full">
            <TabsTrigger value="locomotive">Locomotive</TabsTrigger>
            <TabsTrigger value="cargo">Cargo</TabsTrigger>
          </TabsList>
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
          <TabsContent value="cargo">Change your password here.</TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
