import type { RollingStock } from '@/lib/schemas/delivery.schema';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DirtyLocomotive, LocomotiveForm } from '@/components/planner/locomotive-form';

export type DirtyRollingStock = Pick<RollingStock, 'id' | 'type'> & Partial<Omit<RollingStock, 'id' | 'type'>>;

interface Props {
  rollingStock: DirtyRollingStock;
  setRollingStock: (rs: DirtyRollingStock) => void;
  previousRollingStock?: DirtyRollingStock;
  nextRollingStock?: DirtyRollingStock;
}

export const RollingStockCard = ({ rollingStock, setRollingStock, previousRollingStock, nextRollingStock }: Props) => {
  const handleTypeChange = (value: string) => {
    if (value !== 'locomotive' && value !== 'cargo') return;

    setRollingStock({ ...rollingStock, type: value });
  };

  const handleLocomotiveChange = (locomotive: DirtyLocomotive) => {
    setRollingStock({ ...rollingStock, ...locomotive });
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
            <LocomotiveForm
              locomotive={rollingStock as DirtyLocomotive}
              setLocomotive={handleLocomotiveChange}
              previousRollingStock={previousRollingStock}
              nextRollingStock={nextRollingStock}
            />
          </TabsContent>
          <TabsContent value="cargo">Change your password here.</TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
