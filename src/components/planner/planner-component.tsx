import { Fragment, useContext } from 'react';

import { nanoid } from '@/lib/utils';
import type { RollingStock } from '@/lib/schemas/delivery.schema';

import { Button } from '@/components/ui/button';

import { PlannerContext } from '@/components/planner/planner-context';
import { RollingStockCard } from '@/components/planner/rolling-stock-card';
import { Icons } from '@/components/icons';

export const PlannerComponent = () => {
  const { delivery, updateDelivery } = useContext(PlannerContext);

  const addRollingStock = (index: number) => {
    const newRollingStock = [...delivery.rollingStock];
    newRollingStock.splice(index, 0, { id: nanoid(), type: index === 0 ? 'locomotive' : 'cargo' });

    updateDelivery({ ...delivery, rollingStock: newRollingStock });
  };

  const updateRollingStock = (rs: RollingStock) => {
    const newRollingStock = delivery.rollingStock.map(r => (r.id === rs.id ? rs : r));

    updateDelivery({ ...delivery, rollingStock: newRollingStock });
  };

  const removeRollingStock = (id: string) => {
    const newRollingStock = delivery.rollingStock.filter(r => r.id !== id);

    updateDelivery({ ...delivery, rollingStock: newRollingStock });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-8 md:min-h-64 md:flex-row md:py-0">
      <Button
        size="icon"
        variant="secondary"
        aria-label="Add rolling stock"
        className="size-8 rounded-full"
        onClick={() => addRollingStock(0)}
      >
        <Icons.plus />
      </Button>

      {delivery.rollingStock.map((rs, i) => (
        <Fragment key={rs.id}>
          <RollingStockCard
            rollingStock={rs}
            setRollingStock={updateRollingStock}
            onDelete={() => removeRollingStock(rs.id)}
            previousRollingStock={i > 0 ? delivery.rollingStock[i - 1] : undefined}
            nextRollingStock={i < delivery.rollingStock.length - 1 ? delivery.rollingStock[i + 1] : undefined}
          />

          <Button
            size="icon"
            variant="secondary"
            aria-label="Add rolling stock"
            className="size-8 rounded-full"
            onClick={() => addRollingStock(i + 1)}
          >
            <Icons.plus />
          </Button>
        </Fragment>
      ))}
    </div>
  );
};
